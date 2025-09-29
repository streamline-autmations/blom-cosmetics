// Enhanced Product Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initImageGallery();
    initWishlist();
    initQuantityControls();
    initVariantSelector();
    initAccordions();
    initAddToCart();
    initStickyCart();
    initReviews();
    initWriteReviewModal();
    initMobileNavigation();
    initSignupPopup();
});

// Image Gallery
function initImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    const mainImage = document.getElementById('main-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
            const newImageSrc = thumbnail.dataset.image;
            mainImage.src = newImageSrc;
        });
    });

    // Image zoom functionality
    const mainImageContainer = document.querySelector('.main-image-container');
    const zoomModal = document.getElementById('zoom-modal');
    const zoomImage = document.getElementById('zoom-image');
    const zoomClose = document.querySelector('.zoom-close');

    if (mainImageContainer && zoomModal) {
        mainImageContainer.addEventListener('click', () => {
            zoomImage.src = mainImage.src;
            zoomModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        zoomClose.addEventListener('click', closeZoomModal);
        zoomModal.addEventListener('click', (e) => {
            if (e.target === zoomModal) closeZoomModal();
        });
    }
}

function closeZoomModal() {
    const zoomModal = document.getElementById('zoom-modal');
    zoomModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Wishlist functionality
function initWishlist() {
    const wishlistHearts = document.querySelectorAll('.wishlist-heart');
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    // Update heart states on page load
    wishlistHearts.forEach(heart => {
        const productId = 'acrylic-powder';
        if (wishlist.includes(productId)) {
            heart.classList.add('active');
        }
    });

    wishlistHearts.forEach(heart => {
        heart.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = 'acrylic-powder';
            const isInWishlist = wishlist.includes(productId);
            
            if (isInWishlist) {
                wishlist = wishlist.filter(id => id !== productId);
                heart.classList.remove('active');
                showToast('Removed from Wishlist');
            } else {
                wishlist.push(productId);
                heart.classList.add('active');
                showToast('Added to Wishlist');
            }
            
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        });
    });
}

// Quantity controls
function initQuantityControls() {
    const decreaseBtn = document.getElementById('qty-decrease');
    const increaseBtn = document.getElementById('qty-increase');
    const quantityInput = document.getElementById('quantity');
    const stickyDecreaseBtn = document.getElementById('sticky-qty-decrease');
    const stickyIncreaseBtn = document.getElementById('sticky-qty-increase');
    const stickyQuantityInput = document.getElementById('sticky-quantity');

    function updateQuantity(input, change) {
        const currentQty = parseInt(input.value);
        const newQty = Math.max(1, Math.min(10, currentQty + change));
        input.value = newQty;
        
        // Sync with sticky cart
        if (input === quantityInput && stickyQuantityInput) {
            stickyQuantityInput.value = newQty;
        } else if (input === stickyQuantityInput && quantityInput) {
            quantityInput.value = newQty;
        }
    }

    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => updateQuantity(quantityInput, -1));
    }
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => updateQuantity(quantityInput, 1));
    }
    if (stickyDecreaseBtn) {
        stickyDecreaseBtn.addEventListener('click', () => updateQuantity(stickyQuantityInput, -1));
    }
    if (stickyIncreaseBtn) {
        stickyIncreaseBtn.addEventListener('click', () => updateQuantity(stickyQuantityInput, 1));
    }
}

// Variant selector
function initVariantSelector() {
    const variantPills = document.querySelectorAll('.variant-pill');
    variantPills.forEach(pill => {
        pill.addEventListener('click', () => {
            variantPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });
}

// Accordion functionality
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            
            accordionHeaders.forEach(h => {
                h.setAttribute('aria-expanded', 'false');
                h.nextElementSibling.classList.remove('active');
                h.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
            });
            
            if (!isExpanded) {
                header.setAttribute('aria-expanded', 'true');
                content.classList.add('active');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// Add to cart functionality
function initAddToCart() {
    const addToCartBtns = document.querySelectorAll('#add-to-cart, #sticky-add-to-cart');
    const buyNowBtn = document.getElementById('buy-now');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            const variant = document.querySelector('.variant-pill.active').dataset.variant;
            
            // Add to cart logic
            addToCart({
                id: 'acrylic-powder',
                name: 'Professional Acrylic Powder',
                price: 320.00,
                quantity: quantity,
                variant: variant,
                image: 'public/acrylic-powder-01.webp'
            });
            
            showToast(`Added ${quantity} item(s) to cart`);
        });
    });

    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            const variant = document.querySelector('.variant-pill.active').dataset.variant;
            
            // Add to cart and redirect to checkout
            addToCart({
                id: 'acrylic-powder',
                name: 'Professional Acrylic Powder',
                price: 320.00,
                quantity: quantity,
                variant: variant,
                image: 'public/acrylic-powder-01.webp'
            });
            
            window.location.href = 'checkout.html';
        });
    }
}

function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('blom_cart') || '{"items": [], "total": 0}');
    
    // Check if item already exists
    const existingItem = cart.items.find(cartItem => 
        cartItem.id === item.id && cartItem.variant === item.variant
    );
    
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.items.push(item);
    }
    
    // Recalculate total
    cart.total = cart.items.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
    
    localStorage.setItem('blom_cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-count');
    if (cartBadge) {
        const cart = JSON.parse(localStorage.getItem('blom_cart') || '{"items": []}');
        const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
        cartBadge.textContent = itemCount;
        cartBadge.style.display = itemCount > 0 ? 'block' : 'none';
    }
}

// Sticky cart functionality
function initStickyCart() {
    const stickyCart = document.getElementById('sticky-cart');
    const buyBox = document.querySelector('.product-buy-box');
    
    if (stickyCart && buyBox) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    stickyCart.classList.add('visible');
                } else {
                    stickyCart.classList.remove('visible');
                }
            });
        }, { threshold: 0.1 });
        observer.observe(buyBox);
    }
}

// Reviews functionality
function initReviews() {
    const reviewsList = document.getElementById('reviews-list');
    const filterChips = document.querySelectorAll('.filter-chip');
    const sortSelect = document.getElementById('sort-reviews');
    
    // Mock reviews data
    const reviews = [
        {
            id: 1,
            rating: 5,
            name: 'Sarah M.',
            date: '2024-01-10',
            title: 'Amazing quality!',
            content: 'My clients love the finish and durability. This powder gives salon-quality results every time.',
            helpful: 8,
            verified: true
        },
        {
            id: 2,
            rating: 5,
            name: 'Jessica L.',
            date: '2024-01-08',
            title: 'Perfect for professionals',
            content: 'Easy to work with and lasts weeks. The consistency is perfect for sculpting.',
            helpful: 6,
            verified: true
        },
        {
            id: 3,
            rating: 4,
            name: 'Maria K.',
            date: '2024-01-05',
            title: 'Great product',
            content: 'Good quality powder, works well for extensions. Would recommend to other nail techs.',
            helpful: 4,
            verified: true
        },
        {
            id: 4,
            rating: 5,
            name: 'Amanda R.',
            date: '2024-01-03',
            title: 'Love it!',
            content: 'This is now my go-to acrylic powder. The finish is flawless and it\'s so easy to file.',
            helpful: 7,
            verified: true
        },
        {
            id: 5,
            rating: 5,
            name: 'Lisa T.',
            date: '2024-01-01',
            title: 'Excellent quality',
            content: 'Professional grade powder that delivers consistent results. My clients are always happy.',
            helpful: 5,
            verified: true
        }
    ];

    let filteredReviews = [...reviews];
    let currentFilter = 'all';
    let currentSort = 'newest';

    function renderReviews() {
        if (!reviewsList) return;
        
        reviewsList.innerHTML = filteredReviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div class="review-rating">
                        ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                    </div>
                    <div class="review-meta">
                        <span class="review-name">${review.name}</span>
                        <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                        ${review.verified ? '<span class="verified-badge">Verified Purchase</span>' : ''}
                    </div>
                </div>
                <div class="review-content">
                    <h4 class="review-title">${review.title}</h4>
                    <p class="review-text">${review.content}</p>
                </div>
                <div class="review-actions">
                    <button class="helpful-btn" onclick="toggleHelpful(${review.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                        Helpful (${review.helpful})
                    </button>
                </div>
            </div>
        `).join('');
    }

    function filterReviews(filter) {
        currentFilter = filter;
        if (filter === 'all') {
            filteredReviews = [...reviews];
        } else {
            filteredReviews = reviews.filter(review => review.rating === parseInt(filter));
        }
        sortReviews(currentSort);
    }

    function sortReviews(sort) {
        currentSort = sort;
        switch (sort) {
            case 'newest':
                filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                filteredReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'highest':
                filteredReviews.sort((a, b) => b.rating - a.rating);
                break;
            case 'lowest':
                filteredReviews.sort((a, b) => a.rating - b.rating);
                break;
            case 'helpful':
                filteredReviews.sort((a, b) => b.helpful - a.helpful);
                break;
        }
        renderReviews();
    }

    // Filter chips
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            filterReviews(chip.dataset.filter);
        });
    });

    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortReviews(e.target.value);
        });
    }

    // Initial render
    renderReviews();
}

// Write review modal
function initWriteReviewModal() {
    const writeReviewBtn = document.getElementById('write-review-btn');
    const modal = createWriteReviewModal();
    
    if (writeReviewBtn) {
        writeReviewBtn.addEventListener('click', () => {
            document.body.appendChild(modal);
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
}

function createWriteReviewModal() {
    const modal = document.createElement('div');
    modal.className = 'write-review-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Write a Review</h3>
                <button class="modal-close" onclick="closeWriteReviewModal()">×</button>
            </div>
            <form class="review-form" id="review-form">
                <div class="form-group">
                    <label>Rating *</label>
                    <div class="rating-input">
                        <input type="radio" name="rating" value="5" id="rating-5">
                        <label for="rating-5">★</label>
                        <input type="radio" name="rating" value="4" id="rating-4">
                        <label for="rating-4">★</label>
                        <input type="radio" name="rating" value="3" id="rating-3">
                        <label for="rating-3">★</label>
                        <input type="radio" name="rating" value="2" id="rating-2">
                        <label for="rating-2">★</label>
                        <input type="radio" name="rating" value="1" id="rating-1">
                        <label for="rating-1">★</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="review-title">Review Title *</label>
                    <input type="text" id="review-title" required>
                </div>
                <div class="form-group">
                    <label for="review-content">Your Review *</label>
                    <textarea id="review-content" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label for="reviewer-name">Your Name *</label>
                    <input type="text" id="reviewer-name" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="closeWriteReviewModal()">Cancel</button>
                    <button type="submit" class="btn-primary">Submit Review</button>
                </div>
            </form>
        </div>
    `;
    
    // Handle form submission
    modal.querySelector('#review-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const rating = formData.get('rating');
        const title = document.getElementById('review-title').value;
        const content = document.getElementById('review-content').value;
        const name = document.getElementById('reviewer-name').value;
        
        if (!rating || !title || !content || !name) {
            showToast('Please fill in all required fields');
            return;
        }
        
        // In a real implementation, this would send to an API
        console.log('Review submitted:', { rating, title, content, name });
        showToast('Thank you for your review!');
        closeWriteReviewModal();
    });
    
    return modal;
}

function closeWriteReviewModal() {
    const modal = document.querySelector('.write-review-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Mobile navigation
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileClose = document.querySelector('.mobile-nav-close');
    const accordionToggles = document.querySelectorAll('.mobile-accordion-toggle');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', openMobileNav);
    }
    
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileNav);
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileNav);
    }
    
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            accordionToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherToggle.nextElementSibling.style.maxHeight = '0';
                }
            });
            
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
        document.body.style.overflow = 'auto';
    }
}

// Signup popup
function initSignupPopup() {
    const announcementBanner = document.getElementById('announcement-banner');
    const signupForm = document.getElementById('signup-form');
    
    if (announcementBanner) {
        announcementBanner.addEventListener('click', openSignupPopup);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
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
        document.body.style.overflow = 'auto';
    }
}

function handleSignup(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        showToast('Please enter a valid email address');
        return;
    }
    
    console.log('Signup email:', email);
    showToast('Thank you for subscribing! Check your email for a confirmation link.');
    closeSignupPopup();
    e.target.reset();
}

// Global functions
function toggleHelpful(reviewId) {
    // In a real implementation, this would update the helpful count via API
    showToast('Thank you for your feedback!');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
