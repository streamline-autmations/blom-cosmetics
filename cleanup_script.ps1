# Clean up duplicate comments in script.js
$content = Get-Content script.js -Raw

# Remove all the duplicate "Pause autoplay on hover" comments
$content = $content -replace '; // Pause autoplay on hover const heroSlider = document\.querySelector\("\.hero-slider"\); if \(heroSlider\) \{ heroSlider\.addEventListener\("mouseenter", stopAutoPlay\); heroSlider\.addEventListener\("mouseleave", startAutoPlay\); \}', ';'

# Write the cleaned content back
Set-Content script.js $content
Write-Host "Cleaned up duplicate comments successfully!"
