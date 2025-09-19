// Dynamic Course Page Renderer
function renderCoursePage(COURSE_DATA) {
    // Update hero section
    document.getElementById('course-title').textContent = COURSE_DATA.title;
    document.getElementById('hero-image').src = COURSE_DATA.hero_image;
    
    // Update key details
    document.getElementById('course-price').textContent = COURSE_DATA.price_from;
    document.getElementById('course-duration').textContent = COURSE_DATA.duration;
    document.getElementById('course-location').textContent = COURSE_DATA.location;
    document.getElementById('course-format').textContent = COURSE_DATA.format;
    
    // Render description
    const descriptionContainer = document.getElementById('course-description');
    descriptionContainer.innerHTML = '';
    COURSE_DATA.description.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        descriptionContainer.appendChild(p);
    });
    
    // Render curriculum accordion
    const curriculumContainer = document.getElementById('curriculum-container');
    curriculumContainer.innerHTML = '';
    COURSE_DATA.curriculum.forEach((section, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        accordionItem.innerHTML = `
            <button class="accordion-header" onclick="toggleAccordion(${index})">
                <span>${section.title}</span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content" id="accordion-${index}">
                <ul class="curriculum-list">
                    ${section.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
        curriculumContainer.appendChild(accordionItem);
    });
    
    // Render models and bring sections
    const modelsContainer = document.getElementById('models-container');
    modelsContainer.innerHTML = `
        <ul class="info-list">
            ${COURSE_DATA.models.map(model => `<li>${model}</li>`).join('')}
        </ul>
    `;
    
    const bringContainer = document.getElementById('bring-container');
    bringContainer.innerHTML = `
        <ul class="info-list">
            ${COURSE_DATA.bring.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    // Render packages
    const packagesContainer = document.getElementById('packages-container');
    packagesContainer.innerHTML = '';
    COURSE_DATA.packages.forEach(pkg => {
        const packageCard = document.createElement('div');
        packageCard.className = 'package-card';
        packageCard.innerHTML = `
            <div class="package-header">
                <h3 class="package-name">${pkg.name}</h3>
                <div class="package-price">${pkg.price}</div>
                <div class="package-kit-value">Kit Value: ${pkg.kit_value}</div>
            </div>
            <div class="package-content">
                <ul class="package-includes">
                    ${pkg.includes.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <button class="btn-primary package-btn" onclick="prefillBooking({packageName: '${pkg.name}'})">
                    Choose ${pkg.name}
                </button>
            </div>
        `;
        packagesContainer.appendChild(packageCard);
    });
    
    // Render comparison table
    const comparisonContainer = document.getElementById('comparison-container');
    comparisonContainer.innerHTML = `
        <div class="comparison-table">
            <div class="comparison-header">
                <div class="comparison-feature">Feature</div>
                <div class="comparison-standard">Standard</div>
                <div class="comparison-deluxe">Deluxe</div>
            </div>
            ${COURSE_DATA.comparison.map(row => `
                <div class="comparison-row">
                    <div class="comparison-feature">${row.label}</div>
                    <div class="comparison-standard">${row.standard}</div>
                    <div class="comparison-deluxe">${row.deluxe}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Render important info
    const importantInfoContainer = document.getElementById('important-info-container');
    importantInfoContainer.innerHTML = `
        <div class="info-grid">
            <div class="info-item">
                <h4>Location</h4>
                <p>${COURSE_DATA.location}</p>
            </div>
            <div class="info-item">
                <h4>Deposit Required</h4>
                <p>${COURSE_DATA.deposit_amount}</p>
            </div>
            <div class="info-item">
                <h4>Available Dates</h4>
                <div class="date-pills">
                    ${COURSE_DATA.dates.map(date => `
                        <button class="date-pill" onclick="prefillBooking({date: '${date}'})">${date}</button>
                    `).join('')}
                </div>
            </div>
            <div class="info-item">
                <h4>Contact</h4>
                <div class="contact-list">
                    ${COURSE_DATA.contacts.map(contact => `
                        <div class="contact-item">
                            <span class="contact-label">${contact.label}:</span>
                            <span class="contact-value">${contact.value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Render booking form dates
    const dateSelect = document.getElementById('course-dates');
    dateSelect.innerHTML = '<option value="">Choose a date...</option>';
    COURSE_DATA.dates.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        dateSelect.appendChild(option);
    });
    
    // Render package selection in booking form
    const packageSelect = document.getElementById('package-select');
    packageSelect.innerHTML = '<option value="">Choose a package...</option>';
    COURSE_DATA.packages.forEach(pkg => {
        const option = document.createElement('option');
        option.value = pkg.name;
        option.textContent = `${pkg.name} - ${pkg.price}`;
        packageSelect.appendChild(option);
    });
    
    // Render FAQ
    const faqContainer = document.getElementById('faq-container');
    faqContainer.innerHTML = '';
    COURSE_DATA.faq.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <button class="faq-question" onclick="toggleFaq(${index})">
                <span>${faq.q}</span>
                <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer" id="faq-${index}">
                <p>${faq.a}</p>
            </div>
        `;
        faqContainer.appendChild(faqItem);
    });
    
    // Update mobile sticky bar
    const stickyBar = document.getElementById('mobile-sticky-bar');
    if (stickyBar) {
        stickyBar.innerHTML = `
            <button class="sticky-cta-btn" onclick="document.getElementById('book').scrollIntoView({behavior: 'smooth'})">
                Book Deposit (${COURSE_DATA.deposit_amount})
            </button>
        `;
    }
}

// Global functions for interactions
window.toggleAccordion = function(index) {
    const content = document.getElementById(`accordion-${index}`);
    const item = content.closest('.accordion-item');
    const icon = item.querySelector('.accordion-icon');
    
    if (content.classList.contains('active')) {
        // Close the clicked accordion
        content.classList.remove('active');
        item.classList.remove('active');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
    } else {
        // Close all other accordions first
        document.querySelectorAll('.accordion-content').forEach(acc => {
            acc.classList.remove('active');
            const accordionItem = acc.closest('.accordion-item');
            accordionItem.classList.remove('active');
            const accordionIcon = accordionItem.querySelector('.accordion-icon');
            if (accordionIcon) {
                accordionIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Open the clicked accordion
        content.classList.add('active');
        item.classList.add('active');
        if (icon) {
            icon.style.transform = 'rotate(180deg)';
        }
    }
};

window.toggleFaq = function(index) {
    const answer = document.getElementById(`faq-${index}`);
    const question = answer.previousElementSibling;
    const icon = question.querySelector('.faq-icon');
    
    if (answer.classList.contains('active')) {
        answer.classList.remove('active');
        icon.textContent = '+';
    } else {
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('active'));
        document.querySelectorAll('.faq-icon').forEach(icon => icon.textContent = '+');
        
        answer.classList.add('active');
        icon.textContent = '−';
    }
};

window.prefillBooking = function({date, packageName}) {
    const dateSelect = document.getElementById('course-dates');
    const packageSelect = document.getElementById('package-select');
    
    if (date && dateSelect) {
        dateSelect.value = date;
    }
    
    if (packageName && packageSelect) {
        packageSelect.value = packageName;
    }
    
    // Scroll to booking form
    document.getElementById('book').scrollIntoView({behavior: 'smooth'});
};

// Course Template functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize booking form
    initBookingForm();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    console.log('Course template loaded successfully!');
});

// Initialize booking form
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingSubmission();
        });
    }
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
        selectedDate: document.getElementById('course-dates').value,
        selectedPackage: document.getElementById('package-select').value,
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
        submitBtn.textContent = 'Book Now & Pay Deposit';
        
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
    
    if (!data.selectedDate) {
        showNotification('Please select a course date', 'error');
        isValid = false;
    }
    
    if (!data.selectedPackage) {
        showNotification('Please select a package', 'error');
        isValid = false;
    }
    
    if (!data.termsAgreed) {
        showNotification('Please agree to the Terms & Conditions', 'error');
        isValid = false;
    }
    
    return isValid;
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
    document.querySelectorAll('.fade-in').forEach(el => {
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

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { renderCoursePage, prefillBooking };
}