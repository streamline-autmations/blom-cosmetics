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
    
    // Initialize navigation
    initNavigation();
});

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
    
    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        document.addEventListener('keydown', function(e) {
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
        });
    }
    
    function openMobileNav() {
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileOverlay.classList.add('active');
        mobileDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first focusable element
        const searchInput = document.querySelector('.mobile-search-input');
        if (searchInput) {
            searchInput.focus();
        }
        
        trapFocus(mobileDrawer);
    }
    
    function closeMobileNav() {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileOverlay.classList.remove('active');
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Close all accordions
        mobileAccordions.forEach(toggle => {
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.nextElementSibling.classList.remove('active');
        });
    }
}

// Announcement bar dismiss functionality
function dismissAnnouncementBar() {
    const announcementBar = document.getElementById('announcement-bar');
    announcementBar.classList.add('hidden');
    
    // Store dismissal in localStorage
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
    
    // Check if slider elements exist before initializing
    if (slides.length === 0 || dots.length === 0) {
        return; // Exit early if no slider elements found
    }
    
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

function isValidPhone(phone) {
    // Phone validation: must start with + and have 10-15 digits total
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
            const privacyAgree = document.getElementById('privacy-agree').checked;
            
            // Clear previous errors
            clearFormErrors();
            
            let hasErrors = false;
            
            // Validate email
            if (!email || !isValidEmail(email)) {
                showFieldError('email-error', 'lead-email');
                hasErrors = true;
            }
            
            // Validate phone
            if (!phone || !isValidPhone(phone)) {
                showFieldError('phone-error', 'lead-phone');
                hasErrors = true;
            }
            
            // Validate privacy checkbox
            if (!privacyAgree) {
                showNotification('Please agree to the Privacy Policy to continue', 'error');
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
    const popupSeen = localStorage.getItem('blom_popup_seen');
    
    if (leadCompleted === 'true') {
        const leadBar = document.getElementById('lead-capture-bar');
        if (leadBar) {
            leadBar.style.display = 'none';
        }
        
        // Also hide trigger button if lead capture is completed
        const leadTriggerBtn = document.getElementById('lead-trigger-btn');
        if (leadTriggerBtn) {
            leadTriggerBtn.classList.remove('show');
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