// Shop page functionality with clean minimal design
document.addEventListener('DOMContentLoaded', function() {
    // Global filter state
    window.shopState = {
        category: 'all',
        search: '',
        sort: 'featured'
    };
    
    // Initialize all functionality
    initFilters();
    initSearch();
    initSorting();
    initCartFunctionality();
    
    // Apply initial state
    applyFiltersAndSort();
    
    console.log('Shop page loaded successfully!');
});

// Initialize category filters
function initFilters() {
    const categoryFilters = document.querySelectorAll('.filter-pill');
    
    categoryFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category || 'all';
            
            // Update state
            shopState.category = category;
            
            // Update UI
            updateCategoryFilterUI(category);
            
            // Apply filters
            applyFiltersAndSort();
        });
    });
}

// Update category filter UI
function updateCategoryFilterUI(activeCategory) {
    document.querySelectorAll('.filter-pill').forEach(btn => {
        const isActive = btn.dataset.category === activeCategory;
        
        if (isActive) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('product-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            shopState.search = this.value.toLowerCase().trim();
            applyFiltersAndSort();
        });
    }
}

// Initialize sorting functionality
function initSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            shopState.sort = this.value;
            applyFiltersAndSort();
        });
    }
}

// Apply filters and sorting
function applyFiltersAndSort() {
    const productCards = document.querySelectorAll('.shop-card');
    const emptyState = document.getElementById('empty-state');
    const resultsCount = document.getElementById('results-count');
    let visibleCount = 0;
    
    // Filter products
    productCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const productName = card.querySelector('.shop-card-title')?.textContent.toLowerCase() || '';
        
        let shouldShow = true;
        
        // Category filter
        if (shopState.category && shopState.category !== 'all' && cardCategory !== shopState.category) {
            shouldShow = false;
        }
        
        // Search filter
        if (shopState.search && !productName.includes(shopState.search)) {
            shouldShow = false;
        }
        
        if (shouldShow) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update product count
    if (resultsCount) {
        resultsCount.textContent = `${visibleCount} product${visibleCount !== 1 ? 's' : ''}`;
    }
    
    // Handle empty state
    if (visibleCount === 0) {
        if (emptyState) emptyState.style.display = 'block';
    } else {
        if (emptyState) emptyState.style.display = 'none';
    }
    
    // Apply sorting
    if (shopState.sort) {
        sortProductsInGrid(shopState.sort);
    }
}

// Sort products in grid
function sortProductsInGrid(sortType) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    
    const cards = Array.from(productGrid.querySelectorAll('.shop-card:not([style*="display: none"])'));
    
    cards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price) || 0;
        const priceB = parseInt(b.dataset.price) || 0;
        const popularityA = parseInt(a.dataset.popularity) || 0;
        const popularityB = parseInt(b.dataset.popularity) || 0;
        
        switch (sortType) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'featured':
            default:
                return popularityB - popularityA;
        }
    });
    
    // Reorder DOM elements
    cards.forEach(card => {
        productGrid.appendChild(card);
    });
}

// Clear all filters
function clearAllFilters() {
    const searchInput = document.getElementById('product-search');
    
    // Reset search
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Reset state
    shopState.category = 'all';
    shopState.search = '';
    shopState.sort = 'featured';
    
    // Update UI
    updateCategoryFilterUI('all');
    
    // Reset sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.value = 'featured';
    }
    
    applyFiltersAndSort();
}

// Cart functionality
function initCartFunctionality() {
    const cartCountElement = document.querySelector('.cart-count');
    let cartCount = parseInt(cartCountElement?.textContent) || 0;

    // Add to cart functionality
    document.querySelectorAll('.shop-card-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productName = this.dataset.product;
            if (productName) {
                addToCart(productName);
            }
        });
    });
    
    // Add to cart function
    function addToCart(productName) {
        cartCount++;
        if (cartCountElement) cartCountElement.textContent = cartCount;
        
        // Store in localStorage
        localStorage.setItem('blom_cart_count', cartCount.toString());
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('cart:updated'));
        
        // Add bounce animation
        if (cartCountElement) {
            cartCountElement.classList.add('cart-bounce');
            setTimeout(() => cartCountElement.classList.remove('cart-bounce'), 600);
        }
        
        showNotification(`${productName} added to cart!`);
    }
    
    // Sync cart count on load
    const storedCount = localStorage.getItem('blom_cart_count');
    if (storedCount) {
        cartCount = parseInt(storedCount);
        if (cartCountElement) cartCountElement.textContent = cartCount;
    }
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Apply styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        backgroundColor: 'var(--brand-accent)',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',
        fontSize: '14px',
        boxShadow: '0 8px 25px rgba(255, 116, 164, 0.4)',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}