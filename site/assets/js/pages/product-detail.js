// Product Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery
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

    // Wishlist functionality
    const wishlistHearts = document.querySelectorAll('.wishlist-heart');
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

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

    // Quantity controls
    const decreaseBtn = document.getElementById('qty-decrease');
    const increaseBtn = document.getElementById('qty-increase');
    const quantityInput = document.getElementById('quantity');

    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            const currentQty = parseInt(quantityInput.value);
            quantityInput.value = Math.max(1, currentQty - 1);
        });
    }

    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            const currentQty = parseInt(quantityInput.value);
            quantityInput.value = Math.min(10, currentQty + 1);
        });
    }

    // Variant selector
    const variantPills = document.querySelectorAll('.variant-pill');
    variantPills.forEach(pill => {
        pill.addEventListener('click', () => {
            variantPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            const content = header.nextElementSibling;
            
            accordionHeaders.forEach(h => {
                h.setAttribute('aria-expanded', 'false');
                h.nextElementSibling.classList.remove('active');
            });
            
            if (!isExpanded) {
                header.setAttribute('aria-expanded', 'true');
                content.classList.add('active');
            }
        });
    });

    // Add to cart
    const addToCartBtns = document.querySelectorAll('#add-to-cart, #sticky-add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            showToast(`Added ${quantity} item(s) to cart`);
        });
    });

    // Sticky cart
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
});

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
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
