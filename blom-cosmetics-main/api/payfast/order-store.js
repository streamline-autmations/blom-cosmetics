import { promises as fs } from 'fs';
import path from 'path';

const STORE_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(STORE_DIR, 'payfast-orders.json');
const DEFAULT_STORE = { orders: {} };

async function ensureStoreFile() {
    await fs.mkdir(STORE_DIR, { recursive: true });
    try {
        await fs.access(STORE_PATH);
    } catch (error) {
        if (error.code === 'ENOENT') {
            const initial = { ...DEFAULT_STORE };
            await fs.writeFile(STORE_PATH, JSON.stringify(initial, null, 2), 'utf8');
        } else {
            throw error;
        }
    }
}

async function readStore() {
    await ensureStoreFile();
    try {
        const raw = await fs.readFile(STORE_PATH, 'utf8');
        return JSON.parse(raw);
    } catch (error) {
        console.error('Failed to read PayFast order store:', error);
        return { orders: {} };
    }
}

async function writeStore(store) {
    await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

export async function upsertPendingOrder(order) {
    if (!order || !order.m_payment_id) {
        throw new Error('upsertPendingOrder requires an m_payment_id');
    }

    const store = await readStore();
    const now = new Date().toISOString();
    const existing = store.orders[order.m_payment_id] || {};

    const base = {
        events: [],
        status_history: [],
        items: [],
        ...existing
    };

    const nextRecord = {
        ...base,
        ...clone(order),
        created_at: base.created_at || now,
        updated_at: now
    };

    if (!nextRecord.status) {
        nextRecord.status = 'pending';
    }

    if (!Array.isArray(nextRecord.status_history)) {
        nextRecord.status_history = [];
    }

    if (nextRecord.status_history.length === 0 || nextRecord.status_history[nextRecord.status_history.length - 1]?.status !== nextRecord.status) {
        nextRecord.status_history.push({ status: nextRecord.status, at: now });
    }

    store.orders[order.m_payment_id] = nextRecord;
    await writeStore(store);

    return nextRecord;
}

export async function getOrderByPaymentId(mPaymentId) {
    if (!mPaymentId) {
        return null;
    }

    const store = await readStore();
    const order = store.orders[mPaymentId];
    return order ? clone(order) : null;
}

export async function updateOrderRecord(mPaymentId, updates) {
    if (!mPaymentId) {
        throw new Error('updateOrderRecord requires an m_payment_id');
    }

    const store = await readStore();
    const existing = store.orders[mPaymentId];

    if (!existing) {
        return null;
    }

    const now = new Date().toISOString();
    const nextRecord = {
        ...existing,
        ...clone(updates),
        updated_at: now
    };

    if (updates?.status) {
        const statusHistory = Array.isArray(existing.status_history) ? [...existing.status_history] : [];
        if (statusHistory.length === 0 || statusHistory[statusHistory.length - 1]?.status !== updates.status) {
            statusHistory.push({ status: updates.status, at: now });
        }
        nextRecord.status_history = statusHistory;
    }

    store.orders[mPaymentId] = nextRecord;
    await writeStore(store);

    return clone(nextRecord);
}

export async function appendOrderEvent(mPaymentId, event) {
    if (!mPaymentId || !event) {
        return null;
    }

    const store = await readStore();
    const existing = store.orders[mPaymentId];

    if (!existing) {
        return null;
    }

    const now = new Date().toISOString();
    const events = Array.isArray(existing.events) ? [...existing.events] : [];
    events.push({ ...clone(event), at: now });

    const nextRecord = {
        ...existing,
        events,
        updated_at: now
    };

    store.orders[mPaymentId] = nextRecord;
    await writeStore(store);

    return clone(nextRecord);
}

export async function listOrders() {
    const store = await readStore();
    return clone(store.orders);
}

