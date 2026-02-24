# CSS Colors

## Overview
Apricot's color system provides utility classes for backgrounds organized into CB, K-12, and Higher Ed color palettes, plus neutrals and system notification colors.

**Import:** `import "@cb/apricot/CBBase";`

## Color Palettes

### CB Color Palette (Primary)
Main color for action buttons and links.

**Primary:**
- `cb-blue5-bg` - #324DC7

**Extended:**
- `cb-blue5-shade-2` - #1B2264 (darkest)
- `cb-blue5-shade-1` - #28369A (darker)
- `cb-blue5-tint-1` - #E6EDF8 (lighter)
- `cb-blue5-tint-2` - #F5F7FC (lightest)

### K-12 Color Palette

**Primary:**
- `cb-blue2-bg` - #0077C8

**Extended:**
- `cb-blue2-shade-2` - #003C64 (darkest)
- `cb-blue2-shade-1` - #005FA0 (darker)
- `cb-blue2-tint-1` - #E6F1FA (lighter)
- `cb-blue2-tint-2` - #F2F8FC (lightest)

**Accent:**
- `cb-blue1-bg` - #006298
- `cb-blue3-bg` - #009CDE
- `cb-blue4-bg` - #71C5E8
- `cb-yellow1-bg` - #FEDB00

### Higher Ed Color Palette

**Primary:**
- `cb-purple1-bg` - #702F8A

**Extended:**
- `cb-purple1-shade-2` - #381845 (darkest)
- `cb-purple1-shade-1` - #5A266E (darker)
- `cb-purple1-tint-1` - #F1EAF3 (lighter)
- `cb-purple1-tint-2` - #F8F5F9 (lightest)

**Accent:**
- `cb-purple2-bg` - #A05EB5
- `cb-blue5-bg` - #324DC7

### Neutrals (Grayscale)

- `cb-black1-bg` - #1E1E1E
- `cb-gray1-bg` - #505050
- `cb-gray2-bg` - #888888
- `cb-gray3-bg` - #B2B2B2
- `cb-gray4-bg` - #D9D9D9
- `cb-gray5-bg` - #F0F0F0
- `cb-white-bg` - #FFFFFF

### System Notifications

**Success (Green):**
- `cb-success-bg` - #1D7846
- `cb-success-shade-2` - #0D3921 (darkest)
- `cb-success-shade-1` - #155934 (darker)
- `cb-success-tint-1` - #C9DFD3 (lighter)
- `cb-success-tint-2` - #F4F8F6 (lightest)

**Warning/Error (Red):**
- `cb-warning-bg` - #AB2334
- `cb-warning-shade-2` - #521019 (darkest)
- `cb-warning-shade-1` - #7F1A26 (darker)
- `cb-warning-tint-1` - #EACACE (lighter)
- `cb-warning-tint-2` - #FBF4F5 (lightest)

## Usage

### Background Colors
```html
<!-- Primary colors -->
<div class="cb-blue5-bg">CB Primary Blue</div>
<div class="cb-blue2-bg">K-12 Primary Blue</div>
<div class="cb-purple1-bg">Higher Ed Primary Purple</div>

<!-- Neutrals -->
<div class="cb-white-bg">White background</div>
<div class="cb-gray5-bg">Light gray background</div>
<div class="cb-gray1-bg">Dark gray background</div>

<!-- System colors -->
<div class="cb-success-bg">Success state</div>
<div class="cb-warning-bg">Warning/Error state</div>

<!-- Tints and shades -->
<div class="cb-blue5-tint-1">Light blue tint</div>
<div class="cb-blue5-shade-1">Dark blue shade</div>
```

## Color Effects

### Background Gradients
```html
<div class="cb-white-gradient-top">White gradient from top</div>
<div class="cb-gray-gradient-top">Gray gradient from top</div>
<div class="cb-gray1-gradient-top">Gray1 gradient from top</div>
<div class="cb-blue5-gradient-top">Blue5 gradient from top</div>
<div class="cb-gray-gradient-bottom">Gray gradient from bottom</div>
```

### Responsive White Background
Background turns white at specific breakpoints:

```html
<!-- White at md breakpoint only -->
<div class="cb-white-bg-md">...</div>

<!-- White at md and larger -->
<div class="cb-white-bg-md-up">...</div>

<!-- White at md and smaller -->
<div class="cb-white-bg-md-down">...</div>
```

**Syntax:**
```
cb-white-bg-[xs|sm|md|lg|xl|2xl|3xl]
cb-white-bg-[xs|sm|md|lg|xl|2xl|3xl]-up
cb-white-bg-[xs|sm|md|lg|xl|2xl|3xl]-down
```

### Opacity
```html
<div class="cb-opacity-1">10% opacity</div>
<div class="cb-opacity-5">50% opacity</div>
<div class="cb-opacity-9">90% opacity</div>
```

**Values:** `cb-opacity-[1-9]` (opacity: 0.1 to 0.9)

## Reset Classes

Remove color settings:

```html
<div class="cb-no-bg">Remove background color</div>
<div class="cb-no-opacity">Remove opacity</div>
```

## Common Patterns

### Success/Error Messages
```html
<div class="cb-success-tint-2 cb-padding-16">
  <p class="cb-success-bg">✓ Operation completed successfully</p>
</div>

<div class="cb-warning-tint-2 cb-padding-16">
  <p class="cb-warning-bg">✗ An error occurred</p>
</div>
```

### Card with Brand Color
```html
<div class="cb-blue5-bg cb-padding-32 cb-white-text">
  <h2>Featured Content</h2>
  <p>Lorem ipsum dolor sit amet</p>
</div>
```

### Gradient Header
```html
<header class="cb-blue5-gradient-top cb-padding-48">
  <h1>Page Title</h1>
</header>
```

### Hover States (Custom CSS)
```css
.my-button {
  background-color: #324DC7; /* cb-blue5 */
}
.my-button:hover {
  background-color: #28369A; /* cb-blue5-shade-1 */
}
```

### Responsive Background
```html
<!-- Gray on mobile, white on desktop -->
<section class="cb-gray5-bg cb-white-bg-md-up">
  <p>Content adapts background by screen size</p>
</section>
```

### Semi-Transparent Overlay
```html
<div class="position-relative">
  <img src="image.jpg" alt="Background" />
  <div class="position-absolute cb-black1-bg cb-opacity-6 cb-white-text">
    <h2>Overlay Text</h2>
  </div>
</div>
```

## Accessibility Requirements

**Contrast Ratios:**

1. **Regular Text (<18pt or <14pt bold):**
   - Minimum contrast ratio: **4.5:1**
   - Example: Dark text on light backgrounds, light text on dark backgrounds

2. **Large Text (≥18pt or ≥14pt bold):**
   - Minimum contrast ratio: **3:1**
   - More lenient for headings and large UI text

**Tools:**
- Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify color combinations

**Safe Combinations:**
- `cb-white-bg` with `cb-black1`, `cb-gray1`, `cb-gray2` text ✓
- `cb-black1-bg` with `cb-white`, `cb-gray5` text ✓
- `cb-blue5-bg` with `cb-white` text ✓
- `cb-gray5-bg` with `cb-black1`, `cb-gray1` text ✓

**Avoid:**
- `cb-gray3` or lighter text on `cb-white-bg` (insufficient contrast)
- `cb-gray3` or darker text on `cb-black1-bg` (insufficient contrast)
- Relying solely on color to convey information

## Color Usage Guidelines

### By Audience

**CB (College Board):**
- Primary: `cb-blue5-bg` (#324DC7)
- Use for general College Board branding, action buttons, links

**K-12:**
- Primary: `cb-blue2-bg` (#0077C8)
- Accents: `cb-blue1-bg`, `cb-blue3-bg`, `cb-blue4-bg`, `cb-yellow1-bg`
- Use for K-12 student-facing applications

**Higher Ed:**
- Primary: `cb-purple1-bg` (#702F8A)
- Accents: `cb-purple2-bg`, `cb-blue5-bg`
- Use for college/university-facing applications

### By Purpose

**Informational (Neutrals):**
- Use `cb-gray5-bg` for subtle backgrounds
- Use `cb-gray4-bg` for dividers or disabled states
- Use `cb-white-bg` for content areas

**Interactive (Primary):**
- Use brand primary colors for buttons, links, active states
- Use shades for hover/pressed states
- Use tints for backgrounds behind primary content

**Status (System):**
- `cb-success-*` - Confirmations, completions, positive states
- `cb-warning-*` - Errors, alerts, critical information
- Use tints for backgrounds, main color for borders/icons

## Important Notes

1. **Background Only:**
   - Color classes only set `background-color`
   - Text colors require separate utility classes or custom CSS
   - See [typography.md](typography.md) for text color classes

2. **Naming Pattern:**
   - Format: `cb-{color}-bg`
   - Shades: `cb-{color}-shade-[1|2]` (darker)
   - Tints: `cb-{color}-tint-[1|2]` (lighter)

3. **Contrast:**
   - Always verify contrast ratios meet WCAG AA standards
   - Use shade-2 or shade-1 for dark backgrounds with light text
   - Use tint-1 or tint-2 for light backgrounds with dark text

4. **Gradients:**
   - Applied as `background-image`, not `background-color`
   - Direction: top gradients fade from color to transparent downward
   - Bottom gradients fade from transparent to color upward

5. **Opacity:**
   - Applied to entire element including children
   - Use for overlays, disabled states, subtle emphasis
   - Does not work on pseudo-elements in all browsers

6. **Responsive Backgrounds:**
   - Only `cb-white-bg-*` has responsive variants
   - Other colors require custom media queries or grid classes
   - See [grid.md](grid.md) for responsive utilities

7. **Consistency:**
   - Use extended palette (shades/tints) for variations of same color
   - Don't mix different primary colors in same UI section
   - Neutrals can be used across all palettes

8. **Reset Classes:**
   - `cb-no-bg` sets `background: none !important`
   - `cb-no-opacity` sets `opacity: 1 !important`
   - Use to override inherited or conflicting styles

9. **Color Meanings:**
   - Green (success) - positive, complete, correct
   - Red (warning) - error, alert, required, critical
   - Blue - action, information, navigation
   - Purple - Higher Ed branding
   - Yellow - caution, highlight (K-12 only)

10. **Do Not:**
    - Use color alone to convey information (add text, icons)
    - Use too many colors in one interface (limit to 2-3 plus neutrals)
    - Override brand colors without approval
    - Use colors from other palettes inconsistently
