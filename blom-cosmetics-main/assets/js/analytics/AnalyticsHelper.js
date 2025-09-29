// Analytics Helper - GA4 Event Tracking
class AnalyticsHelper {
    constructor() {
        this.isInitialized = false;
        this.debugMode = false;
        this.init();
    }

    init() {
        // Check if GA4 is loaded
        if (typeof gtag !== 'undefined') {
            this.isInitialized = true;
            this.log('Analytics initialized');
        } else {
            // Fallback: log events for debugging
            this.debugMode = true;
            this.log('Analytics not initialized - using debug mode');
        }
    }

    log(message, data = null) {
        if (this.debugMode || window.location.hostname === 'localhost') {
            console.log(`[Analytics] ${message}`, data);
        }
    }

    // Track page view
    trackPageView(pageTitle, pagePath) {
        const event = {
            page_title: pageTitle,
            page_location: window.location.href,
            page_path: pagePath
        };

        if (this.isInitialized) {
            gtag('config', 'GA_MEASUREMENT_ID', event);
        }
        
        this.log('Page view tracked', event);
    }

    // Track user sign up
    trackSignUp(method = 'email') {
        const event = {
            event_name: 'sign_up',
            method: method
        };

        if (this.isInitialized) {
            gtag('event', 'sign_up', event);
        }
        
        this.log('Sign up tracked', event);
    }

    // Track user login
    trackLogin(method = 'email') {
        const event = {
            event_name: 'login',
            method: method
        };

        if (this.isInitialized) {
            gtag('event', 'login', event);
        }
        
        this.log('Login tracked', event);
    }

    // Track product view
    trackViewItem(product) {
        const event = {
            event_name: 'view_item',
            currency: 'ZAR',
            value: product.price,
            items: [{
                item_id: product.id,
                item_name: product.name,
                item_category: product.category,
                item_brand: 'BLOM Cosmetics',
                price: product.price,
                currency: 'ZAR'
            }]
        };

        if (this.isInitialized) {
            gtag('event', 'view_item', event);
        }
        
        this.log('Product view tracked', event);
    }

    // Track add to cart
    trackAddToCart(product, quantity = 1) {
        const event = {
            event_name: 'add_to_cart',
            currency: 'ZAR',
            value: product.price * quantity,
            items: [{
                item_id: product.id,
                item_name: product.name,
                item_category: product.category,
                item_brand: 'BLOM Cosmetics',
                price: product.price,
                quantity: quantity,
                currency: 'ZAR'
            }]
        };

        if (this.isInitialized) {
            gtag('event', 'add_to_cart', event);
        }
        
        this.log('Add to cart tracked', event);
    }

    // Track remove from cart
    trackRemoveFromCart(product, quantity = 1) {
        const event = {
            event_name: 'remove_from_cart',
            currency: 'ZAR',
            value: product.price * quantity,
            items: [{
                item_id: product.id,
                item_name: product.name,
                item_category: product.category,
                item_brand: 'BLOM Cosmetics',
                price: product.price,
                quantity: quantity,
                currency: 'ZAR'
            }]
        };

        if (this.isInitialized) {
            gtag('event', 'remove_from_cart', event);
        }
        
        this.log('Remove from cart tracked', event);
    }

    // Track begin checkout
    trackBeginCheckout(cartData) {
        const event = {
            event_name: 'begin_checkout',
            currency: 'ZAR',
            value: cartData.total,
            items: cartData.items.map(item => ({
                item_id: item.id,
                item_name: item.name,
                item_category: item.category,
                item_brand: 'BLOM Cosmetics',
                price: item.price,
                quantity: item.quantity,
                currency: 'ZAR'
            }))
        };

        if (this.isInitialized) {
            gtag('event', 'begin_checkout', event);
        }
        
        this.log('Begin checkout tracked', event);
    }

    // Track purchase
    trackPurchase(transactionData) {
        const event = {
            event_name: 'purchase',
            transaction_id: transactionData.transactionId,
            currency: 'ZAR',
            value: transactionData.value,
            items: transactionData.items.map(item => ({
                item_id: item.id,
                item_name: item.name,
                item_category: item.category,
                item_brand: 'BLOM Cosmetics',
                price: item.price,
                quantity: item.quantity,
                currency: 'ZAR'
            }))
        };

        if (this.isInitialized) {
            gtag('event', 'purchase', event);
        }
        
        this.log('Purchase tracked', event);
    }

    // Track wishlist add
    trackAddToWishlist(product) {
        const event = {
            event_name: 'add_to_wishlist',
            currency: 'ZAR',
            value: product.price,
            items: [{
                item_id: product.id,
                item_name: product.name,
                item_category: product.category,
                item_brand: 'BLOM Cosmetics',
                price: product.price,
                currency: 'ZAR'
            }]
        };

        if (this.isInitialized) {
            gtag('event', 'add_to_wishlist', event);
        }
        
        this.log('Add to wishlist tracked', event);
    }

    // Track wishlist remove
    trackRemoveFromWishlist(product) {
        const event = {
            event_name: 'remove_from_wishlist',
            currency: 'ZAR',
            value: product.price,
            items: [{
                item_id: product.id,
                item_name: product.name,
                item_category: product.category,
                item_brand: 'BLOM Cosmetics',
                price: product.price,
                currency: 'ZAR'
            }]
        };

        if (this.isInitialized) {
            gtag('event', 'remove_from_wishlist', event);
        }
        
        this.log('Remove from wishlist tracked', event);
    }

    // Track search
    trackSearch(searchTerm, resultsCount = 0) {
        const event = {
            event_name: 'search',
            search_term: searchTerm,
            results_count: resultsCount
        };

        if (this.isInitialized) {
            gtag('event', 'search', event);
        }
        
        this.log('Search tracked', event);
    }

    // Track filter apply
    trackFilterApply(filterType, filterValue) {
        const event = {
            event_name: 'filter_apply',
            filter_type: filterType,
            filter_value: filterValue
        };

        if (this.isInitialized) {
            gtag('event', 'filter_apply', event);
        }
        
        this.log('Filter apply tracked', event);
    }

    // Track sort change
    trackSortChange(sortType) {
        const event = {
            event_name: 'sort_change',
            sort_type: sortType
        };

        if (this.isInitialized) {
            gtag('event', 'sort_change', event);
        }
        
        this.log('Sort change tracked', event);
    }

    // Track view toggle change
    trackViewToggleChange(viewType) {
        const event = {
            event_name: 'view_toggle_change',
            view_type: viewType
        };

        if (this.isInitialized) {
            gtag('event', 'view_toggle_change', event);
        }
        
        this.log('View toggle change tracked', event);
    }

    // Track course enrollment
    trackCourseEnrollment(courseData) {
        const event = {
            event_name: 'course_enrollment',
            course_id: courseData.id,
            course_name: courseData.name,
            course_price: courseData.price,
            currency: 'ZAR'
        };

        if (this.isInitialized) {
            gtag('event', 'course_enrollment', event);
        }
        
        this.log('Course enrollment tracked', event);
    }

    // Track contact form submission
    trackContactFormSubmission(formType) {
        const event = {
            event_name: 'contact_form_submission',
            form_type: formType
        };

        if (this.isInitialized) {
            gtag('event', 'contact_form_submission', event);
        }
        
        this.log('Contact form submission tracked', event);
    }

    // Track newsletter signup
    trackNewsletterSignup(source = 'popup') {
        const event = {
            event_name: 'newsletter_signup',
            source: source
        };

        if (this.isInitialized) {
            gtag('event', 'newsletter_signup', event);
        }
        
        this.log('Newsletter signup tracked', event);
    }

    // Track custom event
    trackCustomEvent(eventName, parameters = {}) {
        const event = {
            event_name: eventName,
            ...parameters
        };

        if (this.isInitialized) {
            gtag('event', eventName, parameters);
        }
        
        this.log('Custom event tracked', event);
    }

    // Set user properties
    setUserProperties(properties) {
        if (this.isInitialized) {
            gtag('config', 'GA_MEASUREMENT_ID', {
                user_properties: properties
            });
        }
        
        this.log('User properties set', properties);
    }

    // Set user ID
    setUserId(userId) {
        if (this.isInitialized) {
            gtag('config', 'GA_MEASUREMENT_ID', {
                user_id: userId
            });
        }
        
        this.log('User ID set', userId);
    }

    // Static methods for global access
    static getInstance() {
        if (!AnalyticsHelper.instance) {
            AnalyticsHelper.instance = new AnalyticsHelper();
        }
        return AnalyticsHelper.instance;
    }

    static trackPageView(pageTitle, pagePath) {
        return AnalyticsHelper.getInstance().trackPageView(pageTitle, pagePath);
    }

    static trackSignUp(method) {
        return AnalyticsHelper.getInstance().trackSignUp(method);
    }

    static trackLogin(method) {
        return AnalyticsHelper.getInstance().trackLogin(method);
    }

    static trackViewItem(product) {
        return AnalyticsHelper.getInstance().trackViewItem(product);
    }

    static trackAddToCart(product, quantity) {
        return AnalyticsHelper.getInstance().trackAddToCart(product, quantity);
    }

    static trackRemoveFromCart(product, quantity) {
        return AnalyticsHelper.getInstance().trackRemoveFromCart(product, quantity);
    }

    static trackBeginCheckout(cartData) {
        return AnalyticsHelper.getInstance().trackBeginCheckout(cartData);
    }

    static trackPurchase(transactionData) {
        return AnalyticsHelper.getInstance().trackPurchase(transactionData);
    }

    static trackAddToWishlist(product) {
        return AnalyticsHelper.getInstance().trackAddToWishlist(product);
    }

    static trackRemoveFromWishlist(product) {
        return AnalyticsHelper.getInstance().trackRemoveFromWishlist(product);
    }

    static trackSearch(searchTerm, resultsCount) {
        return AnalyticsHelper.getInstance().trackSearch(searchTerm, resultsCount);
    }

    static trackFilterApply(filterType, filterValue) {
        return AnalyticsHelper.getInstance().trackFilterApply(filterType, filterValue);
    }

    static trackSortChange(sortType) {
        return AnalyticsHelper.getInstance().trackSortChange(sortType);
    }

    static trackViewToggleChange(viewType) {
        return AnalyticsHelper.getInstance().trackViewToggleChange(viewType);
    }

    static trackCourseEnrollment(courseData) {
        return AnalyticsHelper.getInstance().trackCourseEnrollment(courseData);
    }

    static trackContactFormSubmission(formType) {
        return AnalyticsHelper.getInstance().trackContactFormSubmission(formType);
    }

    static trackNewsletterSignup(source) {
        return AnalyticsHelper.getInstance().trackNewsletterSignup(source);
    }

    static trackCustomEvent(eventName, parameters) {
        return AnalyticsHelper.getInstance().trackCustomEvent(eventName, parameters);
    }

    static setUserProperties(properties) {
        return AnalyticsHelper.getInstance().setUserProperties(properties);
    }

    static setUserId(userId) {
        return AnalyticsHelper.getInstance().setUserId(userId);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsHelper;
} else {
    window.AnalyticsHelper = AnalyticsHelper;
}
