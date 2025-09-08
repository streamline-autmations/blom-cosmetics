// Shop page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const categoryFilters = document.querySelectorAll('.category-filter');
    const sortSelect = document.getElementById('sort-select');
    const productGrid = document.getElementById('product-grid');
    const productCards = document.querySelectorAll('.product-card');
    const cartCountElement = document.querySelector('.cart-count');
    const cartIcon = document.querySelector('.cart-icon');
    const notificationToast = document.getElementById('notification-toast');
    
    let cartCount = parseInt(cartCountElement.textContent) || 0;

    // Category filtering
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active filter
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const selectedCategory = this.dataset.category;
            filterProducts(selectedCategory);
        });
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

    // Filter products by category
    function filterProducts(category) {
        productCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
                card.style.display = 'flex';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
        
        // Check if any products are visible
        const visibleCards = document.querySelectorAll('.product-card:not(.hidden)');
        if (visibleCards.length === 0) {
            showEmptyState();
        } else {
            hideEmptyState();
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
                case 'popular':
                    // For demo purposes, sort by price (in real app, would use popularity data)
                    return parseInt(b.dataset.price) - parseInt(a.dataset.price);
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
        // Reset all filters
        filterBtns.forEach(f => f.classList.remove('active'));
        document.querySelector('[data-category="all"]').classList.add('active');
        currentFilters = { category: 'all', collection: null, search: '' };
        searchInput.value = '';
        applyFilters();
    };
    
    // Initialize featured carousel
    initFeaturedCarousel();
    
    // Initialize with all products
    applyFilters();
});

// Featured carousel functionality
function initFeaturedCarousel() {
    const track = document.getElementById('featured-track');
    const prevBtn = document.getElementById('featured-prev');
    const nextBtn = document.getElementById('featured-next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const cardWidth = 274; // 250px + 24px gap
    const visibleCards = 4;
    const totalCards = track.children.length;
    const maxIndex = Math.max(0, totalCards - visibleCards);
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Initialize
    updateCarousel();
}
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