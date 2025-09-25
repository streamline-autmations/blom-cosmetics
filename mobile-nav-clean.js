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
  }
  
  openMenu() {
    this.isOpen = true;
    this.drawer.classList.add('active');
    this.overlay.classList.add('active');
    this.toggle.classList.add('active');
    this.toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    console.log('Mobile menu opened');
  }
  
  closeMenu() {
    this.isOpen = false;
    this.drawer.classList.remove('active');
    this.overlay.classList.remove('active');
    this.toggle.classList.remove('active');
    this.toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    
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
