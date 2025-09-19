// ===== HERO SLIDER ===== //
function initHeroSlider() {
    console.log('Initializing hero slider...');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    console.log('Found slides:', slides.length);
    console.log('Found dots:', dots.length);
    console.log('Found prev button:', !!prevBtn);
    console.log('Found next button:', !!nextBtn);
    
    // Initialize hero slider
    
    if (slides.length === 0) return;
    
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
    
    // Pause autoplay on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoPlay);
        heroSlider.addEventListener('mouseleave', startAutoPlay);
    }
}

function startAutoPlay() {
    console.log('Starting autoplay...');
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    
    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
        slideInterval = setInterval(() => {
            try {
                nextSlide();
            } catch (error) {
                console.log('Slider error:', error);
                stopAutoPlay();
            }
        }, 6000);
    }, 100);
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
    showSlide(currentSlide);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    currentSlide = newIndex;
    showSlide(currentSlide);
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
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
}
