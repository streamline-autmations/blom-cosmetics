// PayFast Utility Functions

/**
 * Encode string for PayFast (URL-encode, uppercase hex, replace %20 with +)
 */
export function encodePF(v: string): string {
    return encodeURIComponent(v)
        .replace(/%[0-9A-F]{2}/g, (match) => match.toUpperCase())
        .replace(/%20/g, '+');
}

/**
 * Build parameter string in exact PayFast order
 */
export function buildParamString(data: Record<string, string | number | undefined>): string {
    const orderedKeys = [
        // Merchant
        'merchant_id', 'merchant_key', 'return_url', 'cancel_url', 'notify_url',
        // Customer
        'name_first', 'name_last', 'email_address', 'cell_number',
        // Transaction
        'm_payment_id', 'amount', 'item_name', 'item_description',
        'custom_int1', 'custom_int2', 'custom_int3', 'custom_int4', 'custom_int5',
        'custom_str1', 'custom_str2', 'custom_str3', 'custom_str4', 'custom_str5',
        // Options
        'email_confirmation', 'confirmation_address', 'payment_method'
    ];

    const params: string[] = [];
    
    for (const key of orderedKeys) {
        const value = data[key];
        if (value !== undefined && value !== null && value !== '') {
            params.push(`${key}=${encodePF(String(value))}`);
        }
    }

    return params.join('&');
}

/**
 * Sign parameter string with passphrase
 */
export function signWithPassphrase(paramString: string, passphrase: string): string {
    const stringToSign = `${paramString}&passphrase=${encodePF(passphrase)}`;
    
    // Simple MD5 implementation (in production, use crypto-js or similar)
    function md5(str: string): string {
        // This is a simplified MD5 implementation
        // In production, use a proper crypto library
        const crypto = require('crypto');
        return crypto.createHash('md5').update(str).digest('hex');
    }
    
    return md5(stringToSign);
}

/**
 * POST form data to PayFast
 */
export async function postBackForm(url: string, body: string): Promise<string> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'BLOM-Cosmetics/1.0'
            },
            body: body
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.text();
    } catch (error) {
        console.error('PayFast POST error:', error);
        throw error;
    }
}

/**
 * Validate PayFast signature
 */
export function validateSignature(pfData: Record<string, string>, passphrase: string): boolean {
    try {
        // Extract signature from pfData
        const receivedSignature = pfData.signature;
        if (!receivedSignature) {
            return false;
        }

        // Rebuild parameter string without signature
        const { signature, ...dataWithoutSignature } = pfData;
        const paramString = buildParamString(dataWithoutSignature);
        
        // Calculate expected signature
        const expectedSignature = signWithPassphrase(paramString, passphrase);
        
        return expectedSignature.toLowerCase() === receivedSignature.toLowerCase();
    } catch (error) {
        console.error('Signature validation error:', error);
        return false;
    }
}

/**
 * Get PayFast host based on mode
 */
export function getPayFastHost(mode: 'sandbox' | 'live'): string {
    return mode === 'live' ? 'www.payfast.co.za' : 'sandbox.payfast.co.za';
}

/**
 * Get PayFast URLs
 */
export function getPayFastUrls(mode: 'sandbox' | 'live') {
    const host = getPayFastHost(mode);
    return {
        processUrl: `https://${host}/eng/process`,
        validateUrl: `https://${host}/eng/query/validate`
    };
}
