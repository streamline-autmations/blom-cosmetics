// New Hero Slider - Rebuilt from scratch
class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.hero-dot');
        this.prevBtn = document.querySelector('.hero-prev');
        this.nextBtn = document.querySelector('.hero-next');
        this.autoplayInterval = null;
        this.autoplayDelay = 6000; // 6 seconds
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) {
            console.log('No hero slides found');
            return;
        }
        
        console.log('Hero slider initialized with', this.slides.length, 'slides');
        
        // Start autoplay
        this.startAutoplay();
        
        // Add event listeners
        this.addEventListeners();
        
        // Show first slide
        this.showSlide(0);
    }
    
    addEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.restartAutoplay();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.restartAutoplay();
            });
        }
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.restartAutoplay();
            });
        });
        
        // Pause on hover
        const slider = document.querySelector('.new-hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => this.stopAutoplay());
            slider.addEventListener('mouseleave', () => this.startAutoplay());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.restartAutoplay();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.restartAutoplay();
            }
        });
    }
    
    showSlide(index) {
        if (index < 0 || index >= this.slides.length) return;
        
        // Remove active class from all slides and dots
        this.slides.forEach(slide => slide.classList.remove('hero-slide-active'));
        this.dots.forEach(dot => dot.classList.remove('hero-dot-active'));
        
        // Add active class to current slide and dot
        this.slides[index].classList.add('hero-slide-active');
        if (this.dots[index]) {
            this.dots[index].classList.add('hero-dot-active');
        }
        
        this.currentSlide = index;
        console.log('Showing slide', index);
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoplay() {
        this.stopAutoplay(); // Clear any existing interval
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
        console.log('Autoplay started');
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
            console.log('Autoplay stopped');
        }
    }
    
    restartAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
}

// Global instance for onclick handlers
let heroSlider;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    heroSlider = new HeroSlider();
});

// Expose methods globally for onclick handlers
window.heroSlider = {
    nextSlide: () => heroSlider?.nextSlide(),
    prevSlide: () => heroSlider?.prevSlide(),
    goToSlide: (index) => heroSlider?.goToSlide(index)
};
