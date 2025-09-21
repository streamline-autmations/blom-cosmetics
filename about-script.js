// About Page Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.story-content, .vision-card, .mission-card, .value-card, .education-content, .closing-cta-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Floating petals animation enhancement
    const petals = document.querySelectorAll('.petal');
    petals.forEach((petal, index) => {
        // Add random movement
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;
        
        petal.style.animationDelay = `${randomDelay}s`;
        petal.style.animationDuration = `${randomDuration}s`;
        
        // Add mouse interaction
        petal.addEventListener('mouseenter', () => {
            petal.style.animationPlayState = 'paused';
            petal.style.transform = 'scale(1.2) rotate(45deg)';
        });
        
        petal.addEventListener('mouseleave', () => {
            petal.style.animationPlayState = 'running';
            petal.style.transform = '';
        });
    });

    // Card hover effects enhancement
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Vision/Mission card hover effects
    const visionMissionCards = document.querySelectorAll('.vision-card, .mission-card');
    visionMissionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button glow effects
    const buttons = document.querySelectorAll('.hero-cta-btn, .education-btn, .cta-shop, .cta-courses');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = '0 15px 40px rgba(255, 116, 164, 0.6)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '';
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.about-hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Smooth scroll for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #FF74A4, #d4e7ff);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    const loadingText = document.createElement('div');
    loadingText.textContent = 'BLOM';
    loadingText.style.cssText = `
        font-size: 48px;
        font-weight: 800;
        color: white;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        animation: pulse 1.5s ease-in-out infinite;
    `;
    
    loadingOverlay.appendChild(loadingText);
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
});