// About Us page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const ctaShopBtns = document.querySelectorAll('.cta-shop');
    const ctaCoursesBtns = document.querySelectorAll('.cta-courses');
    const educationBtn = document.querySelector('.education-btn');
    const heroCTABtn = document.querySelector('.hero-cta-btn');
    const notificationToast = document.getElementById('notification-toast');
    
    // Hero CTA button functionality
    if (heroCTABtn) {
        heroCTABtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Welcome to our collection...');
            
            setTimeout(() => {
                window.location.href = 'shop.html';
            }, 1000);
        });
    }

    // Shop buttons functionality
    ctaShopBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Redirecting to our product collection...');
            
            setTimeout(() => {
                window.location.href = 'shop.html';
            }, 1000);
        });
    });

    // Courses buttons functionality
    ctaCoursesBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Opening our educational hub...');
            
            setTimeout(() => {
                window.location.href = 'courses.html';
            }, 1000);
        });
    });

    // Education button functionality
    if (educationBtn) {
        educationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Exploring our courses...');
            
            setTimeout(() => {
                window.location.href = 'courses.html';
            }, 1000);
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
    document.querySelectorAll('.story-content, .vision-mission-content, .values-grid, .education-content, .closing-cta-content').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    console.log('BLOM Cosmetics About Us page loaded successfully!');
    
});

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