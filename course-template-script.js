// Course Template functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize course template
    initCourseTemplate();
    
    // Booking form functionality
    initBookingForm();
    
    // Gallery functionality
    initGallery();
    
    // Scroll animations
    initScrollAnimations();
    
    console.log('Course template loaded successfully!');
});

// Initialize course template with dynamic data
function initCourseTemplate() {
    // This would typically load course data from an API or database
    // For demo purposes, we'll use static data
    const courseData = {
        title: "Professional Acrylic Training",
        duration: "5 Days Intensive",
        price: "R 7,200",
        location: "In-Class Training",
        includes: "Professional Kit & Certificate",
        dates: "March 15-19, 2024",
        depositAmount: "R 2,000",
        fullAmount: "R 7,200",
        isOnline: false, // Set to true for online courses
        hasKit: true,
        instructor: {
            name: "Sarah Johnson",
            title: "Master Nail Technician & BLOM Lead Educator",
            photo: "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    };
    
    // Update page content with course data
    updateCourseContent(courseData);
}

// Update course content dynamically
function updateCourseContent(data) {
    // Update course details
    document.getElementById('course-title').textContent = data.title;
    document.getElementById('course-duration').textContent = data.duration;
    document.getElementById('course-price').textContent = data.price;
    document.getElementById('course-location').textContent = data.location;
    document.getElementById('course-includes').textContent = data.includes;
    document.getElementById('course-dates').textContent = data.dates;
    document.getElementById('deposit-amount').textContent = data.depositAmount;
    document.getElementById('full-amount').textContent = data.fullAmount;
    
    // Update instructor information
    document.getElementById('instructor-name').textContent = data.instructor.name;
    document.getElementById('instructor-title').textContent = data.instructor.title;
    document.getElementById('instructor-photo').src = data.instructor.photo;
    
    // Show/hide Facebook field for online courses
    const facebookField = document.getElementById('facebook-field');
    if (data.isOnline) {
        facebookField.style.display = 'block';
        facebookField.querySelector('input').required = true;
    } else {
        facebookField.style.display = 'none';
        facebookField.querySelector('input').required = false;
    }
    
    // Show/hide starter kit section
    const kitSection = document.getElementById('starter-kit-section');
    if (!data.hasKit) {
        kitSection.style.display = 'none';
    }
}

// Initialize booking form
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingSubmission();
        });
    }
    
    // Payment option change handler
    const paymentOptions = document.querySelectorAll('input[name="payment-type"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            updatePaymentDisplay(this.value);
        });
    });
}

// Handle booking form submission
function handleBookingSubmission() {
    const form = document.getElementById('booking-form');
    const submitBtn = form.querySelector('.booking-submit-btn');
    
    // Get form data
    const formData = new FormData(form);
    const bookingData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        facebook: formData.get('facebook'),
        paymentType: formData.get('payment-type'),
        termsAgreed: formData.get('terms') === 'on'
    };
    
    // Validate form
    if (!validateBookingForm(bookingData)) {
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Processing...';
    
    // Simulate booking process
    setTimeout(() => {
        // In a real application, this would integrate with a payment processor
        // and booking system
        
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Complete Booking & Payment';
        
        showNotification('Booking submitted successfully! You will receive a confirmation email shortly.', 'success');
        
        // Reset form
        form.reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    }, 3000);
}

// Validate booking form
function validateBookingForm(data) {
    let isValid = true;
    
    // Validate required fields
    if (!data.name || data.name.trim().length < 2) {
        showNotification('Please enter a valid name', 'error');
        isValid = false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        isValid = false;
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        showNotification('Please enter a valid phone number with country code', 'error');
        isValid = false;
    }
    
    if (!data.termsAgreed) {
        showNotification('Please agree to the Terms & Conditions', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Update payment display based on selection
function updatePaymentDisplay(paymentType) {
    const paymentElement = document.getElementById('payment-element');
    
    if (paymentType === 'deposit') {
        paymentElement.innerHTML = `
            <div class="payment-placeholder">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                <span>Secure deposit payment - R 2,000</span>
            </div>
        `;
    } else {
        paymentElement.innerHTML = `
            <div class="payment-placeholder">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                <span>Secure full payment - R 7,200 (Save 5%)</span>
            </div>
        `;
    }
}

// Initialize gallery functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            openImageModal(img.src, img.alt);
        });
    });
}

// Open image modal (simple lightbox)
function openImageModal(src, alt) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeImageModal()">
            <div class="modal-content">
                <img src="${src}" alt="${alt}">
                <button class="modal-close" onclick="closeImageModal()">&times;</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add styles if not already present
    if (!document.querySelector('#image-modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'image-modal-styles';
        styles.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-overlay {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
            .modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                cursor: default;
            }
            .modal-content img {
                max-width: 100%;
                max-height: 100%;
                border-radius: 8px;
            }
            .modal-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 32px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(styles);
    }
}

// Close image modal
function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Smooth scroll to booking section
function scrollToBooking() {
    const bookingSection = document.getElementById('booking-section');
    bookingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

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
    document.querySelectorAll('.course-details-list, .booking-cta-card, .kit-content, .gallery-item, .instructor-content, .booking-form-container').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\+[1-9]\d{9,14}$/;
    return phoneRegex.test(phone);
}

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

// Global functions for HTML onclick handlers
window.scrollToBooking = scrollToBooking;
window.closeImageModal = closeImageModal;