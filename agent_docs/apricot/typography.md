# CSS Typography

## Overview
Apricot's typography system provides utility classes for font families, sizes, weights, colors, and text formatting.

**Import:** `import "@cb/apricot/CBBase";`

## Default Settings

**Base font:** 16px/24px (used at `<body>` tag)

```css
cb-font-size      /* 16px/24px line-height */
cb-font-family    /* Roboto/400 */
cb-font-color     /* #1e1e1e (black1) */
```

## Font Family

### Roboto (Primary)
```css
cb-roboto-thin          /* Roboto 100 */
cb-roboto-light         /* Roboto 300 */
cb-roboto               /* Roboto 400 (default) */
cb-roboto-medium        /* Roboto 500 */
cb-roboto-bold          /* Roboto 700 */
cb-roboto-black         /* Roboto 900 */
```

### Roboto Italic
```css
cb-roboto-italic-thin   /* Roboto 100 Italic */
cb-roboto-italic-light  /* Roboto 300 Italic */
cb-roboto-italic        /* Roboto 400 Italic */
cb-roboto-italic-medium /* Roboto 500 Italic */
cb-roboto-italic-bold   /* Roboto 700 Italic */
cb-roboto-italic-black  /* Roboto 900 Italic */
```

### Sans Serif
```css
cb-sans-serif           /* Sans Serif 400 (fallback) */
```

### RobotoSlab (Requires Separate CDN)
**Not included in main.css.** Add separately:

```html
<link href="https://atlas.collegeboard.org/apricot/stg/4.5.0/robotoslab.css" rel="stylesheet">
```

```css
cb-roboto-slab-thin     /* RobotoSlab 100 */
cb-roboto-slab-light    /* RobotoSlab 300 */
cb-roboto-slab          /* RobotoSlab 400 */
cb-roboto-slab-bold     /* RobotoSlab 700 */
```

## Font Size

```css
cb-font-size-regular    /* 16/24 (default) */
cb-font-size-small      /* 14/24 */
cb-font-size-xsmall     /* 12/24 */
cb-font-size-xlarge     /* 96/96 */
```

### Responsive XLarge
```css
cb-font-size-xlarge-res /* xs: 60/60, md: 72/72, xl: 84/84, default: 96/96 */
```

## Font Weight

```css
cb-font-weight-thin           /* 100 */
cb-font-weight-extra-light    /* 200 */
cb-font-weight-light          /* 300 */
cb-font-weight-regular        /* 400 */
cb-font-weight-medium         /* 500 (Roboto only) */
cb-font-weight-semi-bold      /* 600 */
cb-font-weight-bold           /* 700 */
cb-font-weight-extra-bold     /* 800 */
cb-font-weight-black          /* 900 (Roboto only) */
```

### Responsive Font Weights
```css
/* Specific breakpoint */
cb-font-weight-md-medium

/* Breakpoint and up */
cb-font-weight-lg-up-thin

/* Breakpoint and down */
cb-font-weight-md-down-thin
```

**Syntax:**
```
cb-font-weight-[xs|sm|md|lg|xl|2xl|3xl]-[thin|light|regular|medium|bold|black]
cb-font-weight-[xs|sm|md|lg|xl|2xl|3xl]-up-[weight]
cb-font-weight-[xs|sm|md|lg|xl|2xl|3xl]-down-[weight]
```

## Font Color

```css
cb-white-color      /* #FFFFFF */
cb-black1-color     /* #1E1E1E */
cb-blue2-color      /* #0077C8 (K-12) */
cb-blue5-color      /* #3049CF (CB) */
cb-gray1-color      /* #505050 */
cb-gray2-color      /* #888888 */
cb-gray3-color      /* #B2B2B2 */
cb-gray4-color      /* #D9D9D9 */
cb-gray5-color      /* #F0F0F0 */
cb-red1-color       /* #C13145 */
cb-purple1-color    /* #702F8A (Higher Ed) */
cb-green3-color     /* #1D7846 */
```

### Responsive Colors
```css
cb-white-color-md   /* White at md breakpoint */
cb-black1-color-xl  /* Black1 at xl breakpoint */
```

**Syntax:** `cb-[white|black1]-color-[xs|sm|md|lg|xl|2xl|3xl]`

See [colors.md](colors.md) for color values.

## Headings

### Responsive Heading Classes
All headings scale based on breakpoint:

```css
/* H1: 3xl/2xl/xl/lg: 56/64, md/sm: 40/48, xs: 32/40 */
cb-h1

/* H1 Lite: 3xl/2xl/xl/lg: 48/56, md/sm: 40/48, xs: 32/40 */
cb-h1-lite

/* H2: 3xl/2xl/xl/lg: 40/48, md/sm: 32/40, xs: 28/32 */
cb-h2

/* H3: 3xl/2xl/xl/lg: 32/40, md/sm: 28/32, xs: 21/24 */
cb-h3

/* H4: 3xl/2xl/xl/lg: 26/32, md/sm: 21/24, xs: 19/24 */
cb-h4

/* H5: 3xl/2xl/xl/lg: 21/24, md/sm: 18/24, xs: 16/24 */
cb-h5

/* H6: 3xl/2xl/xl/lg: 19/24, md/sm: 16/24, xs: 14/16 */
cb-h6
```

**Usage:**
```html
<h1 class="cb-h1">Page Title</h1>
<h2 class="cb-h2">Section Heading</h2>
<div class="cb-h3">Styled like H3</div>
```

## Paragraph Text

### Responsive Paragraphs
Adapt to screen size:

```css
/* 3xl/2xl/xl/lg: 21/32, md/sm/xs: 16/24 */
cb-paragraph1-res

/* 3xl/2xl/xl/lg: 32/40, md/sm: 24/32, xs: 21/24 */
cb-paragraph2-res

/* 3xl/2xl/xl/lg: 32/48, md/sm/xs: 21/32 */
cb-paragraph3-res

/* 3xl/2xl/xl/lg/md: 40/48, sm/xs: 32/40 */
cb-paragraph4-res
```

### Static Paragraphs
Fixed sizes across all breakpoints:

```css
cb-paragraph1-st    /* 16/24, weight 400 */
cb-paragraph2-st    /* 14/24, weight 400 */
cb-paragraph3-st    /* 18/24, weight 400 */
cb-paragraph4-st    /* 23/24, weight 300 */
cb-paragraph5-st    /* 23/24, weight 700 */
cb-paragraph6-st    /* 24/32, weight 700 */
```

## Inline Text Styles

```css
cb-text-bold        /* Bold text */
cb-text-strong      /* Bold (semantic) */

cb-text-italic      /* Italic text */
cb-text-emphasis    /* Italic (semantic) */
```

**HTML Alternatives:**
```html
<sub>subscript</sub>           or class="cb-text-sub"
<sup>superscript</sup>          or class="cb-text-sup"
```

## Special Text Styles

```css
cb-text-overline            /* ALL CAPS OVERLINE */
cb-text-overline-small      /* Smaller overline */
cb-text-uppercase           /* ALL CAPS */
cb-text-caption             /* Caption Text */
cb-text-caption-small       /* Smaller Caption */
cb-text-meta-large          /* Large meta text */
cb-text-meta                /* Standard meta text */
cb-text-reset               /* Remove text-transform */

cb-text-highlight-yellow    /* Yellow background highlight */
cb-text-highlight-blue      /* Blue background highlight */

cb-text-super-event         /* Event title styling */
cb-text-author              /* Author attribution */
cb-text-disabled            /* Disabled state text */
cb-text-placeholder         /* Placeholder text */
cb-text-line-through        /* Strikethrough */
```

**HTML Alternative:**
```html
<mark>Highlighted text</mark>  <!-- Same as cb-text-highlight-blue -->
```

## Blockquote

```html
<blockquote>
  <p class="cb-paragraph3-res">Quote text here...</p>
  <p class="cb-paragraph1-res cb-text-author cb-margin-top-32">
    —James Callahan, High school teacher
  </p>
</blockquote>
```

## Text Alignment

```css
cb-align-left
cb-align-right
cb-align-center
```

### Responsive Alignment
```css
/* Specific breakpoint */
cb-align-xs-right

/* Breakpoint and up */
cb-align-md-up-right
```

**Syntax:**
```
cb-align-[left|right|center]
cb-align-[xs|sm|md|lg|xl|2xl|3xl]-[left|right|center]
cb-align-[xs|sm|md|lg|xl|2xl|3xl]-up-[left|right|center]
```

## Text Truncate

Requires fixed width on element:

```css
cb-truncate
```

### Responsive Truncate
```css
cb-truncate-xs          /* Truncate at xs */
cb-truncate-md-up       /* Truncate at md and up */
```

**Syntax:**
```
cb-truncate
cb-truncate-[xs|sm|md|lg|xl|2xl|3xl]
cb-truncate-[xs|sm|md|lg|xl|2xl|3xl]-up
```

## White Space

Controls how whitespace is handled:

```css
cb-white-space-normal       /* Default: collapse, wrap */
cb-white-space-nowrap       /* Collapse, no wrap */
cb-white-space-pre          /* Preserve, wrap on <br> */
cb-white-space-pre-line     /* Collapse, wrap on breaks */
cb-white-space-pre-wrap     /* Preserve, wrap */
cb-white-space-initial
cb-white-space-inherit
```

### Responsive White Space
```css
cb-white-space-lg-pre-wrap
cb-white-space-md-up-nowrap
```

**Syntax:**
```
cb-white-space-[xs|sm|md|lg|xl|2xl|3xl]-[value]
cb-white-space-[xs|sm|md|lg|xl|2xl|3xl]-up-[value]
```

## Overflow Wrap

Controls line breaking for long words:

```css
cb-overflow-wrap-normal         /* Default: no break */
cb-overflow-wrap-anywhere       /* Break if overflow */
cb-overflow-wrap-break-word     /* Break if overflow */
cb-overflow-wrap-initial
cb-overflow-wrap-inherit
```

### Responsive Overflow Wrap
```css
cb-overflow-wrap-lg-break-word
cb-overflow-wrap-md-up-anywhere
```

**Syntax:**
```
cb-overflow-wrap-[xs|sm|md|lg|xl|2xl|3xl]-[value]
cb-overflow-wrap-[xs|sm|md|lg|xl|2xl|3xl]-up-[value]
```

## Column Count

Divide text into multiple columns:

```css
cb-column-count-2
cb-column-count-3
cb-column-count-4
```

### Responsive Columns
```css
cb-column-count-xs-2
cb-column-count-md-up-4
```

**Syntax:**
```
cb-column-count-[2|3|4]
cb-column-count-[xs|sm|md|lg|xl|2xl|3xl]-[2|3|4]
cb-column-count-[xs|sm|md|lg|xl|2xl|3xl]-up-[2|3|4]
```

## Text Selection

Prevent text selection:

```css
cb-no-text-select
```

## Reset Classes

```css
cb-no-font              /* Reset to default: Roboto 400, 16/24, #1e1e1e */
cb-no-line-height       /* line-height: 0 */
```

## Common Patterns

### Page Title
```html
<h1 class="cb-h1 cb-blue5-color">Welcome to College Board</h1>
```

### Article Body
```html
<article>
  <h2 class="cb-h2 cb-margin-bottom-24">Article Title</h2>
  <p class="cb-paragraph1-res">Article content with responsive sizing...</p>
</article>
```

### Caption with Author
```html
<p class="cb-text-caption cb-gray2-color">Photo caption</p>
<p class="cb-text-author cb-margin-top-8">—Photographer Name</p>
```

### Highlighted Text
```html
<p>This is important: <mark>highlighted information</mark> for users.</p>
<!-- or -->
<p>This is important: <span class="cb-text-highlight-blue">highlighted information</span> for users.</p>
```

### Overline Label
```html
<p class="cb-text-overline cb-blue5-color cb-margin-bottom-8">Category</p>
<h3 class="cb-h3">Content Title</h3>
```

### Responsive Columns
```html
<div class="cb-column-count-sm-2 cb-column-count-md-up-3">
  <p class="cb-paragraph1-res">Long text divided into columns...</p>
</div>
```

### Meta Information
```html
<p class="cb-text-meta cb-gray2-color">Posted 2 hours ago</p>
```

### Truncated Title
```html
<h3 class="cb-h3 cb-truncate" style="max-width: 300px;">
  Very Long Title That Will Be Truncated With Ellipsis
</h3>
```

### Quote Block
```html
<blockquote>
  <p class="cb-paragraph3-res cb-roboto-italic">
    "Education is the most powerful weapon which you can use to change the world."
  </p>
  <p class="cb-paragraph1-res cb-text-author cb-margin-top-32">
    —Nelson Mandela
  </p>
</blockquote>
```

## Accessibility Requirements

1. **Contrast Ratios:**
   - Regular text (<18pt or <14pt bold): **4.5:1** minimum
   - Large text (≥18pt or ≥14pt bold): **3:1** minimum
   - Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

2. **Heading Hierarchy:**
   - Use heading levels consistently (H1 → H2 → H3)
   - Don't skip levels (H1 → H3)
   - Don't style H3 to look more prominent than H2

3. **Highlighted Text:**
   - Use `<mark>` element for semantic highlighting
   - Provide color alternatives (not just color)
   - Include off-screen text when needed for context

4. **Semantic HTML:**
   - Use `<strong>` for importance, not just bold
   - Use `<em>` for emphasis, not just italic
   - Use appropriate heading tags, not just styled divs

## Important Notes

1. **Font Sizing:**
   - Base: 16px/24px at body level
   - Use rem units for custom CSS (1rem = 16px)
   - Line heights use px values for consistency

2. **Responsive Text:**
   - Heading classes auto-scale by breakpoint
   - Use `-res` paragraphs for article content
   - Use `-st` paragraphs for fixed sizes (UI components)

3. **Font Weights:**
   - Roboto supports all weights (100-900)
   - RobotoSlab supports: 100, 300, 400, 700
   - Medium (500) and Black (900) only for Roboto

4. **Color Usage:**
   - Text colors require separate color classes
   - No direct text color in font classes
   - Combine: `cb-h1 cb-blue5-color`

5. **Capitalization:**
   - Headers: Title Case
   - Subheads: Title Case
   - See [College Board Editorial Standards](https://brand.collegeboard.org/editorial-standards)

6. **Truncation:**
   - Requires fixed width (inline-style or class)
   - Only works on single-line text
   - Shows ellipsis (…) for overflow

7. **Column Count:**
   - Creates CSS multi-column layout
   - Automatically balances content
   - May break words/sentences across columns

8. **White Space Values:**
   - `normal` - Default browser behavior
   - `nowrap` - Force single line
   - `pre` - Like `<pre>` tag
   - `pre-line` - Preserve breaks only
   - `pre-wrap` - Preserve all, allow wrap

9. **Overflow Wrap:**
   - Use `break-word` for long URLs/emails
   - `anywhere` breaks more aggressively
   - Only affects long words that overflow

10. **RobotoSlab CDN:**
    - Not in main.css (v4.5.0+)
    - Requires separate CSS file
    - Use for serif headings/emphasis

11. **Combining Classes:**
    - Stack multiple classes: `cb-h1 cb-blue5-color cb-roboto-bold`
    - Order doesn't matter (CSS specificity)
    - Later classes may override earlier ones

12. **Performance:**
    - Font loading impacts LCP
    - Consider font-display: swap
    - Minimize font-weight variants loaded
