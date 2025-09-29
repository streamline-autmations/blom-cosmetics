// Authentication JavaScript
class AuthManager {
    constructor() {
        this.supabase = null;
        this.currentUser = null;
        this.isLoginPage = window.location.pathname.includes('login');
        this.isSignupPage = window.location.pathname.includes('signup');
        
        this.init();
    }

    async init() {
        // Wait for Supabase to be available
        await this.waitForSupabase();
        
        this.supabase = this.supabaseAuth.supabase;
        this.currentUser = this.supabaseAuth.getCurrentUser();
        
        // If user is already logged in, redirect to account
        if (this.currentUser) {
            window.location.href = 'account/index.html';
            return;
        }
        
        this.bindEvents();
        this.checkUrlParams();
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
        // Form submissions
        if (this.isLoginPage) {
            document.getElementById('login-form').addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        if (this.isSignupPage) {
            document.getElementById('signup-form').addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup();
            });
        }

        // Magic link buttons
        document.getElementById('magic-link-btn').addEventListener('click', () => {
            this.handleMagicLink();
        });

        // Password toggles
        this.bindPasswordToggles();

        // Password strength indicator (signup only)
        if (this.isSignupPage) {
            this.bindPasswordStrength();
            this.bindPasswordConfirmation();
        }
    }

    bindPasswordToggles() {
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const input = e.target.closest('.password-input-container').querySelector('input');
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                
                // Update icon
                const icon = toggle.querySelector('svg');
                if (type === 'text') {
                    icon.innerHTML = `
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                    `;
                } else {
                    icon.innerHTML = `
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    `;
                }
            });
        });
    }

    bindPasswordStrength() {
        const passwordInput = document.getElementById('password');
        const strengthIndicator = document.getElementById('password-strength');

        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const strength = this.calculatePasswordStrength(password);
            
            strengthIndicator.textContent = strength.text;
            strengthIndicator.className = `password-strength ${strength.class}`;
        });
    }

    bindPasswordConfirmation() {
        const passwordInput = document.getElementById('password');
        const confirmInput = document.getElementById('confirm-password');

        confirmInput.addEventListener('input', () => {
            if (confirmInput.value && passwordInput.value !== confirmInput.value) {
                confirmInput.setCustomValidity('Passwords do not match');
            } else {
                confirmInput.setCustomValidity('');
            }
        });
    }

    calculatePasswordStrength(password) {
        let score = 0;
        let feedback = [];

        if (password.length >= 8) score++;
        else feedback.push('at least 8 characters');

        if (/[a-z]/.test(password)) score++;
        else feedback.push('lowercase letter');

        if (/[A-Z]/.test(password)) score++;
        else feedback.push('uppercase letter');

        if (/[0-9]/.test(password)) score++;
        else feedback.push('number');

        if (/[^A-Za-z0-9]/.test(password)) score++;
        else feedback.push('special character');

        if (score < 3) {
            return { class: 'weak', text: `Weak. Add: ${feedback.join(', ')}` };
        } else if (score < 4) {
            return { class: 'medium', text: 'Medium strength' };
        } else {
            return { class: 'strong', text: 'Strong password' };
        }
    }

    async handleLogin() {
        const formData = new FormData(document.getElementById('login-form'));
        const email = formData.get('email');
        const password = formData.get('password');

        this.setLoading('login-btn', true);

        try {
            const result = await this.supabaseAuth.signInWithPassword(email, password);
            
            if (result.success) {
                this.showToast('Welcome back! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'account/index.html';
                }, 1000);
            } else {
                this.showToast(result.error || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showToast('An unexpected error occurred', 'error');
        } finally {
            this.setLoading('login-btn', false);
        }
    }

    async handleSignup() {
        const formData = new FormData(document.getElementById('signup-form'));
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm_password');
        const firstName = formData.get('first_name');
        const lastName = formData.get('last_name');
        const newsletter = formData.get('newsletter') === 'on';

        // Validate passwords match
        if (password !== confirmPassword) {
            this.showToast('Passwords do not match', 'error');
            return;
        }

        this.setLoading('signup-btn', true);

        try {
            const result = await this.supabaseAuth.signUp(email, password, {
                first_name: firstName,
                last_name: lastName,
                newsletter: newsletter
            });

            if (result.success) {
                if (result.needsConfirmation) {
                    this.showToast('Please check your email to confirm your account', 'info');
                } else {
                    this.showToast('Account created successfully! Redirecting...', 'success');
                    setTimeout(() => {
                        window.location.href = 'account/index.html';
                    }, 1000);
                }
            } else {
                this.showToast(result.error || 'Signup failed', 'error');
            }
        } catch (error) {
            console.error('Signup error:', error);
            this.showToast('An unexpected error occurred', 'error');
        } finally {
            this.setLoading('signup-btn', false);
        }
    }

    async handleMagicLink() {
        const email = document.getElementById('email').value;
        
        if (!email) {
            this.showToast('Please enter your email address first', 'error');
            return;
        }

        this.setLoading('magic-link-btn', true);

        try {
            const result = await this.supabaseAuth.signInWithMagicLink(email);
            
            if (result.success) {
                this.showToast('Magic link sent! Check your email', 'info');
            } else {
                this.showToast(result.error || 'Failed to send magic link', 'error');
            }
        } catch (error) {
            console.error('Magic link error:', error);
            this.showToast('An unexpected error occurred', 'error');
        } finally {
            this.setLoading('magic-link-btn', false);
        }
    }

    checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        const message = urlParams.get('message');

        if (error) {
            this.showToast(decodeURIComponent(error), 'error');
        } else if (message) {
            this.showToast(decodeURIComponent(message), 'info');
        }
    }

    setLoading(buttonId, loading) {
        const button = document.getElementById(buttonId);
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        document.getElementById('toast-container').appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Hide and remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});
