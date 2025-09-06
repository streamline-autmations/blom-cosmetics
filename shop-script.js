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
        // Reset category filter to "All Products"
        categoryFilters.forEach(f => f.classList.remove('active'));
        document.querySelector('[data-category="all"]').classList.add('active');
        filterProducts('all');
    };

    // Product card hover effects
    productCards.forEach(card => {
        const addToCartBtn = card.querySelector('.btn-add-cart');
        
        card.addEventListener('mouseenter', function() {
            addToCartBtn.style.transform = 'translateY(0)';
            addToCartBtn.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            addToCartBtn.style.transform = 'translateY(10px)';
            addToCartBtn.style.opacity = '0.9';
        });
    });

    // Initialize page
    console.log('BLOM Cosmetics Shop page loaded successfully!');
    
    // Initialize announcement bar
    initAnnouncementBar();
    
    // Set initial button states
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.style.transform = 'translateY(10px)';
        btn.style.opacity = '0.9';
        btn.style.transition = 'all 0.3s ease';
    });
});

// Announcement Bar Functionality
function initAnnouncementBar() {
    const messages = document.querySelectorAll('.announcement-message');
    let currentMessage = 0;
    
    // Auto-rotate messages every 5 seconds
    setInterval(() => {
        // Hide current message
        messages[currentMessage].classList.remove('active');
        
        // Move to next message
        currentMessage = (currentMessage + 1) % messages.length;
        
        // Show next message
        messages[currentMessage].classList.add('active');
    }, 5000);
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