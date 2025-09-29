// WishlistHeartButton Component
class WishlistHeartButton {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            productId: null,
            productName: '',
            productPrice: 0,
            productImage: '',
            onAdd: null,
            onRemove: null,
            ...options
        };
        this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        this.init();
    }

    init() {
        if (!this.container || !this.options.productId) return;
        this.render();
        this.bindEvents();
        this.updateState();
    }

    render() {
        this.container.innerHTML = `
            <button class="wishlist-heart" 
                    data-product-id="${this.options.productId}"
                    aria-label="Add to wishlist">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        `;
    }

    bindEvents() {
        const heartButton = this.container.querySelector('.wishlist-heart');
        if (!heartButton) return;

        heartButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleWishlist();
        });
    }

    toggleWishlist() {
        const isInWishlist = this.isInWishlist();
        
        if (isInWishlist) {
            this.removeFromWishlist();
        } else {
            this.addToWishlist();
        }
    }

    addToWishlist() {
        const wishlistItem = {
            id: this.options.productId,
            name: this.options.productName,
            price: this.options.productPrice,
            image: this.options.productImage,
            addedAt: new Date().toISOString()
        };

        this.wishlist.push(wishlistItem);
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        
        this.updateState();
        this.showToast('Added to Wishlist');
        
        if (this.options.onAdd) {
            this.options.onAdd(wishlistItem);
        }
    }

    removeFromWishlist() {
        this.wishlist = this.wishlist.filter(item => item.id !== this.options.productId);
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        
        this.updateState();
        this.showToast('Removed from Wishlist');
        
        if (this.options.onRemove) {
            this.options.onRemove(this.options.productId);
        }
    }

    isInWishlist() {
        return this.wishlist.some(item => item.id === this.options.productId);
    }

    updateState() {
        const heartButton = this.container.querySelector('.wishlist-heart');
        if (!heartButton) return;

        const isInWishlist = this.isInWishlist();
        
        if (isInWishlist) {
            heartButton.classList.add('active');
            heartButton.setAttribute('aria-label', 'Remove from wishlist');
        } else {
            heartButton.classList.remove('active');
            heartButton.setAttribute('aria-label', 'Add to wishlist');
        }
    }

    showToast(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'wishlist-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // Static method to get wishlist count
    static getWishlistCount() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        return wishlist.length;
    }

    // Static method to get wishlist items
    static getWishlistItems() {
        return JSON.parse(localStorage.getItem('wishlist') || '[]');
    }

    // Static method to clear wishlist
    static clearWishlist() {
        localStorage.removeItem('wishlist');
    }

    // Static method to remove item from wishlist
    static removeFromWishlist(productId) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const updatedWishlist = wishlist.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        return updatedWishlist;
    }
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .wishlist-heart {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .wishlist-heart:hover {
        background: rgba(255, 116, 164, 0.1);
        transform: scale(1.1);
    }
    
    .wishlist-heart.active {
        color: #FF74A4;
    }
    
    .wishlist-heart.active svg {
        fill: currentColor;
    }
`;
document.head.appendChild(style);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WishlistHeartButton;
} else {
    window.WishlistHeartButton = WishlistHeartButton;
}
