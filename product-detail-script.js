// Product Detail Page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const selectedColorName = document.querySelector('.selected-color-name');
    const mainProductImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const addToCartBtn = document.querySelector('.btn-add-to-cart');
    const wishlistBtn = document.querySelector('.btn-wishlist');
    const shareBtn = document.querySelector('.btn-share');
    const cartCountElement = document.querySelector('.cart-count');
    const notificationToast = document.getElementById('notification-toast');
    
    let cartCount = parseInt(cartCountElement.textContent) || 0;
    let currentQuantity = 1;

    // Color swatch functionality
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Remove active class from all swatches
            colorSwatches.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked swatch
            this.classList.add('active');
            
            // Update selected color name
            const colorName = this.getAttribute('title');
            selectedColorName.textContent = colorName;
            
            // Update main image
            const newImage = this.dataset.image;
            if (newImage) {
                mainProductImage.src = newImage;
                
                // Update first thumbnail to match
                const firstThumbnail = document.querySelector('.thumbnail');
                if (firstThumbnail) {
                    firstThumbnail.src = newImage.replace('w=800', 'w=200');
                }
            }
        });
    });

    // Thumbnail gallery functionality
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const newImageSrc = this.src.replace('w=200', 'w=800');
            mainProductImage.src = newImageSrc;
        });
    });

    // Tab functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });

    // Add to cart functionality
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productName = document.querySelector('.product-name').textContent;
            const selectedColor = document.querySelector('.color-swatch.active').getAttribute('title');
            const quantity = document.getElementById('quantity-input').value;
            
            // Show loading state
            this.classList.add('loading');
            this.textContent = 'ADDING...';
            
            setTimeout(() => {
                // Update cart count
                cartCount += parseInt(quantity);
                cartCountElement.textContent = cartCount;
                
                // Add bounce animation to cart
                cartCountElement.classList.add('cart-bounce');
                
                setTimeout(() => {
                    cartCountElement.classList.remove('cart-bounce');
                }, 600);
                
                // Reset button
                this.classList.remove('loading');
                this.textContent = 'ADD TO CART';
                
                // Show success notification
                showNotification(`${productName} (${selectedColor}) added to your cart!`, 'success');
            }, 1000);
        });
    }

    // Wishlist functionality
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const isAdded = this.textContent.includes('Added');
            
            if (isAdded) {
                this.innerHTML = '♡ Add to Wishlist';
                showNotification('Removed from wishlist');
            } else {
                this.innerHTML = '♥ Added to Wishlist';
                showNotification('Added to wishlist!');
            }
        });
    }

    // Share functionality
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: document.querySelector('.product-name').textContent,
                    text: document.querySelector('.product-description p').textContent,
                    url: window.location.href
                });
            } else {
                // Fallback: copy URL to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showNotification('Product link copied to clipboard!');
                });
            }
        });
    }

    // Footer newsletter subscription
    const footerNewsletterBtn = document.querySelector('.footer-newsletter button');
    if (footerNewsletterBtn) {
        footerNewsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const emailInput = document.querySelector('.footer-newsletter input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                showNotification('Thank you for subscribing to BLOM updates!');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }

    // Social media links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Opening social media page...');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-showcase, .product-tabs, .recommended-products').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    console.log('BLOM Cosmetics Product Detail page loaded successfully!');
    
});

// Quantity control functions
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity-input');
    const currentValue = parseInt(quantityInput.value);
    const maxValue = parseInt(quantityInput.getAttribute('max'));
    
    if (currentValue < maxValue) {
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity-input');
    const currentValue = parseInt(quantityInput.value);
    const minValue = parseInt(quantityInput.getAttribute('min'));
    
    if (currentValue > minValue) {
        quantityInput.value = currentValue - 1;
    }
}

// Image functions
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('main-product-image');
    const newImageSrc = thumbnail.src.replace('w=200', 'w=800');
    
    // Update main image
    mainImage.src = newImageSrc;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

function openImageZoom() {
    const zoomModal = document.getElementById('zoom-modal');
    const zoomImage = document.getElementById('zoom-image');
    const mainImage = document.getElementById('main-product-image');
    
    zoomImage.src = mainImage.src;
    zoomModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageZoom() {
    const zoomModal = document.getElementById('zoom-modal');
    zoomModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Add to cart function
function addToCart() {
    const addToCartBtn = document.querySelector('.btn-add-to-cart');
    if (addToCartBtn && !addToCartBtn.classList.contains('loading')) {
        addToCartBtn.click();
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Close zoom modal when clicking outside image
document.addEventListener('click', function(e) {
    const zoomModal = document.getElementById('zoom-modal');
    if (e.target === zoomModal) {
        closeImageZoom();
    }
});

// Keyboard navigation for zoom modal
document.addEventListener('keydown', function(e) {
    const zoomModal = document.getElementById('zoom-modal');
    if (zoomModal.classList.contains('active') && e.key === 'Escape') {
        closeImageZoom();
    }
});