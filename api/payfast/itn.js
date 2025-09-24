import crypto from 'crypto';
import dns from 'dns/promises';
import { getOrderByPaymentId, updateOrderRecord, appendOrderEvent } from './order-store.js';

const PAYFAST_HOSTS = [
    'www.payfast.co.za',
    'sandbox.payfast.co.za',
    'w1w.payfast.co.za',
    'w2w.payfast.co.za'
];

const PAYFAST_FALLBACK_IPS = {
    'www.payfast.co.za': ['41.76.108.171', '41.76.108.172'],
    'sandbox.payfast.co.za': ['41.76.108.171', '41.76.108.172'],
    'w1w.payfast.co.za': ['41.76.108.171'],
    'w2w.payfast.co.za': ['41.76.108.172']
};

const PAYFAST_PARAM_ORDER = [
    'merchant_id',
    'merchant_key',
    'm_payment_id',
    'pf_payment_id',
    'payment_id',
    'payment_status',
    'amount_gross',
    'amount_fee',
    'amount_net',
    'item_name',
    'item_description',
    'email_address',
    'name_first',
    'name_last',
    'custom_int1',
    'custom_int2',
    'custom_int3',
    'custom_int4',
    'custom_int5',
    'custom_str1',
    'custom_str2',
    'custom_str3',
    'custom_str4',
    'custom_str5',
    'token',
    'signature'
];

function encodePF(value) {
    const stringValue = value === undefined || value === null ? '' : String(value);
    return encodeURIComponent(stringValue)
        .replace(/%[0-9a-fA-F]{2}/g, (match) => match.toUpperCase())
        .replace(/%20/g, '+');
}

function decodeFormComponent(value) {
    if (value === undefined || value === null) {
        return '';
    }
    return decodeURIComponent(String(value).replace(/\+/g, ' '));
}

async function getRawBody(req) {
    if (typeof req.rawBody === 'string') {
        return req.rawBody;
    }
    if (Buffer.isBuffer(req.rawBody)) {
        return req.rawBody.toString('utf8');
    }
    if (typeof req.body === 'string') {
        return req.body;
    }
    if (Buffer.isBuffer(req.body)) {
        return req.body.toString('utf8');
    }

    return new Promise((resolve) => {
        try {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            });
            req.on('end', () => resolve(data));
            req.on('error', () => resolve(''));
        } catch (_err) {
            resolve('');
        }
    });
}

function parseUrlEncoded(rawBody) {
    const pairs = [];
    const data = {};

    if (!rawBody) {
        return { pairs, data };
    }

    for (const segment of rawBody.split('&')) {
        if (segment === '') {
            continue;
        }
        const [rawKey, ...rest] = segment.split('=');
        const rawValue = rest.join('=');
        const key = decodeFormComponent(rawKey);
        const value = decodeFormComponent(rawValue);
        pairs.push({ key, value });
        data[key] = value;
    }

    return { pairs, data };
}

function buildPairsFromObject(data) {
    if (!data || typeof data !== 'object') {
        return [];
    }

    const pairs = [];
    const seen = new Set();

    for (const key of PAYFAST_PARAM_ORDER) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            pairs.push({ key, value: String(data[key] ?? '') });
            seen.add(key);
        }
    }

    for (const key of Object.keys(data)) {
        if (!seen.has(key)) {
            pairs.push({ key, value: String(data[key] ?? '') });
        }
    }

    return pairs;
}

function buildParamString(pairs, excludeKey = 'signature') {
    return pairs
        .filter((pair) => pair.key !== excludeKey)
        .map((pair) => `${pair.key}=${encodePF(pair.value)}`)
        .join('&');
}

function createSignature(paramString, passphrase) {
    const pass = passphrase ?? '';
    const toHash = `${paramString}&passphrase=${encodePF(pass)}`;
    return crypto.createHash('md5').update(toHash).digest('hex');
}

async function resolvePayfastIps() {
    const ips = new Set();

    for (const host of PAYFAST_HOSTS) {
        try {
            const records = await dns.resolve4(host);
            records.forEach((ip) => ips.add(ip));
        } catch (error) {
            console.error(`PayFast DNS resolution failed for ${host}:`, error);
            const fallback = PAYFAST_FALLBACK_IPS[host] || [];
            fallback.forEach((ip) => ips.add(ip));
        }
    }

    return ips;
}

function normalizeIp(ip) {
    if (!ip) {
        return '';
    }
    let normalized = ip.trim();
    if (normalized.startsWith('::ffff:')) {
        normalized = normalized.substring(7);
    }
    if (normalized === '::1') {
        normalized = '127.0.0.1';
    }
    return normalized;
}

function extractRequestIp(req) {
    const header = req.headers?.['x-forwarded-for'];

    if (typeof header === 'string' && header.length > 0) {
        return normalizeIp(header.split(',')[0]);
    }

    if (Array.isArray(header) && header.length > 0) {
        return normalizeIp(header[0]);
    }

    const ip = req.connection?.remoteAddress || req.socket?.remoteAddress || req.ip;
    return normalizeIp(ip);
}

function sanitizePayload(pfData) {
    if (!pfData || typeof pfData !== 'object') {
        return {};
    }
    const { signature, ...rest } = pfData;
    return rest;
}

async function postValidate(url, body) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    });

    if (!response.ok) {
        throw new Error(`Validation request failed with ${response.status}`);
    }

    return response.text();
}

function getExpectedAmount(orderRecord) {
    const candidates = [
        orderRecord?.expected_amount,
        orderRecord?.total,
        orderRecord?.amount,
        orderRecord?.totals?.total,
        orderRecord?.totals?.grand_total
    ];

    for (const candidate of candidates) {
        const numeric = typeof candidate === 'number' ? candidate : parseFloat(candidate);
        if (Number.isFinite(numeric)) {
            return numeric;
        }
    }

    return NaN;
}

async function decrementStock(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return;
    }
    console.log('PayFast ITN stock decrement placeholder', {
        items: items.length
    });
}

async function releaseStock(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return;
    }
    console.log('PayFast ITN stock release placeholder', {
        items: items.length
    });
}

async function triggerNotificationWebhook(order, pfData) {
    const webhookUrl = process.env.N8N_PAYFAST_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
        return;
    }

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event: 'payfast-itn',
                order,
                payfast: pfData
            })
        });
    } catch (error) {
        console.error('PayFast notification webhook error:', error);
    }
}

async function handlePaymentStatus(pfData, orderRecord) {
    const status = (pfData.payment_status || '').toUpperCase();
    const now = new Date().toISOString();
    const amount = parseFloat(pfData.amount_gross || '0');
    const sanitizedPayload = sanitizePayload(pfData);

    switch (status) {
        case 'COMPLETE': {
            const updated = await updateOrderRecord(pfData.m_payment_id, {
                status: 'paid',
                paid_at: now,
                pf_payment_id: pfData.pf_payment_id || orderRecord?.pf_payment_id || null,
                payment_status: status
            });

            await appendOrderEvent(pfData.m_payment_id, {
                type: 'payfast-itn',
                status: 'paid',
                amount_gross: amount,
                pf_payment_id: pfData.pf_payment_id || null
            });

            await decrementStock(updated?.items || orderRecord?.items || []);
            await triggerNotificationWebhook(updated || orderRecord, sanitizedPayload);
            return 'processed-paid';
        }
        case 'CANCELLED': {
            const updated = await updateOrderRecord(pfData.m_payment_id, {
                status: 'cancelled',
                cancelled_at: now,
                pf_payment_id: pfData.pf_payment_id || orderRecord?.pf_payment_id || null,
                payment_status: status
            });

            await appendOrderEvent(pfData.m_payment_id, {
                type: 'payfast-itn',
                status: 'cancelled',
                amount_gross: amount,
                pf_payment_id: pfData.pf_payment_id || null
            });

            await releaseStock(updated?.items || orderRecord?.items || []);
            return 'processed-cancelled';
        }
        case 'FAILED': {
            const updated = await updateOrderRecord(pfData.m_payment_id, {
                status: 'failed',
                failed_at: now,
                pf_payment_id: pfData.pf_payment_id || orderRecord?.pf_payment_id || null,
                payment_status: status
            });

            await appendOrderEvent(pfData.m_payment_id, {
                type: 'payfast-itn',
                status: 'failed',
                amount_gross: amount,
                pf_payment_id: pfData.pf_payment_id || null
            });

            await releaseStock(updated?.items || orderRecord?.items || []);
            return 'processed-failed';
        }
        default: {
            await appendOrderEvent(pfData.m_payment_id, {
                type: 'payfast-itn',
                status: status.toLowerCase() || 'unknown',
                amount_gross: amount,
                pf_payment_id: pfData.pf_payment_id || null
            });
            return 'processed-unknown';
        }
    }
}

function logEvent(status, pfData) {
    console.log({
        event: 'payfast-itn',
        status,
        m_payment_id: pfData?.m_payment_id || null,
        pf_payment_id: pfData?.pf_payment_id || null
    });
}

async function extractPayfastPayload(req) {
    const rawBody = await getRawBody(req);
    if (rawBody) {
        const parsed = parseUrlEncoded(rawBody);
        if (parsed.pairs.length > 0) {
            return {
                pfData: parsed.data,
                orderedPairs: parsed.pairs
            };
        }
    }

    if (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
        const normalized = {};
        for (const [key, value] of Object.entries(req.body)) {
            normalized[key] = value === undefined || value === null ? '' : String(Array.isArray(value) ? value[0] : value);
        }
        return {
            pfData: normalized,
            orderedPairs: buildPairsFromObject(normalized)
        };
    }

    return { pfData: {}, orderedPairs: [] };
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    let pfData = {};

    try {
        const { pfData: parsedData, orderedPairs } = await extractPayfastPayload(req);
        pfData = parsedData;

        if (!pfData || Object.keys(pfData).length === 0) {
            logEvent('bad-payload', pfData);
            return res.status(200).end();
        }

        const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE || '';
        const PAYFAST_MODE = process.env.PAYFAST_MODE === 'live' ? 'live' : 'sandbox';
        const payfastHost = PAYFAST_MODE === 'live' ? 'www.payfast.co.za' : 'sandbox.payfast.co.za';
        const validateUrl = `https://${payfastHost}/eng/query/validate`;

        const paramPairs = orderedPairs.length > 0 ? orderedPairs : buildPairsFromObject(pfData);
        const pfParamString = buildParamString(paramPairs);

        if (!pfData.signature) {
            logEvent('bad-signature', pfData);
            return res.status(200).end();
        }

        const localSignature = createSignature(pfParamString, PAYFAST_PASSPHRASE);
        if (localSignature !== String(pfData.signature).toLowerCase()) {
            logEvent('bad-signature', pfData);
            return res.status(200).end();
        }

        const clientIp = extractRequestIp(req);
        const validIps = await resolvePayfastIps();
        if (!clientIp || !validIps.has(clientIp)) {
            logEvent('bad-ip', pfData);
            return res.status(200).end();
        }

        const orderRecord = await getOrderByPaymentId(pfData.m_payment_id);
        if (!orderRecord) {
            logEvent('order-not-found', pfData);
            return res.status(200).end();
        }

        const expectedAmount = getExpectedAmount(orderRecord);
        const receivedAmount = parseFloat(pfData.amount_gross || pfData.amount || '0');

        if (!Number.isFinite(receivedAmount) || !Number.isFinite(expectedAmount) || Math.abs(expectedAmount - receivedAmount) > 0.01) {
            await appendOrderEvent(pfData.m_payment_id, {
                type: 'payfast-itn',
                status: 'bad-amount',
                expected: expectedAmount,
                received: receivedAmount
            });
            logEvent('bad-amount', pfData);
            return res.status(200).end();
        }

        let validationResponse;
        try {
            validationResponse = await postValidate(validateUrl, pfParamString);
    } catch (error) {
            console.error('PayFast validation request error:', error);
            logEvent('validate-error', pfData);
            return res.status(200).end();
        }

        if (validationResponse.trim() !== 'VALID') {
            logEvent('not-valid', pfData);
            return res.status(200).end();
        }

        const now = new Date().toISOString();
        const sanitizedPayload = sanitizePayload(pfData);
        const baseRecord = await updateOrderRecord(pfData.m_payment_id, {
            last_itn_at: now,
            last_itn_status: pfData.payment_status,
            pf_payment_id: pfData.pf_payment_id || orderRecord.pf_payment_id || null,
            payment_status: pfData.payment_status,
            last_itn_payload: sanitizedPayload,
            pf_param_string: pfParamString
        });

        const finalStatus = await handlePaymentStatus(pfData, baseRecord || orderRecord);
        logEvent(finalStatus, pfData);

        return res.status(200).end();
    } catch (error) {
        console.error('PayFast ITN processing error:', error);
        logEvent('error', pfData);
        return res.status(200).end();
    }
}