// PayFast Create Payment API Endpoint
// POST /api/payfast/create-payment

import { buildParamString, signWithPassphrase, getPayFastUrls } from '../../js/payfast/payfast.ts';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Read environment variables
        const {
            PAYFAST_MERCHANT_ID,
            PAYFAST_MERCHANT_KEY,
            PAYFAST_PASSPHRASE,
            PAYFAST_MODE = 'sandbox'
        } = process.env;

        // Validate required environment variables
        if (!PAYFAST_MERCHANT_ID || !PAYFAST_MERCHANT_KEY || !PAYFAST_PASSPHRASE) {
            console.error('Missing PayFast environment variables');
            return res.status(500).json({ error: 'PayFast configuration missing' });
        }

        // Parse request body
        const {
            cart_id,
            customer_id,
            email,
            first_name,
            last_name,
            items,
            subtotal,
            shipping,
            discount,
            total,
            return_url,
            cancel_url
        } = req.body;

        // Validate required fields
        if (!cart_id || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Invalid cart data' });
        }

        if (!email || !first_name || !last_name) {
            return res.status(400).json({ error: 'Customer information required' });
        }

        // Validate totals
        const serverTotal = parseFloat((subtotal + shipping - discount).toFixed(2));
        const clientTotal = parseFloat(total.toFixed(2));
        
        if (Math.abs(serverTotal - clientTotal) > 0.01) {
            console.error('Total mismatch:', { serverTotal, clientTotal });
            return res.status(400).json({ error: 'Total amount mismatch' });
        }

        // Generate order ID
        const timestamp = Date.now();
        const m_payment_id = `BLOM-${timestamp}`;

        // Get PayFast URLs
        const { processUrl, validateUrl } = getPayFastUrls(PAYFAST_MODE);

        // Prepare PayFast fields
        const payfastData = {
            // Merchant
            merchant_id: PAYFAST_MERCHANT_ID,
            merchant_key: PAYFAST_MERCHANT_KEY,
            return_url: return_url || 'https://blom-cosmetics.co.za/order-confirmation.html',
            cancel_url: cancel_url || 'https://blom-cosmetics.co.za/checkout.html?cancelled=1',
            notify_url: 'https://blom-cosmetics.co.za/api/payfast/itn',
            
            // Customer
            name_first: first_name,
            name_last: last_name,
            email_address: email,
            
            // Transaction
            m_payment_id: m_payment_id,
            amount: serverTotal.toFixed(2),
            item_name: items.length === 1 
                ? items[0].name 
                : `${items[0].name} (+${items.length - 1} more)`,
            item_description: `Order from BLOM Cosmetics - ${items.length} item${items.length !== 1 ? 's' : ''}`,
            
            // Custom fields
            custom_str1: cart_id,
            custom_str2: customer_id || '',
            custom_str3: JSON.stringify(items.map(item => ({
                sku: item.sku,
                name: item.name,
                price: item.price,
                qty: item.qty
            }))),
            custom_str4: PAYFAST_MODE,
            
            // Options
            email_confirmation: '1',
            confirmation_address: email
        };

        // Build parameter string
        const paramString = buildParamString(payfastData);

        // Generate signature
        const signature = signWithPassphrase(paramString, PAYFAST_PASSPHRASE);

        // Prepare response
        const response = {
            processUrl,
            fields: {
                ...payfastData,
                signature
            }
        };

        // Log for debugging (without sensitive data)
        console.log('PayFast payment created:', {
            m_payment_id,
            amount: serverTotal,
            customer_email: email,
            item_count: items.length,
            mode: PAYFAST_MODE
        });

        // Store order data temporarily (in production, save to database)
        // This is a placeholder - replace with actual database storage
        const orderData = {
            m_payment_id,
            cart_id,
            customer_id,
            customer_email: email,
            customer_name: `${first_name} ${last_name}`,
            items,
            subtotal,
            shipping,
            discount,
            total: serverTotal,
            status: 'pending',
            created_at: new Date().toISOString(),
            payfast_mode: PAYFAST_MODE
        };

        // TODO: Save to database
        // await saveOrderToDatabase(orderData);

        return res.status(200).json(response);

    } catch (error) {
        console.error('PayFast create payment error:', error);
        return res.status(500).json({ 
            error: 'Payment creation failed',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
}
