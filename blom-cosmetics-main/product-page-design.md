# Tickled Pinque South Africa - Single Product Page Design

## Page Structure & Layout

### Header Section
- **Same as Homepage:** Consistent navigation and branding
- **Breadcrumb Navigation:** Home > Shop > [Category] > [Product Name]
  - Font: Montserrat Regular, 14px
  - Color: Gray with pink active state

### Main Product Section
- **Layout:** 2-column layout (60% images, 40% product info)
- **Mobile:** Stacked layout (images first, then info)

### Product Images Section (Left Column)

#### Main Image Gallery
- **Primary Image:** Large product image (600x600px minimum)
- **Thumbnail Strip:** 4-6 thumbnail images below main image
- **Layout:** Vertical thumbnail strip on desktop, horizontal on mobile
- **Interaction:** Click thumbnail to change main image
- **Zoom Feature:** Click main image for zoom overlay
- **Video Support:** Play button overlay for video content

#### Gallery Features
- **Multiple Angles:** Product from different perspectives
- **Lifestyle Images:** Product in use/salon setting
- **Color Variations:** Images showing different color options
- **Detail Shots:** Close-ups of texture, brush, packaging
- **Video Content:** Application tutorials, product demos
- **360° View:** Interactive product rotation (if available)

#### Image Controls
- **Navigation Arrows:** Previous/next image navigation
- **Indicator Dots:** Show current image position
- **Fullscreen Mode:** Expand to full browser window
- **Mobile Swipe:** Touch gesture support for mobile

### Product Information Section (Right Column)

#### Product Title & Brand
- **Brand Name:** Montserrat Medium, 14px, Gray, ALL CAPS
- **Product Name:** Montserrat Bold, 28px, Black
- **Product Code/SKU:** Montserrat Regular, 12px, Gray

#### Pricing Section
- **Current Price:** Montserrat Bold, 32px, Pink (#F45A9A)
- **Original Price:** Strikethrough if on sale, 24px, Gray
- **Savings:** "Save ZAR XX" in green if on sale
- **Currency:** All prices in ZAR (South African Rand)
- **Bulk Pricing:** "Buy 3+ and save 10%" if applicable

#### Product Rating & Reviews
- **Star Rating:** 5-star display with average rating
- **Review Count:** "(23 reviews)" clickable link
- **Quick Reviews:** "4.8/5 - Loved by nail techs"

#### Color Selection (NOT Dropdown)
- **Title:** "COLOR" - Montserrat Bold, ALL CAPS, 16px
- **Layout:** Grid of clickable color swatches
- **Swatch Design:** 
  - Circular swatches (40px diameter)
  - 6 swatches per row on desktop, 4 on mobile
  - Selected state: Pink border (3px) around swatch
  - Hover state: Slight scale and shadow
- **Color Name:** Display selected color name below swatches
- **Stock Status:** "In Stock" or "Low Stock" per color

#### Quantity Selection
- **Label:** "QUANTITY" - Montserrat Bold, ALL CAPS, 16px
- **Input:** Number input with +/- buttons
- **Style:** Clean input with pink accent buttons
- **Stock Limit:** Max quantity based on available stock

#### Add to Cart Section
- **Primary Button:** "ADD TO CART"
  - Background: Vibrant Pink (#F45A9A)
  - Text: White, Montserrat Bold, ALL CAPS, 18px
  - Size: Full width, 60px height
  - Hover: Darker pink with subtle shadow
- **Secondary Actions:**
  - **Wishlist:** Heart icon with "Add to Wishlist"
  - **Share:** Share icon with social sharing options

#### Product Highlights
- **Key Features:** Bullet points of main benefits
  - "HEMA-Free Formula"
  - "21-Day Wear"
  - "LED/UV Compatible"
  - "Professional Grade"
- **Icons:** Small icons next to each feature
- **Style:** Montserrat Regular, 14px, with pink accent icons

#### Shipping & Returns Info
- **Shipping:** "Free shipping on orders over ZAR 500"
- **Delivery:** "Delivered in 2-3 business days"
- **Returns:** "30-day return policy"
- **Icons:** Truck, calendar, and return icons

### Product Details Tabbed Section

#### Tab Navigation
- **Tabs:** "DESCRIPTION" | "HOW TO USE" | "INGREDIENTS"
- **Style:** Montserrat Bold, ALL CAPS, 16px
- **Active State:** Pink underline and text color
- **Layout:** Horizontal tabs, stacked on mobile

#### Tab Content Areas

**1. Description Tab**
- **Product Overview:** Detailed product description
- **Key Benefits:** Bulleted list of advantages
- **Professional Use:** Specific guidance for nail techs
- **Compatibility:** What it works with
- **Typography:** Montserrat Regular, 16px, line-height 1.6

**2. How to Use Tab**
- **Step-by-Step Instructions:** Numbered application steps
- **Prep Requirements:** What's needed before application
- **Pro Tips:** Professional application advice
- **Curing Times:** LED/UV lamp requirements
- **Removal Process:** How to safely remove

**3. Ingredients Tab**
- **Full Ingredient List:** Complete INCI listing
- **Allergen Information:** Common allergen warnings
- **Safety Notes:** Professional handling guidelines
- **Certifications:** Cruelty-free, vegan, etc.

### Related Products Section
- **Title:** "YOU MIGHT ALSO LIKE"
  - Font: Montserrat Bold, ALL CAPS, 28px
  - Color: Black, center-aligned
- **Layout:** 4-product horizontal carousel
- **Product Cards:** Same style as category page
- **Navigation:** Arrow buttons for carousel control
- **Mobile:** Horizontal scroll with momentum

### Customer Reviews Section
- **Title:** "CUSTOMER REVIEWS"
- **Overall Rating:** Large star display with breakdown
- **Review Filters:** Filter by rating, verified purchase
- **Individual Reviews:**
  - Customer name and verification badge
  - Star rating and date
  - Review text with "helpful" voting
  - Photos if included
- **Write Review:** Prominent "Write a Review" button

### Recently Viewed Products
- **Title:** "RECENTLY VIEWED"
- **Layout:** Horizontal scrolling carousel
- **Products:** Last 6 viewed items
- **Position:** Above footer

## Mobile Responsive Design

### Mobile Layout Adjustments
- **Images:** Full-width image gallery with swipe navigation
- **Product Info:** Full-width below images
- **Color Swatches:** Larger touch targets (50px)
- **Buttons:** Full-width for better touch interaction
- **Tabs:** Accordion-style on mobile for better UX

### Mobile-Specific Features
- **Sticky Add to Cart:** Fixed bottom bar with price and add button
- **Image Pinch Zoom:** Native mobile zoom functionality
- **Swipe Gallery:** Touch-friendly image navigation
- **Collapsible Sections:** Expandable product details

## Interactive Features

### Dynamic Elements
- **Stock Updates:** Real-time stock level updates
- **Price Changes:** Dynamic pricing based on quantity/color
- **Image Loading:** Progressive loading with placeholders
- **Color Preview:** Main image updates with color selection

### Micro-interactions
- **Button Animations:** Subtle hover and click effects
- **Loading States:** Spinner during add to cart
- **Success Feedback:** Confirmation when added to cart
- **Error Handling:** Clear error messages for issues

## Performance Optimization
- **Image Optimization:** WebP format with lazy loading
- **Critical CSS:** Above-fold content loads first
- **Preload:** Key images and fonts preloaded
- **Caching:** Aggressive caching for product data

## Accessibility Features
- **Alt Text:** Descriptive alt text for all images
- **Keyboard Navigation:** Full keyboard accessibility
- **Screen Reader:** Proper ARIA labels and structure
- **Color Contrast:** WCAG AA compliance for all text
- **Focus Management:** Clear focus indicators throughout