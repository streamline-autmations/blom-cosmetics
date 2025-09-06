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
    // For demo purposes, we'll use static data that can be overridden
    const courseData = {
        title: "Course Title",
        heroImage: "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=1920",
        duration: "Duration",
        price: "R 0",
        depositAmount: "R 0",
        location: "Location",
        includes: "Includes",
        dates: ["Choose a date..."],
        description: ["Course description will be loaded here..."],
        learningObjectives: [
            "Key learning objective 1",
            "Key learning objective 2", 
            "Key learning objective 3"
        ],
        isOnline: false,
        hasKit: true,
        kitItems: ["Kit item 1", "Kit item 2"],
        kitValue: "R 2,500",
        instructor: {
            name: "Instructor Name",
            title: "Instructor Title",
            photo: "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=300"
        }
    };
    
    // Update page content with course data
    updateCourseContent(courseData);
}

// Update course content dynamically
function updateCourseContent(data) {
    // Update hero section
    document.getElementById('course-title').textContent = data.title;
    document.getElementById('hero-image').src = data.heroImage;
    
    // Update course details in sidebar
    document.getElementById('course-price').textContent = data.price;
    document.getElementById('course-duration').textContent = data.duration;
    document.getElementById('course-location').textContent = data.location;
    document.getElementById('course-includes').textContent = data.includes;
    
    // Update deposit amount and visibility
    const depositRow = document.getElementById('deposit-row');
    const depositAmount = document.getElementById('deposit-amount');
    if (data.depositAmount && data.depositAmount !== "R 0") {
        depositAmount.textContent = data.depositAmount;
        depositRow.style.display = 'flex';
    } else {
        depositRow.style.display = 'none';
    }
    
    // Update course description
    const descriptionContainer = document.getElementById('course-description');
    descriptionContainer.innerHTML = '';
    data.description.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        descriptionContainer.appendChild(p);
    });
    
    // Update learning objectives
    const objectivesList = document.getElementById('learning-objectives');
    objectivesList.innerHTML = '';
    data.learningObjectives.forEach(objective => {
        const li = document.createElement('li');
        li.textContent = objective;
        objectivesList.appendChild(li);
    });
    
    // Update instructor information
    document.getElementById('instructor-name').textContent = data.instructor.name;
    document.getElementById('instructor-title').textContent = data.instructor.title;
    const instructorImage = document.getElementById('instructor-image');
    if (instructorImage) {
        instructorImage.src = data.instructor.photo;
    }
    
    // Update scheduled dates dropdown
    const dateDropdown = document.getElementById('course-dates');
    dateDropdown.innerHTML = '<option value="">Choose a date...</option>';
    data.dates.forEach(date => {
        if (date !== "Choose a date...") {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = date;
            dateDropdown.appendChild(option);
        }
    });
    
    // Show/hide date selection for online courses
    const dateSelection = document.getElementById('date-selection');
    if (data.isOnline || data.dates.length <= 1) {
        dateSelection.style.display = 'none';
    } else {
        dateSelection.style.display = 'block';
    }
    
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
    if (data.hasKit) {
        kitSection.style.display = 'block';
        
        // Update kit items
        const kitItemsList = document.getElementById('kit-items');
        kitItemsList.innerHTML = '';
        data.kitItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            kitItemsList.appendChild(li);
        });
        
        // Update kit value
        document.getElementById('kit-value').innerHTML = `<strong>Total Kit Value: ${data.kitValue}</strong>`;
    } else {
        kitSection.style.display = 'none';
    }
    
    // Show/hide how it works section for online courses
    const howItWorksSection = document.getElementById('how-it-works-section');
    if (data.isOnline) {
        howItWorksSection.style.display = 'block';
    } else {
        howItWorksSection.style.display = 'none';
    }
    
    // Update booking button text
    const bookingBtn = document.getElementById('booking-submit-btn');
    if (data.isOnline || !data.depositAmount || data.depositAmount === "R 0") {
        bookingBtn.textContent = 'Book Now & Pay Full Amount';
    } else {
        bookingBtn.textContent = 'Book Now & Pay Deposit';
    }
}

// Initialize booking form
function initBookingForm() {
    const bookingForm = document.getElementById('quick-booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingSubmission();
        });
    }
}

// Handle booking form submission
function handleBookingSubmission() {
    const form = document.getElementById('quick-booking-form');
    const submitBtn = form.querySelector('.booking-submit-btn');
    
    // Get form data
    const formData = new FormData(form);
    const bookingData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        facebook: formData.get('facebook'),
        selectedDate: document.getElementById('course-dates').value,
        termsAgreed: document.getElementById('terms-agree').checked
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
        submitBtn.classList.remove('loading');
        
        // Reset button text based on course type
        const isOnline = document.getElementById('facebook-field').style.display !== 'none';
        if (isOnline) {
            submitBtn.textContent = 'Book Now & Pay Full Amount';
        } else {
            submitBtn.textContent = 'Book Now & Pay Deposit';
        }
        
        showNotification('Booking submitted successfully! You will receive a confirmation email shortly.', 'success');
        
        // Reset form
        form.reset();
        
    }, 3000);
}

// Validate booking form
function validateBookingForm(data) {
    let isValid = true;
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate required fields
    if (!data.name || data.name.trim().length < 2) {
        showNotification('Please enter a valid name', 'error');
        isValid = false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showFieldError('email-error', 'student-email');
        isValid = false;
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        showFieldError('phone-error', 'student-phone');
        isValid = false;
    }
    
    // Check if date selection is required and validate
    const dateSelection = document.getElementById('date-selection');
    if (dateSelection.style.display !== 'none' && !data.selectedDate) {
        showNotification('Please select a course date', 'error');
        isValid = false;
    }
    
    // Validate Facebook name for online courses
    const facebookField = document.getElementById('facebook-field');
    if (facebookField.style.display !== 'none' && (!data.facebook || data.facebook.trim().length < 2)) {
        showNotification('Please enter your Facebook name for group access', 'error');
        isValid = false;
    }
    
    if (!data.termsAgreed) {
        showNotification('Please agree to the Terms & Conditions', 'error');
        isValid = false;
    }
    
    return isValid;
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
}

// Close image modal
function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
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
    document.querySelectorAll('.course-content-left, .course-sidebar, .gallery-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Form validation helper functions
function showFieldError(errorId, fieldId) {
    const errorElement = document.getElementById(errorId);
    const fieldElement = document.getElementById(fieldId);
    
    if (errorElement && fieldElement) {
        errorElement.classList.add('show');
        fieldElement.classList.add('error');
    }
}

function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorFields = document.querySelectorAll('.form-group input.error');
    
    errorMessages.forEach(error => error.classList.remove('show'));
    errorFields.forEach(field => field.classList.remove('error'));
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
window.closeImageModal = closeImageModal;