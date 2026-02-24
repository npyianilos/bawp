# CSS Borders

## Overview
Apricot's border system provides utility classes for controlling border width, color, style, radius, and box shadows.

**Import:** `import "@cb/apricot/CBBase";`

## Default Values

```css
cb-border-style   /* style: solid */
cb-border-width   /* width: 1px */
cb-border-color   /* color: #909090 */
```

## Position

Apply borders to specific sides:

```html
<div class="cb-border">All sides</div>
<div class="cb-border-top">Top only</div>
<div class="cb-border-right">Right only</div>
<div class="cb-border-bottom">Bottom only</div>
<div class="cb-border-left">Left only</div>
```

## Width

### All Sides
```html
<div class="cb-border cb-border-1">1px border</div>
<div class="cb-border cb-border-2">2px border</div>
<div class="cb-border cb-border-4">4px border</div>
<div class="cb-border cb-border-8">8px border</div>
<div class="cb-border cb-border-16">16px border</div>
<div class="cb-border cb-border-24">24px border</div>
```

**Syntax:** `cb-border-[1|2|4|8|16|24]`

**Note:** Use with `cb-border` to apply border

### Specific Sides
```html
<div class="cb-border-color cb-border-style cb-border-top-1">Top 1px</div>
<div class="cb-border-color cb-border-style cb-border-right-2">Right 2px</div>
<div class="cb-border-color cb-border-style cb-border-bottom-4">Bottom 4px</div>
<div class="cb-border-color cb-border-style cb-border-left-8">Left 8px</div>
```

**Syntax:** `cb-border-[top|right|bottom|left]-[1|2|4|8|16|24]`

**Note:** Combine with `cb-border-color` and `cb-border-style`

## Color

Available border colors:

```html
<div class="cb-border cb-white-border">White</div>
<div class="cb-border cb-black1-border">Black</div>

<div class="cb-border cb-blue2-border">Blue 2 (K-12)</div>
<div class="cb-border cb-blue3-border">Blue 3</div>
<div class="cb-border cb-blue5-border">Blue 5 (CB)</div>

<div class="cb-border cb-gray1-border">Gray 1</div>
<div class="cb-border cb-gray4-border">Gray 4</div>
<div class="cb-border cb-gray5-border">Gray 5</div>

<div class="cb-border cb-red1-border">Red 1</div>
<div class="cb-border cb-purple1-border">Purple 1 (Higher Ed)</div>
```

**Note:** Use with `cb-border` base class

### Tints
```html
<div class="cb-border cb-blue5-tint-1-border">Blue 5 Tint 1</div>
<div class="cb-border cb-blue5-tint-2-border">Blue 5 Tint 2</div>

<div class="cb-border cb-blue2-tint-1-border">Blue 2 Tint 1</div>
<div class="cb-border cb-blue2-tint-2-border">Blue 2 Tint 2</div>

<div class="cb-border cb-purple1-tint-1-border">Purple 1 Tint 1</div>
<div class="cb-border cb-purple1-tint-2-border">Purple 1 Tint 2</div>
```

See [colors.md](colors.md) for color values.

## Style

```html
<div class="cb-border cb-border-color cb-border-solid">Solid border</div>
<div class="cb-border cb-border-color cb-border-dashed">Dashed border</div>
```

**Note:** Combine with `cb-border` and `cb-border-color`

## Border Radius

### All Corners
```html
<div class="cb-border-radius">8px radius (default)</div>
<div class="cb-border-radius-8">8px radius</div>
<div class="cb-border-radius-16">16px radius</div>
<div class="cb-border-radius-50">50% radius (circular)</div>
```

**Values:**
- `cb-border-radius` - 8px (default)
- `cb-border-radius-8` - 8px
- `cb-border-radius-16` - 16px
- `cb-border-radius-50` - 50% (for circular elements)

### Specific Corners
```html
<div class="cb-border-radius-top-right-8">Top-right 8px</div>
<div class="cb-border-radius-top-left-16">Top-left 16px</div>
<div class="cb-border-radius-bottom-right-50">Bottom-right 50%</div>
<div class="cb-border-radius-bottom-left-8">Bottom-left 8px</div>
```

**Syntax:** `cb-border-radius-[top|bottom]-[right|left]-[8|16|50]`

## Responsive Borders

### Specific Breakpoint Only
```html
<div class="cb-border-xs">Border on xs only</div>
<div class="cb-border-xs-top">Top border on xs only</div>
```

**Syntax:**
```
cb-border-[xs|sm|md|lg|xl|2xl|3xl]
cb-border-[xs|sm|md|lg|xl|2xl|3xl]-[top|right|bottom|left]
```

### Breakpoint and Up
```html
<div class="cb-border-sm-up">Border on sm and larger</div>
<div class="cb-border-sm-up-top">Top border on sm and larger</div>
```

**Syntax:**
```
cb-border-[xs|sm|md|lg|xl|2xl|3xl]-up
cb-border-[xs|sm|md|lg|xl|2xl|3xl]-up-[top|right|bottom|left]
```

### Breakpoint and Down
```html
<div class="cb-border-sm-down">Border on sm and smaller</div>
<div class="cb-border-sm-down-top">Top border on sm and smaller</div>
```

**Syntax:**
```
cb-border-[xs|sm|md|lg|xl|2xl|3xl]-down
cb-border-[xs|sm|md|lg|xl|2xl|3xl]-down-[top|right|bottom|left]
```

See [grid.md](grid.md) for breakpoint values.

## Box Shadow

### Dark Shadow
```html
<div class="cb-box-shadow">All sides shadow</div>
<div class="cb-box-shadow-top">Top shadow</div>
<div class="cb-box-shadow-right">Right shadow</div>
<div class="cb-box-shadow-bottom">Bottom shadow</div>
<div class="cb-box-shadow-left">Left shadow</div>
```

### Light Shadow
```html
<div class="cb-box-shadow-light">All sides light shadow</div>
<div class="cb-box-shadow-top-light">Top light shadow</div>
<div class="cb-box-shadow-right-light">Right light shadow</div>
<div class="cb-box-shadow-bottom-light">Bottom light shadow</div>
<div class="cb-box-shadow-left-light">Left light shadow</div>
```

## Reset Classes

### Remove Borders
```html
<!-- Remove all borders -->
<div class="cb-no-border">No border</div>

<!-- Remove specific sides -->
<div class="cb-no-border-top">No top border</div>
<div class="cb-no-border-right">No right border</div>
<div class="cb-no-border-bottom">No bottom border</div>
<div class="cb-no-border-left">No left border</div>
```

**Syntax:**
```
cb-no-border
cb-no-border-[top|right|bottom|left]
```

### Responsive Border Removal
```html
<!-- Remove on specific breakpoint -->
<div class="cb-no-border-xs">No border on xs</div>
<div class="cb-no-border-xs-top">No top border on xs</div>
<div class="cb-no-border-3xl-bottom">No bottom border on 3xl</div>
```

**Syntax:**
```
cb-no-border-[xs|sm|md|lg|xl|2xl|3xl]
cb-no-border-[xs|sm|md|lg|xl|2xl|3xl]-[top|right|bottom|left]
```

### Remove Border Radius
```html
<!-- Remove all radius -->
<div class="cb-no-border-radius">No radius</div>

<!-- Remove specific corners -->
<div class="cb-no-border-radius-tr">No top-right radius</div>
<div class="cb-no-border-radius-tl">No top-left radius</div>
<div class="cb-no-border-radius-br">No bottom-right radius</div>
<div class="cb-no-border-radius-bl">No bottom-left radius</div>
```

**Syntax:**
```
cb-no-border-radius
cb-no-border-radius-[tr|tl|br|bl]
```

**Corner abbreviations:**
- `tr` - top-right
- `tl` - top-left
- `br` - bottom-right
- `bl` - bottom-left

### Remove Box Shadow
```html
<div class="cb-no-box-shadow">No shadow</div>
```

## Common Patterns

### Card with Border
```html
<div class="cb-border cb-gray4-border cb-border-radius cb-padding-24">
  <h3>Card Title</h3>
  <p>Card content with subtle border</p>
</div>
```

### Accent Border Bottom
```html
<div class="cb-border-bottom-4 cb-blue5-border">
  <h2>Section Title</h2>
</div>
```

### Button with Outline
```html
<button class="cb-border-2 cb-blue5-border cb-border-radius-8 cb-padding-16">
  Outlined Button
</button>
```

### Circular Avatar
```html
<img 
  src="avatar.jpg" 
  alt="User avatar"
  class="cb-border-radius-50 cb-border-2 cb-white-border"
  style="width: 48px; height: 48px;"
/>
```

### Card with Shadow
```html
<div class="cb-box-shadow cb-border-radius cb-padding-32 cb-white-bg">
  <h3>Elevated Card</h3>
  <p>Card with subtle shadow for depth</p>
</div>
```

### Divider
```html
<div class="cb-border-bottom cb-gray4-border cb-margin-bottom-24"></div>
```

### Input-Like Border
```html
<div class="cb-border cb-gray3-border cb-border-radius cb-padding-16">
  <p>Content styled like input field</p>
</div>
```

### Responsive Card Border
```html
<!-- No border on mobile, border on tablet+ -->
<div class="cb-border-sm-up cb-gray4-border cb-border-radius cb-padding-24">
  <h3>Responsive Border Card</h3>
</div>
```

### Error State Border
```html
<div class="cb-border-2 cb-red1-border cb-border-radius">
  <input type="text" class="cb-no-border" />
</div>
```

### Dashed Separator
```html
<hr class="cb-border-top cb-border-dashed cb-gray4-border" />
```

## Important Notes

1. **Combining Classes:**
   - Border position: `cb-border`, `cb-border-top`, etc.
   - Border width: `cb-border-1`, `cb-border-2`, etc.
   - Border color: `cb-blue5-border`, `cb-gray4-border`, etc.
   - Border style: `cb-border-solid`, `cb-border-dashed`

2. **Default Border:**
   - `cb-border` alone gives: 1px solid #909090 border on all sides
   - Add color classes to override: `cb-border cb-blue5-border`

3. **Width Classes:**
   - All sides: Use with `cb-border` base class
   - Specific sides: Use with `cb-border-color` + `cb-border-style`

4. **Color Usage:**
   - Always combine color classes with position class
   - Example: `cb-border cb-blue5-border` ✓
   - Not: `cb-blue5-border` alone ✗

5. **Border Radius:**
   - Works independently, no need for `cb-border`
   - Can combine with borders: `cb-border cb-border-radius`
   - `cb-border-radius-50` creates perfect circles (requires equal width/height)

6. **Box Shadow:**
   - Independent from borders, can use alone or combined
   - Light shadow variant for subtle elevation
   - Directional shadows for specific depth effects

7. **Responsive Borders:**
   - Follow mobile-first approach (up variants)
   - Use `-down` for progressive enhancement
   - Specific breakpoint for exact control

8. **Reset Classes:**
   - Use `!important` internally, will override other styles
   - Useful for removing inherited borders
   - Can target specific sides/corners

9. **Performance:**
   - Border rendering is performant
   - Box shadows may impact performance with many elements
   - Consider using borders instead of shadows when possible

10. **Accessibility:**
    - Borders alone don't convey meaning
    - Don't rely solely on color (add text/icons)
    - Ensure sufficient contrast for visible borders
    - Use border changes with focus states for keyboard navigation

11. **Stacking Order:**
    - Apply classes in order: position → width → color → style → radius
    - Example: `cb-border cb-border-2 cb-blue5-border cb-border-solid cb-border-radius-8`

12. **Common Widths:**
    - `1px` - Subtle dividers, inputs
    - `2px` - Buttons, cards, emphasis
    - `4px` - Strong emphasis, active states
    - `8px+` - Decorative, special cases
