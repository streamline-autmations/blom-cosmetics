# BLOM Cosmetics Website

A premium e-commerce website for professional nail care products and training courses.

## Token Efficiency Guide

### Using Target File and Lock File Features

**Target File Mode:**
- Use when making changes to specific files only
- Click the target icon next to any file in the file explorer
- This limits Bolt's context to only the selected file(s)
- Ideal for: CSS tweaks, single component updates, bug fixes

**Lock File Mode:**
- Use when you want to prevent changes to certain files
- Click the lock icon next to files you want to protect
- Bolt will avoid modifying locked files
- Ideal for: Protecting working features while adding new ones

### Breaking Down Large Edits

**Instead of:** "Redesign the entire shop page"
**Do this:**
1. "Update the product card styling only"
2. "Add filtering functionality"
3. "Implement sorting features"
4. "Add responsive design"

**Instead of:** "Create a complete checkout flow"
**Do this:**
1. "Create cart page structure"
2. "Add cart functionality"
3. "Create checkout form"
4. "Add payment integration"

### Context Management

**Before Large Changes:**
1. Create a conversation summary (see `conversation-summary-template.md`)
2. Save current working state
3. Reset context window
4. Upload summary to continue

**File Targeting Tips:**
- Target only files you're actively changing
- Lock files that are working correctly
- Use specific, focused requests
- Avoid broad "improve everything" requests

## Project Structure

```
/
├── index.html              # Homepage
├── shop.html              # Product catalog
├── courses.html           # Training programs
├── about.html             # Company story
├── contact.html           # Contact information
├── styles.css             # Main stylesheet
├── script.js              # Main JavaScript
└── public/                # Static assets
    ├── blom_logo.png
    ├── hero-image-*.png
    └── product_*.png
```

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
```

## Key Features

- Responsive design optimized for mobile and desktop
- Lead capture system with modal popup
- Product catalog with filtering and sorting
- Course booking system
- Professional-grade UI/UX
- WhatsApp integration for customer support