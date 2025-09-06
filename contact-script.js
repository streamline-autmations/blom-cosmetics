// Contact Us page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    const faqItems = document.querySelectorAll('.faq-item');
    const notificationToast = document.getElementById('notification-toast');
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();
            
            // Validate form
            if (!validateForm(name, email, subject, message)) {
                return;
            }
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'SENDING...';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'SUBMIT';
                
                // Show success message
                showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                
                // Reset form
                contactForm.reset();
                clearValidationStates();
            }, 2000);
        });
    }
    
    // FAQ accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
    
    // Footer newsletter subscription
    const footerNewsletterBtn = document.querySelector('.footer-newsletter button');
    if (footerNewsletterBtn) {
        footerNewsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const emailInput = document.querySelector('.footer-newsletter input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                showNotification('Thank you for subscribing to BLOM updates!');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
    
    // Social media links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Opening social media page...');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        }
    });
    
    // Animate elements on scroll
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
    document.querySelectorAll('.contact-content, .faq-container').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    console.log('BLOM Cosmetics Contact Us page loaded successfully!');
    
    // Initialize announcement bar
    initAnnouncementBar();
});

// Announcement Bar Functionality
function initAnnouncementBar() {
    const messages = document.querySelectorAll('.announcement-message');
    let currentMessage = 0;
    
    // Auto-rotate messages every 5 seconds
    setInterval(() => {
        // Hide current message
        messages[currentMessage].classList.remove('active');
        
        // Move to next message
        currentMessage = (currentMessage + 1) % messages.length;
        
        // Show next message
        messages[currentMessage].classList.add('active');
    }, 5000);
}

function dismissAnnouncementBar() {
    const announcementBar = document.getElementById('announcement-bar');
    announcementBar.classList.add('hidden');
    
    // Store dismissal in localStorage so it stays dismissed
    localStorage.setItem('announcementBarDismissed', 'true');
}

// Check if announcement bar was previously dismissed
document.addEventListener('DOMContentLoaded', function() {
    const isDismissed = localStorage.getItem('announcementBarDismissed');
    if (isDismissed === 'true') {
        const announcementBar = document.getElementById('announcement-bar');
        if (announcementBar) {
            announcementBar.classList.add('hidden');
        }
    }
});

// Form validation
function validateForm(name, email, subject, message) {
    let isValid = true;
    
    // Clear previous validation states
    clearValidationStates();
    
    // Validate name
    if (!name) {
        setFieldError('name', 'Name is required');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        setFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        setFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subject) {
        setFieldError('subject', 'Subject is required');
        isValid = false;
    }
    
    // Validate message
    if (!message) {
        setFieldError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        setFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function setFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    field.classList.add('error');
    showNotification(message, 'error');
}

function clearValidationStates() {
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.classList.remove('error', 'success');
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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