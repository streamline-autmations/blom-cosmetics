// Order Confirmation Page Script

document.addEventListener('DOMContentLoaded', function() {
    // Initialize order confirmation
    initOrderConfirmation();
    
    // Initialize cart functionality
    initCart();
    
    // Initialize mobile navigation
    initMobileNavigation();
    
    // Initialize signup popup
    initSignupPopup();
});

function initOrderConfirmation() {
    // Get order data from URL parameters or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id') || 'BLOM-2024-001';
    const orderData = getOrderData(orderId);
    
    // Populate order details
    populateOrderDetails(orderData);
    
    // Populate order items
    populateOrderItems(orderData.items || []);
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
}

function getOrderData(orderId) {
    // In a real implementation, this would fetch from an API
    // For now, return mock data
    return {
        id: orderId,
        date: new Date().toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        status: 'paid',
        total: 1250.00,
        items: [
            {
                id: 'blom-acrylic-powder-001',
                name: 'BLOM Acrylic Powder - Natural Pink',
                variant: 'Natural Pink',
                quantity: 2,
                price: 450.00,
                image: 'public/products/acrylic-powder-natural-pink.jpg'
            },
            {
                id: 'blom-liquid-monomer-001',
                name: 'BLOM Liquid Monomer',
                variant: 'Standard',
                quantity: 1,
                price: 350.00,
                image: 'public/products/liquid-monomer.jpg'
            }
        ]
    };
}

function populateOrderDetails(orderData) {
    // Update order number
    const orderNumberElement = document.getElementById('order-number');
    if (orderNumberElement) {
        orderNumberElement.textContent = orderData.id;
    }
    
    // Update order date
    const orderDateElement = document.getElementById('order-date');
    if (orderDateElement) {
        orderDateElement.textContent = orderData.date;
    }
    
    // Update order total
    const orderTotalElement = document.getElementById('order-total');
    if (orderTotalElement) {
        orderTotalElement.textContent = `R ${orderData.total.toFixed(2)}`;
    }
}

function populateOrderItems(items) {
    const orderItemsList = document.getElementById('order-items-list');
    if (!orderItemsList) return;
    
    if (items.length === 0) {
        orderItemsList.innerHTML = '<p class="text-gray-500">No items found.</p>';
        return;
    }
    
    orderItemsList.innerHTML = items.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="order-item-image" onerror="this.src='public/products/placeholder.jpg'">
            <div class="order-item-details">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-variant">${item.variant}</div>
                <div class="order-item-quantity">Quantity: ${item.quantity}</div>
            </div>
            <div class="order-item-price">R ${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
}

// Cart functionality
function initCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartClose = document.querySelector('.cart-close');
    const cartBadge = document.getElementById('cart-badge');
    
    // Open cart
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }
    
    // Close cart
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
    
    // Update cart badge
    updateCartBadge();
    
    // Load cart from localStorage
    loadCartFromStorage();
}

function openCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    
    if (cartOverlay && cartDrawer) {
        cartOverlay.style.display = 'block';
        cartDrawer.style.display = 'flex';
        cartOverlay.setAttribute('aria-hidden', 'false');
        cartDrawer.setAttribute('aria-hidden', 'false');
        
        // Prevent body scroll
        document.body.classList.add('cart-open');
        
        // Focus management
        cartDrawer.focus();
    }
}

function closeCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    
    if (cartOverlay && cartDrawer) {
        cartOverlay.style.display = 'none';
        cartDrawer.style.display = 'none';
        cartOverlay.setAttribute('aria-hidden', 'true');
        cartDrawer.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.classList.remove('cart-open');
    }
}

function updateCartBadge() {
    const cartBadge = document.getElementById('cart-badge');
    if (!cartBadge) return;
    
    const cart = getCart();
    const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    
    cartBadge.textContent = itemCount;
    cartBadge.style.display = itemCount > 0 ? 'block' : 'none';
}

function getCart() {
    const cartData = localStorage.getItem('blom_cart');
    return cartData ? JSON.parse(cartData) : { items: [], total: 0 };
}

function loadCartFromStorage() {
    const cart = getCart();
    const cartBody = document.querySelector('.cart-body');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartCheckout = document.querySelector('.cart-checkout');
    const cartSubtotal = document.querySelector('.cart-subtotal-amount');
    const cartTotalFinal = document.querySelector('.cart-total-final');
    
    if (!cartBody) return;
    
    if (cart.items.length === 0) {
        cartEmpty.style.display = 'block';
        cartCheckout.style.display = 'none';
        cartSubtotal.textContent = 'R 0.00';
        cartTotalFinal.textContent = 'R 0.00';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartCheckout.style.display = 'block';
    
    // Display cart items
    cartBody.innerHTML = `
        <div class="cart-items">
            ${cart.items.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='public/products/placeholder.jpg'">
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-variant">${item.variant}</p>
                        <div class="cart-item-price">R ${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="Remove item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                        </svg>
                    </button>
                </div>
            `).join('')}
        </div>
    `;
    
    cartSubtotal.textContent = `R ${cart.total.toFixed(2)}`;
    cartTotalFinal.textContent = `R ${cart.total.toFixed(2)}`;
}

function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(itemId);
        return;
    }
    
    const cart = getCart();
    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        cart.items[itemIndex].quantity = newQuantity;
        cart.items[itemIndex].total = cart.items[itemIndex].price * newQuantity;
        
        // Recalculate total
        cart.total = cart.items.reduce((total, item) => total + item.total, 0);
        
        // Save to localStorage
        localStorage.setItem('blom_cart', JSON.stringify(cart));
        
        // Update UI
        loadCartFromStorage();
        updateCartBadge();
    }
}

function removeFromCart(itemId) {
    const cart = getCart();
    cart.items = cart.items.filter(item => item.id !== itemId);
    
    // Recalculate total
    cart.total = cart.items.reduce((total, item) => total + item.total, 0);
    
    // Save to localStorage
    localStorage.setItem('blom_cart', JSON.stringify(cart));
    
    // Update UI
    loadCartFromStorage();
    updateCartBadge();
}

// Mobile navigation
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileClose = document.querySelector('.mobile-nav-close');
    const accordionToggles = document.querySelectorAll('.mobile-accordion-toggle');
    
    // Toggle mobile menu
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            openMobileNav();
        });
    }
    
    // Close mobile menu
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileNav);
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileNav);
    }
    
    // Handle accordion toggles
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other accordions
            accordionToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherToggle.nextElementSibling.style.maxHeight = '0';
                }
            });
            
            // Toggle current accordion
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0';
            } else {
                this.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

function openMobileNav() {
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    
    if (mobileOverlay && mobileDrawer) {
        mobileOverlay.style.display = 'block';
        mobileDrawer.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileNav() {
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    
    if (mobileOverlay && mobileDrawer) {
        mobileOverlay.style.display = 'none';
        mobileDrawer.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Signup popup
function initSignupPopup() {
    const announcementBanner = document.getElementById('announcement-banner');
    const signupForm = document.getElementById('signup-popup-form');
    
    // Make announcement banner clickable
    if (announcementBanner) {
        announcementBanner.addEventListener('click', function() {
            openSignupPopup();
        });
    }
    
    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup();
        });
    }
}

function openSignupPopup() {
    const popup = document.getElementById('signup-popup');
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeSignupPopup() {
    const popup = document.getElementById('signup-popup');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function handleSignup() {
    const emailInput = document.querySelector('.signup-popup-input');
    const email = emailInput.value.trim();
    
    if (!email) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // In a real implementation, this would send to an API
    console.log('Signup email:', email);
    
    // Show success message
    alert('Thank you for subscribing! Check your email for a confirmation link.');
    
    // Close popup
    closeSignupPopup();
    
    // Clear form
    emailInput.value = '';
}

// Newsletter form
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value.trim();
            
            if (!email) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real implementation, this would send to an API
            console.log('Newsletter signup:', email);
            alert('Thank you for subscribing to our newsletter!');
            
            // Clear form
            this.querySelector('.newsletter-input').value = '';
        });
    }
});
