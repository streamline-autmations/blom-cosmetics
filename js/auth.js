// js/auth.js
import { supabase } from './supabase.js'
import { initAuthListener } from './auth-helpers.js'

// Initialize auth listener
initAuthListener()

// Get current page type
const isLoginPage = location.pathname.includes('login')
const isSignupPage = location.pathname.includes('signup')

// Get form elements
const form = document.querySelector('#login-form') || document.querySelector('#signup-form')
const emailInput = document.querySelector('#login-email') || document.querySelector('#signup-email')
const passwordInput = document.querySelector('#login-password') || document.querySelector('#signup-password')
const confirmInput = document.querySelector('#signup-confirm')
const nameInput = document.querySelector('#signup-name')
const submitBtn = document.querySelector('#btn-login') || document.querySelector('#btn-signup')
const magicLinkBtn = document.querySelector('#btn-magic-link')

// Password visibility toggles
const showPasswordBtns = document.querySelectorAll('.password-toggle')
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

// Form validation
function validateForm() {
    const email = emailInput.value.trim()
    const password = passwordInput.value
    const confirm = confirmInput?.value
    const name = nameInput?.value.trim()

    if (!email) {
        throw new Error('Please enter your email address')
    }

    if (!password) {
        throw new Error('Please enter your password')
    }

    if (isSignupPage) {
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

// Show loading state
function showLoading(button) {
    const btnText = button.querySelector('.btn-text')
    const btnSpinner = button.querySelector('.btn-spinner')
    
    button.disabled = true
    btnText.style.display = 'none'
    btnSpinner.style.display = 'flex'
}

// Hide loading state
function hideLoading(button) {
    const btnText = button.querySelector('.btn-text')
    const btnSpinner = button.querySelector('.btn-spinner')
    
    button.disabled = false
    btnText.style.display = 'block'
    btnSpinner.style.display = 'none'
}

// Show error message
function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message')
    if (existingError) {
        existingError.remove()
    }

    // Create error message
    const errorDiv = document.createElement('div')
    errorDiv.className = 'error-message'
    errorDiv.textContent = message
    
    // Insert after form header
    const formHeader = document.querySelector('.auth-header')
    formHeader.insertAdjacentElement('afterend', errorDiv)
    
    // Scroll to error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

// Show success message
function showSuccess(message) {
    // Remove existing messages
    const existingMessage = document.querySelector('.success-message')
    if (existingMessage) {
        existingMessage.remove()
    }

    // Create success message
    const successDiv = document.createElement('div')
    successDiv.className = 'success-message'
    successDiv.textContent = message
    
    // Insert after form header
    const formHeader = document.querySelector('.auth-header')
    formHeader.insertAdjacentElement('afterend', successDiv)
    
    // Scroll to message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

// Handle form submission
form?.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    try {
        const { email, password, name } = validateForm()
        showLoading(submitBtn)

        if (isLoginPage) {
            // Login
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) throw error

            showSuccess('Welcome back! Redirecting to your account...')
            setTimeout(() => {
                window.location.href = '/account'
            }, 1500)

        } else if (isSignupPage) {
            // Signup
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name
                    },
                    emailRedirectTo: `${window.location.origin}/account`
                }
            })

            if (error) throw error

            if (data.user && !data.session) {
                showSuccess('Please check your email to confirm your account. You can close this page.')
            } else {
                showSuccess('Account created successfully! Redirecting to your account...')
                setTimeout(() => {
                    window.location.href = '/account'
                }, 1500)
            }
        }

    } catch (error) {
        console.error('Auth error:', error)
        showError(error.message || 'An error occurred. Please try again.')
    } finally {
        hideLoading(submitBtn)
    }
})

// Handle magic link
magicLinkBtn?.addEventListener('click', async (e) => {
    e.preventDefault()
    
    try {
        const email = emailInput.value.trim()
        if (!email) {
            showError('Please enter your email address first')
            return
        }

        showLoading(magicLinkBtn)

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/account`
            }
        })

        if (error) throw error

        showSuccess('Magic link sent! Please check your email and click the link to sign in.')
        
    } catch (error) {
        console.error('Magic link error:', error)
        showError(error.message || 'Failed to send magic link. Please try again.')
    } finally {
        hideLoading(magicLinkBtn)
    }
})

// Handle redirect parameter
const urlParams = new URLSearchParams(window.location.search)
const redirectTo = urlParams.get('redirect') || '/account'

// Update form action if needed
if (redirectTo && redirectTo !== '/account') {
    // Store redirect for after successful auth
    sessionStorage.setItem('authRedirect', redirectTo)
}
