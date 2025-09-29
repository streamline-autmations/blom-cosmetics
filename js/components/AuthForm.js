// js/components/AuthForm.js
import { supabase } from '../supabase.js'

export class AuthForm {
    constructor(container, options = {}) {
        this.container = container
        this.options = {
            type: 'login', // 'login' or 'signup'
            redirectTo: '/account',
            showMagicLink: true,
            showRememberMe: true,
            showNewsletter: false,
            ...options
        }
        
        this.init()
    }

    init() {
        this.render()
        this.bindEvents()
    }

    render() {
        const isLogin = this.options.type === 'login'
        
        this.container.innerHTML = `
            <div class="auth-card">
                <div class="auth-header">
                    <h1 class="auth-title">${isLogin ? 'Welcome Back' : 'Join BLOM Beauty'}</h1>
                    <p class="auth-subtitle">${isLogin ? 'Sign in to your BLOM account' : 'Create your account and get 15% off your first order'}</p>
                </div>

                <form class="auth-form" id="auth-form">
                    ${!isLogin ? `
                        <div class="form-group">
                            <label for="auth-name" class="form-label">Full Name</label>
                            <input type="text" id="auth-name" name="name" class="form-input" required>
                        </div>
                    ` : ''}

                    <div class="form-group">
                        <label for="auth-email" class="form-label">Email Address</label>
                        <input type="email" id="auth-email" name="email" class="form-input" required>
                    </div>

                    <div class="form-group">
                        <label for="auth-password" class="form-label">Password</label>
                        <div class="password-input-wrapper">
                            <input type="password" id="auth-password" name="password" class="form-input" required ${!isLogin ? 'minlength="8"' : ''}>
                            <button type="button" id="auth-show-password" class="password-toggle" aria-label="Show password">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                        </div>
                        ${!isLogin ? `
                            <div class="password-requirements">
                                <small>Password must be at least 8 characters long</small>
                            </div>
                        ` : ''}
                    </div>

                    ${!isLogin ? `
                        <div class="form-group">
                            <label for="auth-confirm" class="form-label">Confirm Password</label>
                            <div class="password-input-wrapper">
                                <input type="password" id="auth-confirm" name="confirm" class="form-input" required>
                                <button type="button" id="auth-show-confirm" class="password-toggle" aria-label="Show password">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ` : ''}

                    <div class="form-options">
                        ${this.options.showRememberMe ? `
                            <label class="checkbox-wrapper">
                                <input type="checkbox" id="auth-remember" name="remember">
                                <span class="checkbox-custom"></span>
                                <span class="checkbox-label">Remember me</span>
                            </label>
                        ` : ''}
                        ${isLogin ? `
                            <a href="#" class="forgot-password">Forgot password?</a>
                        ` : ''}
                    </div>

                    ${!isLogin ? `
                        <div class="form-group">
                            <label class="checkbox-wrapper">
                                <input type="checkbox" id="auth-terms" name="terms" required>
                                <span class="checkbox-custom"></span>
                                <span class="checkbox-label">I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a></span>
                            </label>
                        </div>
                    ` : ''}

                    ${this.options.showNewsletter ? `
                        <div class="form-group">
                            <label class="checkbox-wrapper">
                                <input type="checkbox" id="auth-newsletter" name="newsletter">
                                <span class="checkbox-custom"></span>
                                <span class="checkbox-label">Subscribe to our newsletter for beauty tips and exclusive offers</span>
                            </label>
                        </div>
                    ` : ''}

                    <button type="submit" class="btn btn-primary btn-full" id="auth-submit">
                        <span class="btn-text">${isLogin ? 'Sign In' : 'Create Account'}</span>
                        <div class="btn-spinner" style="display: none;">
                            <div class="spinner"></div>
                        </div>
                    </button>

                    ${this.options.showMagicLink ? `
                        <div class="auth-divider">
                            <span>or</span>
                        </div>

                        <button type="button" class="btn btn-outline btn-full" id="auth-magic-link">
                            <span class="btn-text">Continue with Email</span>
                        </button>
                    ` : ''}
                </form>

                <div class="auth-footer">
                    <p>${isLogin ? "Don't have an account?" : 'Already have an account?'} 
                        <a href="${isLogin ? 'signup.html' : 'login.html'}" class="auth-link">${isLogin ? 'Sign up here' : 'Sign in here'}</a>
                    </p>
                </div>
            </div>
        `
    }

    bindEvents() {
        const form = this.container.querySelector('#auth-form')
        const emailInput = this.container.querySelector('#auth-email')
        const passwordInput = this.container.querySelector('#auth-password')
        const confirmInput = this.container.querySelector('#auth-confirm')
        const nameInput = this.container.querySelector('#auth-name')
        const submitBtn = this.container.querySelector('#auth-submit')
        const magicLinkBtn = this.container.querySelector('#auth-magic-link')
        const showPasswordBtns = this.container.querySelectorAll('.password-toggle')

        // Password visibility toggles
        showPasswordBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.parentElement.querySelector('input')
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password'
                input.setAttribute('type', type)
                
                // Update icon
                const icon = btn.querySelector('svg')
                if (type === 'text') {
                    icon.innerHTML = `
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                    `
                } else {
                    icon.innerHTML = `
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    `
                }
            })
        })

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            await this.handleSubmit()
        })

        // Magic link
        if (magicLinkBtn) {
            magicLinkBtn.addEventListener('click', async (e) => {
                e.preventDefault()
                await this.handleMagicLink()
            })
        }
    }

    validateForm() {
        const email = this.container.querySelector('#auth-email').value.trim()
        const password = this.container.querySelector('#auth-password').value
        const confirm = this.container.querySelector('#auth-confirm')?.value
        const name = this.container.querySelector('#auth-name')?.value.trim()
        const isLogin = this.options.type === 'login'

        if (!email) {
            throw new Error('Please enter your email address')
        }

        if (!password) {
            throw new Error('Please enter your password')
        }

        if (!isLogin) {
            if (!name) {
                throw new Error('Please enter your full name')
            }

            if (password.length < 8) {
                throw new Error('Password must be at least 8 characters long')
            }

            if (confirm && password !== confirm) {
                throw new Error('Passwords do not match')
            }
        }

        return { email, password, name, confirm }
    }

    showLoading(button) {
        const btnText = button.querySelector('.btn-text')
        const btnSpinner = button.querySelector('.btn-spinner')
        
        button.disabled = true
        btnText.style.display = 'none'
        btnSpinner.style.display = 'flex'
    }

    hideLoading(button) {
        const btnText = button.querySelector('.btn-text')
        const btnSpinner = button.querySelector('.btn-spinner')
        
        button.disabled = false
        btnText.style.display = 'block'
        btnSpinner.style.display = 'none'
    }

    showError(message) {
        this.removeMessages()
        
        const errorDiv = document.createElement('div')
        errorDiv.className = 'error-message'
        errorDiv.textContent = message
        
        const formHeader = this.container.querySelector('.auth-header')
        formHeader.insertAdjacentElement('afterend', errorDiv)
        
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    showSuccess(message) {
        this.removeMessages()
        
        const successDiv = document.createElement('div')
        successDiv.className = 'success-message'
        successDiv.textContent = message
        
        const formHeader = this.container.querySelector('.auth-header')
        formHeader.insertAdjacentElement('afterend', successDiv)
        
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    removeMessages() {
        const existingError = this.container.querySelector('.error-message')
        const existingSuccess = this.container.querySelector('.success-message')
        
        if (existingError) existingError.remove()
        if (existingSuccess) existingSuccess.remove()
    }

    async handleSubmit() {
        const submitBtn = this.container.querySelector('#auth-submit')
        
        try {
            const { email, password, name } = this.validateForm()
            this.showLoading(submitBtn)

            if (this.options.type === 'login') {
                // Login
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                })

                if (error) throw error

                this.showSuccess('Welcome back! Redirecting to your account...')
                setTimeout(() => {
                    window.location.href = this.options.redirectTo
                }, 1500)

            } else {
                // Signup
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name
                        },
                        emailRedirectTo: `${window.location.origin}${this.options.redirectTo}`
                    }
                })

                if (error) throw error

                if (data.user && !data.session) {
                    this.showSuccess('Please check your email to confirm your account. You can close this page.')
                } else {
                    this.showSuccess('Account created successfully! Redirecting to your account...')
                    setTimeout(() => {
                        window.location.href = this.options.redirectTo
                    }, 1500)
                }
            }

        } catch (error) {
            console.error('Auth error:', error)
            this.showError(error.message || 'An error occurred. Please try again.')
        } finally {
            this.hideLoading(submitBtn)
        }
    }

    async handleMagicLink() {
        const magicLinkBtn = this.container.querySelector('#auth-magic-link')
        const email = this.container.querySelector('#auth-email').value.trim()
        
        try {
            if (!email) {
                this.showError('Please enter your email address first')
                return
            }

            this.showLoading(magicLinkBtn)

            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}${this.options.redirectTo}`
                }
            })

            if (error) throw error

            this.showSuccess('Magic link sent! Please check your email and click the link to sign in.')
            
        } catch (error) {
            console.error('Magic link error:', error)
            this.showError(error.message || 'Failed to send magic link. Please try again.')
        } finally {
            this.hideLoading(magicLinkBtn)
        }
    }
}

// Export for use in other modules
export default AuthForm
