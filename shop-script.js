// Shop page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Global filter state
    window.currentFilters = {
        category: 'all',
        collection: null,
        search: ''
    };
    
    // Initialize filters and sorting
    initFilters();
    initSorting();
    initSearch();
    
    // Initialize cart functionality
    initCartFunctionality();
    
    // Apply initial filters
    applyFiltersAndSort();
    
    console.log('Shop page loaded successfully!');
});

// Apply filters and sorting
function applyFiltersAndSort() {
    const productCards = document.querySelectorAll('.product-card');
    const productGrid = document.getElementById('product-grid');
    const emptyState = document.getElementById('empty-state');
    let visibleCount = 0;
    
    // Filter products
    productCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardCollection = card.dataset.collection;
        const productName = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const productDesc = card.querySelector('p')?.textContent.toLowerCase() || '';
        
        let shouldShow = true;
        
        // Category filter
        if (currentFilters.category && currentFilters.category !== 'all' && cardCategory !== currentFilters.category) {
            shouldShow = false;
        }
        
        // Collection filter
        if (currentFilters.collection && cardCollection !== currentFilters.collection) {
            shouldShow = false;
        }
        
        // Search filter
        if (currentFilters.search && !productName.includes(currentFilters.search) && !productDesc.includes(currentFilters.search)) {
            shouldShow = false;
        }
        
        if (shouldShow) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update product count
    const countElement = document.getElementById('results-count');
    if (countElement) {
        countElement.textContent = `${visibleCount} products`;
    }
    
    // Handle empty state
    if (visibleCount === 0) {
        if (emptyState) emptyState.classList.remove('hidden');
    } else {
        if (emptyState) emptyState.classList.add('hidden');
    }
    
    // Apply current sorting
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect && sortSelect.value) {
        sortProductsInGrid(sortSelect.value);
    }
}

// Filter functionality
function initFilters() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const collectionFilters = document.querySelectorAll('.collection-filter');
    
    // Category filters
    categoryFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active category filter
            categoryFilters.forEach(f => {
                f.classList.remove('active', 'bg-pink-500', 'text-white');
                f.classList.add('bg-gray-100', 'text-gray-800');
            });
            this.classList.add('active', 'bg-pink-500', 'text-white');
            this.classList.remove('bg-gray-100', 'text-gray-800');
            
            // Update current filters
            currentFilters.category = this.dataset.category || 'all';
            
            // Apply filters
            applyFiltersAndSort();
        });
    });
    
    // Collection filters
    collectionFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Toggle collection filter
            collectionFilters.forEach(f => {
                f.classList.remove('active', 'bg-purple-500', 'text-white');
                f.classList.add('bg-gray-100', 'text-gray-800');
            });
            
            if (!isActive) {
                this.classList.add('active', 'bg-purple-500', 'text-white');
                this.classList.remove('bg-gray-100', 'text-gray-800');
                currentFilters.collection = this.dataset.collection;
            } else {
                currentFilters.collection = null;
            }
            
            // Apply filters
            applyFiltersAndSort();
        });
    });
}

// Sorting functionality
function initSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            applyFiltersAndSort();
        });
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('product-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentFilters.search = this.value.toLowerCase();
            applyFiltersAndSort();
        });
    }
}

// Sort products in grid
function sortProductsInGrid(sortType) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    
    const cards = Array.from(productGrid.querySelectorAll('.product-card:not([style*="display: none"])'));
    
    cards.sort((a, b) => {
        switch (sortType) {
            case 'price-low':
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case 'price-high':
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case 'top-rated':
                return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
            case 'featured':
            default:
                return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
        }
    });
    
    // Reorder DOM elements
    cards.forEach(card => {
        productGrid.appendChild(card);
    });
}

// Cart functionality
function initCartFunctionality() {
    const cartCountElement = document.querySelector('.cart-count');
    
    let cartCount = parseInt(cartCountElement?.textContent) || 0;

    // Add to cart functionality
    document.querySelectorAll('[data-product]').forEach(button => {
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

// Clear all filters
function clearAllFilters() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const collectionFilters = document.querySelectorAll('.collection-filter');
    const searchInput = document.getElementById('product-search');
    
    // Reset category filters
    categoryFilters.forEach(f => {
        f.classList.remove('active', 'bg-pink-500', 'text-white');
        f.classList.add('bg-gray-100', 'text-gray-800');
    });
    const allBtn = document.querySelector('[data-category="all"]');
    if (allBtn) {
        allBtn.classList.add('active', 'bg-pink-500', 'text-white');
        allBtn.classList.remove('bg-gray-100', 'text-gray-800');
    }
    
    // Reset collection filters
    collectionFilters.forEach(f => {
        f.classList.remove('active', 'bg-purple-500', 'text-white');
        f.classList.add('bg-gray-100', 'text-gray-800');
    });
    
    // Reset search
    if (searchInput) searchInput.value = '';
    
    // Reset filters
    currentFilters.category = 'all';
    currentFilters.collection = null;
    currentFilters.search = '';
    
    applyFiltersAndSort();
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
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}