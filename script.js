// Cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

// Global state for popup
let popupMounted = false;
let popupShown = false;
let popupOpen = false;

// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize announcement banner and popup (only once)
    if (!popupMounted) {
        initAnnouncementBanner();
        initSignupPopup();
        popupMounted = true;
    }
    
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
    
    // Initialize hero slider
    initHeroSlider();
    
    // Initialize navigation
    initNavigation();
});

// Announcement Banner Functions
function initAnnouncementBanner() {
    const banner = document.getElementById('announcement-banner');
    const joinBtn = document.getElementById('announcement-join-btn');
    const closeBtn = document.getElementById('announcement-close');
    
    // Check if banner was previously dismissed
    const isDismissed = localStorage.getItem('blom_banner_dismissed');
    if (isDismissed === '1') {
        if (banner) banner.classList.add('hidden');
        return;
    }
    
    // Join button functionality
    if (joinBtn) {
        joinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSignupPopup();
        });
    }
    
    // Close button functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            dismissAnnouncementBanner();
        });
    }
}

function dismissAnnouncementBanner() {
    const banner = document.getElementById('announcement-banner');
    if (banner) {
        banner.classList.add('hidden');
        localStorage.setItem('blom_banner_dismissed', '1');
    }
}

// Signup Popup Functions
function initSignupPopup() {
    const popup = document.getElementById('signup-popup');
    const form = document.getElementById('signup-form');
    const closeBtn = document.getElementById('popup-close');
    
    // Auto-show popup after 5 seconds if not seen before
    setTimeout(() => {
        const hasSeenPopup = localStorage.getItem('blom_signup_seen');
        if (hasSeenPopup !== '1' && !popupShown) {
            openSignupPopup();
        }
    }, 5000);
    
    // Close button functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeSignupPopup();
        });
    }
    
    // Close on overlay click
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closeSignupPopup();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup && popup.classList.contains('active')) {
            closeSignupPopup();
        }
    });
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignupSubmission();
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

function openSignupPopup() {
    const popup = document.getElementById('signup-popup');
    if (popup && !popupShown) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        popupShown = true;
        
        // Focus first input
        const firstInput = popup.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 200);
        }
        
        // Set up focus trap
        trapFocus(popup);
    }
}

function closeSignupPopup() {
    const popup = document.getElementById('signup-popup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
        localStorage.setItem('blom_signup_seen', '1');
    }
}

function handleSignupSubmission() {
    const form = document.getElementById('signup-form');
    const submitBtn = form.querySelector('.signup-submit-btn');
    const successMsg = document.getElementById('form-success');
    
    // Clear previous errors
    clearAllFormErrors();
    
    // Validate all fields
    const isValid = validateSignupForm();
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate submission
    setTimeout(() => {
        // Show success message
        successMsg.classList.add('show');
        form.style.display = 'none';
        
        // Auto-close after 2 seconds
        setTimeout(() => {
            closeSignupPopup();
            showNotification('Welcome to the BLOM Beauty Club! Check your email for your 15% discount code.', 'success');
            
            // Hide announcement banner
            dismissAnnouncementBanner();
        }, 2000);
        
    }, 1500);
}

function validateSignupForm() {
    const form = document.getElementById('signup-form');
    const firstName = form.querySelector('#first-name');
    const email = form.querySelector('#signup-email');
    const countryCode = form.querySelector('#country-code');
    const phoneNumber = form.querySelector('#phone-number');
    const privacyAgree = form.querySelector('#privacy-agree');
    
    let isValid = true;
    
    // Validate first name
    if (!validateField(firstName)) {
        isValid = false;
    }
    
    // Validate email
    if (!validateField(email)) {
        isValid = false;
    }
    
    // Validate phone
    if (!validateField(countryCode) || !validateField(phoneNumber)) {
        isValid = false;
    }
    
    // Validate privacy checkbox
    if (!privacyAgree.checked) {
        showFieldError('privacy-error', 'Please agree to the Privacy Policy');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (field.id) {
        case 'first-name':
            if (!value || value.length < 2 || !/^[a-zA-Z\s'-]+$/.test(value)) {
                errorMessage = 'Please enter a valid first name (letters only, min 2 chars)';
                isValid = false;
            }
            break;
            
        case 'signup-email':
            if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'country-code':
            if (!value) {
                errorMessage = 'Please select a country code';
                isValid = false;
            }
            break;
            
        case 'phone-number':
            if (!value || !/^\d{7,15}$/.test(value)) {
                errorMessage = 'Please enter a valid phone number (7-15 digits)';
                isValid = false;
            }
            break;
    }
    
    // Show/hide error
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
        if (isValid) {
            errorElement.classList.remove('show');
            field.classList.remove('error');
        } else {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            field.classList.add('error');
        }
    }
    
    return isValid;
}

function showFieldError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearAllFormErrors() {
    const errorMessages = document.querySelectorAll('.form-error');
    const errorFields = document.querySelectorAll('.form-group input.error, .form-group select.error');
    
    errorMessages.forEach(error => error.classList.remove('show'));
    errorFields.forEach(field => field.classList.remove('error'));
}

function trapFocus(element) {
    const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    function handleTabKey(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    }
    
    element.addEventListener('keydown', handleTabKey);
    
    // Return cleanup function
    return () => {
        element.removeEventListener('keydown', handleTabKey);
    };
}

// Hero slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let slideInterval;
    
    if (slides.length === 0) return; // No slides found
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Set up dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoPlay();
            startAutoPlay(); // Restart auto-play
        });
    });
    
    // Start auto-play
    startAutoPlay();
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoPlay);
        heroSection.addEventListener('mouseleave', startAutoPlay);
    }
}

// Navigation functionality
function initNavigation() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileClose = document.querySelector('.mobile-nav-close');
    const mobileAccordions = document.querySelectorAll('.mobile-accordion-toggle');
    const header = document.querySelector('.header');
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const isOpen = mobileDrawer.classList.contains('active');
            
            if (isOpen) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
    }
    
    // Close mobile nav
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileNav);
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileNav);
    }
    
    // Mobile accordion functionality
    mobileAccordions.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other accordions
            mobileAccordions.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.classList.remove('active');
                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherToggle.nextElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current accordion
            if (isActive) {
                this.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
                content.classList.remove('active');
            } else {
                this.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                content.classList.add('active');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
            closeMobileNav();
        }
    });
    
    // Focus trap for mobile nav
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
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

// Mobile navigation functions
function openMobileNav() {
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    
    if (mobileOverlay) mobileOverlay.classList.add('active');
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (mobileToggle) mobileToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (mobileToggle) mobileToggle.classList.remove('active');
    document.body.style.overflow = 'auto';
}