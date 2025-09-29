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
    // Ensure consistent, standard drawer exists and matches Home page structure
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

    // Standardized menu content (no accordions, direct links)
    const standardHtml = `
      <div class="mobile-nav-header">
        <img src="public/blom_logo.png" alt="BLOM Cosmetics" class="logo-image" style="height: 40px;">
        <button class="mobile-nav-close" aria-label="Close menu">×</button>
      </div>
      <div class="mobile-search">
        <input type="text" class="mobile-search-input" placeholder="Search products...">
      </div>
      <nav class="mobile-nav-content" role="navigation" aria-label="Mobile navigation">
        <div class="mobile-nav-item"><a href="index.html" class="mobile-nav-link">Home</a></div>
        <div class="mobile-nav-item"><a href="shop.html" class="mobile-nav-link">Shop</a></div>
        <div class="mobile-nav-item"><a href="courses.html" class="mobile-nav-link">Courses & Blog</a></div>
        <div class="mobile-nav-item"><a href="about.html" class="mobile-nav-link">About</a></div>
        <div class="mobile-nav-item"><a href="contact.html" class="mobile-nav-link">Contact</a></div>
      </nav>
    `;

    // Replace existing drawer content to guarantee consistency
    this.drawer.innerHTML = standardHtml;

    // Refresh references that depend on content
    this.closeBtn = this.drawer.querySelector('.mobile-nav-close');
  }

  ensureBindings() {
    // Re-acquire toggle in case DOM changed
    if (!this.toggle) {
      this.toggle = document.querySelector('.mobile-nav-toggle');
    }
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

    // Make any accordion-style buttons act as direct links (no empty dropdowns)
    const toggles = this.drawer.querySelectorAll('.mobile-accordion-toggle');
    toggles.forEach(toggle => {
      const labelEl = toggle.querySelector('span');
      const label = (labelEl ? labelEl.textContent : toggle.textContent || '').trim().toLowerCase();
      let href = '';
      if (label.startsWith('shop')) href = 'shop.html';
      else if (label.startsWith('courses')) href = 'courses.html';
      else if (label.startsWith('about')) href = 'about.html';
      else if (label.startsWith('contact')) href = 'contact.html';
      else if (label.startsWith('home')) href = 'index.html';

      if (href) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = href;
        });
      }
    });
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
