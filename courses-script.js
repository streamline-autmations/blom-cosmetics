// Courses & Blog page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const workshopBtn = document.querySelector('.workshop-btn');
    const forumBtn = document.querySelector('.forum-btn');
    const blogLinks = document.querySelectorAll('.blog-link');
    const notificationToast = document.getElementById('notification-toast');
    
    // Workshop booking functionality
    if (workshopBtn) {
        workshopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Workshop booking system opening...');
            
            // In a real application, this would open a booking modal or redirect to booking page
            setTimeout(() => {
                showNotification('Redirecting to workshop booking page...', 'info');
            }, 1500);
        });
    }

    // Forum button functionality
    if (forumBtn) {
        forumBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Opening community forum...');
            
            // In a real application, this would redirect to the forum
            setTimeout(() => {
                showNotification('Forum access requires account login', 'info');
            }, 1500);
        });
    }

    // Blog link functionality
    blogLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const blogTitle = this.closest('.blog-card').querySelector('.blog-title').textContent;
            showNotification(`Opening: ${blogTitle}`);
            
            // In a real application, this would navigate to the full blog post
            setTimeout(() => {
                showNotification('Blog post loading...', 'info');
            }, 1000);
        });
    });

    // Newsletter subscription (footer)
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
    document.querySelectorAll('.workshop-content, .blog-card, .forum-content').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
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

    console.log('BLOM Cosmetics Courses & Blog page loaded successfully!');
    
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

// Workshop booking simulation
function bookWorkshop() {
    showNotification('Workshop booking confirmed! Check your email for details.');
}

// Forum access simulation
function accessForum() {
    showNotification('Welcome to the BLOM Community Forum!');
}