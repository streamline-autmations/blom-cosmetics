// Account Page JavaScript
class AccountManager {
    constructor() {
        this.supabase = null;
        this.currentUser = null;
        
        this.init();
    }

    async init() {
        // Wait for Supabase to be available
        await this.waitForSupabase();
        
        // Check authentication
        if (!this.supabaseAuth.requireAuth()) {
            return;
        }
        
        this.currentUser = this.supabaseAuth.getCurrentUser();
        this.supabase = this.supabaseAuth.supabase;
        
        this.bindEvents();
        this.loadUserInfo();
    }

    waitForSupabase() {
        return new Promise((resolve) => {
            const checkSupabase = () => {
                if (window.supabaseAuth && window.supabaseAuth.supabase) {
                    resolve();
                } else {
                    setTimeout(checkSupabase, 100);
                }
            };
            checkSupabase();
        });
    }

    bindEvents() {
        // Logout button
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });
    }

    loadUserInfo() {
        if (!this.currentUser) return;

        // Display user email
        document.getElementById('user-email').textContent = this.currentUser.email;

        // Display member since date
        const memberSince = new Date(this.currentUser.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('member-since').textContent = memberSince;
    }

    async logout() {
        try {
            await this.supabaseAuth.signOut();
            window.location.href = '../login.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AccountManager();
});
