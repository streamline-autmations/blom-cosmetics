// Shop page functionality with minimal gallery design
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
    
    console.log('Minimal gallery shop page loaded successfully!');
});

// Initialize category filters
function initFilters() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    
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
    document.querySelectorAll('.category-filter').forEach(btn => {
        const isActive = btn.dataset.category === activeCategory;
        
        // Reset classes
        btn.className = 'category-filter px-3 py-1 rounded-full text-sm font-medium transition-all focus-visible:ring-pink';
        
        if (isActive) {
            btn.className += ' bg-pink-500 text-white hover:bg-pink-600';
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.className += ' bg-gray-100 text-gray-800 hover:bg-gray-200';
            btn.setAttribute('aria-pressed', 'false');
        }
        
        // Handle flex-shrink-0 for mobile
        if (btn.classList.contains('flex-shrink-0')) {
            btn.className += ' flex-shrink-0';
        }
    });
}

// Initialize search functionality
function initSearch() {
    const searchInputs = document.querySelectorAll('#product-search, #product-search-mobile');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            shopState.search = this.value.toLowerCase().trim();
            
            // Sync both search inputs
            searchInputs.forEach(otherInput => {
                if (otherInput !== this) {
                    otherInput.value = this.value;
                }
            });
            
            applyFiltersAndSort();
        });
    });
}

// Initialize sorting functionality
function initSorting() {
    const sortSelects = document.querySelectorAll('#sort-select, #sort-select-mobile');
    
    sortSelects.forEach(select => {
        select.addEventListener('change', function() {
            shopState.sort = this.value;
            
            // Sync both sort selects
            sortSelects.forEach(otherSelect => {
                if (otherSelect !== this) {
                    otherSelect.value = this.value;
                }
            });
            
            applyFiltersAndSort();
        });
    });
}

// Apply filters and sorting
function applyFiltersAndSort() {
    const productCards = document.querySelectorAll('.product-card');
    const emptyState = document.getElementById('empty-state');
    const resultsCounts = document.querySelectorAll('#results-count, #results-count-mobile');
    let visibleCount = 0;
    
    // Filter products
    productCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const productName = card.querySelector('h3')?.textContent.toLowerCase() || '';
        
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
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update product count
    resultsCounts.forEach(countElement => {
        if (countElement) {
            countElement.textContent = `${visibleCount} product${visibleCount !== 1 ? 's' : ''}`;
        }
    });
    
    // Handle empty state
    if (visibleCount === 0) {
        if (emptyState) emptyState.classList.remove('hidden');
    } else {
        if (emptyState) emptyState.classList.add('hidden');
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
    
    const cards = Array.from(productGrid.querySelectorAll('.product-card:not([style*="display: none"])'));
    
    cards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price) || 0;
        const priceB = parseInt(b.dataset.price) || 0;
        const popularityA = parseInt(a.dataset.popularity) || 0;
        const popularityB = parseInt(b.dataset.popularity) || 0;
        
        switch (sortType) {
            case 'price-asc':
                return priceA - priceB;
            case 'price-desc':
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
    const searchInputs = document.querySelectorAll('#product-search, #product-search-mobile');
    
    // Reset search
    searchInputs.forEach(input => {
        if (input) input.value = '';
    });
    
    // Reset state
    shopState.category = 'all';
    shopState.search = '';
    shopState.sort = 'featured';
    
    // Update UI
    updateCategoryFilterUI('all');
    
    // Reset sort selects
    document.querySelectorAll('#sort-select, #sort-select-mobile').forEach(select => {
        if (select) select.value = 'featured';
    });
    
    applyFiltersAndSort();
}

// Cart functionality
function initCartFunctionality() {
    const cartCountElement = document.querySelector('.cart-count');
    let cartCount = parseInt(cartCountElement?.textContent) || 0;

    // Add to cart functionality (both quick add and regular)
    document.querySelectorAll('button[data-product]').forEach(button => {
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
    notification.className = `fixed top-24 right-6 bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}