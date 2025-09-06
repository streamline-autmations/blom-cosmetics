// Online Watercolour Workshop Page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    initFormValidation();
    
    // Initialize accordion functionality
    initAccordions();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    console.log('Online Watercolour Workshop page loaded successfully!');
});

// Initialize form validation
function initFormValidation() {
    const form = document.getElementById('enrollment-form');
    const inputs = form.querySelectorAll('input, select');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
            updateSubmitButtonState();
        });
        
        input.addEventListener('change', function() {
            validateField(this);
            updateSubmitButtonState();
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleEnrollmentSubmission();
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (field.id) {
        case 'student-name':
            if (!value || value.length < 2) {
                errorMessage = 'Please enter your first name (minimum 2 characters)';
                isValid = false;
            }
            break;
            
        case 'student-email':
            if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'facebook-name':
            const words = value.split(' ').filter(word => word.length > 0);
            if (!value || words.length < 2) {
                errorMessage = 'Please enter your full Facebook name (minimum 2 words)';
                isValid = false;
            }
            break;
            
        case 'student-phone':
            // Phone is optional, but if provided, validate format
            if (value && !/^\d{7,15}$/.test(value)) {
                errorMessage = 'Please enter a valid phone number (7-15 digits)';
                isValid = false;
            }
            break;
    }
    
    // Show/hide error
    const errorElement = document.getElementById(field.id.replace('student-', '').replace('facebook-', 'facebook') + '-error');
    if (errorElement) {
        if (isValid) {
            errorElement.classList.remove('show');
            field.classList.remove('error');
            if (value) field.classList.add('valid');
        } else {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            field.classList.add('error');
            field.classList.remove('valid');
        }
    }
    
    return isValid;
}

// Update submit button state
function updateSubmitButtonState() {
    const form = document.getElementById('enrollment-form');
    const submitBtn = form.querySelector('.enrollment-submit-btn');
    const name = document.getElementById('student-name');
    const email = document.getElementById('student-email');
    const facebook = document.getElementById('facebook-name');
    const phone = document.getElementById('student-phone');
    const privacy = document.getElementById('privacy-agree');
    
    // Check required fields
    const nameValid = validateField(name);
    const emailValid = validateField(email);
    const facebookValid = validateField(facebook);
    const phoneValid = phone.value.trim() === '' || validateField(phone); // Optional field
    const privacyChecked = privacy.checked;
    
    const isFormValid = nameValid && emailValid && facebookValid && phoneValid && privacyChecked;
    
    submitBtn.disabled = !isFormValid;
}

// Handle enrollment form submission
function handleEnrollmentSubmission() {
    const form = document.getElementById('enrollment-form');
    const submitBtn = form.querySelector('.enrollment-submit-btn');
    const successMessage = document.getElementById('enrollment-success');
    
    // Clear previous errors
    clearAllFormErrors();
    
    // Validate all fields
    const isValid = validateAllFields();
    
    if (!isValid) {
        showNotification('Please correct the errors above', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Processing Payment...';
    
    // Simulate enrollment process
    setTimeout(() => {
        // Hide form and show success message
        form.style.display = 'none';
        successMessage.classList.add('show');
        
        showNotification('Enrollment successful! Check your email for next steps.', 'success');
        
    }, 3000);
}

// Validate all fields
function validateAllFields() {
    const name = document.getElementById('student-name');
    const email = document.getElementById('student-email');
    const facebook = document.getElementById('facebook-name');
    const phone = document.getElementById('student-phone');
    const privacy = document.getElementById('privacy-agree');
    
    let isValid = true;
    
    if (!validateField(name)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(facebook)) isValid = false;
    
    // Phone is optional, but validate if provided
    if (phone.value.trim() && !validateField(phone)) isValid = false;
    
    if (!privacy.checked) {
        const privacyError = document.getElementById('privacy-error');
        if (privacyError) {
            privacyError.textContent = 'Please agree to the Privacy Policy';
            privacyError.classList.add('show');
        }
        isValid = false;
    }
    
    return isValid;
}

// Clear all form errors
function clearAllFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorFields = document.querySelectorAll('.form-group input.error, .form-group select.error');
    
    errorMessages.forEach(error => error.classList.remove('show'));
    errorFields.forEach(field => {
        field.classList.remove('error');
        field.classList.remove('valid');
    });
}

// Initialize accordion functionality
function initAccordions() {
    document.querySelectorAll('.accordion-item').forEach((item, index) => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.setAttribute('data-index', index);
        }
    });
}

// Global accordion toggle function
window.toggleAccordion = function(index) {
    const content = document.getElementById(`accordion-${index}`);
    const item = content.closest('.accordion-item');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        item.classList.remove('active');
    } else {
        // Close all other accordions
        document.querySelectorAll('.accordion-content').forEach(acc => {
            acc.classList.remove('active');
            acc.closest('.accordion-item').classList.remove('active');
        });
        
        content.classList.add('active');
        item.classList.add('active');
    }
};

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.about-section, .learning-section, .packages-section, .how-it-works-section, .info-section, .enrollment-section').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Global functions for external calls
window.scrollToEnrollment = function() {
    const enrollmentSection = document.getElementById('enrollment-section');
    if (enrollmentSection) {
        enrollmentSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Utility functions
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}