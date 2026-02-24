# Notification Components

## Overview
The notification package provides components for displaying alerts and messages to users. Includes a base `Notification` component and five pre-styled variants: `InfoNotification`, `SuccessNotification`, `CautionNotification`, `ErrorNotification`, and `InputNotification`.

## Notification Component

### Basic Usage

```tsx
import { Notification } from '@cb/apricot-react';

// Custom notification
<Notification
  title="Custom Notification"
  icon="share"
  color="blue5"
  dismissible={true}
  onDismiss={(id) => console.log('Dismissed:', id)}
>
  <p>Notification content goes here.</p>
</Notification>
```

### Key Props

**Title & Content**
- `title` (required) - Notification title (string or React element)
- `children` - Notification body content
- `headingLevel` - Heading tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' (default: 'h4')
- `ariaLevel` - ARIA heading level (1-6) when rendering as `<p role="heading">`
- `headingClass` - CSS class for heading

**Icon**
- `icon` - Icon name (see icon.md for available icon names)
- `color` - Icon color from predefined palette
- `circularIcon` - Display icon with circular background (default: true)
- `iconClass` - CSS class for icon
- `decorativeIcon` - Mark icon as decorative (default: true)
- `ariaLabelIcon` - Accessible label for icon (required if `decorativeIcon={false}`)

**Dismissal**
- `dismissible` - Allow dismissing notification (default: false)
- `onDismiss(id)` - Callback when dismissed (receives notification ID)

**Other**
- `notificationId` - Element ID for notification
- `className` - Custom CSS class
- `withRegion` - Set container role to 'region' (default: true)
- `inModal` - Render inside modal (changes dismiss button behavior)

## Variant Components

Pre-styled notification components with predefined icons and colors.

### InfoNotification

```tsx
import { InfoNotification } from '@cb/apricot-react';

<InfoNotification title="Information">
  Here's some helpful information.
</InfoNotification>
```

- Icon: megaphone
- Color: blue5

### SuccessNotification

```tsx
import { SuccessNotification } from '@cb/apricot-react';

<SuccessNotification title="Success!">
  Your action completed successfully.
</SuccessNotification>
```

- Icon: check
- Color: green3

### CautionNotification

```tsx
import { CautionNotification } from '@cb/apricot-react';

<CautionNotification 
  title="Caution" 
  dismissible={true}
  onDismiss={(id) => console.log('Dismissed:', id)}
>
  Please review this information carefully.
</CautionNotification>
```

- Icon: caution
- Color: caution

### ErrorNotification

```tsx
import { ErrorNotification } from '@cb/apricot-react';

<ErrorNotification title="Error">
  Something went wrong. Please try again.
</ErrorNotification>
```

- Icon: exclamation
- Color: red1

### InputNotification

```tsx
import { InputNotification } from '@cb/apricot-react';
import { Input, ButtonRow, PrimaryButton, NakedButton } from '@cb/apricot-react';

<InputNotification title="Please provide information">
  <p>Complete the form below:</p>
  <Input label="Name" floating condensed />
  <ButtonRow align="end">
    <NakedButton>Cancel</NakedButton>
    <PrimaryButton>Submit</PrimaryButton>
  </ButtonRow>
</InputNotification>
```

- Icon: compose
- Color: blue5

## Common Patterns

### Dismissible Notification

```tsx
<CautionNotification
  title="Important Notice"
  dismissible={true}
  notificationId="uniqueId"
  onDismiss={(id) => {
    console.log('Notification dismissed:', id);
    // Handle dismiss logic
  }}
>
  This can be dismissed by the user.
</CautionNotification>
```

### Notification in Modal

```tsx
import { Modal, ErrorNotification } from '@cb/apricot-react';

<Modal trigger="openModal" title="Error Occurred">
  <ErrorNotification 
    title="Failed to save"
    inModal={true}
  >
    Please check your input and try again.
  </ErrorNotification>
</Modal>
```

### Custom Styled Notification

```tsx
<Notification
  title="Custom Alert"
  headingLevel="h2"
  icon="exclamation-circle"
  circularIcon={false}
  decorativeIcon={false}
  ariaLabelIcon="Alert icon"
  className="cb-blue5-tint-1 cb-border-radius-16"
  iconClass="cb-icon-24"
>
  <p>Custom content with styling.</p>
</Notification>
```

### Notification with Actions

```tsx
import { InfoNotification, ButtonRow, PrimaryButton, NakedButton } from '@cb/apricot-react';

<InfoNotification title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
  <ButtonRow align="end">
    <NakedButton onClick={() => console.log('Cancel')}>
      Cancel
    </NakedButton>
    <PrimaryButton onClick={() => console.log('Confirm')}>
      Confirm
    </PrimaryButton>
  </ButtonRow>
</InfoNotification>
```

### Using Different Heading Levels

```tsx
// Using h2 instead of default h4
<SuccessNotification 
  title="Operation Complete"
  headingLevel="h2"
>
  Content here.
</SuccessNotification>

// Using aria-level with paragraph
<Notification
  title="Alert"
  ariaLevel={2}
  icon="caution"
  color="caution"
>
  Content renders with <code>&lt;p role="heading" aria-level="2"&gt;</code>
</Notification>
```

## Variant Props

All variant components (`InfoNotification`, `SuccessNotification`, etc.) accept the same props as `Notification` except:
- `icon` - Pre-set, cannot be overridden
- `color` - Pre-set, cannot be overridden

All other props (title, dismissible, children, etc.) work the same way.

## Accessibility

### ARIA Attributes

- The component uses `role="region"` and `aria-labelledby` when `withRegion={true}` (default)
- Dismissible notifications include a close button with proper ARIA attributes
- Icons should be decorative by default; set `decorativeIcon={false}` and provide `ariaLabelIcon` if the icon conveys meaning

### Heading Levels

```tsx
// Use semantic heading levels
<InfoNotification headingLevel="h2" title="Section Alert">
  Important section-level information.
</InfoNotification>

// Or use aria-level for flexibility
<InfoNotification ariaLevel={3} title="Subsection Alert">
  Renders as <p role="heading" aria-level="3">
</InfoNotification>
```

### Dismissible Notifications

When `dismissible={true}`:
- A close button appears with proper ARIA labeling
- The close button references the notification title via `aria-describedby`
- The `onDismiss` callback receives the notification ID for tracking

## Events

The component fires an `apricot_notificationHidden` event when dismissed:

```tsx
const notificationRef = useRef<HTMLDivElement>(null);

<CautionNotification 
  ref={notificationRef}
  dismissible={true}
  title="Notice"
>
  Content
</CautionNotification>

// Listen to the event
notificationRef.current?.addEventListener('apricot_notificationHidden', () => {
  console.log('Notification was hidden');
});
```

Or use the `onDismiss` callback (recommended):

```tsx
<CautionNotification
  dismissible={true}
  notificationId="myNotification"
  onDismiss={(id) => {
    console.log('Dismissed:', id);
  }}
  title="Notice"
>
  Content
</CautionNotification>
```

## Important Notes

- Notification component uses Apricot's CBNotification JavaScript library
- The component supports forwarding refs to the notification container
- Use `inModal={true}` when rendering inside a modal to ensure proper dismiss behavior
- Default heading level is 'h4' - adjust based on page structure
- All variants have appropriate semantic colors and icons
- The close button appears only when `dismissible={true}`
- Notification ID is auto-generated if not provided
- `withRegion={true}` (default) adds landmark semantics for screen readers
