// Product data store with comprehensive variants and information
const PRODUCTS = {
    'cuticle-oil': {
        handle: 'cuticle-oil',
        title: 'Cuticle Oil',
        priceZar: 85,
        compareAtZar: 100,
        images: ['public/cuticle-oil-01.webp', 'public/cuticle-oil-02.webp', 'public/cuticle-oil-03.webp', 'public/cuticle-oil-04.webp', 'public/cuticle-oil-05aa.webp'],
        category: 'Nail Essentials',
        collections: ['Nail Essentials'],
        variants: [
            { key: 'scent', value: 'Cotton Candy', image: 'public/cuticle-oil-01.webp' },
            { key: 'scent', value: 'Vanilla', image: 'public/cuticle-oil-02.webp' },
            { key: 'scent', value: 'Tiny Touch', image: 'public/cuticle-oil-03.webp' },
            { key: 'scent', value: 'Dragon Fruit Lotus', image: 'public/cuticle-oil-04.webp' },
            { key: 'scent', value: 'Watermelon', image: 'public/cuticle-oil-05aa.webp' }
        ],
        defaultVariant: 'Cotton Candy',
        stock: 'in',
        description: 'Nourishing cuticle oil enriched with Vitamin E, Soybean, and Jojoba oil. Handmade in South Africa. Non-greasy, quick absorbing.',
        features: [
            '100% cruelty-free formula',
            'Luxurious blend strengthens nails',
            'Hydrates skin without greasy residue',
            'Available in 5 delightful scents',
            'Handmade in South Africa'
        ],
        howTo: 'Apply twice daily, massage into cuticles and surrounding skin. Use morning and evening for best results.',
        ingredients: 'Vitamin E, Soybean Oil, Jojoba Oil, Natural Fragrance',
        badges: ['Cruelty-Free', 'SA-Made', 'Handmade'],
        relatedHandles: ['nail-forms', 'designer-nail-file', 'vitamin-primer'],
        rating: 4.8,
        ratingCount: 127,
        reviews: [
            { id: 1, name: 'Sarah M.', rating: 5, date: '2024-12-15', verified: true, title: 'Amazing quality!', text: 'The Cotton Candy scent is absolutely divine and the oil absorbs so well. My cuticles have never looked better!' },
            { id: 2, name: 'Michelle K.', rating: 5, date: '2024-12-10', verified: true, title: 'Professional quality', text: 'I use this in my salon and clients always ask what I\'m using. The Vanilla scent is so relaxing during treatments.' },
            { id: 3, name: 'Jaundré P.', rating: 4, date: '2024-12-08', verified: false, title: 'Great product', text: 'Really good quality oil. The Tiny Touch scent is my favorite. Will definitely order again.' }
        ]
    },
    'nail-forms': {
        handle: 'nail-forms',
        title: 'Premium Nail Forms',
        priceZar: 45,
        images: ['public/nail-forms-01.webp'],
        category: 'Nail Essentials',
        collections: ['Nail Essentials'],
        stock: 'in',
        description: 'Sculpting forms with luxury pink floral design and holographic sculpting grid.',
        features: [
            '300 forms per roll',
            'Strong adhesive backing',
            'Split design for extreme lengths',
            'Suitable for almond/stiletto/coffin shapes',
            'Luxury pink floral design'
        ],
        howTo: 'Apply form to natural nail, ensuring proper fit. Sculpt with acrylic or gel over the form. Remove form after curing.',
        ingredients: 'N/A (Professional tool)',
        badges: ['Pro-Grade', 'SA-Made'],
        relatedHandles: ['acrylic-powder-core', 'nail-liquid', 'designer-nail-file'],
        rating: 4.6,
        ratingCount: 89,
        reviews: [
            { id: 1, name: 'Lisa R.', rating: 5, date: '2024-12-12', verified: true, title: 'Perfect for extensions', text: 'These forms hold so well and the grid makes shaping so much easier. Love the pink design!' },
            { id: 2, name: 'Tanya B.', rating: 4, date: '2024-12-05', verified: true, title: 'Good quality', text: 'Strong adhesive and easy to work with. Great for coffin shapes.' }
        ]
    },
    'designer-nail-file': {
        handle: 'designer-nail-file',
        title: '80/80 Designer Nail File',
        priceZar: 35,
        images: ['public/designer-file-01.webp'],
        category: 'Nail Essentials',
        collections: ['Nail Essentials'],
        variants: [
            { key: 'quantity', value: 'Single File', price: 35, image: 'public/designer-file-01.webp' },
            { key: 'quantity', value: '5-Pack Bundle', price: 150, image: 'public/designer-file-01.webp' }
        ],
        defaultVariant: 'Single File',
        stock: 'in',
        description: 'High-quality designer nail files, durable 80/80 grit with eco sponge core.',
        features: [
            'Long-lasting durability',
            'Beautiful flower design won\'t rub off',
            '80/80 grit perfect for shaping',
            'Eco-friendly sponge core',
            'Professional salon quality'
        ],
        howTo: 'Shape natural or acrylic nails in one direction. Use gentle, consistent strokes for best results.',
        ingredients: 'N/A (Professional tool)',
        badges: ['Eco-Friendly', 'Pro-Grade'],
        relatedHandles: ['cuticle-oil', 'nail-forms', 'base-coat'],
        rating: 4.7,
        ratingCount: 156,
        reviews: [
            { id: 1, name: 'Amanda S.', rating: 5, date: '2024-12-14', verified: true, title: 'Love the design!', text: 'Beautiful files that last forever. The 5-pack is great value for money.' },
            { id: 2, name: 'Nicole T.', rating: 4, date: '2024-12-09', verified: true, title: 'Good quality', text: 'Perfect grit for shaping. The flower design is so pretty and doesn\'t wear off.' }
        ]
    },
    'top-coat': {
        handle: 'top-coat',
        title: 'Top Coat',
        priceZar: 160,
        images: ['public/top-coat-01.webp'],
        category: 'Top & Base Coats',
        collections: ['Top & Base Coat'],
        stock: 'in',
        description: 'Strong protective top coat with mirror-gloss shine. Works on gel and acrylic.',
        features: [
            '15ml professional size',
            'Long-lasting protection',
            'Salon-grade durability',
            'Mirror-gloss finish',
            'Compatible with gel and acrylic'
        ],
        howTo: 'Apply after color application. Cure under LED/UV lamp for gel systems or allow to air-dry for regular polish.',
        ingredients: 'Acrylates Copolymer, Ethyl Acetate, Photoinitiator',
        badges: ['Pro-Grade', 'Salon-Quality'],
        relatedHandles: ['base-coat', 'fairy-dust-top-coat', 'vitamin-primer'],
        rating: 4.5,
        ratingCount: 203,
        reviews: [
            { id: 1, name: 'Rachel M.', rating: 5, date: '2024-12-13', verified: true, title: 'Perfect shine!', text: 'This top coat gives the most amazing mirror finish. Lasts for weeks without chipping.' },
            { id: 2, name: 'Kelly P.', rating: 4, date: '2024-12-07', verified: true, title: 'Great protection', text: 'Really protects my gel manicures. The shine is incredible and it doesn\'t yellow.' }
        ]
    },
    'fairy-dust-top-coat': {
        handle: 'fairy-dust-top-coat',
        title: 'Fairy Dust Top Coat',
        priceZar: 180,
        images: ['public/fairy-dust-top-coat-01.webp'],
        category: 'Top & Base Coats',
        collections: ['Top & Base Coat'],
        stock: 'low',
        description: 'Glitter top coat with smooth sparkling finish. Adds glamour to any set.',
        features: [
            '15ml professional size',
            'Smooth glitter texture',
            'Long-wearing formula',
            'Adds instant glamour',
            'Easy application'
        ],
        howTo: 'Apply over color, ensuring even coverage. Seal with final cure under LED/UV lamp.',
        ingredients: 'Acrylates Copolymer, PET Glitter, Photoinitiator',
        badges: ['Pro-Grade', 'Glam'],
        relatedHandles: ['top-coat', 'base-coat', 'nail-liquid'],
        rating: 4.9,
        ratingCount: 78,
        reviews: [
            { id: 1, name: 'Zoe L.', rating: 5, date: '2024-12-11', verified: true, title: 'Sparkle perfection!', text: 'This glitter top coat is absolutely stunning. The sparkles are so fine and even.' },
            { id: 2, name: 'Emma D.', rating: 5, date: '2024-12-06', verified: true, title: 'Glamorous finish', text: 'Perfect for special occasions. The glitter doesn\'t feel gritty at all.' }
        ]
    },
    'vitamin-primer': {
        handle: 'vitamin-primer',
        title: 'Vitamin Primer',
        priceZar: 140,
        images: ['public/vitamin-primer-01.webp'],
        category: 'Prep & Prime',
        collections: ['Prep & Primers'],
        stock: 'in',
        description: 'Vitamin-infused, acid-free primer. Creates strong adhesion for acrylic/gel. Best used with Prep.',
        features: [
            'Super bond technology',
            'Protects natural nails',
            '15ml professional size',
            'Acid-free formula',
            'Vitamin-infused'
        ],
        howTo: 'Apply a thin coat before acrylic or gel application. Allow to air dry for 30 seconds.',
        ingredients: 'Methacrylic Ester blend, Vitamin E',
        badges: ['Cruelty-Free', 'Vitamin-Enriched'],
        relatedHandles: ['prep', 'base-coat', 'acrylic-powder-core'],
        rating: 4.4,
        ratingCount: 134,
        reviews: [
            { id: 1, name: 'Candice H.', rating: 5, date: '2024-12-09', verified: true, title: 'Amazing adhesion', text: 'My gel manicures last so much longer with this primer. The vitamin E is a nice touch.' },
            { id: 2, name: 'Natasha K.', rating: 4, date: '2024-12-04', verified: true, title: 'Good primer', text: 'Works well with the Prep. My clients\' nails stay healthy and strong.' }
        ]
    },
    'prep': {
        handle: 'prep',
        title: 'Prep',
        priceZar: 120,
        images: ['public/prep-01.webp'],
        category: 'Prep & Prime',
        collections: ['Prep & Primers'],
        stock: 'in',
        description: 'Acid-free nail dehydrator. Removes oil and moisture for perfect adhesion.',
        features: [
            'Gentle acid-free formula',
            'Improves product adhesion',
            'Removes oils and moisture',
            'Professional salon quality',
            'Safe for natural nails'
        ],
        howTo: 'Apply before primer or base coat. Allow to air dry completely before next step.',
        ingredients: 'Ethyl Acetate, Isopropyl Alcohol',
        badges: ['Pro-Grade', 'Acid-Free'],
        relatedHandles: ['vitamin-primer', 'base-coat', 'top-coat'],
        rating: 4.6,
        ratingCount: 167,
        reviews: [
            { id: 1, name: 'Samantha J.', rating: 5, date: '2024-12-08', verified: true, title: 'Essential prep step', text: 'This makes such a difference in how long my manicures last. A must-have for professionals.' },
            { id: 2, name: 'Leah M.', rating: 4, date: '2024-12-03', verified: true, title: 'Works great', text: 'Good dehydrator that doesn\'t damage the natural nail. Pairs perfectly with the Vitamin Primer.' }
        ]
    },
    'acrylic-powder-core': {
        handle: 'acrylic-powder-core',
        title: 'Acrylic Powder',
        priceZar: 320,
        images: ['public/acrylic-powder-core-01.webp', 'public/acrylic-powder-clear.webp', 'public/acrylic-powder-glitter.webp', 'public/acrylic-powder-white.webp'],
        category: 'Acrylic Powders',
        collections: ['Acrylic Powders'],
        variants: [
            { key: 'type', value: 'Core', image: 'public/acrylic-powder-core-01.webp' },
            { key: 'type', value: 'Crystal Clear', image: 'public/acrylic-powder-clear.webp' },
            { key: 'type', value: 'Glitter', image: 'public/acrylic-powder-glitter.webp' },
            { key: 'type', value: 'Snow White', image: 'public/acrylic-powder-white.webp' }
        ],
        defaultVariant: 'Core',
        stock: 'in',
        description: 'Professional acrylic powders for sculpting. Self-leveling, buttery consistency.',
        features: [
            'Available in multiple shades',
            'Superior adhesion technology',
            'Salon-reliable performance',
            'Self-leveling formula',
            'Buttery smooth consistency'
        ],
        howTo: 'Mix with monomer using proper ratio. Sculpt onto nail form or natural nail. File and shape when cured.',
        ingredients: 'Polyethyl Methacrylate, Polymethyl Methacrylate, Benzoyl Peroxide',
        badges: ['Pro-Grade', 'Salon-Quality'],
        relatedHandles: ['nail-liquid', 'nail-forms', 'vitamin-primer'],
        rating: 4.7,
        ratingCount: 145,
        reviews: [
            { id: 1, name: 'Jessica T.', rating: 5, date: '2024-12-10', verified: true, title: 'Perfect consistency', text: 'The Core powder is so smooth to work with. No lumps or bubbles, just perfect nails every time.' },
            { id: 2, name: 'Bianca R.', rating: 5, date: '2024-12-05', verified: true, title: 'Love the variety', text: 'Having different types available is amazing. The Glitter powder adds such a nice touch to special sets.' }
        ]
    },
    'nail-liquid': {
        handle: 'nail-liquid',
        title: 'Nail Liquid (Monomer)',
        priceZar: 280,
        images: ['public/nail-liquid-01.webp'],
        category: 'Nail Liquid',
        collections: ['Nail Liquid'],
        stock: 'in',
        description: 'Low-odor EMA monomer, HEMA-free. 250ml professional size.',
        features: [
            'Low-odor formula',
            'HEMA-free for sensitive clients',
            'Strong adhesion properties',
            'Smooth application',
            '250ml professional size'
        ],
        howTo: 'Dip acrylic brush into liquid, then into powder. Mix to proper consistency and sculpt nails.',
        ingredients: 'Ethyl Methacrylate, Dimethacrylate Crosspolymers, Hydroquinone',
        badges: ['HEMA-Free', 'Pro-Grade'],
        relatedHandles: ['acrylic-powder-core', 'nail-forms', 'prep'],
        rating: 4.8,
        ratingCount: 198,
        reviews: [
            { id: 1, name: 'Chantelle V.', rating: 5, date: '2024-12-12', verified: true, title: 'Low odor is amazing', text: 'Finally a monomer that doesn\'t give me headaches! Works perfectly with the acrylic powders.' },
            { id: 2, name: 'Melissa G.', rating: 5, date: '2024-12-07', verified: true, title: 'Professional quality', text: 'HEMA-free is so important for my sensitive clients. This liquid works beautifully.' }
        ]
    },
    'base-coat': {
        handle: 'base-coat',
        title: 'Base Coat',
        priceZar: 150,
        images: ['public/base-coat-01.webp'],
        category: 'Top & Base Coats',
        collections: ['Top & Base Coat'],
        stock: 'in',
        description: 'Strengthening base coat for gel or polish. Provides smooth adhesion.',
        features: [
            'Long-lasting wear',
            'Protects natural nail',
            '15ml professional size',
            'Compatible with gel and polish',
            'Strengthening formula'
        ],
        howTo: 'Apply thin layer before polish or gel color. Cure under LED/UV lamp for gel systems or air-dry for regular polish.',
        ingredients: 'Acrylates Copolymer, Ethyl Acetate',
        badges: ['Pro-Grade', 'Strengthening'],
        relatedHandles: ['top-coat', 'vitamin-primer', 'prep'],
        rating: 4.6,
        ratingCount: 176,
        reviews: [
            { id: 1, name: 'Robyn L.', rating: 5, date: '2024-12-11', verified: true, title: 'Great base', text: 'My gel polish lasts so much longer with this base coat. Really strengthens my nails too.' },
            { id: 2, name: 'Chloe M.', rating: 4, date: '2024-12-06', verified: true, title: 'Good adhesion', text: 'Works well with all my gel colors. Easy to apply and cures perfectly.' }
        ]
    }
};

// Global state
let currentProduct = null;
let selectedVariant = null;
let activeImageSrc = null;
let quantity = 1;
let selectedRating = 0;
let reviewFilters = {
    rating: 'all',
    sort: 'newest',
    verified: 'all'
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Get product handle from URL or default to cuticle-oil
    const urlParams = new URLSearchParams(window.location.search);
    const productHandle = urlParams.get('product') || 'cuticle-oil';
    
    loadProduct(productHandle);
    initializeComponents();
    initializeReviewFilters();
    
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
    updatePrice();
    
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
    
    // Reviews
    renderReviews();
    
    // Related products
    renderRelatedProducts();
    
    // Update mobile sticky
    updateMobileSticky();
}

// Update price based on selected variant
function updatePrice() {
    let price = currentProduct.priceZar;
    
    // Check if variant has custom price
    if (selectedVariant && selectedVariant.price) {
        price = selectedVariant.price;
    }
    
    document.getElementById('product-price').textContent = formatZAR(price);
    
    // Compare at price
    const comparePrice = document.getElementById('compare-price');
    if (currentProduct.compareAtZar && !selectedVariant?.price) {
        comparePrice.textContent = formatZAR(currentProduct.compareAtZar);
        comparePrice.style.display = 'inline';
    } else {
        comparePrice.style.display = 'none';
    }
}

// Update mobile sticky bar
function updateMobileSticky() {
    let price = currentProduct.priceZar;
    if (selectedVariant && selectedVariant.price) {
        price = selectedVariant.price;
    }
    document.getElementById('sticky-price').textContent = formatZAR(price);
}

// Media Carousel Component
function renderMediaCarousel() {
    const mainImage = document.getElementById('main-image');
    const thumbnailsContainer = document.getElementById('thumbnails-container');
    
    // Get carousel images based on variants or product images
    let carouselImages;
    // Prefer explicit product images when available
    if (currentProduct.images && currentProduct.images.length > 0) {
        carouselImages = currentProduct.images;
    } else if (currentProduct.variants && currentProduct.variants.length > 0) {
        // Fallback to unique images from variants
        carouselImages = [...new Set(currentProduct.variants.map(v => v.image))];
    } else {
        carouselImages = [];
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
        
        const variantDiv = document.createElement('div');
        variantDiv.className = 'space-y-3';
        variantDiv.innerHTML = `
            <label class="text-sm font-semibold text-gray-900 uppercase tracking-wide">${capitalizedKey}</label>
            <div class="flex flex-wrap gap-2" id="${key}-pills"></div>
        `;
        
        const pillsContainer = variantDiv.querySelector(`#${key}-pills`);
        variants.forEach((variant, index) => {
            const pill = document.createElement('button');
            const isSelected = selectedVariant && selectedVariant.value === variant.value;
            pill.className = `variant-pill px-4 py-2 text-sm font-medium rounded-full border-2 transition-all ${isSelected ? 'border-pink-500 text-pink-500 bg-pink-50' : 'border-gray-200 text-gray-700 hover:border-pink-500 hover:text-pink-500'}`;
            pill.dataset.variant = key;
            pill.dataset.value = variant.value;
            pill.dataset.image = variant.image;
            if (variant.price) {
                pill.dataset.price = variant.price;
            }
            pill.textContent = variant.value;
            pill.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
            
            pill.addEventListener('click', () => selectVariant(variant, pill));
            pillsContainer.appendChild(pill);
        });
        
        variantsContainer.appendChild(variantDiv);
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
    
    // Update price if variant has custom price
    updatePrice();
    updateMobileSticky();
    
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
            case 'Handmade':
                span.className += ' bg-orange-100 text-orange-800';
                break;
            case 'Pro-Grade':
                span.className += ' bg-indigo-100 text-indigo-800';
                break;
            case 'Salon-Quality':
                span.className += ' bg-violet-100 text-violet-800';
                break;
            case 'HEMA-Free':
                span.className += ' bg-emerald-100 text-emerald-800';
                break;
            case 'Acid-Free':
                span.className += ' bg-cyan-100 text-cyan-800';
                break;
            case 'Vitamin-Enriched':
                span.className += ' bg-yellow-100 text-yellow-800';
                break;
            case 'Strengthening':
                span.className += ' bg-rose-100 text-rose-800';
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

// Reviews Component
function renderReviews() {
    if (!currentProduct.reviews) return;
    
    // Update review summary
    document.getElementById('avg-rating').textContent = currentProduct.rating.toFixed(1);
    document.getElementById('review-count').textContent = `${currentProduct.ratingCount} reviews`;
    
    // Update star display
    const avgStars = document.getElementById('avg-stars');
    const fullStars = Math.floor(currentProduct.rating);
    const hasHalfStar = currentProduct.rating % 1 >= 0.5;
    let starsHtml = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '★';
        } else if (i === fullStars && hasHalfStar) {
            starsHtml += '☆';
        } else {
            starsHtml += '☆';
        }
    }
    avgStars.textContent = starsHtml;
    
    // Render filtered reviews
    renderFilteredReviews();
}

// Initialize review filters
function initializeReviewFilters() {
    // Star rating filter
    document.getElementById('rating-filter').addEventListener('change', function() {
        reviewFilters.rating = this.value;
        renderFilteredReviews();
    });
    
    // Sort filter
    document.getElementById('sort-filter').addEventListener('change', function() {
        reviewFilters.sort = this.value;
        renderFilteredReviews();
    });
    
    // Verified filter
    document.getElementById('verified-filter').addEventListener('change', function() {
        reviewFilters.verified = this.value;
        renderFilteredReviews();
    });
}

// Render filtered reviews
function renderFilteredReviews() {
    if (!currentProduct.reviews) return;
    
    let filteredReviews = [...currentProduct.reviews];
    
    // Filter by rating
    if (reviewFilters.rating !== 'all') {
        const targetRating = parseInt(reviewFilters.rating);
        filteredReviews = filteredReviews.filter(review => review.rating === targetRating);
    }
    
    // Filter by verified
    if (reviewFilters.verified === 'verified') {
        filteredReviews = filteredReviews.filter(review => review.verified);
    } else if (reviewFilters.verified === 'unverified') {
        filteredReviews = filteredReviews.filter(review => !review.verified);
    }
    
    // Sort reviews
    if (reviewFilters.sort === 'newest') {
        filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (reviewFilters.sort === 'oldest') {
        filteredReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (reviewFilters.sort === 'highest') {
        filteredReviews.sort((a, b) => b.rating - a.rating);
    } else if (reviewFilters.sort === 'lowest') {
        filteredReviews.sort((a, b) => a.rating - b.rating);
    }
    
    // Render reviews
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';
    
    if (filteredReviews.length === 0) {
        reviewsList.innerHTML = '<div class="text-center py-8 text-gray-500">No reviews match your filters.</div>';
        return;
    }
    
    filteredReviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review-item';
        
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const verifiedBadge = review.verified ? '<span class="verified-badge">Verified Purchase</span>' : '';
        
        reviewDiv.innerHTML = `
            <div class="review-header">
                <div class="reviewer-avatar">
                    ${review.name.charAt(0)}
                </div>
                <div class="reviewer-name">${review.name}</div>
                <div class="review-rating">${stars}</div>
                <div class="review-date">${formatDate(review.date)}</div>
                ${verifiedBadge}
            </div>
            <h4 class="review-title">${review.title}</h4>
            <div class="review-text">
                <p>${review.text}</p>
            </div>
        `;
        
        reviewsList.appendChild(reviewDiv);
    });
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
        let basePrice = currentProduct.priceZar;
        if (selectedVariant && selectedVariant.price) {
            basePrice = selectedVariant.price;
        }
        const savings = Math.round(basePrice * quantity * (activeDiscount.percent / 100));
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

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 60) return '1 month ago';
    return `${Math.floor(diffDays / 30)} months ago`;
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