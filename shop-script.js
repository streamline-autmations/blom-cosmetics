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
    const productCards = document.querySelectorAll('.card');
    const productGrid = document.getElementById('product-grid');
    let visibleCount = 0;
    
    // Filter products
    productCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardCollection = card.dataset.collection;
        const productName = card.querySelector('.card__name')?.textContent.toLowerCase() || '';
        const productDesc = card.querySelector('.card__desc')?.textContent.toLowerCase() || '';
        
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
        showEmptyState();
    } else {
        hideEmptyState();
    }
    
    // Apply current sorting
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect && sortSelect.value) {
        sortProductsInGrid(sortSelect.value);
    }
}
// Filter functionality
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter
            filterBtns.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Update current filters
            currentFilters.category = this.dataset.category || 'all';
            currentFilters.collection = this.dataset.collection || null;
            
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
    
    const cards = Array.from(productGrid.querySelectorAll('.card:not([style*="display: none"])'));
    
    cards.sort((a, b) => {
        switch (sortType) {
            case 'price-low':
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case 'price-high':
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case 'newest':
                return new Date(b.dataset.date) - new Date(a.dataset.date);
            case 'best-sellers':
                return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
            default:
                return 0;
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
    const cartFabCount = document.getElementById('cart-fab-count');
    
    let cartCount = parseInt(cartCountElement.textContent) || 0;

    // Add to cart functionality
    document.querySelectorAll('.btn').forEach(button => {
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
        if (cartFabCount) {
            cartFabCount.textContent = cartCount;
        }
        
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
        if (cartFabCount) {
            cartFabCount.textContent = cartCount;
        }
    }
    
    // Cart FAB click handler
    const cartFabBtn = document.querySelector('.cart-fab-btn');
    if (cartFabBtn) {
        cartFabBtn.addEventListener('click', function() {
            showNotification('Opening cart...', 'success');
        });
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

// Show empty state when no products match filters
function showEmptyState() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    
    const existingEmptyState = document.querySelector('.empty-state');
    if (existingEmptyState) return;
    
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
        <h3>No products found</h3>
        <p>Try adjusting your filters or browse all products</p>
        <button onclick="showAllProducts()">Show All Products</button>
    `;
    
    productGrid.appendChild(emptyState);
}

// Hide empty state
function hideEmptyState() {
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
}

// Global function to show all products
window.showAllProducts = function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('product-search');
    
    // Reset all filters
    filterBtns.forEach(f => f.classList.remove('active'));
    const allBtn = document.querySelector('[data-category="all"]');
    if (allBtn) allBtn.classList.add('active');
    
    currentFilters.category = 'all';
    currentFilters.collection = null;
    currentFilters.search = '';
    
    if (searchInput) searchInput.value = '';
    applyFiltersAndSort();
};