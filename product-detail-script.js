// Product data store
const PRODUCTS = {
    'cuticle-oil': {
        handle: 'cuticle-oil',
        title: 'Cuticle Oil',
        priceZar: 85,
        compareAtZar: 100,
        images: ['public/cuticle-oil-01.webp', 'public/cuticle-oil-02.webp', 'public/cuticle-oil-03.webp'],
        category: 'Nail Essentials',
        collections: ['Nail Essentials'],
        variants: [
            { key: 'scent', value: 'Cotton Candy', image: 'public/cuticle-oil-01.webp' },
            { key: 'scent', value: 'Vanilla', image: 'public/cuticle-oil-02.webp' },
            { key: 'scent', value: 'Tiny Touch', image: 'public/cuticle-oil-03.webp' },
            { key: 'scent', value: 'Dragon Fruit Lotus', image: 'public/cuticle-oil-03.webp' },
            { key: 'scent', value: 'Watermelon', image: 'public/cuticle-oil-03.webp' }
        ],
        defaultVariant: 'Cotton Candy',
        stock: 'in',
        features: [
            'Fast-absorbing formula that won\'t leave greasy residue',
            'Strengthens and nourishes cuticles and nail beds',
            'Available in 5 delightful scents',
            'Cruelty-free and eco-friendly formulation'
        ],
        description: 'Our premium cuticle oil is specially formulated to nourish and strengthen your cuticles and nail beds. Made with natural ingredients and available in five delightful scents, this fast-absorbing formula provides deep hydration without leaving any greasy residue.',
        howTo: 'Apply a small drop to each cuticle area. Gently massage in circular motions. Use daily for best results, especially before bedtime. Can be used on nail beds and surrounding skin.',
        ingredients: 'Jojoba Oil, Vitamin E, Sweet Almond Oil, Argan Oil, Natural Fragrance, Tocopherol',
        badges: ['Cruelty-Free', 'Eco-Friendly', 'SA-Made'],
        relatedHandles: ['nail-forms', 'designer-nail-file', 'top-coat'],
        discountTiers: [
            { qty: 3, percent: 5 },
            { qty: 5, percent: 10 }
        ],
        features: [
            'Fast-absorbing formula that won\'t leave greasy residue',
            'Strengthens and nourishes cuticles and nail beds',
            'Available in 5 delightful scents',
            'Cruelty-free and eco-friendly formulation'
        ],
        description: 'Our premium cuticle oil is specially formulated to nourish and strengthen your cuticles and nail beds. Made with natural ingredients and available in five delightful scents, this fast-absorbing formula provides deep hydration without leaving any greasy residue.',
        howTo: 'Apply a small drop to each cuticle area. Gently massage in circular motions. Use daily for best results, especially before bedtime. Can be used on nail beds and surrounding skin.',
        ingredients: 'Jojoba Oil, Vitamin E, Sweet Almond Oil, Argan Oil, Natural Fragrance, Tocopherol',
        badges: ['Cruelty-Free', 'Eco-Friendly', 'SA-Made'],
        relatedHandles: ['nail-forms', 'designer-nail-file', 'top-coat'],
        discountTiers: [
            { qty: 3, percent: 5 },
            { qty: 5, percent: 10 }
        ],
        rating: 4.8,
        ratingCount: 127
    },
    'nail-forms': {
        handle: 'nail-forms',
        title: 'Premium Nail Forms',
        priceZar: 45,
        images: ['public/nail-forms-01.webp'],
        category: 'Nail Essentials',
        collections: ['Nail Essentials'],
        stock: 'in',
        badges: ['SA-Made', 'Pro-Grade'],
        rating: 4.6,
        ratingCount: 89
    },
    'designer-nail-file': {
        handle: 'designer-nail-file',
        title: 'Designer Nail File',
        priceZar: 35,
        images: ['public/designer-file-01.webp'],
        category: 'Nail Essentials',
        collections: ['Nail Essentials'],
        stock: 'in',
        badges: ['Eco-Friendly'],
        rating: 4.7,
        ratingCount: 156
    },
    'top-coat': {
        handle: 'top-coat',
        title: 'Top Coat',
        priceZar: 160,
        images: ['public/top-coat-01.webp'],
        category: 'Top & Base Coats',
        collections: ['Top & Base Coat'],
        stock: 'in',
        badges: ['Pro-Grade'],
        rating: 4.5,
        ratingCount: 203
    },
    'fairy-dust-top-coat': {
        handle: 'fairy-dust-top-coat',
        title: 'Fairy Dust Top Coat',
        priceZar: 180,
        images: ['public/fairy-dust-top-coat-01.webp'],
        category: 'Top & Base Coats',
        collections: ['Top & Base Coat'],
        stock: 'low',
        badges: ['Pro-Grade', 'Glam'],
        rating: 4.9,
        ratingCount: 78
    },
    'vitamin-primer': {
        handle: 'vitamin-primer',
        title: 'Vitamin Primer',
        priceZar: 140,
        images: ['public/vitamin-primer-01.webp'],
        category: 'Prep & Prime',
        collections: ['Prep & Primers'],
        stock: 'in',
        badges: ['Cruelty-Free'],
        rating: 4.4,
        ratingCount: 134
    },
    'prep': {
        handle: 'prep',
        title: 'Prep',
        priceZar: 120,
        images: ['public/prep-01.webp'],
        category: 'Prep & Prime',
        collections: ['Prep & Primers'],
        stock: 'in',
        badges: ['Pro-Grade'],
        rating: 4.6,
        ratingCount: 167
    },
    'acrylic-powder-core': {
        handle: 'acrylic-powder-core',
        title: 'Acrylic Powder Core',
        priceZar: 320,
        images: ['public/acrylic-powder-core-01.webp'],
        category: 'Acrylic Powders',
        collections: ['Acrylic Powders'],
        stock: 'in',
        badges: ['Pro-Grade'],
        rating: 4.7,
        ratingCount: 145
    },
    'nail-liquid': {
        handle: 'nail-liquid',
        title: 'Nail Liquid',
        priceZar: 280,
        images: ['public/nail-liquid-01.webp'],
        category: 'Nail Liquid',
        collections: ['Nail Liquid'],
        stock: 'in',
        badges: ['Pro-Grade'],
        rating: 4.8,
        ratingCount: 198
    },
    'base-coat': {
        handle: 'base-coat',
        title: 'Base Coat',
        priceZar: 150,
        images: ['public/base-coat-01.webp'],
        category: 'Top & Base Coats',
        collections: ['Top & Base Coat'],
        stock: 'in',
        badges: ['Pro-Grade'],
        rating: 4.6,
        ratingCount: 176
    }
};

// Global state
let currentProduct = null;
let selectedVariant = null;
let activeImageSrc = null;
let quantity = 1;
let selectedRating = 0;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Get product handle from URL or default to cuticle-oil
    const urlParams = new URLSearchParams(window.location.search);
    const productHandle = urlParams.get('product') || 'cuticle-oil';
    
    loadProduct(productHandle);
    initializeComponents();
    
    console.log('Product detail page loaded successfully!');
});

// Load product data
function loadProduct(handle) {
    currentProduct = PRODUCTS[handle];
    if (!currentProduct) {
        currentProduct = PRODUCTS['cuticle-oil']; // Fallback
    }
    
    // Initialize variant state
    initializeVariantState();
    
    renderProduct();
}

// Initialize variant state
function initializeVariantState() {
    const urlParams = new URLSearchParams(window.location.search);
    const variantParam = urlParams.get('variant');
    
    if (currentProduct.variants && currentProduct.variants.length > 0) {
        // Try to find variant from URL parameter
        let targetVariant = null;
        if (variantParam) {
            targetVariant = currentProduct.variants.find(v => v.value === variantParam);
        }
        
        // Fallback to default or first variant
        if (!targetVariant) {
            if (currentProduct.defaultVariant) {
                targetVariant = currentProduct.variants.find(v => v.value === currentProduct.defaultVariant);
            }
            if (!targetVariant) {
                targetVariant = currentProduct.variants[0];
            }
        }
        
        selectedVariant = targetVariant;
        activeImageSrc = targetVariant.image;
    } else {
        selectedVariant = null;
        activeImageSrc = currentProduct.images[0];
    }
}

// Render product
function renderProduct() {
    if (!currentProduct) return;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-product').textContent = currentProduct.title;
    
    // Update title and price
    document.getElementById('product-title').textContent = currentProduct.title;
    document.getElementById('product-price').textContent = formatZAR(currentProduct.priceZar);
    
    // Compare at price
    const comparePrice = document.getElementById('compare-price');
    if (currentProduct.compareAtZar) {
        comparePrice.textContent = formatZAR(currentProduct.compareAtZar);
        comparePrice.style.display = 'inline';
    } else {
        comparePrice.style.display = 'none';
    }
    
    // Stock chip
    updateStockChip();
    
    // Media carousel
    renderMediaCarousel();
    
    // Variants
    renderVariants();
    
    // Badges
    renderBadges();
    
    // Accordions
    renderAccordions();
    
    // Related products
    renderRelatedProducts();
    
    // Update mobile sticky
    document.getElementById('sticky-price').textContent = formatZAR(currentProduct.priceZar);
}

// Media Carousel Component
function renderMediaCarousel() {
    const mainImage = document.getElementById('main-image');
    const thumbnailsContainer = document.getElementById('thumbnails-container');
    
    // Get carousel images based on variants or product images
    let carouselImages;
    if (currentProduct.variants && currentProduct.variants.length > 0) {
        // Get unique images from variants
        carouselImages = [...new Set(currentProduct.variants.map(v => v.image))];
    } else {
        // Use product images
        carouselImages = currentProduct.images;
    }
    
    if (carouselImages.length > 0) {
        // Set initial image
        mainImage.src = activeImageSrc || carouselImages[0];
        mainImage.alt = currentProduct.title;
        
        // Clear and rebuild thumbnails
        thumbnailsContainer.innerHTML = '';
        
        carouselImages.forEach((image, index) => {
            const button = document.createElement('button');
            const isActive = image === activeImageSrc || (index === 0 && !activeImageSrc);
            button.className = `thumbnail-btn flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden ring-2 ${isActive ? 'ring-pink-500' : 'ring-transparent hover:ring-gray-300'} shadow-sm transition-all`;
            button.dataset.image = image;
            button.innerHTML = `<img src="${image}" alt="Thumbnail ${index + 1}" class="w-full h-full object-cover">`;
            
            button.addEventListener('click', () => {
                updateActiveImage(image);
            });
            
            thumbnailsContainer.appendChild(button);
        });
    }
}

// Update active image in carousel
function updateActiveImage(imageSrc) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = imageSrc;
    activeImageSrc = imageSrc;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail-btn').forEach(btn => {
        const isActive = btn.dataset.image === imageSrc;
        btn.className = 'thumbnail-btn flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden ring-2 shadow-sm transition-all';
        if (isActive) {
            btn.className += ' ring-pink-500';
        } else {
            btn.className += ' ring-transparent hover:ring-gray-300';
        }
    });
}

// Stock Chip Component
function updateStockChip() {
    const stockChip = document.getElementById('stock-chip');
    const stock = currentProduct.stock || 'in';
    
    stockChip.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';
    
    switch (stock) {
        case 'in':
            stockChip.className += ' bg-green-100 text-green-800';
            stockChip.innerHTML = '<div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>In Stock';
            break;
        case 'low':
            stockChip.className += ' bg-yellow-100 text-yellow-800';
            stockChip.innerHTML = '<div class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>Low Stock';
            break;
        case 'out':
            stockChip.className += ' bg-red-100 text-red-800';
            stockChip.innerHTML = '<div class="w-2 h-2 bg-red-400 rounded-full mr-2"></div>Sold Out';
            break;
    }
}

// Variants Component
function renderVariants() {
    const variantsContainer = document.getElementById('variants-container');
    
    if (!currentProduct.variants || currentProduct.variants.length === 0) {
        variantsContainer.style.display = 'none';
        return;
    }
    
    variantsContainer.style.display = 'block';
    variantsContainer.innerHTML = '';
    
    // Group variants by key
    const variantGroups = {};
    currentProduct.variants.forEach(variant => {
        if (!variantGroups[variant.key]) {
            variantGroups[variant.key] = [];
        }
        variantGroups[variant.key].push(variant);
    });
    
    // Render each variant group
    Object.entries(variantGroups).forEach(([key, variants]) => {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        
        const scentDiv = document.createElement('div');
        scentDiv.className = 'space-y-3';
        scentDiv.innerHTML = `
            <label class="text-sm font-semibold text-gray-900 uppercase tracking-wide">${capitalizedKey}</label>
            <div class="flex flex-wrap gap-2" id="${key}-pills"></div>
        `;
        
        const pillsContainer = scentDiv.querySelector(`#${key}-pills`);
        variants.forEach((variant, index) => {
            const pill = document.createElement('button');
            const isSelected = selectedVariant && selectedVariant.value === variant.value;
            pill.className = `variant-pill px-4 py-2 text-sm font-medium rounded-full border-2 transition-all ${isSelected ? 'border-pink-500 text-pink-500 bg-pink-50' : 'border-gray-200 text-gray-700 hover:border-pink-500 hover:text-pink-500'}`;
            pill.dataset.variant = key;
            pill.dataset.value = variant.value;
            pill.dataset.image = variant.image;
            pill.textContent = variant.value;
            pill.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
            
            pill.addEventListener('click', () => selectVariant(variant, pill));
            pillsContainer.appendChild(pill);
        });
        
        variantsContainer.appendChild(scentDiv);
    });
}

// Select variant
function selectVariant(variant, element) {
    selectedVariant = variant;
    activeImageSrc = variant.image;
    
    // Update variant pills UI
    const pills = document.querySelectorAll(`[data-variant="${variant.key}"]`);
    pills.forEach(pill => {
        pill.className = pill.className.replace('border-pink-500 text-pink-500 bg-pink-50', 'border-gray-200 text-gray-700 hover:border-pink-500 hover:text-pink-500');
        pill.setAttribute('aria-pressed', 'false');
    });
    
    element.className = element.className.replace('border-gray-200 text-gray-700 hover:border-pink-500 hover:text-pink-500', 'border-pink-500 text-pink-500 bg-pink-50');
    element.setAttribute('aria-pressed', 'true');
    
    // Update carousel image
    updateActiveImage(variant.image);
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('variant', variant.value);
    window.history.replaceState({}, '', url);
}

// Badges Component
function renderBadges() {
    const badgesContainer = document.getElementById('badges-container');
    
    if (!currentProduct.badges) {
        badgesContainer.style.display = 'none';
        return;
    }
    
    badgesContainer.innerHTML = '';
    
    currentProduct.badges.forEach(badge => {
        const span = document.createElement('span');
        span.className = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium';
        
        switch (badge) {
            case 'Cruelty-Free':
                span.className += ' bg-green-100 text-green-800';
                break;
            case 'Eco-Friendly':
                span.className += ' bg-blue-100 text-blue-800';
                break;
            case 'SA-Made':
                span.className += ' bg-purple-100 text-purple-800';
                break;
            case 'Pro-Grade':
                span.className += ' bg-indigo-100 text-indigo-800';
                break;
            case 'Glam':
                span.className += ' bg-pink-100 text-pink-800';
                break;
            default:
                span.className += ' bg-gray-100 text-gray-800';
        }
        
        span.textContent = badge;
        badgesContainer.appendChild(span);
    });
}

// Accordions Component
function renderAccordions() {
    // Features
    if (currentProduct.features) {
        const featuresContent = document.getElementById('features-content');
        featuresContent.innerHTML = `
            <ul class="list-disc list-inside space-y-1">
                ${currentProduct.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
    }
    
    // Description
    if (currentProduct.description) {
        document.getElementById('description-content').innerHTML = `<p>${currentProduct.description}</p>`;
    }
    
    // How to use
    if (currentProduct.howTo) {
        document.getElementById('howto-content').innerHTML = `<p>${currentProduct.howTo}</p>`;
    }
    
    // Ingredients
    if (currentProduct.ingredients) {
        document.getElementById('ingredients-content').innerHTML = `<p>${currentProduct.ingredients}</p>`;
    }
}

// Related Products Component
function renderRelatedProducts() {
    const relatedContainer = document.getElementById('related-products');
    
    if (!currentProduct.relatedHandles) {
        relatedContainer.parentElement.style.display = 'none';
        return;
    }
    
    relatedContainer.innerHTML = '';
    
    currentProduct.relatedHandles.slice(0, 4).forEach(handle => {
        const product = PRODUCTS[handle];
        if (!product) return;
        
        const card = document.createElement('div');
        card.className = 'group cursor-pointer';
        card.innerHTML = `
            <div class="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden hover:shadow-lg hover:ring-blom-pink transition-all">
                <div class="aspect-square overflow-hidden bg-white">
                    <img src="${product.images[0]}" alt="${product.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">${product.title}</h3>
                    <div class="text-lg font-bold text-gray-900">${formatZAR(product.priceZar)}</div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            window.location.href = `product-detail.html?product=${handle}`;
        });
        
        relatedContainer.appendChild(card);
    });
}

// Initialize components
function initializeComponents() {
    // Quantity stepper
    document.getElementById('qty-decrease').addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            document.getElementById('quantity').value = quantity;
            updateDiscountWidget();
        }
    });
    
    document.getElementById('qty-increase').addEventListener('click', () => {
        if (quantity < 99) {
            quantity++;
            document.getElementById('quantity').value = quantity;
            updateDiscountWidget();
        }
    });
    
    document.getElementById('quantity').addEventListener('change', (e) => {
        quantity = Math.max(1, Math.min(99, parseInt(e.target.value) || 1));
        e.target.value = quantity;
        updateDiscountWidget();
    });
    
    // Add to cart
    document.getElementById('add-to-cart').addEventListener('click', addToCart);
    document.querySelector('#mobile-sticky button').addEventListener('click', addToCart);
    
    // Write review
    document.getElementById('write-review-btn').addEventListener('click', () => {
        const form = document.getElementById('review-form');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });
    
    // Star rating
    document.querySelectorAll('.star-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            selectedRating = parseInt(btn.dataset.rating);
            updateStarDisplay();
        });
    });
    
    // Initial discount widget update
    updateDiscountWidget();
}

// Update discount widget
function updateDiscountWidget() {
    if (!currentProduct.discountTiers) {
        document.getElementById('discount-widget').style.display = 'none';
        return;
    }
    
    const savingsDisplay = document.getElementById('savings-display');
    let activeDiscount = null;
    
    // Find applicable discount
    for (const tier of currentProduct.discountTiers.sort((a, b) => b.qty - a.qty)) {
        if (quantity >= tier.qty) {
            activeDiscount = tier;
            break;
        }
    }
    
    if (activeDiscount) {
        const savings = Math.round(currentProduct.priceZar * quantity * (activeDiscount.percent / 100));
        savingsDisplay.textContent = `You save R${savings} (${activeDiscount.percent}%)`;
        savingsDisplay.style.display = 'block';
    } else {
        savingsDisplay.style.display = 'none';
    }
}

// Add to cart
function addToCart() {
    const cartCount = document.querySelector('.cart-count');
    let count = parseInt(cartCount.textContent) || 0;
    count += quantity;
    cartCount.textContent = count;
    
    // Add bounce animation
    cartCount.classList.add('cart-bounce');
    setTimeout(() => cartCount.classList.remove('cart-bounce'), 600);
    
    // Show notification
    const variantText = selectedVariant ? ` (${selectedVariant.value})` : '';
    showNotification(`${currentProduct.title}${variantText} added to cart!`);
    
    // Store in localStorage
    localStorage.setItem('blom_cart_count', count.toString());
}

// Update star display
function updateStarDisplay() {
    document.querySelectorAll('.star-btn').forEach((btn, index) => {
        if (index < selectedRating) {
            btn.className = btn.className.replace('text-gray-300', 'text-yellow-400');
        } else {
            btn.className = btn.className.replace('text-yellow-400', 'text-gray-300');
        }
    });
}

// Utility functions
function formatZAR(amount) {
    return `R${amount.toFixed(2)}`;
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-6 bg-blom-pink text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform`;
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

// Initialize mobile navigation
function initMobileAccordions() {
    document.querySelectorAll('.mobile-accordion-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const content = this.nextElementSibling;
            const icon = this.querySelector('.mobile-accordion-icon');
            const isActive = content.classList.contains('active');
            
            // Close all other accordions
            document.querySelectorAll('.mobile-accordion-content').forEach(acc => {
                acc.classList.remove('active');
            });
            document.querySelectorAll('.mobile-accordion-toggle').forEach(t => {
                t.classList.remove('active');
                const i = t.querySelector('.mobile-accordion-icon');
                if (i) i.style.transform = 'rotate(0deg)';
            });
            
            // Toggle current accordion
            if (!isActive) {
                content.classList.add('active');
                this.classList.add('active');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// Call mobile accordion init
initMobileAccordions();