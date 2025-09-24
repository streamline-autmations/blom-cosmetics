// POST /api/payfast/create-payment - Create signed PayFast payload
import crypto from 'crypto';

// PayFast utility functions
function encodePF(v) {
    let encoded = encodeURIComponent(v);
    encoded = encoded.replace(/%20/g, '+');
    // Make hex uppercase for consistency
    encoded = encoded.replace(/%2f/g, '%2F');
    return encoded;
}

function buildParamString(data) {
    const paramOrder = [
        'merchant_id', 'merchant_key', 'return_url', 'cancel_url', 'notify_url',
        'name_first', 'name_last', 'email_address', 'cell_number',
        'm_payment_id', 'amount', 'item_name', 'item_description',
        'custom_int1', 'custom_int2', 'custom_int3', 'custom_int4', 'custom_int5',
        'custom_str1', 'custom_str2', 'custom_str3', 'custom_str4', 'custom_str5',
        'email_confirmation', 'confirmation_address', 'payment_method'
    ];

    const params = [];
    for (const key of paramOrder) {
        const value = data[key];
        if (value !== undefined && value !== null && value !== '') {
            params.push(`${key}=${encodePF(String(value))}`);
        }
    }
    return params.join('&');
}

function signWithPassphrase(paramString, passphrase) {
    const fullString = paramString + '&passphrase=' + encodePF(passphrase);
    return crypto.createHash('md5').update(fullString).digest('hex');
}

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Read environment variables
        const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID;
        const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY;
        const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE || '';
        const PAYFAST_MODE = process.env.PAYFAST_MODE || 'sandbox';

        // Validate required environment variables
        if (!PAYFAST_MERCHANT_ID || !PAYFAST_MERCHANT_KEY) {
            return res.status(500).json({ 
                error: 'PayFast configuration missing. Please set PAYFAST_MERCHANT_ID and PAYFAST_MERCHANT_KEY environment variables.' 
            });
        }

        // Compute PayFast host
        const payfastHost = (PAYFAST_MODE === 'live') ? 'www.payfast.co.za' : 'sandbox.payfast.co.za';
        const processUrl = `https://${payfastHost}/eng/process`;

        // Parse request body
        const {
            cart_id,
            customer_id,
            email,
            first_name,
            last_name,
            items = [],
            subtotal,
            shipping,
            discount,
            total,
            return_url,
            cancel_url
        } = req.body;

        // Validate required fields
        if (!cart_id || !items || items.length === 0) {
            return res.status(400).json({ 
                error: 'Missing required fields: cart_id and items are required' 
            });
        }

        // Calculate server total
        const serverTotal = parseFloat((subtotal + shipping - discount).toFixed(2));
        
        // Validate total matches
        if (Math.abs(serverTotal - total) > 0.01) {
            return res.status(400).json({ 
                error: 'Total validation failed. Server calculated total does not match client total.' 
            });
        }

        // Generate order ID
        const m_payment_id = 'BLOM-' + Date.now();

        // Build item name
        const itemName = items.length > 0 
            ? (items.length > 1 ? `${items[0].name} (+${items.length - 1})` : items[0].name)
            : 'Order';

        // Prepare PayFast fields
        const fields = {
            merchant_id: PAYFAST_MERCHANT_ID,
            merchant_key: PAYFAST_MERCHANT_KEY,
            return_url: return_url || 'https://blom-cosmetics.co.za/order-confirmation',
            cancel_url: cancel_url || 'https://blom-cosmetics.co.za/checkout?cancelled=1',
            notify_url: 'https://blom-cosmetics.co.za/api/payfast/itn',
            name_first: first_name || '',
            name_last: last_name || '',
            email_address: email || '',
            m_payment_id: m_payment_id,
            amount: serverTotal.toFixed(2),
            item_name: itemName,
            item_description: `Order ${m_payment_id} from BLOM Cosmetics`,
            custom_str1: cart_id,
            custom_str2: customer_id || ''
        };

        // Build parameter string
        const paramString = buildParamString(fields);

        // Generate signature
        const signature = signWithPassphrase(paramString, PAYFAST_PASSPHRASE);

        // Return response
        res.status(200).json({
            processUrl,
            fields: {
                ...fields,
                signature
            }
        });

    } catch (error) {
        console.error('PayFast create-payment error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}