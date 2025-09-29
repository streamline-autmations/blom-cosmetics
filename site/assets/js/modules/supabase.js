// js/supabase.js
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_CONFIG } from './supabase-config.js'

// Check if Supabase is configured
const isConfigured = SUPABASE_CONFIG.url && 
                    SUPABASE_CONFIG.anonKey && 
                    SUPABASE_CONFIG.url !== 'https://your-project-id.supabase.co' &&
                    SUPABASE_CONFIG.anonKey !== 'your-anon-key-here'

if (!isConfigured) {
  console.warn('Supabase not configured. Please update js/supabase-config.js with your actual Supabase credentials.')
  console.log('Instructions:')
  console.log('1. Go to https://supabase.com/dashboard')
  console.log('2. Create a new project or select existing project')
  console.log('3. Go to Settings > API')
  console.log('4. Copy the Project URL and anon/public key')
  console.log('5. Update js/supabase-config.js with your credentials')
  
  // Create a mock client to prevent errors
  export const supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signInWithOtp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) }),
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }),
      delete: () => ({ eq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) })
    })
  }
} else {
  export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
    auth: SUPABASE_CONFIG.auth
  })
}

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
