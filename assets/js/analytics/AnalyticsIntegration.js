// Analytics Integration - Automatic event tracking
class AnalyticsIntegration {
    constructor() {
        this.analytics = AnalyticsHelper.getInstance();
        this.init();
    }

    init() {
        this.trackPageViews();
        this.trackCartEvents();
        this.trackWishlistEvents();
        this.trackUserEvents();
        this.trackFormEvents();
        this.trackNavigationEvents();
        this.trackProductEvents();
        this.trackCourseEvents();
    }

    // Track page views automatically
    trackPageViews() {
        // Track initial page view
        this.trackCurrentPageView();

        // Track navigation changes (for SPA-like behavior)
        window.addEventListener('popstate', () => {
            this.trackCurrentPageView();
        });

        // Track link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && !link.href.includes('javascript:')) {
                // Small delay to allow navigation
                setTimeout(() => {
                    if (window.location.href !== link.href) {
                        this.trackCurrentPageView();
                    }
                }, 100);
            }
        });
    }

    trackCurrentPageView() {
        const pageTitle = document.title;
        const pagePath = window.location.pathname + window.location.search;
        this.analytics.trackPageView(pageTitle, pagePath);
    }

    // Track cart events
    trackCartEvents() {
        // Listen for cart updates
        window.addEventListener('cartUpdated', (e) => {
            const { cart, summary } = e.detail;
            
            // Track cart item count changes
            this.analytics.trackCustomEvent('cart_updated', {
                item_count: summary.itemCount,
                cart_value: summary.total,
                currency: 'ZAR'
            });
        });

        // Track add to cart buttons
        document.addEventListener('click', (e) => {
            const addToCartBtn = e.target.closest('.add-to-cart-btn, [data-action="add-to-cart"]');
            if (addToCartBtn) {
                const productData = this.extractProductData(addToCartBtn);
                if (productData) {
                    this.analytics.trackAddToCart(productData);
                }
            }
        });

        // Track remove from cart buttons
        document.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.remove-from-cart-btn, [data-action="remove-from-cart"]');
            if (removeBtn) {
                const productData = this.extractProductData(removeBtn);
                if (productData) {
                    this.analytics.trackRemoveFromCart(productData);
                }
            }
        });

        // Track checkout initiation
        document.addEventListener('click', (e) => {
            const checkoutBtn = e.target.closest('.checkout-btn, [data-action="checkout"]');
            if (checkoutBtn) {
                if (typeof CartStore !== 'undefined') {
                    const cartData = CartStore.getCheckoutData();
                    this.analytics.trackBeginCheckout(cartData);
                }
            }
        });
    }

    // Track wishlist events
    trackWishlistEvents() {
        // Listen for wishlist updates
        window.addEventListener('wishlistUpdated', (e) => {
            const { wishlist, count } = e.detail;
            
            this.analytics.trackCustomEvent('wishlist_updated', {
                wishlist_count: count
            });
        });

        // Track wishlist heart clicks
        document.addEventListener('click', (e) => {
            const wishlistHeart = e.target.closest('.wishlist-heart, [data-action="toggle-wishlist"]');
            if (wishlistHeart) {
                const productData = this.extractProductData(wishlistHeart);
                if (productData) {
                    const isInWishlist = wishlistHeart.classList.contains('active');
                    if (isInWishlist) {
                        this.analytics.trackRemoveFromWishlist(productData);
                    } else {
                        this.analytics.trackAddToWishlist(productData);
                    }
                }
            }
        });
    }

    // Track user authentication events
    trackUserEvents() {
        // Listen for user updates
        window.addEventListener('userUpdated', (e) => {
            const { user, session, isAuthenticated } = e.detail;
            
            if (isAuthenticated && user) {
                this.analytics.setUserId(user.id);
                this.analytics.setUserProperties({
                    user_type: 'registered',
                    signup_date: user.created_at
                });
            }
        });

        // Track login form submissions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.classList.contains('login-form') || form.id === 'login-form') {
                this.analytics.trackLogin('email');
            }
        });

        // Track registration form submissions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.classList.contains('register-form') || form.id === 'register-form') {
                this.analytics.trackSignUp('email');
            }
        });
    }

    // Track form events
    trackFormEvents() {
        // Track contact form submissions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.classList.contains('contact-form') || form.id === 'contact-form') {
                this.analytics.trackContactFormSubmission('contact');
            }
        });

        // Track newsletter signups
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.classList.contains('newsletter-form') || form.id === 'newsletter-form') {
                this.analytics.trackNewsletterSignup('footer');
            }
        });

        // Track signup popup submissions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.classList.contains('signup-form') || form.id === 'signup-form') {
                this.analytics.trackNewsletterSignup('popup');
            }
        });
    }

    // Track navigation events
    trackNavigationEvents() {
        // Track mega menu interactions
        document.addEventListener('click', (e) => {
            const megaMenuLink = e.target.closest('.mega-menu-link');
            if (megaMenuLink) {
                this.analytics.trackCustomEvent('mega_menu_click', {
                    link_text: megaMenuLink.textContent.trim(),
                    link_url: megaMenuLink.href
                });
            }
        });

        // Track mobile menu interactions
        document.addEventListener('click', (e) => {
            const mobileNavLink = e.target.closest('.mobile-nav-link');
            if (mobileNavLink) {
                this.analytics.trackCustomEvent('mobile_nav_click', {
                    link_text: mobileNavLink.textContent.trim(),
                    link_url: mobileNavLink.href
                });
            }
        });
    }

    // Track product events
    trackProductEvents() {
        // Track product card clicks
        document.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (productCard && !e.target.closest('.wishlist-heart, .add-to-cart-btn')) {
                const productData = this.extractProductData(productCard);
                if (productData) {
                    this.analytics.trackViewItem(productData);
                }
            }
        });

        // Track product image clicks
        document.addEventListener('click', (e) => {
            const productImage = e.target.closest('.product-image img');
            if (productImage) {
                const productCard = productImage.closest('.product-card');
                if (productCard) {
                    const productData = this.extractProductData(productCard);
                    if (productData) {
                        this.analytics.trackViewItem(productData);
                    }
                }
            }
        });
    }

    // Track course events
    trackCourseEvents() {
        // Track course enrollment
        document.addEventListener('click', (e) => {
            const enrollBtn = e.target.closest('.enroll-btn, [data-action="enroll-course"]');
            if (enrollBtn) {
                const courseData = this.extractCourseData(enrollBtn);
                if (courseData) {
                    this.analytics.trackCourseEnrollment(courseData);
                }
            }
        });

        // Track course card clicks
        document.addEventListener('click', (e) => {
            const courseCard = e.target.closest('.course-card');
            if (courseCard && !e.target.closest('.enroll-btn')) {
                const courseData = this.extractCourseData(courseCard);
                if (courseData) {
                    this.analytics.trackCustomEvent('course_view', {
                        course_id: courseData.id,
                        course_name: courseData.name
                    });
                }
            }
        });
    }

    // Extract product data from DOM elements
    extractProductData(element) {
        const productCard = element.closest('.product-card');
        if (!productCard) return null;

        const nameElement = productCard.querySelector('.product-name, .product-title');
        const priceElement = productCard.querySelector('.product-price, .current-price');
        const imageElement = productCard.querySelector('.product-image img');

        if (!nameElement || !priceElement) return null;

        const name = nameElement.textContent.trim();
        const price = parseFloat(priceElement.textContent.replace(/[^\d.]/g, ''));
        const image = imageElement ? imageElement.src : '';
        const id = productCard.dataset.productId || name.toLowerCase().replace(/\s+/g, '-');

        return {
            id,
            name,
            price,
            image,
            category: productCard.dataset.category || 'general'
        };
    }

    // Extract course data from DOM elements
    extractCourseData(element) {
        const courseCard = element.closest('.course-card');
        if (!courseCard) return null;

        const nameElement = courseCard.querySelector('.course-title, .course-name');
        const priceElement = courseCard.querySelector('.course-price, .price');

        if (!nameElement) return null;

        const name = nameElement.textContent.trim();
        const price = priceElement ? parseFloat(priceElement.textContent.replace(/[^\d.]/g, '')) : 0;
        const id = courseCard.dataset.courseId || name.toLowerCase().replace(/\s+/g, '-');

        return {
            id,
            name,
            price
        };
    }

    // Track search events
    trackSearchEvents() {
        // Track search form submissions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.classList.contains('search-form') || form.querySelector('input[type="search"]')) {
                const searchInput = form.querySelector('input[type="search"], input[name="search"]');
                if (searchInput) {
                    const searchTerm = searchInput.value.trim();
                    if (searchTerm) {
                        this.analytics.trackSearch(searchTerm);
                    }
                }
            }
        });

        // Track search input changes (debounced)
        let searchTimeout;
        document.addEventListener('input', (e) => {
            const searchInput = e.target;
            if (searchInput.type === 'search' || searchInput.name === 'search') {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    const searchTerm = searchInput.value.trim();
                    if (searchTerm.length > 2) {
                        this.analytics.trackSearch(searchTerm);
                    }
                }, 1000);
            }
        });
    }

    // Track filter and sort events
    trackFilterEvents() {
        // Track filter changes
        document.addEventListener('change', (e) => {
            const filterSelect = e.target;
            if (filterSelect.classList.contains('filter-select') || filterSelect.dataset.filter) {
                this.analytics.trackFilterApply(
                    filterSelect.dataset.filter || 'unknown',
                    filterSelect.value
                );
            }
        });

        // Track sort changes
        document.addEventListener('change', (e) => {
            const sortSelect = e.target;
            if (sortSelect.classList.contains('sort-select') || sortSelect.id === 'sort-select') {
                this.analytics.trackSortChange(sortSelect.value);
            }
        });

        // Track view toggle changes
        document.addEventListener('click', (e) => {
            const viewToggle = e.target.closest('.view-toggle-btn, .view-btn');
            if (viewToggle) {
                const viewType = viewToggle.dataset.view || 'unknown';
                this.analytics.trackViewToggleChange(viewType);
            }
        });
    }
}

// Initialize analytics integration when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AnalyticsIntegration();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsIntegration;
} else {
    window.AnalyticsIntegration = AnalyticsIntegration;
}
