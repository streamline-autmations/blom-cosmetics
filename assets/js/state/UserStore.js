// User Store - State Management for User Authentication and Profile
class UserStore {
    constructor() {
        this.user = this.loadUser();
        this.session = this.loadSession();
        this.listeners = [];
        this.init();
    }

    init() {
        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'blom_user' || e.key === 'blom_session') {
                this.user = this.loadUser();
                this.session = this.loadSession();
                this.notifyListeners();
            }
        });

        // Listen for auth state changes from Supabase
        if (typeof window.supabase !== 'undefined') {
            window.supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN') {
                    this.setSession(session);
                } else if (event === 'SIGNED_OUT') {
                    this.clearUser();
                }
            });
        }
    }

    loadUser() {
        try {
            const userData = localStorage.getItem('blom_user');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error loading user:', error);
            return null;
        }
    }

    loadSession() {
        try {
            const sessionData = localStorage.getItem('blom_session');
            return sessionData ? JSON.parse(sessionData) : null;
        } catch (error) {
            console.error('Error loading session:', error);
            return null;
        }
    }

    saveUser(user) {
        try {
            if (user) {
                localStorage.setItem('blom_user', JSON.stringify(user));
            } else {
                localStorage.removeItem('blom_user');
            }
            this.user = user;
            this.notifyListeners();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    }

    saveSession(session) {
        try {
            if (session) {
                localStorage.setItem('blom_session', JSON.stringify(session));
            } else {
                localStorage.removeItem('blom_session');
            }
            this.session = session;
            this.notifyListeners();
        } catch (error) {
            console.error('Error saving session:', error);
        }
    }

    // Set user and session
    setUser(user, session = null) {
        this.saveUser(user);
        if (session) {
            this.saveSession(session);
        }
    }

    // Set session
    setSession(session) {
        this.saveSession(session);
        if (session?.user) {
            this.saveUser(session.user);
        }
    }

    // Clear user data
    clearUser() {
        this.saveUser(null);
        this.saveSession(null);
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!(this.user && this.session);
    }

    // Get user ID
    getUserId() {
        return this.user?.id || null;
    }

    // Get user email
    getUserEmail() {
        return this.user?.email || null;
    }

    // Get user profile
    getUserProfile() {
        return this.user?.user_metadata || {};
    }

    // Update user profile
    updateProfile(profileData) {
        if (this.user) {
            const updatedUser = {
                ...this.user,
                user_metadata: {
                    ...this.user.user_metadata,
                    ...profileData
                }
            };
            this.saveUser(updatedUser);
        }
    }

    // Get user addresses
    getUserAddresses() {
        return this.user?.user_metadata?.addresses || [];
    }

    // Add user address
    addAddress(address) {
        const addresses = this.getUserAddresses();
        const newAddress = {
            id: Date.now().toString(),
            ...address,
            createdAt: new Date().toISOString()
        };
        addresses.push(newAddress);
        this.updateProfile({ addresses });
        return newAddress;
    }

    // Update user address
    updateAddress(addressId, addressData) {
        const addresses = this.getUserAddresses();
        const index = addresses.findIndex(addr => addr.id === addressId);
        if (index !== -1) {
            addresses[index] = {
                ...addresses[index],
                ...addressData,
                updatedAt: new Date().toISOString()
            };
            this.updateProfile({ addresses });
            return addresses[index];
        }
        return null;
    }

    // Remove user address
    removeAddress(addressId) {
        const addresses = this.getUserAddresses();
        const filteredAddresses = addresses.filter(addr => addr.id !== addressId);
        this.updateProfile({ addresses: filteredAddresses });
        return filteredAddresses;
    }

    // Get default shipping address
    getDefaultShippingAddress() {
        const addresses = this.getUserAddresses();
        return addresses.find(addr => addr.defaultShipping) || addresses[0] || null;
    }

    // Get default billing address
    getDefaultBillingAddress() {
        const addresses = this.getUserAddresses();
        return addresses.find(addr => addr.defaultBilling) || addresses[0] || null;
    }

    // Get user orders
    getUserOrders() {
        return this.user?.user_metadata?.orders || [];
    }

    // Add user order
    addOrder(orderData) {
        const orders = this.getUserOrders();
        const newOrder = {
            id: Date.now().toString(),
            ...orderData,
            createdAt: new Date().toISOString()
        };
        orders.unshift(newOrder); // Add to beginning
        this.updateProfile({ orders });
        return newOrder;
    }

    // Get user preferences
    getUserPreferences() {
        return this.user?.user_metadata?.preferences || {
            newsletter: false,
            smsNotifications: false,
            emailNotifications: true,
            language: 'en',
            currency: 'ZAR'
        };
    }

    // Update user preferences
    updatePreferences(preferences) {
        const currentPrefs = this.getUserPreferences();
        this.updateProfile({ 
            preferences: { ...currentPrefs, ...preferences }
        });
    }

    // Subscribe to user changes
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
                callback({
                    user: this.user,
                    session: this.session,
                    isAuthenticated: this.isAuthenticated()
                });
            } catch (error) {
                console.error('Error in user listener:', error);
            }
        });
    }

    // Login user
    async login(email, password) {
        try {
            if (typeof window.supabase !== 'undefined') {
                const { data, error } = await window.supabase.auth.signInWithPassword({
                    email,
                    password
                });
                
                if (error) throw error;
                
                this.setUser(data.user, data.session);
                return { success: true, user: data.user };
            } else {
                // Fallback for development
                const mockUser = {
                    id: 'mock_user_id',
                    email,
                    user_metadata: {
                        firstName: 'John',
                        lastName: 'Doe',
                        addresses: [],
                        orders: [],
                        preferences: this.getUserPreferences()
                    }
                };
                this.setUser(mockUser);
                return { success: true, user: mockUser };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    }

    // Register user
    async register(userData) {
        try {
            if (typeof window.supabase !== 'undefined') {
                const { data, error } = await window.supabase.auth.signUp({
                    email: userData.email,
                    password: userData.password,
                    options: {
                        data: {
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            phone: userData.phone
                        }
                    }
                });
                
                if (error) throw error;
                
                this.setUser(data.user, data.session);
                return { success: true, user: data.user };
            } else {
                // Fallback for development
                const mockUser = {
                    id: 'mock_user_' + Date.now(),
                    email: userData.email,
                    user_metadata: {
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        phone: userData.phone,
                        addresses: [],
                        orders: [],
                        preferences: this.getUserPreferences()
                    }
                };
                this.setUser(mockUser);
                return { success: true, user: mockUser };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    }

    // Logout user
    async logout() {
        try {
            if (typeof window.supabase !== 'undefined') {
                await window.supabase.auth.signOut();
            }
            this.clearUser();
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    }

    // Static methods for global access
    static getInstance() {
        if (!UserStore.instance) {
            UserStore.instance = new UserStore();
        }
        return UserStore.instance;
    }

    static getUser() {
        return UserStore.getInstance().user;
    }

    static getSession() {
        return UserStore.getInstance().session;
    }

    static isAuthenticated() {
        return UserStore.getInstance().isAuthenticated();
    }

    static subscribe(callback) {
        return UserStore.getInstance().subscribe(callback);
    }

    static login(email, password) {
        return UserStore.getInstance().login(email, password);
    }

    static register(userData) {
        return UserStore.getInstance().register(userData);
    }

    static logout() {
        return UserStore.getInstance().logout();
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserStore;
} else {
    window.UserStore = UserStore;
}
