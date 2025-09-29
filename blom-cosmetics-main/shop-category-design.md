# Tickled Pinque South Africa - Shop Category Page Design

## Page Structure & Layout

### Header Section
- **Same as Homepage:** Consistent navigation and branding
- **Breadcrumb Navigation:** Home > Shop > [Category Name]
  - Font: Montserrat Regular, 14px
  - Color: Gray with pink active state

### Page Title Section
- **Category Title:** "[CATEGORY NAME]" (e.g., "GEL POLISH")
  - Font: Montserrat Bold, ALL CAPS, 36px
  - Color: Black
- **Category Description:** Brief description of category
  - Font: Montserrat Regular, 16px
  - Color: Gray (#6B7280)
- **Product Count:** "Showing X products"
  - Font: Montserrat Regular, 14px
  - Color: Gray

### Filter & Sort Section
- **Layout:** Horizontal bar with filters on left, sorting on right
- **Background:** Light gray (#F3F4F6) with subtle border

#### Sorting Options (Right Side)
- **Label:** "SORT BY:"
- **Dropdown Options:**
  - Newest First
  - Price: Low to High
  - Price: High to Low
  - Most Popular
  - Best Rated
- **Style:** Clean dropdown with pink accent on selection

#### Filter Toggle (Left Side)
- **Mobile:** "FILTERS" button that opens sidebar overlay
- **Desktop:** Always visible sidebar

### Main Content Layout
- **Desktop:** 2-column layout (sidebar + product grid)
- **Mobile:** Full-width with collapsible filters

### Sidebar Filters (Left Column - Desktop)
- **Width:** 280px
- **Background:** White with subtle border
- **Sticky Position:** Follows scroll

#### Filter Sections

**1. Product Type Filter**
- **Title:** "PRODUCT TYPE"
  - Font: Montserrat Bold, ALL CAPS, 16px
- **Options:** Checkboxes with product types
  - Base Coats
  - Color Gels
  - Top Coats
  - Builder Gels
  - Specialty Gels
- **Style:** Custom checkboxes with pink accent
- **Count:** Show number of products per type "(23)"

**2. Color Filter**
- **Title:** "FILTER BY COLOR"
  - Font: Montserrat Bold, ALL CAPS, 16px
- **Layout:** Color swatch grid (6 swatches per row)
- **Swatches:** Circular color samples (30px diameter)
- **Interaction:** Click to select/deselect
- **Selected State:** Pink border around swatch
- **Colors Include:**
  - Red family, Pink family, Orange family
  - Yellow family, Green family, Blue family
  - Purple family, Brown family, Black/Gray family
  - Clear/Nude family

**3. Price Range Filter**
- **Title:** "PRICE RANGE (ZAR)"
- **Input:** Dual range slider
- **Display:** Min ZAR [input] - Max ZAR [input]
- **Style:** Pink slider handles

**4. Brand Filter**
- **Title:** "BRAND"
- **Options:** Checkbox list of available brands
- **Search:** Brand search input for long lists
- **Show More:** Expandable list if many brands

**5. Active Filters**
- **Title:** "ACTIVE FILTERS"
- **Display:** Tag-style filter chips
- **Remove:** X button on each chip
- **Clear All:** "Clear All Filters" link

### Product Grid (Right Column)
- **Layout:** Responsive grid
  - Desktop: 3-4 columns
  - Tablet: 2-3 columns  
  - Mobile: 1-2 columns
- **Grid Gap:** 24px between products

#### Product Card Design
- **Image Container:**
  - Square aspect ratio (1:1)
  - Multiple product images on hover
  - Wishlist heart icon (top-right)
  - Quick view icon on hover
  - "New" or "Sale" badges if applicable

- **Product Information:**
  - **Product Name:** Montserrat Medium, 16px, Black
  - **Brand Name:** Montserrat Regular, 14px, Gray
  - **Price:** Montserrat Bold, 18px, Pink
  - **Original Price:** Strikethrough if on sale
  - **Color Options:** Small color dots (if applicable)
  - **Rating:** Star rating with review count

- **Interaction States:**
  - **Hover:** Slight shadow and scale effect
  - **Quick Add:** "Add to Cart" button appears on hover
  - **Out of Stock:** Grayed out with "Out of Stock" overlay

### Pagination Section
- **Layout:** Center-aligned at bottom of page
- **Style:** Numbered pagination with previous/next arrows
- **Active State:** Pink background for current page
- **Load More Option:** Alternative to pagination for mobile

### Recently Viewed Section
- **Title:** "RECENTLY VIEWED"
- **Layout:** Horizontal scrolling product carousel
- **Position:** Above footer
- **Products:** Last 6 viewed products

## Mobile Responsive Design

### Filter Overlay (Mobile)
- **Trigger:** "FILTERS" button opens full-screen overlay
- **Header:** "Filters" with close X and "Apply" button
- **Content:** Same filter options in vertical layout
- **Footer:** "Clear All" and "Apply Filters" buttons
- **Animation:** Slide up from bottom

### Mobile Grid Adjustments
- **Product Cards:** Larger touch targets
- **Images:** Optimized for mobile loading
- **Text:** Slightly larger for readability
- **Spacing:** Increased padding for touch interaction

## Performance Considerations
- **Lazy Loading:** Product images load as user scrolls
- **Filter Updates:** AJAX filtering without page reload
- **URL Updates:** Filter selections update URL for bookmarking
- **Loading States:** Skeleton screens during filter application
- **Image Optimization:** WebP format with fallbacks

## Accessibility Features
- **Keyboard Navigation:** All filters and products accessible via keyboard
- **Screen Reader:** Proper ARIA labels and descriptions
- **Color Contrast:** All text meets WCAG AA standards
- **Focus Indicators:** Clear focus states for all interactive elements