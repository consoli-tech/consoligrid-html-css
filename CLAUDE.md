# Consolidated Utilities - HTML/CSS Prototype

## Project Overview

This repository contains the static HTML/CSS prototype for the Consolidated Utilities website. These files serve as the design reference and will be extracted into a WordPress hybrid theme and WordPress plugins that support the block editor.

## Architecture

- **HTML files** in the root represent individual page templates that will map to WordPress template files (e.g., `page-rates.php`, `single.php`, `page-contact.php`).
- **styles/consoligrid.css** is the main stylesheet containing all component and page styles. This will be enqueued as the theme stylesheet.
- **js/** contains JavaScript for interactive components (slider, FAQ accordion, mobile menu). These will be enqueued or plugin scripts.
- Some styles in `consoligrid.css` will be extracted into their plugin styleseet
- **fonts/** contains custom Avenir font files used throughout the site.
- **img/** contains all image assets.

## Pages

- `index.html` - Homepage
- `rates.html` - Rates search page
- `rates-*.html` - Individual rate result pages (one per utility system)
- `coastal-water-company.html` - Coastal Water Company rates
- `news.html` - News listing (CSS Grid layout, 3-column)
- `post.html` - Single news post detail
- `contact.html` - Contact form with FAQ accordion
- `billing.html` - Billing page
- `areas-we-serve.html` - Service areas page

## CSS Conventions

- Responsive breakpoints: tablet (768px-1024px), mobile (320px-767px)
- Utility class `.no-page-header` adds top padding for pages without a hero/page header section
- Rate card color variants use modifier classes (e.g., `.rates-result-header-green`, `.rates-result-header-blue`, `.rates-result-header-orange`, `.rates-result-header-purple`, `.rates-result-header-red`)
- News cards use `.news-card-badge` for year tags
- CSS custom properties are defined in `:root` for shared colors

## WordPress Extraction Notes

- The nav markup in each HTML file will become `header.php` with `wp_nav_menu()`.
- The footer will become `footer.php`.
- Rate pages will likely be powered by a custom plugin with custom post types and a search/lookup feature.
- The news grid and post detail pages will map to WordPress archive and single templates.
- The contact form will integrate with a WordPress form plugin (e.g., WPForms, Contact Form 7).
- The FAQ accordion on the contact page can be driven by a custom plugin or ACF repeater field.
