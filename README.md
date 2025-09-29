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
├── site/
│   ├── pages/                 # All static HTML pages
│   ├── styles/
│   │   ├── core/              # Design tokens + base reset
│   │   ├── shared/            # Cross-page utilities (nav, optimisations)
│   │   ├── pages/             # Page-level CSS (mirrors pages/)
│   │   └── legacy/            # Archived pre-refactor CSS
│   └── assets/
│       ├── js/
│       │   ├── core/          # Shared behaviour (mobile nav, cart)
│       │   ├── modules/       # Reusable helpers (Supabase, course interactions)
│       │   └── pages/         # Page-specific controllers
│       └── images/            # Page media (mirrors /public for now)
├── public/                    # Deployed static assets (favicons, hero images)
├── account/                   # Account portal (legacy Bolt output)
├── assets/, css/, js/         # Legacy Bolt directories (kept for reference)
└── README.md
```

### Adding a new page

1. Create the HTML under `site/pages/feature-name.html`.
2. Add page styles in `site/styles/pages/feature-name.css`, import tokens/reset as needed.
3. For JavaScript, add a module in `site/assets/js/pages/feature-name.js` and include it via `<script src="../assets/js/pages/feature-name.js" defer></script>`.
4. Shared utilities belong in `site/assets/js/modules` (ES modules) or `site/assets/js/core` (vanilla scripts loaded everywhere).
5. Keep imagery in `site/assets/images`, then copy optimised exports to `public/` when publishing.

### Styling conventions

- Use variables from `site/styles/core/design-tokens.css` for colour, spacing, and typography.
- Include `core/reset.css` first, then `shared/global.css`, then any shared utilities, and finally the page stylesheet.
- Legacy rules in `site/styles/shared/global.css` are being trimmed; prefer adding new styles in scoped page files.

### Legacy clean-up roadmap

- Gradually migrate selectors out of `site/styles/shared/global.css` into scoped page/component files.
- Once coverage is confirmed, archive redundant rules inside `site/styles/legacy/` and remove unused selectors.
- Review the old `assets/`, `css/`, and `js/` directories periodically—when pages no longer reference those files they can be deleted.

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