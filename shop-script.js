// Shop page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const productGrid = document.getElementById('product-grid');
    const productCards = document.querySelectorAll('.product-card');
    const cartCountElement = document.querySelector('.cart-count');
    const cartIcon = document.querySelector('.cart-icon');
    const notificationToast = document.getElementById('notification-toast');
    const searchInput = document.getElementById('product-search');
    const resultsCount = document.getElementById('results-count');
    
    let cartCount = parseInt(cartCountElement.textContent) || 0;
    let currentFilters = {
        category: 'all',
        collection: null,
        search: ''
    };

    // Filter functionality
    filterBtns.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active filter
            const filterGroup = this.parentElement;
            filterGroup.querySelectorAll('.filter-btn').forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Update current filters
            if (this.dataset.category) {
                currentFilters.category = this.dataset.category;
                currentFilters.collection = null;
            } else if (this.dataset.collection) {
                currentFilters.collection = this.dataset.collection;
            }
            
            applyFilters();
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        currentFilters.search = this.value.toLowerCase().trim();
        applyFilters();
    });

    // Sorting functionality
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        sortProducts(sortValue);
    });

    // Add to cart functionality
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent card click
            
            const productName = this.dataset.product;
            addToCart(productName);
        });
    });

    // Apply all filters
    function applyFilters() {
        let visibleCount = 0;
        
        productCards.forEach(card => {
            let isVisible = true;
            
            // Category filter
            if (currentFilters.category !== 'all' && card.dataset.category !== currentFilters.category) {
                isVisible = false;
            }
            
            // Collection filter
            if (currentFilters.collection && card.dataset.collection !== currentFilters.collection) {
                isVisible = false;
            }
            
            // Search filter
            if (currentFilters.search) {
                const productName = card.querySelector('.product-name').textContent.toLowerCase();
                if (!productName.includes(currentFilters.search)) {
                    isVisible = false;
                }
            }
            
            // Show/hide card
            if (isVisible) {
                card.classList.remove('hidden');
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
        
        // Update results count
        updateResultsCount(visibleCount);
        
        // Show/hide empty state
        if (visibleCount === 0) {
            showEmptyState();
        } else {
            hideEmptyState();
        }
    }

    // Update results count
    function updateResultsCount(count) {
        if (currentFilters.search) {
            resultsCount.textContent = `Found ${count} products for "${currentFilters.search}"`;
        } else if (currentFilters.collection) {
            resultsCount.textContent = `Showing ${count} ${currentFilters.collection.replace('-', ' ')} products`;
        } else if (currentFilters.category !== 'all') {
            resultsCount.textContent = `Showing ${count} ${currentFilters.category.replace('-', ' ')} products`;
        } else {
            resultsCount.textContent = `Showing ${count} products`;
        }
    }

    // Sort products
    function sortProducts(sortType) {
        const visibleCards = Array.from(document.querySelectorAll('.product-card:not(.hidden)'));
        
        visibleCards.sort((a, b) => {
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
        const productGrid = document.getElementById('product-grid');
        visibleCards.forEach(card => {
            productGrid.appendChild(card);
        });
        
        // Add loading animation
        productGrid.classList.add('loading');
        setTimeout(() => {
            productGrid.classList.remove('loading');
        }, 500);
    }

    // Add to cart function
    function addToCart(productName) {
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Add bounce animation to cart
        cartCountElement.classList.add('updated');
        cartIcon.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            cartCountElement.classList.remove('updated');
            cartIcon.style.transform = 'scale(1)';
        }, 600);
        
        // Show notification
        showNotification(`${productName} added to your cart`);
    }

    // Show notification toast
    function showNotification(message) {
        notificationToast.textContent = message;
        notificationToast.classList.add('show');
        
        setTimeout(() => {
            notificationToast.classList.remove('show');
        }, 3000);
    }

    // Show empty state when no products match filters
    function showEmptyState() {
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
        // Reset category filter to "All Products"
        categoryFilters.forEach(f => f.classList.remove('active'));
        document.querySelector('[data-category="all"]').classList.add('active');
        filterProducts('all');
    };
        const addToCartBtn = card.querySelector('.btn-add-cart');
        
        card.addEventListener('mouseenter', function() {
            addToCartBtn.style.transform = 'translateY(0)';
            addToCartBtn.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
        }
        )
}
)
function dismissAnnouncementBar() {
    const announcementBar = document.getElementById('announcement-bar');
    announcementBar.classList.add('hidden');
    
    // Store dismissal in localStorage so it stays dismissed
    localStorage.setItem('announcementBarDismissed', 'true');
}

// Check if announcement bar was previously dismissed
document.addEventListener('DOMContentLoaded', function() {
    const isDismissed = localStorage.getItem('announcementBarDismissed');
    if (isDismissed === 'true') {
        const announcementBar = document.getElementById('announcement-bar');
        if (announcementBar) {
            announcementBar.classList.add('hidden');
        }
    }
});