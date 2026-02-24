# Icon Components

## Overview
The icon package provides three components for displaying icons: `Icon` for standard vector icons, `NumericIcon` for numeric badges, and `AvatarIcon` for user avatars.

## Icon Component

### Basic Usage

```tsx
import { Icon } from '@cb/apricot-react';

// Basic icon
<Icon name="acorn" />

// Sized icon
<Icon name="check-fill" size="24" />

// Colored icon
<Icon name="exclamation-fill" color="error" />

// Circular icon
<Icon name="star" circular circleSize="48" />
```

### Key Props

- `name` (required) - Icon name from the icon set (type: `IconName`)
- `size` - Icon size: '12' | '14' | '16' | '24' | '32'
- `color` - Icon color from predefined palette (type: `IconColor`)
- `circular` - Display icon in circular background (default: false)
- `circleSize` - Circular background size: '24' | '28' | '32' | '48' | '64'
- `decorative` - Hide from screen readers (default: false)
- `focusable` - Allow keyboard focus (default: false)
- `className` - Additional CSS classes
- `iconId` - Unique element ID

### Common Patterns

```tsx
// Decorative icon (purely visual)
<Icon name="star" decorative={true} />

// Focusable icon in content
<p>
  Learn more <Icon name="info" focusable={true} /> about this feature.
</p>

// Validation icons
<Icon name="exclamation-fill" color="error" />
<Icon name="check-fill" color="success" />

// Large circular icon
<Icon name="settings" circular circleSize="64" color="primary" />
```

## NumericIcon Component

### Basic Usage

```tsx
import { NumericIcon } from '@cb/apricot-react';

// Basic numeric badge
<NumericIcon>{3}</NumericIcon>

// Sized numeric icon
<NumericIcon size="32">{12}</NumericIcon>

// Colored numeric icon
<NumericIcon color="primary">{5}</NumericIcon>

// Inverted style (filled background)
<NumericIcon inverted color="error">{99}</NumericIcon>
```

### Key Props

- `children` - Numeric value or content to display
- `size` - Badge size: '24' | '28' | '32' | '48' | '64'
- `color` - Color from predefined palette
- `inverted` - Use filled background style (default: false)
- `decorative` - Hide from screen readers (default: false)
- `focusable` - Allow keyboard focus (default: false)
- `srOnly` - Wrap children in screen reader only span (default: false)
- `className` - Additional CSS classes
- `iconId` - Unique element ID

### Common Patterns

```tsx
// Notification badge
<NumericIcon color="error" inverted>{5}</NumericIcon>

// Step indicator
<NumericIcon size="48" color="primary">{1}</NumericIcon>

// With screen reader text
<NumericIcon srOnly decorative={false}>
  Step 2 of 5
</NumericIcon>
```

## AvatarIcon Component

### Basic Usage

```tsx
import { AvatarIcon } from '@cb/apricot-react';

// Basic avatar
<AvatarIcon name="user-fill" />

// With custom classes
<AvatarIcon name="user-fill" className="custom-avatar" />
```

### Key Props

- `name` (required) - Icon name from the icon set
- `decorative` - Hide from screen readers (default: false)
- `focusable` - Allow keyboard focus (default: false)
- `className` - Additional CSS classes
- `iconId` - Unique element ID

### Common Patterns

```tsx
// User profile avatar
<AvatarIcon name="user-fill" decorative={true} />

// Clickable avatar
<button onClick={handleClick}>
  <AvatarIcon name="user-fill" />
</button>
```

## Accessibility

### Screen Readers

All icon components support the `decorative` prop:

```tsx
// Decorative icon (hidden from screen readers)
<Icon name="star" decorative={true} />

// Informative icon (exposed to screen readers)
<Icon name="warning" decorative={false} aria-label="Warning" />
```

### Keyboard Focus

Use `focusable={true}` to allow keyboard navigation:

```tsx
// Focusable icon that can receive tab focus
<Icon name="info" focusable={true} aria-label="More information" />
```

### Best Practices

- Set `decorative={true}` for purely visual icons
- Set `decorative={false}` and provide `aria-label` for informative icons
- Use `focusable={true}` only when the icon needs keyboard interaction
- For `NumericIcon`, use `srOnly={true}` to provide context for screen readers
- Avoid using icons without accompanying text unless purpose is clear

## Icon Sizes Reference

**Icon**: 12, 14, 16, 24, 32 (pixels)  
**Circular Icon**: 24, 28, 32, 48, 64 (pixels)  
**NumericIcon**: 24, 28, 32, 48, 64 (pixels)  
**AvatarIcon**: Fixed size (no size prop)

## Available Icon Names

The following icon names are available (type: `IconName`):

`accessibility`, `acorn`, `apple`, `ap`, `archive`, `attachment`, `award-medal`, `batch-download`, `batch-upload`, `bell`, `bold`, `book`, `book-open`, `bookmark`, `box`, `box-fill`, `briefcase`, `bullet-list`, `calendar-add`, `calendar-save-the-date`, `cal-add`, `cal-save-the-date`, `cal-empty`, `cal-error`, `cal-full`, `calculator`, `cart`, `caution`, `caution-fill`, `center-align`, `chat`, `check`, `checkbox`, `check-circle`, `check-fill`, `checklist`, `circle`, `clipboard`, `clipboard-check`, `coin`, `code`, `compose`, `compose-cell`, `compose-pen`, `computer`, `computer-list`, `copy`, `copyright`, `cut`, `disc`, `disc-alt`, `document-award`, `document-check`, `document-share`, `dollar`, `down`, `download`, `download-alt`, `edit`, `east`, `error`, `exclamation`, `exclamation-circle`, `exclamation-fill`, `exit-full-screen`, `expand-window`, `explore`, `face-bad`, `face-excellent`, `face-good`, `face-neutral`, `face-very-bad`, `facebook`, `feedback`, `filter`, `financial-aid`, `folder`, `full-screen`, `globe`, `graduate`, `graph`, `heart`, `heart-fill`, `home`, `horz-grab-handle`, `hyperlink`, `image`, `image-submit`, `indent`, `info-circle`, `info-page`, `instagram`, `italic`, `khan-academy`, `laptop`, `laptop-check`, `laptop-exclamation`, `layout-50-50`, `layout-left-pane`, `layout-right-pane`, `left`, `left-align`, `left-double`, `lightbulb`, `linkedin`, `list`, `list-edit`, `location`, `location-pin`, `location-tag`, `lock`, `lock-open`, `logout`, `mail`, `math-essential`, `maths`, `megaphone`, `megaphone-fill`, `megaphone-circle`, `menu`, `microscope`, `minus`, `more`, `more-alt`, `new-page`, `new-window`, `north`, `north-east`, `north-west`, `note`, `notes`, `notepad-check`, `number-list`, `omega`, `order-asc`, `order-desc`, `page-error`, `page-list`, `pages`, `paper-airplane`, `paste`, `pause`, `pause-circle`, `pause-fill`, `pencil-ruler`, `pending`, `phone`, `pi`, `pillar`, `play`, `play-circle`, `play-fill`, `play-video`, `plus`, `practice`, `practice-test`, `presentation`, `presentation-alt`, `presentation-video`, `print`, `question`, `question-circle`, `question-fill`, `quotes`, `raised-pencil`, `redo`, `refresh`, `registration`, `right`, `right-align`, `right-double`, `save`, `sat`, `school`, `school-urban`, `script`, `search`, `see-off`, `see-on`, `send-scores`, `settings`, `share`, `share-alt`, `share-arrow`, `sound`, `sort`, `sort-asc`, `sort-desc`, `south`, `star`, `stop`, `stop-circle`, `stop-fill`, `stopwatch`, `subscript`, `submit`, `superscript`, `tag`, `table-ico`, `tablet`, `task-complete`, `teacher`, `team-leader`, `text-style-off`, `tool`, `trademark`, `trash`, `trophy`, `twitter`, `underline`, `undo`, `university`, `up`, `upload`, `upload-alt`, `user`, `user-add`, `user-check`, `user-circle`, `user-remove`, `users`, `vert-grab-handle`, `west`, `window`, `window-check`, `x`, `x-mark`, `x-mark-fill`, `youtube`, `zoom-in`, `zoom-out`

## Important Notes

- `IconName` and `IconColor` types are imported from the package
- Icons are rendered as `<i>` elements (except NumericIcon which uses `<span>`)
- Circular icons use `circleSize` prop instead of `size`
- The component uses Apricot's icon font system
- All components extend standard HTML attributes for their respective elements
- NumericIcon is typically used for values 1-99
