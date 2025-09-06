// Cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart buttons
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent card link from triggering
            
            const productName = this.dataset.product;
            addToCart(productName);
        });
    });

    // Newsletter subscription (main section)
    const newsletterBtn = document.querySelector('.newsletter-btn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const emailInput = document.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                showNotification('Thank you for subscribing to BLOM updates!');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }

    // Footer newsletter subscription
    const footerNewsletterBtn = document.querySelector('.footer-newsletter button');
    if (footerNewsletterBtn) {
        footerNewsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const emailInput = document.querySelector('.footer-newsletter input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                showNotification('Thank you for subscribing!');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }

    // Hero shop button
    const heroBtnPrimary = document.querySelector('.hero-btn-primary');
    if (heroBtnPrimary) {
        heroBtnPrimary.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'shop.html';
        });
    }

    // Hero courses button
    const heroBtnSecondary = document.querySelector('.hero-btn-secondary');
    if (heroBtnSecondary) {
        heroBtnSecondary.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'courses.html';
        });
    }

    // Education button
    const educationBtn = document.querySelector('.education-btn');
    if (educationBtn) {
        educationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'courses.html';
        });
    }

    // View all products button
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'shop.html';
        });
    }

    // Social media links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Opening social media page...');
        });
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = href === '#' ? document.documentElement : document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
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
    document.querySelectorAll('.product-card, .education-content, .newsletter-content, .trust-item, .testimonial-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    console.log('BLOM Cosmetics homepage loaded successfully!');
    
    // Initialize lead capture modal
    initLeadCaptureModal();
    
    // Initialize hero slider
    initHeroSlider();
    
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

// Hero Slider Functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        nextSlide();
    }, 5000);
    
    // Dot click functionality
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }
    
    function goToSlide(slideIndex) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');
        
        currentSlide = slideIndex;
    }
}
// Add to cart function
function addToCart(productName) {
    cartCount++;
    cartCountElement.textContent = cartCount;
    
    // Add bounce animation to cart
    cartCountElement.classList.add('cart-bounce');
    
    setTimeout(() => {
        cartCountElement.classList.remove('cart-bounce');
    }, 600);
    
    // Show success notification
    showNotification(`${productName} added to your cart!`);
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
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Lead Capture Modal Functions
function openLeadModal() {
    const leadModal = document.getElementById('lead-modal');
    leadModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLeadModal() {
    const leadModal = document.getElementById('lead-modal');
    leadModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function initLeadCaptureModal() {
    const leadForm = document.getElementById('lead-capture-form');
    
    // Auto-show modal after 5 seconds if user hasn't completed lead capture
    setTimeout(() => {
        const leadCompleted = localStorage.getItem('leadCaptureCompleted');
        const leadModal = document.getElementById('lead-modal');
        
        if (leadCompleted !== 'true' && leadModal && !leadModal.classList.contains('active')) {
            openLeadModal();
        }
    }, 5000); // 5 seconds
    
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('lead-email').value.trim();
            const phone = document.getElementById('lead-phone').value.trim();
            const countryCode = document.getElementById('country-code').value;
            
            // Clear previous errors
            clearFormErrors();
            
            let hasErrors = false;
            
            // Validate email
            if (!email || !isValidEmail(email)) {
                showFieldError('email-error', 'lead-email');
                hasErrors = true;
            }
            
            // Validate phone if provided
            if (phone && !isValidPhoneNumber(phone)) {
                showFieldError('phone-error', 'lead-phone');
                hasErrors = true;
            }
            
            if (hasErrors) {
                return;
            }
            
            // Simulate form submission
            const submitBtn = leadForm.querySelector('.lead-submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                closeLeadModal();
                showNotification('Welcome to the BLOM Beauty Club! Check your email for your 15% discount code.', 'success');
                leadForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Hide the lead capture bar after successful signup
                const leadBar = document.getElementById('lead-capture-bar');
                if (leadBar) {
                    leadBar.style.display = 'none';
                    localStorage.setItem('leadCaptureCompleted', 'true');
                }
            }, 2000);
        });
    }
    
    // Close modal when clicking outside
    const leadModal = document.getElementById('lead-modal');
    if (leadModal) {
        leadModal.addEventListener('click', function(e) {
            if (e.target === leadModal) {
                closeLeadModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const leadModal = document.getElementById('lead-modal');
            if (leadModal && leadModal.classList.contains('active')) {
                closeLeadModal();
            }
        }
    });
    
    // Check if user has already completed lead capture
    const leadCompleted = localStorage.getItem('leadCaptureCompleted');
    if (leadCompleted === 'true') {
        const leadBar = document.getElementById('lead-capture-bar');
        if (leadBar) {
            leadBar.style.display = 'none';
        }
    }
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
    const errorFields = document.querySelectorAll('.lead-form-group input.error');
    
    errorMessages.forEach(error => error.classList.remove('show'));
    errorFields.forEach(field => field.classList.remove('error'));
}

function isValidPhoneNumber(phone) {
    // Basic phone validation - at least 7 digits
    const phoneRegex = /^\d{7,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone);
}