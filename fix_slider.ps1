# Fix hero slider issues
$content = Get-Content script.js -Raw

# Fix 1: Change autoplay interval from 5000 to 6000
$content = $content -replace 'slideInterval = setInterval\(nextSlide, 5000\);', 'slideInterval = setInterval(nextSlide, 6000);'

# Fix 2: Add debugging to initHeroSlider
$content = $content -replace 'function initHeroSlider\(\) \{', 'function initHeroSlider() { console.log("Initializing hero slider...");'

# Fix 3: Add more debugging after slides check
$content = $content -replace 'if \(slides\.length === 0\) return;', 'if (slides.length === 0) return; console.log("Found slides:", slides.length); console.log("Found dots:", dots.length); console.log("Found prev button:", !!prevBtn); console.log("Found next button:", !!nextBtn);'

# Fix 4: Add pause on hover functionality
$content = $content -replace '    \}\);', '    }); // Pause autoplay on hover const heroSlider = document.querySelector(".hero-slider"); if (heroSlider) { heroSlider.addEventListener("mouseenter", stopAutoPlay); heroSlider.addEventListener("mouseleave", startAutoPlay); }'

# Fix 5: Add debugging to startAutoPlay
$content = $content -replace 'function startAutoPlay\(\) \{', 'function startAutoPlay() { console.log("Starting autoplay...");'

# Fix 6: Add error handling to setInterval
$content = $content -replace '    slideInterval = setInterval\(nextSlide, 6000\);', '    slideInterval = setInterval(() => { try { nextSlide(); } catch (error) { console.log("Slider error:", error); stopAutoPlay(); } }, 6000);'

# Write the fixed content back
Set-Content script.js $content
Write-Host "Hero slider fixes applied successfully!"
