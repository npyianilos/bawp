# Button Components

## Overview
The button package provides various button components for different use cases: `Button` (default), `PrimaryButton`, `BlackButton`, `YellowButton`, `NakedButton`, `CircularButton`, `SquareButton`, `CloseButton`, `Tag`, `TagSet`, and `ButtonRow`.

## Button (Default)

### Basic Usage

```tsx
import { Button } from '@cb/apricot-react';

// Default button
<Button>Click Me</Button>

// With icon
<Button icon="acorn" iconLeft={true}>
  Save
</Button>

// Large size
<Button large={true}>Large Button</Button>

// Loading state
<Button loading={true}>Processing</Button>
```

### Key Props

- `children` - Button label/content
- `icon` - Icon name (see icon.md for available icon names)
- `iconLeft` - Position icon on left (default: false/right)
- `iconDecorative` - Mark icon as decorative (default: true)
- `small` - Small button size
- `large` - Large button size (default, primary, and black variants only)
- `disabled` - Disable the button
- `loading` - Show loading state with animation
- `withAriaLive` - Add aria-live for loading state
- `light` - Light variant for dark backgrounds
- `hoverShade` - Hover shade effect

## PrimaryButton

Primary action button with blue background.

```tsx
import { PrimaryButton } from '@cb/apricot-react';

<PrimaryButton>Submit</PrimaryButton>

<PrimaryButton icon="check" iconLeft={true}>
  Confirm
</PrimaryButton>

<PrimaryButton light={true}>
  Light Primary
</PrimaryButton>
```

### Props
Same as `Button` component.

## BlackButton / SecondaryButton

Black button variant (SecondaryButton is an alias for BlackButton).

```tsx
import { BlackButton, SecondaryButton } from '@cb/apricot-react';

<BlackButton>Cancel</BlackButton>

<SecondaryButton large={true}>
  Secondary Action
</SecondaryButton>
```

### Props
Same as `Button` component.

## YellowButton

Yellow call-to-action button.

```tsx
import { YellowButton } from '@cb/apricot-react';

<YellowButton>Get Started</YellowButton>

<YellowButton icon="arrow-right">
  Continue
</YellowButton>
```

### Props
Same as `Button` component.

## NakedButton

Minimal text button with no background.

```tsx
import { NakedButton } from '@cb/apricot-react';

<NakedButton>Cancel</NakedButton>

// With custom styling
<NakedButton noPadding={true} noOutline={true}>
  Minimal Button
</NakedButton>

// Reverse underline behavior
<NakedButton reverse={true}>
  Underlined by Default
</NakedButton>
```

### Key Props

All `Button` props plus:
- `noPadding` - Remove padding and use browser focus outline
- `noOutline` - Custom minimal padding focus style (use with noPadding)
- `reverse` - Show underline by default, remove on hover (default: underline on hover)

## CircularButton

Circular icon-only button.

```tsx
import { CircularButton } from '@cb/apricot-react';

<CircularButton
  icon="settings"
  label="Settings"
/>

<CircularButton
  icon="heart"
  label="Like"
  greyscale={true}
/>

<CircularButton
  icon="share"
  label="Share"
  floating={true}
/>
```

### Key Props

- `icon` (required) - Icon name (see icon.md)
- `label` (required) - Accessible label (screen reader only)
- `greyscale` - Greyscale variant (don't use with small)
- `floating` - Floating variant
- `light` - Light variant for dark backgrounds
- `small`, `disabled`, `iconDecorative`

## SquareButton

Square icon-only button.

```tsx
import { SquareButton } from '@cb/apricot-react';

<SquareButton
  icon="edit"
  label="Edit"
/>

<SquareButton
  icon="trash"
  label="Delete"
  greyscale={true}
/>
```

### Key Props

Same as `CircularButton`.

## CloseButton

Pre-configured close button (extends SquareButton).

```tsx
import { CloseButton } from '@cb/apricot-react';

// Default close button
<CloseButton />

// Custom label
<CloseButton label="Close Modal" />

// Small variant
<CloseButton small={true} />

// Non-greyscale
<CloseButton greyscale={false} />
```

### Key Props

- `label` - Accessible label (default: 'Close')
- `greyscale` - Greyscale variant (default: true)
- `small` - Small size
- `light` - Light variant
- Standard button attributes (className, onClick, etc.)

## Tag

Tag-style button for labels, filters, or removable items.

```tsx
import { Tag } from '@cb/apricot-react';

// Simple tag
<Tag>JavaScript</Tag>

// Tag with icon
<Tag icon="x-mark" offScreen="Remove tag">
  Python
</Tag>

// Small tag
<Tag small={true}>CSS</Tag>
```

### Key Props

- `children` - Tag label
- `icon` - Icon name (see icon.md)
- `offScreen` - Screen reader text for icon action (e.g., "Remove tag")
- `small` - Small size
- `disabled` - Disable the tag
- `iconDecorative` - Mark icon as decorative (default: false for tags)

**Note**: Tags with icons render as anchor elements (`<a>`), tags without icons render as buttons.

## TagSet

Container for displaying multiple tags together.

```tsx
import { TagSet } from '@cb/apricot-react';

const tags = ['React', 'TypeScript', 'CSS', 'HTML'];

<TagSet
  tags={tags}
  label="Selected Technologies"
  icon="x-mark"
  offScreen="Remove"
  onClick={(tagName, event) => {
    console.log('Remove tag:', tagName);
  }}
/>
```

### Key Props

- `tags` (required) - Array of tag labels
- `label` (required) - Accessible label for tag set region
- `onClick(tagName, event)` - Click handler (receives tag name and event)
- `icon` - Icon for each tag (default: 'x-mark')
- `offScreen` - Screen reader text for icon
- `tagIcon` - Icon displayed at start of tag set
- `small` - Small tags
- `disabled` - Disable all tags
- `withRegion` - Use role="region" (default: true)
- `ariaLive` - ARIA live region: 'off' | 'assertive' | 'polite'

### Common Pattern

```tsx
// Removable filter tags
const [selectedFilters, setSelectedFilters] = useState([
  'Category A',
  'Category B',
  'Category C'
]);

<TagSet
  tags={selectedFilters}
  label="Active Filters"
  icon="x-mark"
  offScreen="Remove filter"
  onClick={(tagName) => {
    setSelectedFilters(prev => prev.filter(t => t !== tagName));
  }}
  ariaLive="polite"
/>
```

## ButtonRow

Container for grouping buttons horizontally.

```tsx
import { ButtonRow, PrimaryButton, NakedButton } from '@cb/apricot-react';

<ButtonRow>
  <NakedButton>Cancel</NakedButton>
  <PrimaryButton>Submit</PrimaryButton>
</ButtonRow>

// With alignment
<ButtonRow align="end">
  <NakedButton>Cancel</NakedButton>
  <PrimaryButton>Save</PrimaryButton>
</ButtonRow>

// Small variant
<ButtonRow small={true}>
  <NakedButton small={true}>Cancel</NakedButton>
  <PrimaryButton small={true}>OK</PrimaryButton>
</ButtonRow>
```

### Key Props

- `children` - Button elements
- `align` - Horizontal alignment: 'start' | 'center' | 'end'
- `small` - Small button row spacing

## Common Patterns

### Loading States

```tsx
const [loading, setLoading] = useState(false);

<PrimaryButton 
  loading={loading}
  withAriaLive={true}
  onClick={async () => {
    setLoading(true);
    await performAction();
    setLoading(false);
  }}
>
  Save Changes
</PrimaryButton>
```

### Icon Buttons

```tsx
// Icons on the right (default)
<Button icon="arrow-right">Next</Button>

// Icons on the left
<Button icon="arrow-left" iconLeft={true}>
  Previous
</Button>

// Icon only (circular or square)
<CircularButton icon="settings" label="Settings" />
<SquareButton icon="edit" label="Edit" />
```

### Light Variants for Dark Backgrounds

```tsx
<div className="cb-gray1-bg cb-padding-24">
  <PrimaryButton light={true}>Light Primary</PrimaryButton>
  <Button light={true}>Light Default</Button>
  <CircularButton light={true} icon="star" label="Favorite" />
</div>
```

### Button Groups

```tsx
<ButtonRow align="end">
  <NakedButton onClick={() => console.log('Cancel')}>
    Cancel
  </NakedButton>
  <Button onClick={() => console.log('Save Draft')}>
    Save Draft
  </Button>
  <PrimaryButton onClick={() => console.log('Publish')}>
    Publish
  </PrimaryButton>
</ButtonRow>
```

### Disabled States

```tsx
<PrimaryButton disabled={true}>
  Cannot Submit
</PrimaryButton>

<TagSet
  tags={['Tag 1', 'Tag 2']}
  label="Tags"
  disabled={true}
/>
```

### Size Variations

```tsx
// Small buttons
<Button small={true}>Small</Button>
<PrimaryButton small={true}>Small Primary</PrimaryButton>

// Large buttons (default, primary, black only)
<Button large={true}>Large</Button>
<PrimaryButton large={true}>Large Primary</PrimaryButton>
<BlackButton large={true}>Large Black</BlackButton>
```

### Greyscale Variants

```tsx
<CircularButton
  icon="settings"
  label="Settings"
  greyscale={true}
/>

<SquareButton
  icon="filter"
  label="Filter"
  greyscale={true}
/>
```

### Floating Buttons

```tsx
<CircularButton
  icon="plus"
  label="Add"
  floating={true}
/>

<SquareButton
  icon="menu"
  label="Menu"
  floating={true}
/>
```

## Accessibility

### Screen Reader Labels

```tsx
// Icon-only buttons need labels
<CircularButton
  icon="heart"
  label="Add to favorites"
/>

// Tags with action icons
<Tag icon="x-mark" offScreen="Remove tag">
  JavaScript
</Tag>
```

### Loading States

```tsx
// Announce loading to screen readers
<PrimaryButton
  loading={isSubmitting}
  withAriaLive={true}
>
  Submit Form
</PrimaryButton>
```

### TagSet Announcements

```tsx
<TagSet
  tags={activeTags}
  label="Active Filters"
  icon="x-mark"
  offScreen="Remove filter"
  ariaLive="polite"
  onClick={handleRemoveTag}
/>
```

### Best Practices

- Always provide `label` for icon-only buttons (CircularButton, SquareButton, CloseButton)
- Use `offScreen` prop on Tags when icon conveys an action
- Set `withAriaLive={true}` for loading states that affect form submission
- Use semantic button types: PrimaryButton for main actions, NakedButton for secondary actions
- Provide descriptive labels for TagSet regions
- Use `iconDecorative={false}` when icon conveys meaning

## Important Notes

- Button component uses Apricot's CBButton JavaScript library
- Loading state shows animated dots and "Loading" text for screen readers
- Icon-only buttons (circular, square) hide label visually but keep it for screen readers
- Tags render as `<button>` without icon, `<a role="button">` with icon
- CloseButton defaults to greyscale with x-mark icon
- SecondaryButton is an alias for BlackButton
- Large size only applies to default, primary, and black button variants
- Greyscale variant should not be combined with small size
- ButtonRow provides proper spacing and alignment for button groups
- All buttons support standard HTML button attributes (onClick, type, aria-*, data-*, etc.)
- Light variants improve contrast on dark backgrounds
- Hover shade effect only applies to default and black buttons
