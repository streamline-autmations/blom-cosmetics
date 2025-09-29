// AuthGuard Component
class AuthGuard {
    constructor(options = {}) {
        this.options = {
            redirectTo: '/account/login.html',
            redirectParam: 'next',
            requireAuth: true,
            onAuthSuccess: null,
            onAuthFailure: null,
            ...options
        };
        this.init();
    }

    init() {
        this.checkAuth();
    }

    async checkAuth() {
        try {
            const isAuthenticated = await this.isAuthenticated();
            
            if (this.options.requireAuth && !isAuthenticated) {
                this.handleAuthFailure();
            } else if (!this.options.requireAuth && isAuthenticated) {
                this.handleAuthSuccess();
            } else {
                this.handleAuthSuccess();
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            if (this.options.requireAuth) {
                this.handleAuthFailure();
            }
        }
    }

    async isAuthenticated() {
        // Check if user is logged in via Supabase
        if (typeof window.supabase !== 'undefined') {
            const { data: { session } } = await window.supabase.auth.getSession();
            return !!session;
        }
        
        // Fallback: check localStorage for session
        const session = localStorage.getItem('blom_session');
        return !!session;
    }

    handleAuthSuccess() {
        if (this.options.onAuthSuccess) {
            this.options.onAuthSuccess();
        }
    }

    handleAuthFailure() {
        if (this.options.onAuthFailure) {
            this.options.onAuthFailure();
        } else {
            this.redirectToLogin();
        }
    }

    redirectToLogin() {
        const currentPath = window.location.pathname + window.location.search;
        const redirectUrl = new URL(this.options.redirectTo, window.location.origin);
        
        if (currentPath !== this.options.redirectTo) {
            redirectUrl.searchParams.set(this.options.redirectParam, currentPath);
        }
        
        window.location.href = redirectUrl.toString();
    }

    // Static method to protect a route
    static protect(requireAuth = true, options = {}) {
        const guard = new AuthGuard({
            requireAuth,
            ...options
        });
        return guard;
    }

    // Static method to check if user is authenticated
    static async isUserAuthenticated() {
        const guard = new AuthGuard({ requireAuth: false });
        return await guard.isAuthenticated();
    }

    // Static method to get current user
    static async getCurrentUser() {
        if (typeof window.supabase !== 'undefined') {
            const { data: { user } } = await window.supabase.auth.getUser();
            return user;
        }
        
        // Fallback: get user from localStorage
        const userData = localStorage.getItem('blom_user');
        return userData ? JSON.parse(userData) : null;
    }

    // Static method to logout
    static async logout() {
        if (typeof window.supabase !== 'undefined') {
            await window.supabase.auth.signOut();
        }
        
        // Clear localStorage
        localStorage.removeItem('blom_session');
        localStorage.removeItem('blom_user');
        
        // Redirect to home
        window.location.href = '/';
    }
}

// GuestGuard - opposite of AuthGuard
class GuestGuard extends AuthGuard {
    constructor(options = {}) {
        super({
            requireAuth: false,
            redirectTo: '/account/index.html',
            ...options
        });
    }

    async checkAuth() {
        try {
            const isAuthenticated = await this.isAuthenticated();
            
            if (isAuthenticated) {
                this.handleAuthSuccess();
            } else {
                this.handleAuthFailure();
            }
        } catch (error) {
            console.error('Guest guard check failed:', error);
            this.handleAuthFailure();
        }
    }

    handleAuthSuccess() {
        // User is authenticated, redirect to account
        this.redirectToAccount();
    }

    handleAuthFailure() {
        // User is not authenticated, allow access
        if (this.options.onAuthFailure) {
            this.options.onAuthFailure();
        }
    }

    redirectToAccount() {
        window.location.href = this.options.redirectTo;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthGuard, GuestGuard };
} else {
    window.AuthGuard = AuthGuard;
    window.GuestGuard = GuestGuard;
}
