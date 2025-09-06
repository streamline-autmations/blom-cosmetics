// Professional Acrylic Training Page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    initFormValidation();
    
    // Initialize accordion functionality
    initAccordions();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize selection handlers
    initSelectionHandlers();
    
    console.log('Professional Acrylic Training page loaded successfully!');
});

// Initialize form validation
function initFormValidation() {
    const form = document.getElementById('booking-form');
    if (!form) return;
    
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
        handleBookingSubmission();
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
                errorMessage = 'Please enter your full name (minimum 2 characters)';
                isValid = false;
            }
            break;
            
        case 'student-email':
            if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'student-phone':
            if (!value || !/^\d{7,15}$/.test(value)) {
                errorMessage = 'Please enter a valid phone number (7-15 digits)';
                isValid = false;
            }
            break;
            
        case 'selected-date':
            if (!value) {
                errorMessage = 'Please select a course date';
                isValid = false;
            }
            break;
            
        case 'selected-package':
            if (!value) {
                errorMessage = 'Please select a package';
                isValid = false;
            }
            break;
    }
    
    // Show/hide error
    const errorElement = document.getElementById(field.id.replace('student-', '').replace('selected-', '') + '-error');
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
    const form = document.getElementById('booking-form');
    if (!form) return;
    
    const submitBtn = form.querySelector('.booking-submit-btn');
    const name = document.getElementById('student-name');
    const email = document.getElementById('student-email');
    const phone = document.getElementById('student-phone');
    const date = document.getElementById('selected-date');
    const packageSelect = document.getElementById('selected-package');
    const terms = document.getElementById('terms-agree');
    
    const isFormValid = 
        validateField(name) &&
        validateField(email) &&
        validateField(phone) &&
        validateField(date) &&
        validateField(packageSelect) &&
        terms.checked;
    
    submitBtn.disabled = !isFormValid;
}

// Handle booking form submission
function handleBookingSubmission() {
    const form = document.getElementById('booking-form');
    const submitBtn = form.querySelector('.booking-submit-btn');
    
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
    
    // Simulate booking process
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Pay Deposit & Secure Spot (R2,000)';
        
        showNotification('Booking submitted successfully! You will receive a confirmation email with payment instructions.', 'success');
        
        // Reset form
        form.reset();
        clearAllFormErrors();
        updateSubmitButtonState();
        
    }, 3000);
}

// Validate all fields
function validateAllFields() {
    const name = document.getElementById('student-name');
    const email = document.getElementById('student-email');
    const phone = document.getElementById('student-phone');
    const date = document.getElementById('selected-date');
    const packageSelect = document.getElementById('selected-package');
    const terms = document.getElementById('terms-agree');
    
    let isValid = true;
    
    if (!validateField(name)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(phone)) isValid = false;
    if (!validateField(date)) isValid = false;
    if (!validateField(packageSelect)) isValid = false;
    
    if (!terms.checked) {
        const termsError = document.getElementById('terms-error');
        if (termsError) {
            termsError.textContent = 'Please agree to the Terms & Conditions';
            termsError.classList.add('show');
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
    document.querySelectorAll('section').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Initialize selection handlers
function initSelectionHandlers() {
    // Date pill selection
    document.querySelectorAll('.date-pill').forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove selected class from all pills
            document.querySelectorAll('.date-pill').forEach(p => p.classList.remove('selected'));
            
            // Add selected class to clicked pill
            this.classList.add('selected');
            
            // Update form dropdown
            const dateSelect = document.getElementById('selected-date');
            if (dateSelect) {
                dateSelect.value = this.textContent;
                validateField(dateSelect);
                updateSubmitButtonState();
            }
            
            // Scroll to booking form
            scrollToBooking();
        });
    });
}

// Global functions for external calls
window.scrollToBooking = function() {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
        bookingSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

window.selectPackage = function(packageName) {
    const packageSelect = document.getElementById('selected-package');
    if (packageSelect) {
        packageSelect.value = packageName;
        validateField(packageSelect);
        updateSubmitButtonState();
    }
    
    // Scroll to booking form
    scrollToBooking();
    
    // Show notification
    showNotification(`${packageName} package selected!`, 'success');
};

window.selectDate = function(date) {
    const dateSelect = document.getElementById('selected-date');
    if (dateSelect) {
        dateSelect.value = date;
        validateField(dateSelect);
        updateSubmitButtonState();
    }
    
    // Update visual selection
    document.querySelectorAll('.date-pill').forEach(pill => {
        pill.classList.remove('selected');
        if (pill.textContent === date) {
            pill.classList.add('selected');
        }
    });
    
    // Scroll to booking form
    scrollToBooking();
    
    // Show notification
    showNotification(`Date selected: ${date}`, 'success');
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