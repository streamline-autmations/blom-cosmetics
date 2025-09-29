// Course Pages Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initScrollAnimations();
    initAccordionAnimations();
    initPackageHoverEffects();
    initFormAnimations();
    initParallaxEffects();
    initProgressIndicators();
    
    console.log('Course interactions loaded successfully!');
    
    // Initialize button functionality
    initButtonFunctionality();
});

// Initialize button functionality
function initButtonFunctionality() {
    // Global functions for button interactions
    window.scrollToBooking = function() {
        const bookingSection = document.getElementById('booking-section');
        if (bookingSection) {
            bookingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    window.selectPackage = function(packageName) {
        const packageSelect = document.getElementById('selected-package');
        if (packageSelect) {
            packageSelect.value = packageName;
            // Trigger validation if available
            if (typeof validateField === 'function') {
                validateField(packageSelect);
            }
            // Update submit button state if available
            if (typeof updateSubmitButtonState === 'function') {
                updateSubmitButtonState();
            }
        }
        
        // Scroll to booking form
        if (typeof scrollToBooking === 'function') {
            scrollToBooking();
        }
        
        // Show notification if available
        if (typeof showNotification === 'function') {
            showNotification(`${packageName} package selected!`, 'success');
        }
    };
    
    window.toggleAccordion = function(index) {
        const content = document.getElementById(`accordion-${index}`);
        const item = content.closest('.accordion-item');
        const icon = item.querySelector('.accordion-icon');
        
        // Check if this accordion is currently active
        const isActive = content.classList.contains('active');
        
        // Close all accordions first
        document.querySelectorAll('.accordion-content').forEach(acc => {
            acc.classList.remove('active');
            const accordionItem = acc.closest('.accordion-item');
            accordionItem.classList.remove('active');
            const accordionIcon = accordionItem.querySelector('.accordion-icon');
            if (accordionIcon) {
                accordionIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        // If the clicked accordion was not active, open it
        if (!isActive) {
            content.classList.add('active');
            item.classList.add('active');
            if (icon) {
                icon.style.transform = 'rotate(180deg)';
            }
        }
    };
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for lists
                if (entry.target.classList.contains('learning-list')) {
                    animateListItems(entry.target);
                }
                
                // Package cards fade in without pulse animation
                if (entry.target.classList.contains('package-card')) {
                    // No additional animation needed
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('section, .package-card, .info-card, .accordion-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Animate list items with stagger effect
function animateListItems(list) {
    const items = list.querySelectorAll('li');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 50);
        }, index * 100);
    });
}

// Enhanced accordion animations
function initAccordionAnimations() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const item = this.closest('.accordion-item');
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Smooth height transition
            if (content.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                setTimeout(() => {
                    content.style.maxHeight = '0px';
                }, 10);
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                setTimeout(() => {
                    content.style.maxHeight = 'none';
                }, 300);
            }
        });
    });
}

// Package card hover effects
function initPackageHoverEffects() {
    document.querySelectorAll('.package-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            
            // Add glow effect to deluxe package
            if (this.classList.contains('deluxe-package')) {
                this.style.boxShadow = '0 20px 40px rgba(255, 116, 164, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
            
            if (this.classList.contains('deluxe-package')) {
                this.style.boxShadow = '0 8px 30px rgba(255, 116, 164, 0.2)';
            }
        });
    });
}

// Form input animations
function initFormAnimations() {
    document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            this.style.transform = 'scale(1)';
        });
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
}

// Parallax effects for hero section
function initParallaxEffects() {
    const hero = document.querySelector('.course-hero');
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero-background');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Progress indicators for course sections
function initProgressIndicators() {
    const sections = document.querySelectorAll('section');
    const progressBar = createProgressBar();
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #FF74A4 0%, #CEE5FF 100%);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    return progressBar;
}

// Enhanced button interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        // Create ripple effect
        createRippleEffect(e.target, e);
    }
});

function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .form-group.focused label {
        color: #FF74A4;
        transform: translateY(-2px);
    }
    
    .form-group input.has-value {
        border-color: #10B981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    .package-card:hover .package-price {
        transform: scale(1.1);
        color: #FF5A96;
    }
    
    .info-card:hover .info-icon {
        transform: scale(1.1) rotate(5deg);
    }
    
    .accordion-item.active .accordion-header {
        background: linear-gradient(135deg, #FF74A4 0%, #CEE5FF 100%);
        color: #FFFFFF;
    }
    
    .learning-list li:hover {
        color: #FF74A4;
        transform: translateX(8px);
    }
    
    .hero-detail-item:hover {
        transform: translateY(-4px) scale(1.05);
    }
`;
document.head.appendChild(style);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for form submissions
function showLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    button.classList.add('loading');
    
    // Add spinner
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 8px;
    `;
    button.insertBefore(spinner, button.firstChild);
    
    return function hideLoadingState() {
        button.textContent = originalText;
        button.disabled = false;
        button.classList.remove('loading');
        spinner.remove();
    };
}

// Export functions for external use
window.CourseInteractions = {
    showLoadingState,
    createRippleEffect,
    animateListItems
};
