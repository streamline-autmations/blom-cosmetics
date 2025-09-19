// BLOM Cosmetics - Main JavaScript
// Consolidated and cleaned up functionality

// Global state
let cartCount = 0;
let popupMounted = false;
let popupShown = false;
let currentSlide = 0;
let slideInterval;

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('BLOM Cosmetics website loading...');
    
    // Initialize core functionality
    initAnnouncementBanner();
    initSignupPopup();
    initNavigation();
    initMobileNavigation();
    initHeroSlider();
    initCartFunctionality();
    initScrollAnimations();
    initFormHandlers();
    initExpandableDropdowns();
    initVideoAutoplay();
    
    // Sync cart count from localStorage
    syncCartCount();
    
    console.log('BLOM Cosmetics website loaded successfully!');
}

// ===== EXPANDABLE DROPDOWNS ===== //
function initExpandableDropdowns() {
    // Find all expandable menu titles
    const expandableTitles = document.querySelectorAll('.mega-menu-title.expandable');
    
    expandableTitles.forEach(title => {
        title.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const icon = this.querySelector('.expand-icon');
            
            if (content) {
                // Toggle the expanded class
                this.classList.toggle('expanded');
                content.classList.toggle('expanded');
                
                // Update icon rotation
                if (this.classList.contains('expanded')) {
                    icon.textContent = '−';
                } else {
                    icon.textContent = '+';
                }
            }
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
}

// ===== ANNOUNCEMENT BANNER & SIGNUP POPUP ===== //
function initAnnouncementBanner() {
    const banner = document.getElementById('announcement-banner');
    const joinBtn = document.getElementById('announcement-join-btn');
    const closeBtn = document.getElementById('announcement-close');
    
    if (!banner) return;
    
    // Check if banner was previously dismissed
    const isDismissed = localStorage.getItem('blom_banner_dismissed');
    if (isDismissed === '1') {
        banner.classList.add('hidden');
        return;
    }
    
    // Join button functionality
    if (joinBtn) {
        joinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSignupPopup();
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }
    
    // Close button functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            dismissAnnouncementBanner();
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }
}

function dismissAnnouncementBanner() {
    const banner = document.getElementById('announcement-banner');
    if (banner) {
        banner.classList.add('hidden');
        localStorage.setItem('blom_banner_dismissed', '1');
    }
}

function initSignupPopup() {
    const popup = document.getElementById('signup-popup');
    const form = document.getElementById('signup-form');
    const closeBtn = document.getElementById('popup-close');
    
    if (!popup) return;
    
    // Auto-show popup after 5 seconds if not seen before
    setTimeout(() => {
        const popupOpenedThisSession = sessionStorage.getItem('popupOpenedThisSession');
        const signupDismissed = localStorage.getItem('signupDismissed');
        
        if (!popupOpenedThisSession && !signupDismissed && !popupShown) {
            openSignupPopup();
            sessionStorage.setItem('popupOpenedThisSession', '1');
        }
    }, 5000);
    
    // Close button functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeSignupPopup();
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }
    
    // Close on overlay click
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closeSignupPopup();
        }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closeSignupPopup();
        }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignupSubmission();
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
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
    }
}

function closeSignupPopup() {
    const popup = document.getElementById('signup-popup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
        localStorage.setItem('signupDismissed', '1');
    }
}

function handleSignupSubmission() {
    const form = document.getElementById('signup-form');
    const submitBtn = form.querySelector('.signup-submit-btn');
    const emailInput = form.querySelector('input[type="email"]');
    
    if (!emailInput.value || !isValidEmail(emailInput.value)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'Joining...';
    submitBtn.disabled = true;
    
    // Simulate signup process
    setTimeout(() => {
        showNotification('Welcome to the BLOM Beauty Club! Check your email for your 15% discount code.', 'success');
        closeSignupPopup();
        
        // Reset form
        form.reset();
        submitBtn.textContent = 'Join Now & Save 15%';
        submitBtn.disabled = false;
    }, 2000);
}

// ===== NAVIGATION ===== //
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown-menu, .mega-menu');
        
        if (dropdown && link && link.classList.contains('has-dropdown')) {
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
                }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
                
                // Toggle current dropdown
                const isOpen = dropdown.classList.contains('show');
                if (isOpen) {
                    dropdown.classList.remove('show');
                    link.setAttribute('aria-expanded', 'false');
                } else {
                    dropdown.classList.add('show');
                    link.setAttribute('aria-expanded', 'true');
                }
            }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
        }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    
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
            }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
        }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
}

function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileClose = document.querySelector('.mobile-nav-close');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            if (mobileDrawer) {
                mobileDrawer.classList.add('active');
                if (mobileOverlay) mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }
    
    if (mobileClose) {
        mobileClose.addEventListener('click', function() {
            if (mobileDrawer) {
                mobileDrawer.classList.remove('active');
                if (mobileOverlay) mobileOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            if (mobileDrawer) {
                mobileDrawer.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }
    
    // Mobile accordion functionality
    document.querySelectorAll('.mobile-accordion-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.mobile-accordion-icon');
            const isActive = content.classList.contains('active');
            
            // Close all other accordions
            document.querySelectorAll('.mobile-accordion-content').forEach(acc => {
                acc.classList.remove('active');
            }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
            document.querySelectorAll('.mobile-accordion-toggle').forEach(t => {
                t.setAttribute('aria-expanded', 'false');
                const i = t.querySelector('.mobile-accordion-icon');
                if (i) i.style.transform = 'rotate(0deg)';
            }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
            
            // Toggle current accordion
            if (!isActive) {
                content.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
}

// ===== HERO SLIDER ===== //
function initHeroSlider() { console.log("Initializing hero slider...");
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    // Initialize hero slider
    
    if (slides.length === 0) return; console.log("Found slides:", slides.length); console.log("Found dots:", dots.length); console.log("Found prev button:", !!prevBtn); console.log("Found next button:", !!nextBtn);
    
    // Initialize first slide
    showSlide(0);
    
    // Start autoplay
    startAutoPlay();
    
    // Navigation event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
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
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    
    // Hero button navigation
    document.querySelectorAll('.hero-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.dataset.href;
            if (href) {
                window.location.href = href;
            }
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
}

function startAutoPlay() { console.log("Starting autoplay...");
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    slideInterval = setInterval(() => { try { nextSlide(); } catch (error) { console.log("Slider error:", error); stopAutoPlay(); } }, 6000);
}

function stopAutoPlay() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return; console.log("Found slides:", slides.length); console.log("Found dots:", dots.length); console.log("Found prev button:", !!prevBtn); console.log("Found next button:", !!nextBtn);
    
    const newIndex = (currentSlide + 1) % slides.length;
    currentSlide = newIndex;
    showSlide(currentSlide);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return; console.log("Found slides:", slides.length); console.log("Found dots:", dots.length); console.log("Found prev button:", !!prevBtn); console.log("Found next button:", !!nextBtn);
    
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    currentSlide = newIndex;
    showSlide(currentSlide);
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return; console.log("Found slides:", slides.length); console.log("Found dots:", dots.length); console.log("Found prev button:", !!prevBtn); console.log("Found next button:", !!nextBtn);
    
    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    
    // Show new slide
    if (slides[index]) {
        slides[index].classList.add('active');
        slides[index].setAttribute('aria-hidden', 'false');
    }
    
    if (dots[index]) {
        dots[index].classList.add('active');
        dots[index].setAttribute('aria-selected', 'true');
    }
}

// ===== CART FUNCTIONALITY ===== //
function initCartFunctionality() {
    // Add to cart buttons
    document.querySelectorAll('.btn-add-cart, .add-to-cart, .shop-card-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productName = this.dataset.product || this.dataset.title || 'Product';
            addToCart(productName);
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    
    // Sync cart count on load
    const storedCount = localStorage.getItem('blom_cart_count');
    if (storedCount) {
        cartCount = parseInt(storedCount);
        updateCartDisplay();
    }
}

function addToCart(productName) {
    cartCount++;
    updateCartDisplay();
    
    // Store in localStorage
    localStorage.setItem('blom_cart_count', cartCount.toString());
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('cart:updated'));
    
    showNotification(`${productName} added to cart!`);
}

function updateCartDisplay() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
        
        // Add bounce animation
        element.classList.add('cart-bounce');
        setTimeout(() => element.classList.remove('cart-bounce'), 600);
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
}

function syncCartCount() {
    const storedCount = localStorage.getItem('blom_cart_count');
    if (storedCount) {
        cartCount = parseInt(storedCount);
        updateCartDisplay();
    }
}

// ===== SCROLL ANIMATIONS ===== //
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for trust items
                if (entry.target.classList.contains('trust-item')) {
                    entry.target.classList.add('is-in');
                }
            }
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in, .trust-item').forEach(el => {
        observer.observe(el);
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    
    // Add staggered delays to trust items
    document.querySelectorAll('.trust-item').forEach((item, index) => {
        item.style.setProperty('--delay', `${index * 100}ms`);
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
}

// ===== FORM HANDLERS ===== //
function initFormHandlers() {
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
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }

    // Footer newsletter subscription
    document.querySelectorAll('.newsletter').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                showNotification('Thank you for subscribing!');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }

    // Hero buttons
    const heroBtnPrimary = document.querySelector('.hero-btn-primary');
    if (heroBtnPrimary) {
        heroBtnPrimary.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'shop.html';
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }

    const heroBtnSecondary = document.querySelector('.hero-btn-secondary');
    if (heroBtnSecondary) {
        heroBtnSecondary.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'courses.html';
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }

    // Education button
    const educationBtn = document.querySelector('.education-btn, .myc__cta');
    if (educationBtn) {
        educationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'courses.html';
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }

    // View all products button
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'shop.html';
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }

    // Social media links
    document.querySelectorAll('.social-link').forEach(link => {
        if (!link.href || link.href === '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Opening social media page...');
            }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
        }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }

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
                }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
            }
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }

    // FAQ functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
            
            // Toggle current item
            if (isActive) {
                faqItem.classList.remove('active');
            } else {
                faqItem.classList.add('active');
            }
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
}

// ===== UTILITY FUNCTIONS ===== //
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification-toast');
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

// ===== GLOBAL FUNCTIONS FOR EXTERNAL SCRIPTS ===== //
window.Cart = {
    add: addToCart,
    getCount: () => cartCount,
    getTotal: () => 0 // Placeholder
};

// Initialize video autoplay when visible
function initVideoAutoplay() {
    const video = document.querySelector('.myc__image video');
    if (!video) return;
    
    // Create intersection observer for video autoplay
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Video is visible, play it
                video.play().catch(error => {
                    console.log('Video autoplay failed:', error);
                }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
            } else {
                // Video is not visible, pause it
                video.pause();
            }
        }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    }, {
        threshold: 0.5 // Play when 50% of video is visible
    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }
    
    observer.observe(video);
}

// Update year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
