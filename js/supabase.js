// js/supabase.js
import { createClient } from '@supabase/supabase-js'

// IMPORTANT: these are PUBLIC keys for the browser
const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anon) {
  console.error('Supabase env vars missing. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(url, anon, {
  auth: {
    flowType: 'pkce', // better UX for magic links
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Authentication helpers class for backward compatibility
class SupabaseAuth {
    constructor() {
        this.supabase = supabase;
        this.currentUser = null;
        this.init();
    }

    async init() {
        this.checkAuth();
        
        // Listen for auth state changes
        this.supabase.auth.onAuthStateChange((event, session) => {
            this.currentUser = session?.user || null;
            this.onAuthStateChange(this.currentUser);
        });
    }

    async checkAuth() {
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

// Initialize global auth instance for backward compatibility
window.supabaseAuth = new SupabaseAuth();

// Export both the client and auth helper
export { SupabaseAuth };
