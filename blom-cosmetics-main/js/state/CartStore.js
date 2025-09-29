// Cart Store - State Management for Shopping Cart
class CartStore {
    constructor() {
        this.cart = this.loadCart();
        this.listeners = [];
        this.init();
    }

    init() {
        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'blom_cart') {
                this.cart = this.loadCart();
                this.notifyListeners();
            }
        });
    }

    loadCart() {
        try {
            const cartData = localStorage.getItem('blom_cart');
            return cartData ? JSON.parse(cartData) : {
                items: [],
                total: 0,
                subtotal: 0,
                shipping: 0,
                tax: 0,
                discount: 0,
                cartId: this.generateCartId()
            };
        } catch (error) {
            console.error('Error loading cart:', error);
            return this.getEmptyCart();
        }
    }

    saveCart() {
        try {
            localStorage.setItem('blom_cart', JSON.stringify(this.cart));
            this.notifyListeners();
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    getEmptyCart() {
        return {
            items: [],
            total: 0,
            subtotal: 0,
            shipping: 0,
            tax: 0,
            discount: 0,
            cartId: this.generateCartId()
        };
    }

    generateCartId() {
        return 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Add item to cart
    addItem(product) {
        const existingItem = this.cart.items.find(item => 
            item.id === product.id && item.variant === product.variant
        );

        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.cart.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity || 1,
                variant: product.variant || 'default',
                image: product.image,
                addedAt: new Date().toISOString()
            });
        }

        this.calculateTotals();
        this.saveCart();
        return this.cart;
    }

    // Remove item from cart
    removeItem(productId, variant = 'default') {
        this.cart.items = this.cart.items.filter(item => 
            !(item.id === productId && item.variant === variant)
        );
        this.calculateTotals();
        this.saveCart();
        return this.cart;
    }

    // Update item quantity
    updateQuantity(productId, variant, quantity) {
        const item = this.cart.items.find(item => 
            item.id === productId && item.variant === variant
        );

        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId, variant);
            } else {
                item.quantity = quantity;
                this.calculateTotals();
                this.saveCart();
            }
        }
        return this.cart;
    }

    // Clear cart
    clearCart() {
        this.cart = this.getEmptyCart();
        this.saveCart();
        return this.cart;
    }

    // Calculate totals
    calculateTotals() {
        this.cart.subtotal = this.cart.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0
        );

        // Calculate shipping (free over R1500)
        this.cart.shipping = this.cart.subtotal >= 1500 ? 0 : 100;

        // Calculate tax (15% VAT)
        this.cart.tax = this.cart.subtotal * 0.15;

        // Calculate total
        this.cart.total = this.cart.subtotal + this.cart.shipping + this.cart.tax - this.cart.discount;
    }

    // Get cart summary
    getCartSummary() {
        return {
            itemCount: this.cart.items.reduce((total, item) => total + item.quantity, 0),
            uniqueItems: this.cart.items.length,
            subtotal: this.cart.subtotal,
            shipping: this.cart.shipping,
            tax: this.cart.tax,
            discount: this.cart.discount,
            total: this.cart.total,
            cartId: this.cart.cartId
        };
    }

    // Check if item is in cart
    isInCart(productId, variant = 'default') {
        return this.cart.items.some(item => 
            item.id === productId && item.variant === variant
        );
    }

    // Get item quantity
    getItemQuantity(productId, variant = 'default') {
        const item = this.cart.items.find(item => 
            item.id === productId && item.variant === variant
        );
        return item ? item.quantity : 0;
    }

    // Apply discount
    applyDiscount(code, amount) {
        this.cart.discount = amount;
        this.calculateTotals();
        this.saveCart();
        return this.cart;
    }

    // Remove discount
    removeDiscount() {
        this.cart.discount = 0;
        this.calculateTotals();
        this.saveCart();
        return this.cart;
    }

    // Subscribe to cart changes
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
                callback(this.cart);
            } catch (error) {
                console.error('Error in cart listener:', error);
            }
        });
    }

    // Get cart for checkout
    getCheckoutData() {
        return {
            cartId: this.cart.cartId,
            items: this.cart.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                variant: item.variant
            })),
            totals: {
                subtotal: this.cart.subtotal,
                shipping: this.cart.shipping,
                tax: this.cart.tax,
                discount: this.cart.discount,
                total: this.cart.total
            }
        };
    }

    // Static methods for global access
    static getInstance() {
        if (!CartStore.instance) {
            CartStore.instance = new CartStore();
        }
        return CartStore.instance;
    }

    static addItem(product) {
        return CartStore.getInstance().addItem(product);
    }

    static removeItem(productId, variant) {
        return CartStore.getInstance().removeItem(productId, variant);
    }

    static updateQuantity(productId, variant, quantity) {
        return CartStore.getInstance().updateQuantity(productId, variant, quantity);
    }

    static getCart() {
        return CartStore.getInstance().cart;
    }

    static getCartSummary() {
        return CartStore.getInstance().getCartSummary();
    }

    static subscribe(callback) {
        return CartStore.getInstance().subscribe(callback);
    }

    static clearCart() {
        return CartStore.getInstance().clearCart();
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartStore;
} else {
    window.CartStore = CartStore;
}
