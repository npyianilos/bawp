# Modal Components

## Overview

The modal package provides several modal components for different use cases: `Modal` (standard), `BareModal` (minimal), `ModalDialog` (notifications), `ModalSpinner` (loading), `ModalVideo` (YouTube videos), and `ModalPromo` (promotional content).

## Modal Component

### Basic Usage

```tsx
import { Modal } from "@cb/apricot-react";
import { PrimaryButton, NakedButton } from "@cb/apricot-react";

// Uncontrolled modal (trigger-based)
<>
  <PrimaryButton id="openModal" aria-haspopup="dialog">
    Show Modal
  </PrimaryButton>
  <Modal
    trigger="openModal"
    title="Modal Title"
    withHeader={true}
    withFooter={true}
    actions={<NakedButton>Continue</NakedButton>}
  >
    <p>Modal content goes here</p>
  </Modal>
</>;

// Controlled modal
const [open, setOpen] = useState(false);
<>
  <PrimaryButton onClick={() => setOpen(true)}>Show Modal</PrimaryButton>
  <Modal open={open} onClose={() => setOpen(false)} title="Controlled Modal">
    <p>Modal content</p>
  </Modal>
</>;
```

### Key Props

**Control**

- `open` - Opens modal in controlled mode (omit `trigger` when using)
- `trigger` - ID or DOM element to trigger modal (uncontrolled mode)
- `onClose(node, source)` - Called after modal closes
- `onShow()` - Called after modal opens

**Header**

- `withHeader` - Show header section (default: false)
- `title` - Modal title (string or React element)
- `centeredTitle` - Center align title
- `showHeaderCloseButton` - Show close button in header (default: true)
- `closeHeaderLabel` - Accessible label for header close button
- `classNameHeader` - Header CSS class
- `classNameHeaderTitle` - Title CSS class

**Footer**

- `withFooter` - Show footer section (default: false)
- `closeButton` - Show close button in footer (default: true)
- `closeButtonLabel` - Footer close button text (default: 'Close')
- `closeButtonId` - Footer close button ID (not commonly used in codebase)
- `actions` - Action buttons (single element or array) (not commonly used in codebase)
- `footer` - Custom footer element (replaces default footer; most common pattern)

**Behavior**

- `clickOverlayToClose` - Close on overlay click (default: true)
- `escClose` - Close on Escape key (default: true)
- `disableHeightAdjustment` - Disable automatic height adjustment
- `enableChildOverflow` - Allow child overflow (for dropdowns)

**Styling**

- `className` - Modal container CSS class
- `classNameOverlay` - Overlay CSS class
- `classNameContainer` - Content container CSS class
- `lightClose` - Use light variant of header close button

**Accessibility**

- `ariaLabel` - Accessible label (use when no title)
- `role` - ARIA role (default: 'dialog')
- `modalId` - Element ID for modal
- `headerId` - Element ID for header
- `focusId` - Element ID to receive focus on open

**Advanced**

- `nested` - Mark as nested modal (not recommended)
- `analytics` - Enable analytics tracking
- `analyticsTitle` - Title for analytics
- `analyticsOnClose` - Track analytics on close
- `customAttributes` - Additional attributes (data-_, aria-_, etc.)
- `documentEvents` - Listen to document events
- `awaitOpenAnimation` - Delay open events until animation completes (default: true)
- `awaitCloseAnimation` - Delay close events until animation completes (default: true)
- `openAnimation` - Animate when opening (default: true)
- `closeAnimation` - Animate when closing (default: true)

## Common Patterns

```tsx
// Modal with custom footer (most common pattern in codebase)
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Modal Title"
  footer={
    <div>
      <NakedButton onClick={handleCancel}>Cancel</NakedButton>
      <YellowButton onClick={handleConfirm}>Confirm</YellowButton>
    </div>
  }
>
  <p>Modal content</p>
</Modal>

// Modal with custom footer actions using withFooter
<Modal
  trigger="openModal"
  title="Confirm Action"
  withHeader={true}
  withFooter={true}
  actions={
    <>
      <NakedButton>Cancel</NakedButton>
      <PrimaryButton>Confirm</PrimaryButton>
    </>
  }
>
  <p>Are you sure?</p>
</Modal>

// Modal without header or footer (custom content)
<Modal
  open={isOpen}
  onClose={handleClose}
  ariaLabel="Custom Dialog"
  withHeader={false}
  withFooter={false}
>
  <div>
    <h2>Custom Title</h2>
    <p>Custom content with full control</p>
    <YellowButton onClick={handleClose}>Close</YellowButton>
  </div>
</Modal>

// Modal with centered title
<Modal
  trigger="openModal"
  title="Centered Title"
  centeredTitle={true}
  withHeader={false}
  withFooter={false}
>
  <p>Content</p>
</Modal>

// Modal without overlay close (controlled behavior)
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Important"
  clickOverlayToClose={false}
  escClose={false}
>
  <p>User must click a button to close</p>
</Modal>

// Modal with disabled close mechanisms
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Required Action"
  closeButton={false}
  showHeaderCloseButton={false}
  clickOverlayToClose={false}
  escClose={false}
>
  <p>User must complete this action</p>
</Modal>

// Modal with focus control
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Enter Information"
  focusId="email-input"
  disableHeightAdjustment
  footer={
    <>
      <NakedButton data-cb-modal-close>Cancel</NakedButton>
      <YellowButton onClick={handleSubmit}>Submit</YellowButton>
    </>
  }
>
  <Input id="email-input" label="Email" />
</Modal>

// Modal with custom styling and overlay
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Styled Modal"
  className="custom-modal"
  classNameOverlay="custom-modal__overlay"
  clickOverlayToClose={false}
>
  <p>Content with custom classes</p>
</Modal>
```

## BareModal Component

Minimal modal with no header or footer - complete control over content.

### Basic Usage

```tsx
import { BareModal } from "@cb/apricot-react";

// Controlled bare modal
const [open, setOpen] = useState(false);
<BareModal open={open} onClose={() => setOpen(false)} ariaLabel="Custom Dialog">
  <p>Complete custom content</p>
</BareModal>;
```

### Key Props

Same as Modal base props (control, behavior, styling, accessibility, advanced) but without header/footer specific props.

## ModalDialog Component

Notification-style modals with predefined variants.

### Basic Usage

```tsx
import { ModalDialog } from "@cb/apricot-react";

<ModalDialog trigger="openDialog" variant="caution" title="Warning" dismissible={true}>
  <p>This action cannot be undone.</p>
</ModalDialog>;
```

### Key Props

- `variant` (required) - 'success' | 'caution' | 'info' | 'error' | 'input'
- `title` - Dialog title
- `dismissible` - Show dismiss button
- All base modal props

### Variants

```tsx
// Success
<ModalDialog variant="success" title="Success!">
  Operation completed successfully.
</ModalDialog>

// Error
<ModalDialog variant="error" title="Error">
  Something went wrong.
</ModalDialog>

// Info
<ModalDialog variant="info" title="Information">
  Here's some helpful info.
</ModalDialog>

// Caution
<ModalDialog variant="caution" title="Warning">
  Proceed with caution.
</ModalDialog>

// Input (for forms)
<ModalDialog variant="input" title="Enter Information">
  <Input label="Name" />
</ModalDialog>
```

## ModalSpinner Component

Loading modal with spinner and optional progress indicator.

### Basic Usage

```tsx
import { ModalSpinner } from '@cb/apricot-react';

// Basic spinner
<ModalSpinner
  open={isLoading}
  ariaLabel="Loading content"
  light={true}
/>

// With text
<ModalSpinner
  open={isLoading}
  text="34%"
  ariaLabel="34% loaded"
  light={true}
/>

// With progress indicator
<ModalSpinner
  open={isLoading}
  progress={true}
  animated={true}
  min={0}
  max={100}
  end={75}
  duration={20000}
  ariaLabel="Loading"
/>
```

### Key Props

- `light` - Use light spinner variant
- `text` - Text to display below spinner
- `progress` - Show progress indicator
- `animated` - Animate progress
- `min` - Minimum progress value (default: 0)
- `max` - Maximum progress value (default: 100)
- `end` - End progress value
- `duration` - Animation duration in ms
- `classNameSpinner` - Spinner container CSS class
- All base modal props

## ModalVideo Component

YouTube video modal with embedded player.

### Basic Usage

```tsx
import { ModalVideo } from "@cb/apricot-react";

<ModalVideo
  trigger="openVideo"
  videoSrc="https://www.youtube.com/embed/VIDEO_ID?autoplay=0&modestbranding=1&enablejsapi=1&rel=0"
  videoTitle="Video Title"
  closeModalAriaLabel="Close video"
/>;
```

### Key Props

- `videoSrc` (required) - YouTube embed URL
- `videoTitle` - Accessible title for video
- `closeModalAriaLabel` - Accessible label for close button
- Header/footer and base modal props

### Important Notes

- Only supports YouTube videos
- Use embed URL format
- Recommended URL parameters: `autoplay=0&modestbranding=1&enablejsapi=1&rel=0`

## ModalPromo Component

Promotional modal with image/branding section.

### Basic Usage

```tsx
import { ModalPromo } from "@cb/apricot-react";

<ModalPromo
  trigger="openPromo"
  variant="top"
  title="Special Offer"
  image="path/to/image.png"
  lightClosePromo={true}
>
  <p>Promotional content here</p>
</ModalPromo>;
```

### Key Props

- `variant` - Layout: 'top' | 'left' | 'right' (default: 'top')
- `image` - Background image URL for promo section
- `promoImgClass` - CSS class for promo image container
- `lightClosePromo` - Use light close button in promo section
- `headerCloseButtonPromo` - Show close button in promo header
- All Modal props (header, footer, base)

### Layout Variants

```tsx
// Image on top
<ModalPromo variant="top" image="url" />

// Image on left
<ModalPromo variant="left" image="url" />

// Image on right
<ModalPromo variant="right" image="url" />
```

## Controlled vs Uncontrolled

### Uncontrolled (Trigger-based)

```tsx
// Provide trigger, omit open
<PrimaryButton id="myTrigger">Open</PrimaryButton>
<Modal trigger="myTrigger" title="Modal">
  Content
</Modal>
```

### Controlled (State-based) - Most Common Pattern

```tsx
// Provide open, omit trigger
// Note: Most modals in the codebase use controlled mode
const [open, setOpen] = useState(false);
<PrimaryButton onClick={() => setOpen(true)}>Open</PrimaryButton>
<Modal open={open} onClose={() => setOpen(false)} title="Modal">
  Content
</Modal>
```

## Accessibility Best Practices

- Always provide `title` or `ariaLabel`
- Use `aria-haspopup="dialog"` on trigger buttons (for uncontrolled modals)
- Set `role="dialog"` (default) or `role="alertdialog"` for important messages
- Provide accessible labels for all close buttons
- Use `focusId` to set initial focus when needed (e.g., to focus an input field)
- Use `modalId` and `headerId` for explicit element identification when necessary
- For loading modals, provide descriptive `ariaLabel`
- When using `withHeader={false}`, ensure content has proper heading structure
- Controlled modals should generally set `clickOverlayToClose={false}` for better UX

## Document Events

Enable `documentEvents={true}` to listen for custom events:

```tsx
<Modal documentEvents={true} title="Modal" trigger="open">
  Content
</Modal>;

// Listen for close event
document.addEventListener("apricot_modalClose", event => {
  const modalID = event.detail?.modalID;
  console.log("Modal closed:", modalID);
});
```

## Important Notes

- Modal uses Apricot's CBModal JavaScript library
- **The codebase overwhelmingly uses controlled modals (`open` prop) over uncontrolled (`trigger` prop)**
- **The most common pattern is to use `footer` prop with custom JSX rather than `withFooter` and `actions`**
- **Many modals use `withHeader={false}` and `withFooter={false}` for full content control**
- Controlled modals should generally set `clickOverlayToClose={false}` for better UX
- Avoid nesting modals when possible (use `nested={true}` if required)
- Use `enableChildOverflow={true}` when modal contains dropdowns or similar elements
- Footer close button is a PrimaryButton by default
- Header close button is a CloseButton component
- All modals trap focus and return focus on close
- Animation can be disabled with `openAnimation={false}` and `closeAnimation={false}`
- Use `disableHeightAdjustment` when modal content should not trigger automatic height changes
