// Google Analytics 4 Configuration
// This file should be included in the HTML head section

// Replace 'GA_MEASUREMENT_ID' with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID';

// Initialize GA4
(function() {
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        // Enhanced ecommerce settings
        send_page_view: true,
        custom_map: {
            'custom_parameter_1': 'user_type',
            'custom_parameter_2': 'subscription_status'
        }
    });

    // Enhanced ecommerce configuration
    gtag('config', GA_MEASUREMENT_ID, {
        enhanced_ecommerce: true
    });

    // Privacy settings
    gtag('consent', 'default', {
        'analytics_storage': 'granted',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
    });

    console.log('GA4 initialized with Measurement ID:', GA_MEASUREMENT_ID);
})();

// Enhanced ecommerce events
window.BLOMGA4 = {
    // Track purchase
    trackPurchase: function(transactionData) {
        gtag('event', 'purchase', {
            transaction_id: transactionData.transactionId,
            value: transactionData.value,
            currency: 'ZAR',
            items: transactionData.items.map(item => ({
                item_id: item.id,
                item_name: item.name,
                item_category: item.category,
                item_brand: 'BLOM Cosmetics',
                price: item.price,
                quantity: item.quantity
            }))
        });
    },

    // Track refund
    trackRefund: function(transactionId, value) {
        gtag('event', 'refund', {
            transaction_id: transactionId,
            value: value,
            currency: 'ZAR'
        });
    },

    // Track promotion view
    trackPromotionView: function(promotionData) {
        gtag('event', 'view_promotion', {
            promotion_id: promotionData.id,
            promotion_name: promotionData.name,
            creative_name: promotionData.creativeName,
            creative_slot: promotionData.creativeSlot
        });
    },

    // Track promotion click
    trackPromotionClick: function(promotionData) {
        gtag('event', 'select_promotion', {
            promotion_id: promotionData.id,
            promotion_name: promotionData.name,
            creative_name: promotionData.creativeName,
            creative_slot: promotionData.creativeSlot
        });
    },

    // Track coupon usage
    trackCouponUse: function(couponCode, value) {
        gtag('event', 'use_coupon', {
            coupon: couponCode,
            value: value,
            currency: 'ZAR'
        });
    },

    // Track shipping info
    trackShippingInfo: function(shippingData) {
        gtag('event', 'add_shipping_info', {
            currency: 'ZAR',
            value: shippingData.value,
            shipping_tier: shippingData.tier,
            items: shippingData.items.map(item => ({
                item_id: item.id,
                item_name: item.name,
                item_category: item.category,
                item_brand: 'BLOM Cosmetics',
                price: item.price,
                quantity: item.quantity
            }))
        });
    },

    // Track payment info
    trackPaymentInfo: function(paymentData) {
        gtag('event', 'add_payment_info', {
            currency: 'ZAR',
            value: paymentData.value,
            payment_type: paymentData.type,
            items: paymentData.items.map(item => ({
                item_id: item.id,
                item_name: item.name,
                item_category: item.category,
                item_brand: 'BLOM Cosmetics',
                price: item.price,
                quantity: item.quantity
            }))
        });
    }
};

// Custom dimensions (configure these in GA4)
window.BLOMGA4.customDimensions = {
    user_type: 'cd1', // Registered vs Guest
    subscription_status: 'cd2', // Newsletter subscriber
    customer_segment: 'cd3', // VIP, Regular, New
    order_frequency: 'cd4', // High, Medium, Low
    preferred_category: 'cd5' // Most viewed category
};

// Custom metrics (configure these in GA4)
window.BLOMGA4.customMetrics = {
    session_duration: 'cm1', // Time spent on site
    page_depth: 'cm2', // Number of pages viewed
    cart_abandonment_rate: 'cm3', // Percentage of abandoned carts
    wishlist_additions: 'cm4', // Number of wishlist additions
    course_enrollments: 'cm5' // Number of course enrollments
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GA_MEASUREMENT_ID,
        BLOMGA4: window.BLOMGA4
    };
}
