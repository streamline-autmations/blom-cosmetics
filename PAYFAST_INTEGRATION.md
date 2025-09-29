# PayFast Integration for BLOM Cosmetics

This document outlines the PayFast payment integration implementation for BLOM Cosmetics.

## Overview

The integration includes:
- Server-side payment creation with signature generation
- ITN (Instant Transaction Notification) webhook handling
- Frontend checkout form submission to PayFast
- Order confirmation page handling PayFast returns

## Files Created/Modified

### Server Functions
- `js/payfast/payfast.ts` - Utility functions for PayFast integration
- `api/payfast/create-payment.js` - Server endpoint to create signed PayFast payloads
- `api/payfast/itn.js` - Server endpoint to handle PayFast ITN webhooks

### Frontend Updates
- `checkout-script.js` - Updated to call PayFast API and submit forms
- `order-confirmation-script.js` - Updated to handle PayFast return parameters

### Configuration
- `config.example.js` - Example configuration file

## Environment Variables Required

```bash
PAYFAST_MERCHANT_ID=your_merchant_id_here
PAYFAST_MERCHANT_KEY=your_merchant_key_here
PAYFAST_PASSPHRASE=your_passphrase_here
PAYFAST_MODE=sandbox  # or 'live' for production
```

## API Endpoints

### POST /api/payfast/create-payment
Creates a signed PayFast payload for checkout.

**Request Body:**
```json
{
  "cart_id": "cart_1234567890_abc123",
  "customer_id": "user_123",
  "email": "customer@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "items": [
    {
      "sku": "ACR-CLR-50",
      "name": "Professional Acrylic Powder - Clear",
      "price": 250.00,
      "qty": 2
    }
  ],
  "subtotal": 500.00,
  "shipping": 80.00,
  "discount": 0.00,
  "total": 580.00,
  "return_url": "https://blom-cosmetics.co.za/order-confirmation",
  "cancel_url": "https://blom-cosmetics.co.za/checkout?cancelled=1"
}
```

**Response:**
```json
{
  "processUrl": "https://sandbox.payfast.co.za/eng/process",
  "fields": {
    "merchant_id": "12345",
    "merchant_key": "abc123",
    "return_url": "https://blom-cosmetics.co.za/order-confirmation",
    "cancel_url": "https://blom-cosmetics.co.za/checkout?cancelled=1",
    "notify_url": "https://blom-cosmetics.co.za/api/payfast/itn",
    "name_first": "John",
    "name_last": "Doe",
    "email_address": "customer@example.com",
    "m_payment_id": "BLOM-1703123456789-abc123",
    "amount": "580.00",
    "item_name": "Professional Acrylic Powder - Clear (+1 more)",
    "item_description": "Order BLOM-1703123456789-abc123 from BLOM Cosmetics",
    "custom_str1": "cart_1234567890_abc123",
    "custom_str2": "user_123",
    "signature": "generated_md5_signature"
  }
}
```

### POST /api/payfast/itn
Handles PayFast Instant Transaction Notifications.

**Process:**
1. Immediately returns 200 OK to stop PayFast retries
2. Validates signature using PayFast's algorithm
3. Validates source IP (PayFast servers only)
4. Validates amount matches expected order total
5. Confirms with PayFast server
6. Updates order status based on payment_status

**Payment Statuses:**
- `COMPLETE` - Payment successful, mark order as paid
- `CANCELLED` - Payment cancelled, release reserved stock
- `FAILED` - Payment failed, release reserved stock

## Frontend Integration

### Checkout Process
1. User fills out checkout form
2. Form submission calls `/api/payfast/create-payment`
3. Server returns signed PayFast payload
4. Frontend creates hidden form with PayFast fields
5. Form submits to PayFast hosted checkout
6. User completes payment on PayFast
7. PayFast redirects to return_url with payment status

### Order Confirmation
- Handles PayFast return parameters
- Displays order confirmation with payment status
- Stores payment success in localStorage for reference

## Security Features

- **Signature Validation**: All PayFast communications are signed with MD5
- **IP Validation**: ITN webhook only accepts requests from PayFast servers
- **Amount Validation**: Server validates payment amounts match order totals
- **Server Confirmation**: ITN payloads are confirmed with PayFast before processing

## Testing

### Sandbox Mode
- Set `PAYFAST_MODE=sandbox`
- Use PayFast sandbox credentials
- Test payments with PayFast test card numbers

### Test Card Numbers (Sandbox)
- **Visa**: 4000000000000002
- **Mastercard**: 5200000000000007
- **Declined**: 4000000000000069

## Production Deployment

1. Update environment variables with live PayFast credentials
2. Set `PAYFAST_MODE=live`
3. Update return/cancel URLs to production domain
4. Test with small amounts before going live
5. Monitor ITN webhook logs for any issues

## Monitoring

- Log all PayFast API calls (without sensitive data)
- Monitor ITN webhook success/failure rates
- Set up alerts for payment processing errors
- Keep audit trail of all payment transactions

## Support

For PayFast integration issues:
- Check PayFast documentation: https://developers.payfast.co.za/
- Verify environment variables are correct
- Test in sandbox mode first
- Contact PayFast support for merchant account issues
