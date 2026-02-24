# Spacing Components

## Overview
The spacing package provides simple components for adding vertical and horizontal space between elements: `Spacer` (vertical), `SpacerV` (vertical), and `SpacerH` (horizontal).

## Spacer / SpacerV (Vertical Spacing)

Both `Spacer` and `SpacerV` provide the same functionality - adding vertical space between elements.

### Basic Usage

```tsx
import { Spacer, SpacerV } from '@cb/apricot-react';

// Default spacing (24px)
<div>
  <p>First paragraph</p>
  <Spacer />
  <p>Second paragraph</p>
</div>

// Custom spacing
<div>
  <h1>Title</h1>
  <Spacer size="48" />
  <p>Content with large spacing above</p>
</div>
```

### Key Props

- `size` - Vertical spacing in pixels: '0' | '8' | '16' | '24' | '32' | '48' | '72'

**Note**: Size '0' renders `null` (no element).

### Available Sizes

- `'0'` - No spacing (renders null)
- `'8'` - 8px spacing
- `'16'` - 16px spacing
- `'24'` - 24px spacing (default when no size specified)
- `'32'` - 32px spacing
- `'48'` - 48px spacing
- `'72'` - 72px spacing

## SpacerH (Horizontal Spacing)

Adds horizontal space between elements (for use in flex containers).

### Basic Usage

```tsx
import { SpacerH } from '@cb/apricot-react';

// Default horizontal spacing (16px)
<div style={{ display: 'flex' }}>
  <button>Cancel</button>
  <SpacerH />
  <button>Submit</button>
</div>

// Custom spacing
<div style={{ display: 'flex' }}>
  <div>Left Content</div>
  <SpacerH size="32" />
  <div>Right Content</div>
</div>
```

### Key Props

- `size` - Horizontal spacing in pixels: '0' | '4' | '8' | '16' | '24' | '32' | '72'

### Available Sizes

- `'0'` - No spacing
- `'4'` - 4px spacing
- `'8'` - 8px spacing
- `'16'` - 16px spacing (default when no size specified)
- `'24'` - 24px spacing
- `'32'` - 32px spacing
- `'72'` - 72px spacing

## Common Patterns

### Section Spacing

```tsx
// Add space between sections
<article>
  <section>
    <h2>Section 1</h2>
    <p>Content here...</p>
  </section>
  
  <Spacer size="72" />
  
  <section>
    <h2>Section 2</h2>
    <p>Content here...</p>
  </section>
</article>
```

### Form Field Spacing

```tsx
import { Input, Spacer } from '@cb/apricot-react';

<form>
  <Input label="First Name" />
  <Spacer size="24" />
  <Input label="Last Name" />
  <Spacer size="24" />
  <Input label="Email" />
  <Spacer size="32" />
  <button type="submit">Submit</button>
</form>
```

### Card Grid Spacing

```tsx
// Vertical spacing between rows
<div>
  <div className="row">
    <div className="col-md-6">Card 1</div>
    <div className="col-md-6">Card 2</div>
  </div>
  
  <Spacer size="48" />
  
  <div className="row">
    <div className="col-md-6">Card 3</div>
    <div className="col-md-6">Card 4</div>
  </div>
</div>
```

### Horizontal Button Spacing

```tsx
import { SpacerH, PrimaryButton, NakedButton } from '@cb/apricot-react';

<div style={{ display: 'flex' }}>
  <NakedButton>Cancel</NakedButton>
  <SpacerH size="24" />
  <PrimaryButton>Save</PrimaryButton>
</div>
```

### Flex Layout with Spacers

```tsx
<div style={{ display: 'flex', alignItems: 'center' }}>
  <img src="avatar.png" alt="User" />
  <SpacerH size="16" />
  <div>
    <h3>John Doe</h3>
    <p>Software Engineer</p>
  </div>
  <SpacerH size="32" />
  <button>Follow</button>
</div>
```

### Modal Content Spacing

```tsx
import { Modal, Spacer, PrimaryButton } from '@cb/apricot-react';

<Modal title="Confirmation">
  <p>Are you sure you want to proceed?</p>
  <Spacer size="24" />
  <p className="cb-font-size-small">
    This action cannot be undone.
  </p>
  <Spacer size="32" />
  <PrimaryButton>Confirm</PrimaryButton>
</Modal>
```

### Responsive Spacing

```tsx
// Use different spacers for different contexts
<div>
  <h1>Title</h1>
  
  {/* Larger spacing on desktop */}
  <div className="d-none d-md-block">
    <Spacer size="48" />
  </div>
  
  {/* Smaller spacing on mobile */}
  <div className="d-block d-md-none">
    <Spacer size="24" />
  </div>
  
  <p>Content</p>
</div>
```

### Conditional Spacing

```tsx
const hasError = true;

<div>
  <Input label="Email" />
  {hasError && <Spacer size="8" />}
  {hasError && <p className="cb-error">Invalid email</p>}
  <Spacer size="24" />
  <button>Submit</button>
</div>
```

### Navigation Spacing

```tsx
<nav style={{ display: 'flex' }}>
  <a href="/">Home</a>
  <SpacerH size="24" />
  <a href="/about">About</a>
  <SpacerH size="24" />
  <a href="/contact">Contact</a>
</nav>
```

## Spacer vs CSS Margins

### When to Use Spacer Components

✅ **Use Spacer when:**
- You want consistent spacing across the application
- Building layouts where spacing is a distinct concern
- Working with flex containers (SpacerH)
- Need explicit visual spacing in component trees
- Prefer declarative spacing over CSS classes

```tsx
<div>
  <Header />
  <Spacer size="48" />
  <MainContent />
</div>
```

### When to Use CSS Margins

✅ **Use CSS margins when:**
- Component has intrinsic spacing requirements
- Styling tightly coupled to a specific component
- Using utility classes for responsive spacing
- Need more granular control (e.g., 5px, 13px)

```tsx
<div className="cb-margin-bottom-24">
  <Header />
</div>
<MainContent />
```

## Size Reference

### Vertical Spacer Sizes
- `0` - No spacing (null)
- `8` - 8px (0.5rem)
- `16` - 16px (1rem)
- `24` - 24px (1.5rem) - **Default**
- `32` - 32px (2rem)
- `48` - 48px (3rem)
- `72` - 72px (4.5rem)

### Horizontal Spacer Sizes
- `0` - No spacing
- `4` - 4px (0.25rem)
- `8` - 8px (0.5rem)
- `16` - 16px (1rem) - **Default**
- `24` - 24px (1.5rem)
- `32` - 32px (2rem)
- `72` - 72px (4.5rem)

## Important Notes

- `Spacer` and `SpacerV` are identical - both provide vertical spacing
- Spacers render as `<div>` elements with specific CSS classes
- Size `'0'` on vertical spacers returns `null` (no element rendered)
- SpacerH should be used inside flex containers to create horizontal gaps
- Default vertical spacing is 24px when no size prop is provided
- Default horizontal spacing is 16px when no size prop is provided
- Spacers use Apricot's spacing system for consistency
- Spacers are purely layout components with no semantic meaning
- Consider using CSS Grid or Flexbox gap properties for modern layouts as an alternative
- Spacers are useful for maintaining consistent spacing without managing margin classes
