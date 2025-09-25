// Supabase configuration and authentication helpers
class SupabaseAuth {
    constructor() {
        this.supabaseUrl = 'YOUR_SUPABASE_URL';
        this.supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
        this.supabase = null;
        this.currentUser = null;
        
        this.init();
    }

    async init() {
        // Load Supabase from CDN
        if (typeof window !== 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
            script.onload = () => {
                this.supabase = window.supabase.createClient(this.supabaseUrl, this.supabaseAnonKey);
                this.checkAuth();
            };
            document.head.appendChild(script);
        }
    }

    async checkAuth() {
        if (!this.supabase) return;
        
        try {
            const { data: { session }, error } = await this.supabase.auth.getSession();
            if (error) {
                console.error('Auth check error:', error);
                return;
            }
            
            this.currentUser = session?.user || null;
            this.onAuthStateChange(this.currentUser);
        } catch (error) {
            console.error('Auth check error:', error);
        }
    }

    async signInWithPassword(email, password) {
        if (!this.supabase) throw new Error('Supabase not initialized');
        
        try {
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            
            this.currentUser = data.user;
            this.onAuthStateChange(this.currentUser);
            return { success: true, user: data.user };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
    }

    async signUp(email, password, metadata = {}) {
        if (!this.supabase) throw new Error('Supabase not initialized');
        
        try {
            const { data, error } = await this.supabase.auth.signUp({
                email,
                password,
                options: {
                    data: metadata
                }
            });
            
            if (error) throw error;
            
            return { success: true, user: data.user, needsConfirmation: !data.session };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
    }

    async signInWithMagicLink(email) {
        if (!this.supabase) throw new Error('Supabase not initialized');
        
        try {
            const { error } = await this.supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/account`
                }
            });
            
            if (error) throw error;
            
            return { success: true };
        } catch (error) {
            console.error('Magic link error:', error);
            return { success: false, error: error.message };
        }
    }

    async signOut() {
        if (!this.supabase) throw new Error('Supabase not initialized');
        
        try {
            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;
            
            this.currentUser = null;
            this.onAuthStateChange(null);
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    onAuthStateChange(user) {
        // Dispatch custom event for other parts of the app
        const event = new CustomEvent('authStateChange', { 
            detail: { user, isAuthenticated: !!user } 
        });
        window.dispatchEvent(event);
    }

    // Route guard helper
    requireAuth(redirectTo = '/login') {
        if (!this.isAuthenticated()) {
            window.location.href = redirectTo;
            return false;
        }
        return true;
    }
}

// Initialize global auth instance
window.supabaseAuth = new SupabaseAuth();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SupabaseAuth;
}
