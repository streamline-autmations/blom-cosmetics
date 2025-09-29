// Authentication Script for BLOM Cosmetics

// Environment variables (placeholders for Supabase)
const SUPABASE_CONFIG = {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'
};

// Auth state management
class AuthManager {
    constructor() {
        this.user = null;
        this.session = null;
        this.init();
    }

    init() {
        // Check for existing session on page load
        this.checkSession();
        
        // Set up form handlers
        this.setupFormHandlers();
        
        // Set up route guards
        this.setupRouteGuards();
    }

    async checkSession() {
        try {
            // TODO: Replace with actual Supabase client
            // const { data: { session } } = await supabase.auth.getSession();
            // this.session = session;
            // this.user = session?.user || null;
            
            // For now, check localStorage for demo purposes
            const storedUser = localStorage.getItem('blom_user');
            if (storedUser) {
                this.user = JSON.parse(storedUser);
                this.updateUI();
            }
        } catch (error) {
            console.error('Error checking session:', error);
        }
    }

    setupFormHandlers() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }

        // Register form
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', this.handleRegister.bind(this));
        }

        // Profile update form
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', this.handleProfileUpdate.bind(this));
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('#login-submit');
        const email = form.email.value;
        const password = form.password.value;
        
        // Show loading state
        this.setLoadingState(submitBtn, true);
        
        try {
            // TODO: Replace with actual Supabase auth
            // const { data, error } = await supabase.auth.signInWithPassword({
            //     email,
            //     password
            // });
            
            // Simulate API call
            await this.simulateApiCall();
            
            // For demo purposes, create a mock user
            const mockUser = {
                id: 'demo-user-id',
                email: email,
                first_name: 'Demo',
                last_name: 'User',
                phone: '+27 82 123 4567'
            };
            
            this.user = mockUser;
            localStorage.setItem('blom_user', JSON.stringify(mockUser));
            
            // Show success message
            this.showToast('Successfully signed in!', 'success');
            
            // Redirect to account page or intended destination
            const urlParams = new URLSearchParams(window.location.search);
            const nextUrl = urlParams.get('next') || 'account/index.html';
            window.location.href = nextUrl;
            
        } catch (error) {
            console.error('Login error:', error);
            this.showToast('Invalid email or password. Please try again.', 'error');
            this.setLoadingState(submitBtn, false);
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('#register-submit');
        const formData = new FormData(form);
        
        // Show loading state
        this.setLoadingState(submitBtn, true);
        
        try {
            // TODO: Replace with actual Supabase auth
            // const { data, error } = await supabase.auth.signUp({
            //     email: formData.get('email'),
            //     password: formData.get('password'),
            //     options: {
            //         data: {
            //             first_name: formData.get('first_name'),
            //             last_name: formData.get('last_name'),
            //             phone: formData.get('phone')
            //         }
            //     }
            // });
            
            // Simulate API call
            await this.simulateApiCall();
            
            // Show success message and redirect
            this.showToast('Registration successful! Please check your email to verify your account.', 'success');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
        } catch (error) {
            console.error('Registration error:', error);
            this.showToast('Registration failed. Please try again.', 'error');
            this.setLoadingState(submitBtn, false);
        }
    }

    async handleProfileUpdate(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('#profile-submit');
        const formData = new FormData(form);
        
        // Show loading state
        this.setLoadingState(submitBtn, true);
        
        try {
            // TODO: Replace with actual Supabase user update
            // const { data, error } = await supabase.auth.updateUser({
            //     data: {
            //         first_name: formData.get('first_name'),
            //         last_name: formData.get('last_name'),
            //         phone: formData.get('phone')
            //     }
            // });
            
            // Simulate API call
            await this.simulateApiCall();
            
            // Update local user data
            if (this.user) {
                this.user.first_name = formData.get('first_name');
                this.user.last_name = formData.get('last_name');
                this.user.phone = formData.get('phone');
                localStorage.setItem('blom_user', JSON.stringify(this.user));
            }
            
            this.showToast('Profile updated successfully!', 'success');
            this.setLoadingState(submitBtn, false);
            
        } catch (error) {
            console.error('Profile update error:', error);
            this.showToast('Failed to update profile. Please try again.', 'error');
            this.setLoadingState(submitBtn, false);
        }
    }

    async logout() {
        try {
            // TODO: Replace with actual Supabase logout
            // await supabase.auth.signOut();
            
            this.user = null;
            this.session = null;
            localStorage.removeItem('blom_user');
            
            this.showToast('Successfully signed out!', 'success');
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'account/login.html';
            }, 1000);
            
        } catch (error) {
            console.error('Logout error:', error);
            this.showToast('Error signing out. Please try again.', 'error');
        }
    }

    setupRouteGuards() {
        const currentPath = window.location.pathname;
        const protectedRoutes = [
            'account/index.html',
            'account/addresses.html',
            'account/orders.html',
            'account/wishlist.html'
        ];
        
        const isProtectedRoute = protectedRoutes.some(route => 
            currentPath.includes(route.replace('.html', ''))
        );
        
        if (isProtectedRoute && !this.user) {
            // Redirect to login with return URL
            const returnUrl = encodeURIComponent(window.location.href);
            window.location.href = `account/login.html?next=${returnUrl}`;
        }
    }

    updateUI() {
        // Update user info in account pages
        if (this.user) {
            const userNameElements = document.querySelectorAll('.user-name');
            userNameElements.forEach(el => {
                el.textContent = `${this.user.first_name} ${this.user.last_name}`;
            });
            
            const userEmailElements = document.querySelectorAll('.user-email');
            userEmailElements.forEach(el => {
                el.textContent = this.user.email;
            });
            
            const userPhoneElements = document.querySelectorAll('.user-phone');
            userPhoneElements.forEach(el => {
                el.textContent = this.user.phone || 'Not provided';
            });
            
            // Update avatar initials
            const avatarElements = document.querySelectorAll('.account-avatar');
            avatarElements.forEach(el => {
                const initials = `${this.user.first_name[0]}${this.user.last_name[0]}`.toUpperCase();
                el.textContent = initials;
            });
        }
    }

    setLoadingState(button, isLoading) {
        const btnText = button.querySelector('.btn-text');
        const btnLoading = button.querySelector('.btn-loading');
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            button.disabled = true;
        } else {
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            button.disabled = false;
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Style the toast
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48BB78' : type === 'error' ? '#E53E3E' : '#4299E1'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    async simulateApiCall() {
        // Simulate network delay
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }

    // Helper method to get current user
    getCurrentUser() {
        return this.user;
    }

    // Helper method to check if user is authenticated
    isAuthenticated() {
        return !!this.user;
    }
}

// Form validation helpers
class FormValidator {
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePassword(password) {
        return password.length >= 8;
    }

    static validatePhone(phone) {
        const phoneRegex = /^(\+27|0)[0-9]{9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    static showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field && errorElement) {
            field.classList.add('error');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    static clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field && errorElement) {
            field.classList.remove('error');
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.authManager = new AuthManager();
    
    // Set up logout button
    const logoutBtn = document.querySelector('.account-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.authManager.logout();
        });
    }
    
    // Set up form validation
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', function() {
            if (this.value && !FormValidator.validateEmail(this.value)) {
                FormValidator.showFieldError('email', 'Please enter a valid email address');
            } else {
                FormValidator.clearFieldError('email');
            }
        });
    }
    
    const passwordField = document.getElementById('password');
    if (passwordField) {
        passwordField.addEventListener('blur', function() {
            if (this.value && !FormValidator.validatePassword(this.value)) {
                FormValidator.showFieldError('password', 'Password must be at least 8 characters long');
            } else {
                FormValidator.clearFieldError('password');
            }
        });
    }
});

// Analytics helper (placeholder)
class Analytics {
    static track(eventName, properties = {}) {
        // TODO: Replace with actual analytics implementation
        console.log('Analytics Event:', eventName, properties);
        
        // Placeholder for GA4 events
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
    }
    
    static trackAuth(action) {
        this.track('auth', { action });
    }
    
    static trackPageView(page) {
        this.track('page_view', { page });
    }
}

// Export for use in other scripts
window.Analytics = Analytics;
window.FormValidator = FormValidator;
