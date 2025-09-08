// Shop page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize filters and sorting
    initFilters();
    initSorting();
    initSearch();
    initCarousel();
    
    // Initialize cart functionality
    initCartFunctionality();
    
    console.log('Shop page loaded successfully!');
});

// Filter functionality
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter
            filterBtns.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            const collection = this.dataset.collection;
            
            // Filter products
            productCards.forEach(card => {
                const cardCategory = card.dataset.category;
                const cardCollection = card.dataset.collection;
                
                let shouldShow = true;
                
                if (category && category !== 'all' && cardCategory !== category) {
                    shouldShow = false;
                }
                
                if (collection && cardCollection !== collection) {
                    shouldShow = false;
                }
                
                if (shouldShow) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Sorting functionality
function initSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            sortProducts(sortValue);
        });
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('product-search');
    const productCards = document.querySelectorAll('.card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            productCards.forEach(card => {
                const productName = card.querySelector('.card__name').textContent.toLowerCase();
                const productDesc = card.querySelector('.card__desc').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Sort products
function sortProducts(sortType) {
    const productGrid = document.getElementById('product-grid');
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

// Carousel functionality
function initCarousel() {
    const track = document.getElementById('featured-track');
    const prevBtn = document.getElementById('featured-prev');
    const nextBtn = document.getElementById('featured-next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const cardWidth = 274;
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
    
    updateCarousel();
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
        cartCountElement.textContent = cartCount;
        if (cartFabCount) {
            cartFabCount.textContent = cartCount;
        }
        
        // Store in localStorage
        localStorage.setItem('blom_cart_count', cartCount.toString());
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('cart:updated'));
        
        // Add bounce animation
        cartCountElement.classList.add('cart-bounce');
        setTimeout(() => cartCountElement.classList.remove('cart-bounce'), 600);
        
        showNotification(`${productName} added to cart!`);
    }
    
    // Sync cart count on load
    const storedCount = localStorage.getItem('blom_cart_count');
    if (storedCount) {
        cartCount = parseInt(storedCount);
        cartCountElement.textContent = cartCount;
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