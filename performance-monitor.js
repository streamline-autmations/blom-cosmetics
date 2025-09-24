// Performance monitoring script
// Add this to your HTML to monitor performance metrics

(function() {
  'use strict';
  
  // Monitor Core Web Vitals
  function measurePerformance() {
    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            console.log('FCP:', entry.startTime + 'ms');
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    }
    
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime + 'ms');
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    // Cumulative Layout Shift
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        console.log('CLS:', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }
  
  // Monitor resource loading times
  function monitorResources() {
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 1000) { // Log resources taking more than 1 second
            console.warn('Slow resource:', entry.name, entry.duration + 'ms');
          }
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
    }
  }
  
  // Run monitoring when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      measurePerformance();
      monitorResources();
    });
  } else {
    measurePerformance();
    monitorResources();
  }
  
  // Log page load time
  window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
    
    // Alert if page is slow
    if (loadTime > 3000) {
      console.warn('⚠️ Page is loading slowly! Consider optimizing resources.');
    }
  });
})();
