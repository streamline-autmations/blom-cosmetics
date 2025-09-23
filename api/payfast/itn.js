// PayFast ITN (Instant Transaction Notification) Webhook
// POST /api/payfast/itn

import { buildParamString, validateSignature, getPayFastUrls, postBackForm } from '../../js/payfast/payfast.ts';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Immediately send 200 OK to stop PayFast retries
    res.status(200).json({ status: 'received' });

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
            return;
        }

        // Extract form data from request body
        const pfData = req.body;
        
        // Log ITN for audit (mask sensitive data)
        console.log('PayFast ITN received:', {
            m_payment_id: pfData.m_payment_id,
            payment_status: pfData.payment_status,
            amount_gross: pfData.amount_gross,
            name_first: pfData.name_first,
            name_last: pfData.name_last,
            email_address: pfData.email_address ? '***@***.***' : undefined,
            timestamp: new Date().toISOString()
        });

        // Validate signature
        if (!validateSignature(pfData, PAYFAST_PASSPHRASE)) {
            console.error('Invalid PayFast signature for order:', pfData.m_payment_id);
            return;
        }

        // Validate source IP
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
        const validIPs = await getValidPayFastIPs();
        
        if (!validIPs.includes(clientIP)) {
            console.error('Invalid source IP for PayFast ITN:', clientIP);
            return;
        }

        // Validate amount
        const expectedAmount = await getExpectedAmount(pfData.m_payment_id, pfData.custom_str1);
        const receivedAmount = parseFloat(pfData.amount_gross);
        
        if (Math.abs(expectedAmount - receivedAmount) > 0.01) {
            console.error('Amount mismatch for order:', {
                m_payment_id: pfData.m_payment_id,
                expected: expectedAmount,
                received: receivedAmount
            });
            return;
        }

        // Server confirmation
        const { validateUrl } = getPayFastUrls(PAYFAST_MODE);
        const validationResponse = await postBackForm(validateUrl, buildParamString(pfData));
        
        if (validationResponse.trim() !== 'VALID') {
            console.error('PayFast server validation failed:', validationResponse);
            return;
        }

        // Process payment status
        await processPaymentStatus(pfData);

        console.log('PayFast ITN processed successfully for order:', pfData.m_payment_id);

    } catch (error) {
        console.error('PayFast ITN processing error:', error);
    }
}

/**
 * Get valid PayFast IP addresses
 */
async function getValidPayFastIPs() {
    const hosts = [
        'www.payfast.co.za',
        'sandbox.payfast.co.za',
        'w1w.payfast.co.za',
        'w2w.payfast.co.za'
    ];

    const validIPs = [];
    
    for (const host of hosts) {
        try {
            // In a real implementation, you would resolve DNS here
            // For now, return known PayFast IPs
            const ips = await resolveDNS(host);
            validIPs.push(...ips);
        } catch (error) {
            console.error(`Failed to resolve ${host}:`, error);
        }
    }

    return validIPs;
}

/**
 * Resolve DNS (placeholder - implement with actual DNS resolution)
 */
async function resolveDNS(hostname) {
    // Known PayFast IPs (update as needed)
    const knownIPs = {
        'www.payfast.co.za': ['41.76.108.171', '41.76.108.172'],
        'sandbox.payfast.co.za': ['41.76.108.171', '41.76.108.172'],
        'w1w.payfast.co.za': ['41.76.108.171'],
        'w2w.payfast.co.za': ['41.76.108.172']
    };

    return knownIPs[hostname] || [];
}

/**
 * Get expected amount for order validation
 */
async function getExpectedAmount(mPaymentId, cartId) {
    // TODO: Replace with actual database lookup
    // This is a placeholder implementation
    
    // For now, return a mock amount
    // In production, query your database for the order total
    return 320.00; // Example amount
}

/**
 * Process payment status
 */
async function processPaymentStatus(pfData) {
    const {
        m_payment_id,
        payment_status,
        amount_gross,
        name_first,
        name_last,
        email_address,
        custom_str1: cart_id,
        custom_str2: customer_id,
        custom_str3: items_json
    } = pfData;

    const orderData = {
        m_payment_id,
        cart_id,
        customer_id,
        customer_email: email_address,
        customer_name: `${name_first} ${name_last}`,
        amount: parseFloat(amount_gross),
        status: payment_status.toLowerCase(),
        processed_at: new Date().toISOString(),
        items: items_json ? JSON.parse(items_json) : []
    };

    switch (payment_status) {
        case 'COMPLETE':
            await handleCompletePayment(orderData);
            break;
            
        case 'CANCELLED':
        case 'FAILED':
            await handleFailedPayment(orderData);
            break;
            
        default:
            console.log('Unknown payment status:', payment_status);
    }
}

/**
 * Handle complete payment
 */
async function handleCompletePayment(orderData) {
    try {
        // Mark order as paid
        console.log('Processing complete payment for order:', orderData.m_payment_id);
        
        // TODO: Update order status in database
        // await updateOrderStatus(orderData.m_payment_id, 'paid');
        
        // TODO: Decrement stock (reserved → committed)
        // await updateStockLevels(orderData.items);
        
        // TODO: Send confirmation email/SMS
        // await sendOrderConfirmation(orderData);
        
        // TODO: Mirror to Supabase (if using Supabase)
        // await syncToSupabase(orderData);
        
        // TODO: Trigger internal webhook (n8n, Zapier, etc.)
        // await triggerInternalWebhook(orderData);
        
        console.log('Complete payment processed successfully:', orderData.m_payment_id);
        
    } catch (error) {
        console.error('Error processing complete payment:', error);
    }
}

/**
 * Handle failed payment
 */
async function handleFailedPayment(orderData) {
    try {
        console.log('Processing failed payment for order:', orderData.m_payment_id);
        
        // TODO: Update order status in database
        // await updateOrderStatus(orderData.m_payment_id, 'failed');
        
        // TODO: Release reserved stock
        // await releaseReservedStock(orderData.items);
        
        // TODO: Send failure notification
        // await sendPaymentFailureNotification(orderData);
        
        console.log('Failed payment processed:', orderData.m_payment_id);
        
    } catch (error) {
        console.error('Error processing failed payment:', error);
    }
}
