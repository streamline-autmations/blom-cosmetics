// Wishlist Store - State Management for Wishlist
class WishlistStore {
    constructor() {
        this.wishlist = this.loadWishlist();
        this.listeners = [];
        this.init();
    }

    init() {
        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'blom_wishlist') {
                this.wishlist = this.loadWishlist();
                this.notifyListeners();
            }
        });
    }

    loadWishlist() {
        try {
            const wishlistData = localStorage.getItem('blom_wishlist');
            return wishlistData ? JSON.parse(wishlistData) : [];
        } catch (error) {
            console.error('Error loading wishlist:', error);
            return [];
        }
    }

    saveWishlist() {
        try {
            localStorage.setItem('blom_wishlist', JSON.stringify(this.wishlist));
            this.notifyListeners();
        } catch (error) {
            console.error('Error saving wishlist:', error);
        }
    }

    // Add item to wishlist
    addItem(product) {
        const existingItem = this.wishlist.find(item => item.id === product.id);
        
        if (!existingItem) {
            this.wishlist.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                variant: product.variant || 'default',
                addedAt: new Date().toISOString()
            });
            this.saveWishlist();
        }
        return this.wishlist;
    }

    // Remove item from wishlist
    removeItem(productId) {
        this.wishlist = this.wishlist.filter(item => item.id !== productId);
        this.saveWishlist();
        return this.wishlist;
    }

    // Toggle item in wishlist
    toggleItem(product) {
        if (this.isInWishlist(product.id)) {
            this.removeItem(product.id);
            return false; // Removed
        } else {
            this.addItem(product);
            return true; // Added
        }
    }

    // Check if item is in wishlist
    isInWishlist(productId) {
        return this.wishlist.some(item => item.id === productId);
    }

    // Get wishlist count
    getCount() {
        return this.wishlist.length;
    }

    // Clear wishlist
    clearWishlist() {
        this.wishlist = [];
        this.saveWishlist();
        return this.wishlist;
    }

    // Move item from wishlist to cart
    moveToCart(productId, quantity = 1) {
        const item = this.wishlist.find(item => item.id === productId);
        if (item) {
            // Add to cart
            if (typeof CartStore !== 'undefined') {
                CartStore.addItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: quantity,
                    variant: item.variant,
                    image: item.image
                });
            }
            
            // Remove from wishlist
            this.removeItem(productId);
            return true;
        }
        return false;
    }

    // Get wishlist items for display
    getItems() {
        return [...this.wishlist];
    }

    // Subscribe to wishlist changes
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    }

    // Notify listeners of changes
    notifyListeners() {
        this.listeners.forEach(callback => {
            try {
                callback(this.wishlist);
            } catch (error) {
                console.error('Error in wishlist listener:', error);
            }
        });
    }

    // Sync with server (placeholder for future API integration)
    async syncWithServer() {
        try {
            // This would be implemented when backend is ready
            console.log('Syncing wishlist with server...');
            // const response = await fetch('/api/wishlist/sync', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ items: this.wishlist })
            // });
            // const data = await response.json();
            // this.wishlist = data.items;
            // this.saveWishlist();
        } catch (error) {
            console.error('Error syncing wishlist:', error);
        }
    }

    // Static methods for global access
    static getInstance() {
        if (!WishlistStore.instance) {
            WishlistStore.instance = new WishlistStore();
        }
        return WishlistStore.instance;
    }

    static addItem(product) {
        return WishlistStore.getInstance().addItem(product);
    }

    static removeItem(productId) {
        return WishlistStore.getInstance().removeItem(productId);
    }

    static toggleItem(product) {
        return WishlistStore.getInstance().toggleItem(product);
    }

    static isInWishlist(productId) {
        return WishlistStore.getInstance().isInWishlist(productId);
    }

    static getCount() {
        return WishlistStore.getInstance().getCount();
    }

    static getItems() {
        return WishlistStore.getInstance().getItems();
    }

    static subscribe(callback) {
        return WishlistStore.getInstance().subscribe(callback);
    }

    static clearWishlist() {
        return WishlistStore.getInstance().clearWishlist();
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WishlistStore;
} else {
    window.WishlistStore = WishlistStore;
}
