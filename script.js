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

// Hero slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const sliderContainer = document.querySelector('.slider-container');
    
    let currentSlide = 0;
    let slideInterval;
    let isTransitioning = false;
    
    if (slides.length === 0) return;
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    function showSlide(index, direction = 'next') {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            dot.setAttribute('aria-selected', 'false');
        });
        
        // Show new slide
        if (slides[index]) {
            slides[index].classList.add('active');
            slides[index].setAttribute('aria-hidden', 'false');
        }
        
        if (dots[index]) {
            dots[index].classList.add('active');
            dots[index].setAttribute('aria-selected', 'true');
        }
        
        // Reset transition lock
        setTimeout(() => {
            isTransitioning = false;
        }, 1000);
    }
    
    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        currentSlide = newIndex;
        showSlide(currentSlide, 'next');
    }
    
    function prevSlide() {
        const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        currentSlide = newIndex;
        showSlide(currentSlide, 'prev');
    }
    
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Navigation event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentSlide) {
                currentSlide = index;
                showSlide(currentSlide);
                stopAutoPlay();
                startAutoPlay();
            }
        });
        
        // Keyboard navigation for dots
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (index !== currentSlide) {
                    currentSlide = index;
                    showSlide(currentSlide);
                    stopAutoPlay();
                    startAutoPlay();
                }
            }
        });
    });
    
    // Hero button navigation
    document.querySelectorAll('.hero-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.dataset.href;
            if (href) {
                window.location.href = href;
            }
        });
    });
    
    // Touch/swipe support
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - prev slide
                prevSlide();
            }
            stopAutoPlay();
            startAutoPlay();
        }
    }
    
    // Pause on hover (desktop only)
    if (window.innerWidth > 768) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    });
    
    // Start auto-play
    startAutoPlay();
    
    // Pause when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
}

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
        const hasSeenPopup = localStorage.getItem('signupSeen');
        if (hasSeenPopup !== '1' && !popupShown && !popupOpen) {
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
        if (e.key === 'Escape' && popupOpen) {
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
                validateSignupField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateSignupField(this);
                }
                updateSubmitButtonState();
            });
            
            input.addEventListener('change', function() {
                updateSubmitButtonState();
            });
        });
    }
}

function openSignupPopup() {
    // Guard against multiple modals
    if (popupOpen) return;
    
    const popup = document.getElementById('signup-popup');
    if (popup) {
        // Store current focus
        focusBeforeModal = document.activeElement;
        
        popupOpen = true;
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = popup.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 150);
        }
        
        // Set up focus trap
        trapFocus(popup);
    }
}

function closeSignupPopup() {
    const popup = document.getElementById('signup-popup');
    if (popup) {
        popupOpen = false;
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
        localStorage.setItem('signupSeen', '1');
        
        // Restore focus
        if (focusBeforeModal) {
            focusBeforeModal.focus();
            focusBeforeModal = null;
        }
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
    if (!validateSignupField(firstName)) {
        isValid = false;
    }
    
    // Validate email
    if (!validateSignupField(email)) {
        isValid = false;
    }
    
    // Validate phone
    if (!validateSignupField(countryCode) || !validateSignupField(phoneNumber)) {
        isValid = false;
    }
    
    // Validate privacy checkbox
    if (!privacyAgree.checked) {
        showSignupFieldError('privacy-error', 'Please agree to the Privacy Policy');
        isValid = false;
    }
    
    return isValid;
}

function validateSignupField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (field.id) {
        case 'first-name':
            if (!value || !/^[a-zA-Z' -]{2,}$/.test(value)) {
                errorMessage = 'Please enter a valid first name (min 2 characters)';
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
            const countryCode = document.getElementById('country-code').value;
            const fullPhone = countryCode + value;
            if (!value || !/^\+\d{7,15}$/.test(fullPhone)) {
                errorMessage = 'Please enter 7-15 digits';
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

function updateSubmitButtonState() {
    const form = document.getElementById('signup-form');
    const submitBtn = form.querySelector('.signup-submit-btn');
    const firstName = form.querySelector('#first-name');
    const email = form.querySelector('#signup-email');
    const countryCode = form.querySelector('#country-code');
    const phoneNumber = form.querySelector('#phone-number');
    const privacyAgree = form.querySelector('#privacy-agree');
    
    const isFormValid = 
        validateSignupField(firstName) &&
        validateSignupField(email) &&
        validateSignupField(countryCode) &&
        validateSignupField(phoneNumber) &&
        privacyAgree.checked;
    
    submitBtn.disabled = !isFormValid;
}

function showSignupFieldError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearAllSignupFormErrors() {
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