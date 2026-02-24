# CSS Grid System

## Overview
Apricot's grid system is based on Bootstrap's grid system using CSS3 flexbox. It provides a mobile-first, 12-column layout with a 24px gutter (12px left/right padding per column).

**Import:** `import "@cb/apricot/CBGrid";`

**Note:** Grid classes do NOT use the `cb-` prefix (except custom utilities).

## Breakpoints

| Breakpoint | Max Width | Container Width |
|------------|-----------|-----------------|
| xs | 767px and below | Fluid |
| sm | 768px - 1023px | 720px |
| md | 1024px - 1247px | 976px |
| lg | 1248px - 1343px | 1200px |
| xl | 1344px - 1439px | 1296px |
| 2xl | 1440px - 1727px | 1392px |
| 3xl | 1728px+ | 1680px |

### Media Queries

**Specific Breakpoint:**
```scss
xs: @media (min-width: 1px) and (max-width: 767.98px)
sm: @media (min-width: 768px) and (max-width: 1023.98px)
md: @media (min-width: 1024px) and (max-width: 1247.98px)
lg: @media (min-width: 1248px) and (max-width: 1343.98px)
xl: @media (min-width: 1344px) and (max-width: 1439.98px)
2xl: @media (min-width: 1440px) and (max-width: 1727.98px)
3xl: @media (min-width: 1728px)
```

**Breakpoint Range (and above):**
```scss
xs and above: @media (min-width: 1px)
sm and above: @media (min-width: 768px)
md and above: @media (min-width: 1024px)
lg and above: @media (min-width: 1248px)
xl and above: @media (min-width: 1344px)
2xl and above: @media (min-width: 1440px)
3xl: @media (min-width: 1728px)
```

### Show Current Breakpoint
```html
<body class="cb-dev-env cb-show-breakpoints">
  <!-- Displays current breakpoint at top of page -->
</body>
```

## Grid System

### Container
```html
<!-- Responsive container with max-width per breakpoint -->
<div class="container">...</div>

<!-- Full-width container (100% width) -->
<div class="container-fluid">...</div>
```

### Rows
Rows wrap columns. Each column has 24px gutter (12px left + 12px right padding).

```html
<div class="container">
  <div class="row">
    <!-- columns go here -->
  </div>
</div>
```

### Columns
12-column grid. Column classes: `col-[breakpoint]-[1-12]`

```html
<!-- Three equal-width columns -->
<div class="row">
  <div class="col-4">Column 1</div>
  <div class="col-4">Column 2</div>
  <div class="col-4">Column 3</div>
</div>

<!-- Responsive: full-width on mobile, half-width on tablet+ -->
<div class="row">
  <div class="col-xs-12 col-sm-6">Column 1</div>
  <div class="col-xs-12 col-sm-6">Column 2</div>
</div>

<!-- Different widths per breakpoint -->
<div class="row">
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">...</div>
</div>
```

**Column Syntax:**
```
col-[xs|sm|md|lg|xl|2xl|3xl]-[1-12]
```

**Mobile-First:** Breakpoints apply to that size and larger (e.g., `col-sm-4` applies to sm, md, lg, xl, 2xl, 3xl).

## Grid Customizations

### Gutters

**Remove Gutters:**
```html
<!-- Remove for all breakpoints -->
<div class="row cb-no-gutter">...</div>

<!-- Remove for specific breakpoint and up -->
<div class="row no-gutters-md">...</div>

<!-- Remove for specific breakpoint only -->
<div class="row no-gutters-xs-only">...</div>
```

**Syntax:**
```
cb-no-gutter
no-gutters-[xs|sm|md|lg|xl|2xl|3xl]
no-gutters-[xs|sm|md|lg|xl|2xl|3xl]-only
```

### Offset
Move columns to the right using offset classes.

```html
<div class="row">
  <div class="col-4 offset-2">Offset by 2 columns</div>
</div>

<!-- Responsive offset -->
<div class="col-xs-12 col-md-6 offset-md-3">Centered on md+</div>
```

**Syntax:**
```
offset-[xs|sm|md|lg|xl|2xl|3xl]-[1-11]
offset-[xs|sm|md|lg|xl|2xl|3xl]-[1-11]-only
```

### Custom Gutters
Add vertical/horizontal margins between child `<div>` elements.

```html
<!-- Vertical gutter of 48px -->
<div class="cb-gutterv-48">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Horizontal gutter of 24px -->
<div class="cb-gutterh-24">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

**Syntax:**
```
cb-gutter[v|h]-[24|32|48]
cb-gutter[v|h]-[xs|sm|md|lg|xl|2xl|3xl]-[24|32|48]-only
cb-gutter[v|h]-[xs|sm|md|lg|xl|2xl|3xl]-up-[24|32|48]
cb-gutter[v|h]-[xs|sm|md|lg|xl|2xl|3xl]-down-[24|32|48]
```

**Sizes:** 24px, 32px, 48px

## Position

### Position Types
```html
<div class="position-relative">...</div>
<div class="position-absolute">...</div>
<div class="position-fixed">...</div>
<div class="position-static">...</div>
<div class="position-sticky">...</div>
```

**Syntax:**
```
position-[relative|absolute|fixed|static|sticky]
position-[xs|sm|md|lg|xl|2xl|3xl]-[relative|absolute|fixed|static|sticky]
position-[xs|sm|md|lg|xl|2xl|3xl]-[relative|absolute|fixed|static|sticky]-only
```

### Adjust Position
Sets position to 0 for specified edge (requires positioned element).

```html
<div class="position-absolute position-top position-left">...</div>
```

**Syntax:**
```
position-[top|right|bottom|left]
position-[xs|sm|md|lg|xl|2xl|3xl]-[top|right|bottom|left]
position-[xs|sm|md|lg|xl|2xl|3xl]-[top|right|bottom|left]-only
```

## Z-Index

Stack order for positioned elements.

```html
<div class="position-relative z-index-99">...</div>
```

**Available values:** 1, 2, 9, 90, 99, 900, 909, 999, 9999

**Syntax:**
```
z-index-[1|2|9|90|99|900|909|999|9999]
z-index-[xs|sm|md|lg|xl|2xl|3xl]-[value]
z-index-[xs|sm|md|lg|xl|2xl|3xl]-[value]-only
```

## Display

### Display Types
```html
<div class="display-none">...</div>
<div class="display-block">...</div>
<div class="display-inline-block">...</div>
<div class="display-flex">...</div>
<div class="display-grid">...</div>
```

**Available types:** none, inline, inline-block, block, table, table-row, table-cell, flex, inline-flex, grid, inline-grid

**Syntax:**
```
display-[type]
display-[xs|sm|md|lg|xl|2xl|3xl]-[type]
display-[xs|sm|md|lg|xl|2xl|3xl]-[type]-only
```

### Hidden
Hide elements (note: NOT mobile-first).

```html
<!-- Hide on xs only -->
<div class="hidden-xs">...</div>

<!-- Hide on sm and larger -->
<div class="hidden-sm-up">...</div>

<!-- Hide on sm and smaller -->
<div class="hidden-sm-down">...</div>
```

**Syntax:**
```
hidden
hidden-[xs|sm|md|lg|xl|2xl|3xl]
hidden-[xs|sm|md|lg|xl|2xl|3xl]-only
hidden-[xs|sm|md|lg|xl|2xl|3xl]-up
hidden-[xs|sm|md|lg|xl|2xl|3xl]-down
```

### Gap
Set gaps between flex/grid items.

```html
<div class="display-flex cb-gap-24">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

**Sizes:** 4, 8, 16, 24, 32, 48, 72

**Syntax:**
```
cb-gap-[4|8|16|24|32|48|72]
cb-gap-[xs|sm|md|lg|xl|2xl|3xl]-[size]-up
cb-gap-[xs|sm|md|lg|xl|2xl|3xl]-[size]-down
cb-gap-[xs|sm|md|lg|xl|2xl|3xl]-[size]-only
```

### Overflow
```html
<div class="overflow-auto">...</div>
<div class="overflow-x-scroll">...</div>
<div class="overflow-y-hidden">...</div>
```

**Types:** visible, hidden, scroll, auto

**Syntax:**
```
overflow-[type]
overflow-[x|y]-[type]
overflow-[xs|sm|md|lg|xl|2xl|3xl]-[type]
overflow-[x|y]-[xs|sm|md|lg|xl|2xl|3xl]-[type]
overflow-[xs|sm|md|lg|xl|2xl|3xl]-[type]-only
```

### Visibility
Controls visibility (hidden elements still take up space).

```html
<div class="visibility-hidden">...</div>
<div class="visibility-visible">...</div>
```

**Syntax:**
```
visibility-[visible|hidden]
visibility-[xs|sm|md|lg|xl|2xl|3xl]-[visible|hidden]
visibility-[xs|sm|md|lg|xl|2xl|3xl]-[visible|hidden]-only
```

### Width/Height
```html
<div class="cb-width-100">...</div>
<div class="cb-height-50">...</div>
<div class="cb-width-auto">...</div>
```

**Values:** 50 (50%), 100 (100%), auto

**Syntax:**
```
cb-[width|height]-[50|100|auto]
cb-[width|height]-[xs|sm|md|lg|xl|2xl|3xl]-[50|100|auto]-up
cb-[width|height]-[xs|sm|md|lg|xl|2xl|3xl]-[50|100|auto]-only
```

### Reset Min/Max Width/Height
```html
<div class="cb-no-min-height">...</div>
<div class="cb-no-max-width">...</div>
```

**Syntax:**
```
cb-no-[min|max]-[width|height]
cb-no-[min|max]-[width|height]-[xs|sm|md|lg|xl|2xl|3xl]-up
cb-no-[min|max]-[width|height]-[xs|sm|md|lg|xl|2xl|3xl]-only
```

### Viewport Width/Height
Set width/height relative to viewport.

```html
<div class="cb-width-100-vw">Full viewport width</div>
<div class="cb-height-100-vh">Full viewport height</div>

<!-- Custom calc example -->
<div style="min-height: calc(100vh - 72px)">...</div>
```

**Values:** 50 (50vw/vh), 100 (100vw/vh)

**Syntax:**
```
cb-width-[50|100]-vw
cb-height-[50|100]-vh
cb-width-[xs|sm|md|lg|xl|2xl|3xl]-[50|100]-vw-up
cb-height-[xs|sm|md|lg|xl|2xl|3xl]-[50|100]-vh-up
cb-width-[xs|sm|md|lg|xl|2xl|3xl]-[50|100]-vw-only
cb-height-[xs|sm|md|lg|xl|2xl|3xl]-[50|100]-vh-only
```

## Flexbox

### Direction
```html
<div class="display-flex flex-row">...</div>
<div class="display-flex flex-row-reverse">...</div>
<div class="display-flex flex-column">...</div>
<div class="display-flex flex-column-reverse">...</div>
```

**Syntax:**
```
flex-[row|row-reverse|column|column-reverse]
flex-[xs|sm|md|lg|xl|2xl|3xl]-[direction]
flex-[xs|sm|md|lg|xl|2xl|3xl]-[direction]-only
```

### Justify Content
Align flex items on main axis.

```html
<div class="display-flex justify-content-center">...</div>
<div class="display-flex justify-content-between">...</div>
```

**Values:** start, end, center, between, around

**Syntax:**
```
justify-content-[value]
justify-content-[xs|sm|md|lg|xl|2xl|3xl]-[value]
justify-content-[xs|sm|md|lg|xl|2xl|3xl]-[value]-only
```

### Align Items
Align flex items on cross axis.

```html
<div class="display-flex align-items-center">...</div>
<div class="display-flex align-items-stretch">...</div>
```

**Values:** start, end, center, baseline, stretch

**Syntax:**
```
align-items-[value]
align-items-[xs|sm|md|lg|xl|2xl|3xl]-[value]
align-items-[xs|sm|md|lg|xl|2xl|3xl]-[value]-only
```

### Align Self
Align individual flex item on cross axis.

```html
<div class="align-self-center">...</div>
<div class="align-self-end">...</div>
```

**Values:** auto, start, end, center, baseline, stretch

**Syntax:**
```
align-self-[value]
align-self-[xs|sm|md|lg|xl|2xl|3xl]-[value]
align-self-[xs|sm|md|lg|xl|2xl|3xl]-[value]-only
```

### Fill
Force flex items to equal widths.

```html
<div class="display-flex">
  <div class="flex-fill">Equal width</div>
  <div class="flex-fill">Equal width</div>
</div>
```

**Syntax:**
```
flex-fill
flex-[xs|sm|md|lg|xl|2xl|3xl]-fill
flex-[xs|sm|md|lg|xl|2xl|3xl]-fill-only
```

### Grow and Shrink
```html
<div class="flex-grow-1">Grows to fill space</div>
<div class="flex-grow-0">Does not grow</div>
<div class="flex-shrink-1">Can shrink</div>
<div class="flex-shrink-0">Cannot shrink</div>
```

**Syntax:**
```
flex-[grow|shrink]-[0|1]
flex-[xs|sm|md|lg|xl|2xl|3xl]-[grow|shrink]-[0|1]
flex-[xs|sm|md|lg|xl|2xl|3xl]-[grow|shrink]-[0|1]-only
```

### Wrap
```html
<div class="display-flex flex-wrap">...</div>
<div class="display-flex flex-nowrap">...</div>
<div class="display-flex flex-wrap-reverse">...</div>
```

**Syntax:**
```
flex-[nowrap|wrap|wrap-reverse]
flex-[xs|sm|md|lg|xl|2xl|3xl]-[nowrap|wrap|wrap-reverse]
flex-[xs|sm|md|lg|xl|2xl|3xl]-[nowrap|wrap|wrap-reverse]-only
```

### Order
Control visual order of flex items.

```html
<div class="order-2">Second</div>
<div class="order-1">First</div>
<div class="order-last">Last</div>
```

**Values:** first, last, 1-12

**Syntax:**
```
order-[first|last|1-12]
order-[xs|sm|md|lg|xl|2xl|3xl]-[first|last|1-12]
order-[xs|sm|md|lg|xl|2xl|3xl]-[first|last|1-12]-only
```

## Common Patterns

### Centered Container
```html
<div class="container">
  <div class="row">
    <div class="col-md-8 offset-md-2">Centered content</div>
  </div>
</div>
```

### Two-Column Layout (Responsive)
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-8">Main content</div>
    <div class="col-xs-12 col-md-4">Sidebar</div>
  </div>
</div>
```

### Equal Height Cards (Flexbox)
```html
<div class="row display-flex">
  <div class="col-md-4 display-flex">
    <div class="card flex-fill">Card 1</div>
  </div>
  <div class="col-md-4 display-flex">
    <div class="card flex-fill">Card 2</div>
  </div>
  <div class="col-md-4 display-flex">
    <div class="card flex-fill">Card 3</div>
  </div>
</div>
```

### Centered Modal Content
```html
<div class="display-flex justify-content-center align-items-center cb-height-100-vh">
  <div class="modal-content">...</div>
</div>
```

### Responsive Visibility
```html
<!-- Show on mobile, hide on desktop -->
<div class="hidden-md-up">Mobile only</div>

<!-- Hide on mobile, show on desktop -->
<div class="hidden-xs hidden-sm">Desktop only</div>
```

### Custom Spacing Between Elements
```html
<div class="cb-gutterv-32">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Sticky Header
```html
<header class="position-sticky position-top z-index-999">...</header>
```

## Accessibility Requirements

1. **No Two-Dimensional Scrolling:** Content must reflow at 320px width without requiring both horizontal and vertical scrolling (WCAG 2.1, 1.4.10 Level AA)

2. **Content Reflows:** Ensure content is viewable at 320px width (horizontal writing) or 256px height (vertical writing) without two-directional scrolling

3. **Exceptions:** Images, maps, tables, diagrams may require two-dimensional layout

4. **Mobile-First Approach:** Design for smallest screen first, then enhance for larger screens

## Important Notes

1. **No cb- Prefix:** Most grid classes do NOT use `cb-` prefix (except custom utilities like `cb-gap-*`, `cb-gutter*-*`, `cb-width-*`)

2. **Mobile-First:** Breakpoint classes apply to that size and up (e.g., `col-sm-6` applies to sm, md, lg, xl, 2xl, 3xl)

3. **12-Column System:** Always ensure column numbers add up to 12 per row

4. **24px Gutter:** Default gutter is 24px (12px left + 12px right padding)

5. **Container Types:**
   - `.container` - Responsive max-width per breakpoint
   - `.container-fluid` - Full-width (100%)

6. **Hidden Classes Exception:** `hidden-*` classes are NOT mobile-first (use carefully)

7. **Based on Bootstrap:** System is based on Bootstrap 4.0 grid but doesn't include all Bootstrap features

8. **Flexbox Required:** Most utility classes require parent to have `display-flex` or `display-grid`

9. **Gap vs Gutter:**
   - `cb-gap-*` - For flex/grid containers (applies between items)
   - `cb-gutter*-*` - Adds margins to direct child divs
   - `no-gutters` - Removes default column padding

10. **Responsive Patterns:**
    - `-only` - Specific breakpoint only
    - `-up` - Breakpoint and larger
    - `-down` - Breakpoint and smaller
    - No suffix - Breakpoint and larger (mobile-first)
