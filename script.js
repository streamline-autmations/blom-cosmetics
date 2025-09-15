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

   // Add to cart buttons (new selector for Best Sellers)
   document.querySelectorAll('.add-to-cart').forEach(button => {
       button.addEventListener('click', function(e) {
           e.preventDefault();
           e.stopPropagation(); // Prevent card link from triggering
           
           const productName = this.dataset.title;
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
    // Initialize hero slider
    initHeroSlider();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize mobile accordion functionality
    initMobileAccordions();
});

// Add to cart function
function addToCart(productName) {
   const cartCountElement = document.querySelector('.cart-count');
   let count = parseInt(cartCountElement?.textContent) || 0;
   count++;
   
   if (cartCountElement) {
       cartCountElement.textContent = count;
       
       // Add bounce animation
       cartCountElement.classList.add('cart-bounce');
       setTimeout(() => cartCountElement.classList.remove('cart-bounce'), 600);
   }
   
   // Store in localStorage
   localStorage.setItem('blom_cart_count', count.toString());
   
   // Show notification
   showNotification(`${productName} added to cart!`);
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
    }
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
let slideInterval;
let currentSlide = 0;
let isTransitioning = false;

function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 7000);
}

function stopAutoPlay() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    const newIndex = (currentSlide + 1) % slides.length;
    currentSlide = newIndex;
    showSlide(currentSlide, 'next');
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    currentSlide = newIndex;
    showSlide(currentSlide, 'prev');
}

function showSlide(index, direction = 'next') {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (isTransitioning || slides.length === 0) return;
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

function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const sliderContainer = document.querySelector('.slider-container');
    
    if (slides.length === 0) return;
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
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
}

// Navigation initialization
function initNavigation() {
    // Handle desktop navigation dropdowns
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown-menu, .mega-menu');
        
        if (dropdown && link) {
            // Toggle dropdown on click
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close other dropdowns
                navItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherDropdown = otherItem.querySelector('.dropdown-menu, .mega-menu');
                        const otherLink = otherItem.querySelector('a');
                        if (otherDropdown && otherLink) {
                            otherDropdown.classList.remove('show');
                            otherLink.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
                
                // Toggle current dropdown
                const isOpen = dropdown.classList.contains('show');
                if (isOpen) {
                    dropdown.classList.remove('show');
                    link.setAttribute('aria-expanded', 'false');
                } else {
                    dropdown.classList.add('show');
                    link.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item')) {
            navItems.forEach(item => {
                const dropdown = item.querySelector('.dropdown-menu, .mega-menu');
                const link = item.querySelector('a');
                if (dropdown && link) {
                    dropdown.classList.remove('show');
                    link.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
}

// Mobile accordion functionality
function initMobileAccordions() {
    // Mobile accordion functionality can be added here if needed
}