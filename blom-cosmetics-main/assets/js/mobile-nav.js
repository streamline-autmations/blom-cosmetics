// Mobile Navigation - Clean Implementation
class MobileNavigation {
  constructor() {
    this.toggle = document.querySelector('.mobile-nav-toggle');
    this.overlay = document.getElementById('mobile-nav-overlay');
    this.drawer = document.getElementById('mobile-nav-drawer');
    this.closeBtn = document.querySelector('.mobile-nav-close');
    this.isOpen = false;
    this.init();
  }
  
  init() {
    // Ensure all pages use the Home page burger drawer structure
    this.ensureStandardDrawer();
    this.ensureBindings();
  }

  ensureStandardDrawer() {
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.id = 'mobile-nav-overlay';
      this.overlay.className = 'mobile-nav-overlay';
      document.body.appendChild(this.overlay);
    }
    if (!this.drawer) {
      this.drawer = document.createElement('div');
      this.drawer.id = 'mobile-nav-drawer';
      this.drawer.className = 'mobile-nav-drawer';
      document.body.appendChild(this.drawer);
    }

    // Copy of Home page drawer (with accordion toggles and chevrons)
    const homeDrawerHtml = `
      <div class="mobile-nav-header">
        <img src="public/blom_logo.png" alt="BLOM Cosmetics" class="logo-image" style="height: 40px;">
        <button class="mobile-nav-close" aria-label="Close menu">×</button>
      </div>
      <div class="mobile-search">
        <input type="text" class="mobile-search-input" placeholder="Search products...">
      </div>
      <nav class="mobile-nav-content" role="navigation" aria-label="Mobile navigation">
        <div class="mobile-nav-item">
          <a href="index.html" class="mobile-nav-link">Home</a>
        </div>
        <div class="mobile-nav-item">
          <button class="mobile-accordion-toggle" aria-expanded="false">
            <span>Shop</span>
            <svg class="mobile-accordion-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </button>
          <div class="mobile-accordion-content">
            <a href="shop.html" class="mobile-accordion-link">All Products</a>
            <a href="shop.html" class="mobile-accordion-link">Acrylic System</a>
            <a href="shop.html" class="mobile-accordion-link">Gel System</a>
            <a href="shop.html" class="mobile-accordion-link">Prep & Finishing</a>
            <a href="shop.html" class="mobile-accordion-link">Tools & Essentials</a>
            <a href="shop.html" class="mobile-accordion-link">New In</a>
            <a href="shop.html" class="mobile-accordion-link">Best Sellers</a>
          </div>
        </div>
        <div class="mobile-nav-item">
          <button class="mobile-accordion-toggle" aria-expanded="false">
            <span>Courses & Blog</span>
            <svg class="mobile-accordion-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </button>
          <div class="mobile-accordion-content">
            <a href="professional-acrylic-training.html" class="mobile-accordion-link">Professional Acrylic Training</a>
            <a href="online-watercolour-workshop.html" class="mobile-accordion-link">Online Watercolour Workshop</a>
            <a href="courses.html" class="mobile-accordion-link">All Courses</a>
            <a href="courses.html" class="mobile-accordion-link">Blog & Tips</a>
          </div>
        </div>
        <div class="mobile-nav-item"><a href="about.html" class="mobile-nav-link">About</a></div>
        <div class="mobile-nav-item"><a href="contact.html" class="mobile-nav-link">Contact</a></div>
      </nav>
    `;

    this.drawer.innerHTML = homeDrawerHtml;
    this.closeBtn = this.drawer.querySelector('.mobile-nav-close');
  }

  ensureBindings() {
    if (!this.toggle) this.toggle = document.querySelector('.mobile-nav-toggle');
    if (!this.toggle || !this.overlay || !this.drawer) {
      console.warn('Mobile navigation elements not found');
      return;
    }
    this.bindEvents();
    console.log('Mobile navigation initialized');
  }
  
  bindEvents() {
    // Toggle button
    this.toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleMenu();
    });
    
    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeMenu();
      });
    }
    
    // Overlay click
    this.overlay.addEventListener('click', () => {
      this.closeMenu();
    });
    
    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
    
    // Close on link click
    const links = this.drawer.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });

    // Keep page-specific menu structure; no auto-conversion of toggles
  }
  
  openMenu() {
    this.isOpen = true;
    this.drawer.classList.add('active');
    this.overlay.classList.add('active');
    this.toggle.classList.add('active');
    this.toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Hide announcement bar while menu is open to avoid covering the drawer
    try {
      var banner = document.getElementById('announcement-banner');
      if (banner) banner.classList.add('hidden');
    } catch(e) {}
    
    console.log('Mobile menu opened');
  }
  
  closeMenu() {
    this.isOpen = false;
    this.drawer.classList.remove('active');
    this.overlay.classList.remove('active');
    this.toggle.classList.remove('active');
    this.toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // Restore announcement bar when closing the menu
    try {
      var banner = document.getElementById('announcement-banner');
      if (banner) banner.classList.remove('hidden');
    } catch(e) {}
    
    console.log('Mobile menu closed');
  }
  
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MobileNavigation();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new MobileNavigation();
  });
} else {
  new MobileNavigation();
}
