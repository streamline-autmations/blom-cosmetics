// Cart functionality for BLOM Cosmetics
// Namespaced under .cart-* to avoid conflicts

(function() {
    'use strict';
    
    // Cart state
    let cartData = [];
    let isDrawerOpen = false;
    let focusBeforeDrawer = null;
    
    // Storage keys
    const CART_KEY = 'cart:v1';
    const CHECKOUT_KEY = 'checkout:contact:v1';
    
    // Fallback recommended products
    const FALLBACK_PRODUCTS = [
        {
            id: 'cuticle-oil',
            title: 'Cuticle Oil',
            price: 85,
            image: 'public/cuticle-oil-01.webp',
            url: 'product-detail.html?product=cuticle-oil',
            category: 'Nail Essentials'
        },
        {
            id: 'nail-forms',
            title: 'Premium Nail Forms',
            price: 45,
            image: 'public/nail-forms-01.webp',
            url: 'product-detail.html?product=nail-forms',
            category: 'Nail Essentials'
        },
        {
            id: 'top-coat',
            title: 'Top Coat',
            price: 160,
            image: 'public/top-coat-01.webp',
            url: 'product-detail.html?product=top-coat',
            category: 'Top & Base Coats'
        },
        {
            id: 'vitamin-primer',
            title: 'Vitamin Primer',
            price: 140,
            image: 'public/vitamin-primer-01.webp',
            url: 'product-detail.html?product=vitamin-primer',
            category: 'Prep & Prime'
        }
    ];
    
    // Initialize cart on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        loadCartData();
        injectCartUI();
        bindEvents();
        updateCartDisplay();
        autoWireAddToCartButtons();
        
        console.log('Cart system initialized');
    });
    
    // Load cart data from localStorage
    function loadCartData() {
        try {
            const stored = localStorage.getItem(CART_KEY);
            cartData = stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.warn('Failed to load cart data:', e);
            cartData = [];
        }
    }
    
    // Save cart data to localStorage
    function saveCartData() {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cartData));
        } catch (e) {
            console.warn('Failed to save cart data:', e);
        }
    }
    
    // Inject cart UI elements
    function injectCartUI() {
        // Only inject if not already present
        if (document.getElementById('cart-fab')) return;
        
        // Floating cart widget
        const fabHTML = `
            <div id="cart-fab" class="cart-fab">
                <button class="cart-fab-btn" aria-label="View cart">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 3h2l.4 2m0 0L8 17h8l3-8H5.4z"></path>
                        <circle cx="9" cy="20" r="1"></circle>
                        <circle cx="20" cy="20" r="1"></circle>
                    </svg>
                    <span class="cart-badge" aria-live="polite">0</span>
                </button>
            </div>
        `;
        
        // Cart drawer
        const drawerHTML = `
            <div id="cart-overlay" class="cart-overlay" aria-hidden="true"></div>
            <div id="cart-drawer" class="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart" aria-hidden="true">
                <div class="cart-header">
                    <h2 class="cart-title">Your Cart</h2>
                    <button class="cart-close" aria-label="Close cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                <div class="cart-body">
                    <div class="cart-empty" style="display: none;">
                        <div class="cart-empty-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M3 3h2l.4 2m0 0L8 17h8l3-8H5.4z"></path>
                                <circle cx="9" cy="20" r="1"></circle>
                                <circle cx="20" cy="20" r="1"></circle>
                            </svg>
                        </div>
                        <h3>Your cart is empty</h3>
                        <p>Add some beautiful nail products to get started!</p>
                        <button class="cart-continue">Continue Shopping</button>
                    </div>
                    
                    <ul class="cart-items" data-cart-list></ul>
                    
                    <section class="cart-recos" data-cart-recos>
                        <h3>Recommended for you</h3>
                        <div class="cart-recos-grid"></div>
                    </section>
                </div>
                
                <div class="cart-footer">
                    <div class="cart-total-section">
                        <div class="cart-total-row">
                            <span class="cart-total-label">Subtotal</span>
                            <span class="cart-total-value" id="cart-subtotal">R 0.00</span>
                        </div>
                        <div class="cart-total-row">
                            <span class="cart-total-label">Shipping</span>
                            <span class="cart-total-value">Calculated at checkout</span>
                        </div>
                        <div class="cart-total-row">
                            <span class="cart-total-label">Total</span>
                            <span class="cart-total-value cart-total-final" id="cart-total">R 0.00</span>
                        </div>
                    </div>
                    <div class="cart-shipping-note">
                        <small>Free shipping on orders over R500</small>
                    </div>
                    <div class="cart-actions">
                        <a href="checkout.html" class="cart-checkout" id="cart-checkout-btn">Proceed to Checkout</a>
                        <button class="cart-continue-btn" onclick="Cart.close()">Continue Shopping</button>
                    </div>
                </div>
            </div>
        `;
        
        // Inject into body
        document.body.insertAdjacentHTML('beforeend', fabHTML + drawerHTML);
    }
    
    // Bind event listeners
    function bindEvents() {
        const fab = document.getElementById('cart-fab');
        const overlay = document.getElementById('cart-overlay');
        const drawer = document.getElementById('cart-drawer');
        const closeBtn = drawer?.querySelector('.cart-close');
        const continueBtn = drawer?.querySelector('.cart-continue');
        const continueBtnFooter = drawer?.querySelector('.cart-continue-btn');
        
        // Open cart drawer
        if (fab) {
            fab.addEventListener('click', openCart);
        }
        
        // Bind existing header cart button if present
        const headerCartBtn = document.querySelector('.cart-icon, .icon-btn.cart-icon');
        if (headerCartBtn) {
            headerCartBtn.addEventListener('click', openCart);
        }
        
        // Close cart drawer
        if (overlay) overlay.addEventListener('click', closeCart);
        if (closeBtn) closeBtn.addEventListener('click', closeCart);
        if (continueBtn) continueBtn.addEventListener('click', closeCart);
        if (continueBtnFooter) continueBtnFooter.addEventListener('click', closeCart);
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isDrawerOpen) {
                closeCart();
            }
        });
    }
    
    // Auto-wire add to cart buttons
    function autoWireAddToCartButtons() {
        // Wire data-add-to-cart buttons
        document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
            if (btn.dataset.cartWired) return; // Already wired
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const item = {
                    id: this.dataset.id || generateId(),
                    title: this.dataset.title || 'Product',
                    price: parseFloat(this.dataset.price) || 0,
                    image: this.dataset.image || 'public/placeholder.webp',
                    url: this.dataset.url || '#',
                    category: this.dataset.category || 'General',
                    qty: 1
                };
                
                addToCart(item);
            });
            
            btn.dataset.cartWired = 'true';
        });
        
        // Wire existing add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            if (btn.dataset.cartWired) return;
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const item = {
                    id: this.dataset.handle || generateId(),
                    title: this.dataset.title || 'Product',
                    price: parseFloat(this.dataset.price) || 0,
                    image: this.dataset.image || 'public/placeholder.webp',
                    url: '#',
                    category: 'General',
                    qty: 1
                };
                
                addToCart(item);
            });
            
            btn.dataset.cartWired = 'true';
        });

        // Wire Buy Now buttons
        document.querySelectorAll('.btn-buy-now, [data-buy-now]').forEach(btn => {
            if (btn.dataset.cartWired) return;
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const item = {
                    id: this.dataset.id || this.dataset.handle || generateId(),
                    title: this.dataset.title || 'Product',
                    price: parseFloat(this.dataset.price) || 0,
                    image: this.dataset.image || 'public/placeholder.webp',
                    url: this.dataset.url || '#',
                    category: this.dataset.category || 'General',
                    qty: 1
                };
                
                // Add to cart and redirect to checkout
                addToCart(item);
                setTimeout(() => {
                    window.location.href = 'checkout.html';
                }, 500);
            });
            
            btn.dataset.cartWired = 'true';
        });
    }
    
    // Generate unique ID
    function generateId() {
        return 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Add item to cart
    function addToCart(item) {
        const existingIndex = cartData.findIndex(cartItem => cartItem.id === item.id);
        
        if (existingIndex > -1) {
            cartData[existingIndex].qty += item.qty || 1;
        } else {
            cartData.push({...item, qty: item.qty || 1});
        }
        
        saveCartData();
        updateCartDisplay();
        showNotification(`${item.title} added to cart!`);
    }
    
    // Remove item from cart
    function removeFromCart(id) {
        cartData = cartData.filter(item => item.id !== id);
        saveCartData();
        updateCartDisplay();
    }
    
    // Set item quantity
    function setQuantity(id, qty) {
        const item = cartData.find(item => item.id === id);
        if (item) {
            if (qty <= 0) {
                removeFromCart(id);
            } else {
                item.qty = qty;
                saveCartData();
                updateCartDisplay();
            }
        }
    }
    
    // Update cart display
    function updateCartDisplay() {
        updateBadge();
        updateHeaderCartCount();
        renderCartItems();
        renderRecommendations();
        updateCartFooter();
    }
    
    // Update cart badge
    function updateBadge() {
        const badge = document.querySelector('.cart-badge');
        const totalItems = cartData.reduce((sum, item) => sum + item.qty, 0);
        
        if (badge) {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    // Update header cart count if present
    function updateHeaderCartCount() {
        const headerCount = document.querySelector('.cart-count');
        const totalItems = cartData.reduce((sum, item) => sum + item.qty, 0);
        
        if (headerCount) {
            headerCount.textContent = totalItems;
        }
    }
    
    // Render cart items
    function renderCartItems() {
        const cartList = document.querySelector('[data-cart-list]');
        const emptyState = document.querySelector('.cart-empty');
        
        if (!cartList) return;
        
        if (cartData.length === 0) {
            cartList.style.display = 'none';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }
        
        cartList.style.display = 'block';
        if (emptyState) emptyState.style.display = 'none';
        
        cartList.innerHTML = cartData.map(item => `
            <li class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}" onerror="this.src='public/placeholder.webp'">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">
                        <a href="${item.url}">${item.title}</a>
                    </h4>
                    <div class="cart-item-price">R ${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <div class="cart-qty-controls">
                            <button class="cart-qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                            <input type="number" class="cart-qty-input" value="${item.qty}" min="1" max="99" data-id="${item.id}" aria-label="Quantity">
                            <button class="cart-qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
                        </div>
                        <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remove ${item.title}">Remove</button>
                    </div>
                </div>
            </li>
        `).join('');
        
        // Bind item controls
        bindItemControls();
    }
    
    // Bind item control events
    function bindItemControls() {
        const cartList = document.querySelector('[data-cart-list]');
        if (!cartList) return;
        
        // Quantity buttons
        cartList.querySelectorAll('.cart-qty-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                const action = this.dataset.action;
                const item = cartData.find(item => item.id === id);
                
                if (item) {
                    if (action === 'increase') {
                        setQuantity(id, item.qty + 1);
                    } else if (action === 'decrease') {
                        setQuantity(id, Math.max(0, item.qty - 1));
                    }
                }
            });
        });
        
        // Quantity inputs
        cartList.querySelectorAll('.cart-qty-input').forEach(input => {
            input.addEventListener('change', function() {
                const id = this.dataset.id;
                const qty = parseInt(this.value) || 1;
                setQuantity(id, qty);
            });
        });
        
        // Remove buttons
        cartList.querySelectorAll('.cart-remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                removeFromCart(id);
            });
        });
    }
    
    // Render recommendations
    function renderRecommendations() {
        const recosSection = document.querySelector('[data-cart-recos]');
        if (!recosSection) return;
        
        const recosGrid = recosSection.querySelector('.cart-recos-grid');
        if (!recosGrid) return;
        
        // Get recommendations based on cart categories or use fallback
        const recommendations = getRecommendations();
        
        if (recommendations.length === 0) {
            recosSection.style.display = 'none';
            return;
        }
        
        recosSection.style.display = 'block';
        recosGrid.innerHTML = recommendations.map(product => `
            <div class="cart-reco-item">
                <div class="cart-reco-image">
                    <img src="${product.image}" alt="${product.title}" onerror="this.src='public/placeholder.webp'">
                </div>
                <div class="cart-reco-details">
                    <h4 class="cart-reco-title">${product.title}</h4>
                    <div class="cart-reco-price">R ${product.price.toFixed(2)}</div>
                    <button class="cart-reco-add" 
                            data-add-to-cart
                            data-id="${product.id}"
                            data-title="${product.title}"
                            data-price="${product.price}"
                            data-image="${product.image}"
                            data-url="${product.url}"
                            data-category="${product.category}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
        
        // Wire recommendation buttons
        recosGrid.querySelectorAll('[data-add-to-cart]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const item = {
                    id: this.dataset.id,
                    title: this.dataset.title,
                    price: parseFloat(this.dataset.price),
                    image: this.dataset.image,
                    url: this.dataset.url,
                    category: this.dataset.category,
                    qty: 1
                };
                
                addToCart(item);
            });
        });
    }
    
    // Get product recommendations
    function getRecommendations() {
        // Use fallback products for now
        // Filter out items already in cart
        const cartIds = cartData.map(item => item.id);
        return FALLBACK_PRODUCTS.filter(product => !cartIds.includes(product.id)).slice(0, 4);
    }
    
    // Update cart footer
    function updateCartFooter() {
        const subtotalElement = document.getElementById('cart-subtotal');
        const totalElement = document.getElementById('cart-total');
        const checkoutBtn = document.getElementById('cart-checkout-btn');
        
        const subtotal = cartData.reduce((sum, item) => sum + (item.price * item.qty), 0);
        
        if (subtotalElement) {
            subtotalElement.textContent = `R ${subtotal.toFixed(2)}`;
        }
        
        if (totalElement) {
            totalElement.textContent = `R ${subtotal.toFixed(2)}`;
        }
        
        if (checkoutBtn) {
            checkoutBtn.style.display = cartData.length > 0 ? 'block' : 'none';
            checkoutBtn.disabled = cartData.length === 0;
        }
    }
    
    // Open cart drawer
    function openCart() {
        const overlay = document.getElementById('cart-overlay');
        const drawer = document.getElementById('cart-drawer');
        
        if (!overlay || !drawer) return;
        
        focusBeforeDrawer = document.activeElement;
        isDrawerOpen = true;
        
        overlay.style.display = 'block';
        drawer.style.display = 'block';
        overlay.setAttribute('aria-hidden', 'false');
        drawer.setAttribute('aria-hidden', 'false');
        
        // Animate in
        requestAnimationFrame(() => {
            overlay.classList.add('cart-overlay-open');
            drawer.classList.add('cart-drawer-open');
        });
        
        // Focus first focusable element
        const firstFocusable = drawer.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
        
        // Trap focus
        trapFocus(drawer);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        updateCartDisplay();
    }
    
    // Close cart drawer
    function closeCart() {
        const overlay = document.getElementById('cart-overlay');
        const drawer = document.getElementById('cart-drawer');
        
        if (!overlay || !drawer) return;
        
        isDrawerOpen = false;
        
        overlay.classList.remove('cart-overlay-open');
        drawer.classList.remove('cart-drawer-open');
        
        setTimeout(() => {
            overlay.style.display = 'none';
            drawer.style.display = 'none';
            overlay.setAttribute('aria-hidden', 'true');
            drawer.setAttribute('aria-hidden', 'true');
        }, 300);
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
        
        // Restore focus
        if (focusBeforeDrawer) {
            focusBeforeDrawer.focus();
            focusBeforeDrawer = null;
        }
    }
    
    // Focus trap utility
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        function handleTabKey(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        }
        
        element.addEventListener('keydown', handleTabKey);
    }
    
    // Show notification
    function showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.cart-notification');
        if (existing) existing.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show and auto-hide
        setTimeout(() => notification.classList.add('cart-notification-show'), 100);
        setTimeout(() => {
            notification.classList.remove('cart-notification-show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Format currency
    function formatZAR(amount) {
        return `R ${amount.toFixed(2)}`;
    }
    
    // Public API
    window.Cart = {
        add: addToCart,
        remove: removeFromCart,
        setQty: setQuantity,
        open: openCart,
        close: closeCart,
        get: () => [...cartData],
        getTotal: () => cartData.reduce((sum, item) => sum + (item.price * item.qty), 0),
        getCount: () => cartData.reduce((sum, item) => sum + item.qty, 0)
    };
    
})();