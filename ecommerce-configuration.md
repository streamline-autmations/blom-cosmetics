# Tickled Pinque South Africa - E-commerce Configuration

## Currency Configuration
- **Primary Currency:** South African Rand (ZAR)
- **Currency Symbol:** R
- **Currency Code:** ZAR
- **Decimal Places:** 2
- **Thousand Separator:** Space (R 1 234.56)
- **Currency Position:** Before amount with space

## Payment Gateway Integration

### Primary Payment Provider: PayFast
- **Provider:** PayFast (South African payment gateway)
- **Supported Methods:**
  - Credit Cards (Visa, Mastercard, American Express)
  - Debit Cards
  - Instant EFT (Electronic Funds Transfer)
  - SnapScan
  - Zapper
  - Mobicred
  - PayFlex (Buy now, pay later)

### Secondary Payment Provider: Yoco
- **Provider:** Yoco (Alternative South African gateway)
- **Supported Methods:**
  - Credit and Debit Cards
  - Digital Wallets
  - QR Code Payments
  - In-store card payments (for physical locations)

### Payment Security
- **SSL Certificate:** Required for all transactions
- **PCI DSS Compliance:** Full compliance required
- **3D Secure:** Enabled for all card transactions
- **Fraud Protection:** Built-in fraud detection
- **Data Protection:** POPIA (Protection of Personal Information Act) compliance

## Shipping Configuration

### Shipping Zones - South Africa Provinces

#### Zone 1: Gauteng (Local)
- **Provinces:** Gauteng
- **Standard Delivery:** 1-2 business days
- **Express Delivery:** Same day (Johannesburg/Pretoria metro)
- **Free Shipping Threshold:** R 500
- **Standard Rate:** R 65
- **Express Rate:** R 120

#### Zone 2: Major Urban Centers
- **Provinces:** Western Cape (Cape Town metro), KwaZulu-Natal (Durban metro)
- **Standard Delivery:** 2-3 business days
- **Express Delivery:** Next day
- **Free Shipping Threshold:** R 500
- **Standard Rate:** R 85
- **Express Rate:** R 150

#### Zone 3: Other Urban Areas
- **Provinces:** Eastern Cape (Port Elizabeth, East London), Free State (Bloemfontein), Mpumalanga (Nelspruit), North West (Rustenburg)
- **Standard Delivery:** 3-4 business days
- **Express Delivery:** 2 business days
- **Free Shipping Threshold:** R 750
- **Standard Rate:** R 95
- **Express Rate:** R 180

#### Zone 4: Remote Areas
- **Provinces:** Northern Cape, Limpopo, Rural areas of all provinces
- **Standard Delivery:** 4-6 business days
- **Express Delivery:** 3-4 business days
- **Free Shipping Threshold:** R 1,000
- **Standard Rate:** R 120
- **Express Rate:** R 220

### Shipping Partners
- **Primary:** The Courier Guy
- **Secondary:** Aramex
- **Backup:** PostNet
- **Express:** Dawn Wing (for same-day/next-day)

### Special Shipping Options
- **Professional Bulk Orders:** Custom shipping rates for orders over R 5,000
- **Salon Delivery:** Scheduled delivery for regular salon orders
- **Collection Points:** PostNet and Pargo pickup points available
- **Insurance:** Optional shipping insurance for high-value orders

## Tax Configuration
- **VAT Rate:** 15% (South African VAT)
- **VAT Registration:** Required for businesses with turnover > R 1 million
- **Tax Display:** Prices include VAT (VAT-inclusive pricing)
- **Tax Calculation:** Automatic VAT calculation on all products
- **Tax Exemption:** Available for qualifying export orders

## Inventory Management
- **Stock Tracking:** Real-time inventory tracking
- **Low Stock Alerts:** Automatic notifications at 10 units
- **Backorder Management:** Allow backorders with estimated restock dates
- **Supplier Integration:** Direct integration with key suppliers
- **Batch Tracking:** Track product batches for quality control

## Professional Account Features
- **Trade Pricing:** Tiered pricing based on purchase volume
- **Credit Terms:** 30-day payment terms for approved accounts
- **Bulk Order Discounts:**
  - 5% discount on orders R 2,500+
  - 10% discount on orders R 5,000+
  - 15% discount on orders R 10,000+
- **Account Management:** Dedicated account managers for large clients

## Multi-language Support (Future)
- **Primary Language:** English
- **Secondary Languages:** Afrikaans, isiZulu (planned for future implementation)
- **Currency Display:** Always in ZAR regardless of language

## Analytics and Reporting
- **Google Analytics:** Enhanced e-commerce tracking
- **Facebook Pixel:** For advertising optimization
- **Sales Reporting:** Daily, weekly, monthly sales reports
- **Customer Analytics:** Customer lifetime value, repeat purchase rates
- **Inventory Reports:** Stock levels, turnover rates, reorder points

## Customer Support Integration
- **Live Chat:** WhatsApp Business integration
- **Help Desk:** Zendesk or similar ticketing system
- **FAQ System:** Searchable knowledge base
- **Video Support:** Product demonstration videos
- **Phone Support:** Local South African phone number

## Compliance Requirements
- **POPIA Compliance:** Personal data protection
- **Consumer Protection Act:** South African consumer rights
- **Electronic Communications Act:** Electronic transaction compliance
- **Competition Act:** Fair trading practices
- **Health and Safety:** Cosmetic product safety regulations