// State Management Index - Export all stores

// Import all stores
import CartStore from './CartStore.js';
import WishlistStore from './WishlistStore.js';
import UserStore from './UserStore.js';

// Export all stores
export {
    CartStore,
    WishlistStore,
    UserStore
};

// Also make them available globally for non-module usage
if (typeof window !== 'undefined') {
    window.BLOMStores = {
        CartStore,
        WishlistStore,
        UserStore
    };
}

// Initialize stores
if (typeof window !== 'undefined') {
    // Initialize cart store
    const cartStore = CartStore.getInstance();
    
    // Initialize wishlist store
    const wishlistStore = WishlistStore.getInstance();
    
    // Initialize user store
    const userStore = UserStore.getInstance();
    
    // Update cart badge on page load
    function updateCartBadge() {
        const cartBadge = document.querySelector('.cart-count');
        if (cartBadge) {
            const summary = cartStore.getCartSummary();
            cartBadge.textContent = summary.itemCount;
            cartBadge.style.display = summary.itemCount > 0 ? 'block' : 'none';
        }
    }
    
    // Update wishlist badge on page load
    function updateWishlistBadge() {
        const wishlistBadge = document.querySelector('.wishlist-count');
        if (wishlistBadge) {
            const count = wishlistStore.getCount();
            wishlistBadge.textContent = count;
            wishlistBadge.style.display = count > 0 ? 'block' : 'none';
        }
    }
    
    // Subscribe to cart changes
    cartStore.subscribe((cart) => {
        updateCartBadge();
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('cartUpdated', { 
            detail: { cart, summary: cartStore.getCartSummary() }
        }));
    });
    
    // Subscribe to wishlist changes
    wishlistStore.subscribe((wishlist) => {
        updateWishlistBadge();
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
            detail: { wishlist, count: wishlistStore.getCount() }
        }));
    });
    
    // Subscribe to user changes
    userStore.subscribe(({ user, session, isAuthenticated }) => {
        // Update UI based on authentication state
        const loginBtn = document.querySelector('.login-btn');
        const logoutBtn = document.querySelector('.logout-btn');
        const profileBtn = document.querySelector('.profile-btn');
        
        if (isAuthenticated) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'block';
            if (profileBtn) profileBtn.style.display = 'block';
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (profileBtn) profileBtn.style.display = 'none';
        }
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('userUpdated', { 
            detail: { user, session, isAuthenticated }
        }));
    });
    
    // Initialize badges on page load
    document.addEventListener('DOMContentLoaded', () => {
        updateCartBadge();
        updateWishlistBadge();
    });
}
