# Input Component

## Overview
The `Input` component is a flexible form input with support for floating labels, validation states, icons, clear functionality, and input masking.

## Basic Usage

```tsx
import { Input } from '@cb/apricot-react';

// Simple input
<Input label="Name" floating={true} clearable={true} />

// With validation
<Input 
  label="Email" 
  validation="error" 
  validationMsg="Invalid email address"
/>

// Controlled input
const [value, setValue] = useState('');
<Input 
  label="Name" 
  value={value}
  onChange={(e, val) => setValue(val as string)}
/>
```

## Key Props

### Label & Accessibility
- `label` - Label text
- `ariaLabel` - Aria label when no visible label
- `floating` - Enable floating label (default: true)
- `floatingBg` - Background color for floating label ('light' | 'dark')
- `required` - Mark as required field

### States
- `disabled` - Disable the input
- `readOnly` - Make input read-only
- `validation` - Validation state ('error' | 'success' | 'general')
- `validationMsg` - Validation/helper message text
- `condensed` - Condensed styling

### Features
- `clearable` - Show clear button (default: true)
- `icon` - Icon name to display (see icon.md for available icon names)
- `iconRight` - Position icon on right
- `button` - Add button with icon (see icon.md for available icon names)
- `buttonOffScreen` - Screen reader text for button

### Input Masking
- `mask` - Custom mask pattern
- `maskPlaceholder` - Placeholder format (e.g., '(###) ###-####')
- `maskChar` - Characters for alphabetic in mask (default: '_')
- `maskNum` - Characters for numeric in mask (default: '#xXdDmMyY9')
- `maskCallback` - Callback when mask is applied

### Event Handlers
- `onChange(event, value)` - Value change handler
- `onClear(event)` - Clear button click
- `onFocus(event)` - Input focus
- `onBlur(event)` - Input blur
- `onKeyUp(event)` - Key up
- `onKeyDown(event)` - Key down
- `onClick(event, value)` - Button click (when button prop is used)

## Common Patterns

### Input with Icon
```tsx
<Input 
  label="Search" 
  icon="search" 
  iconDecorative={true}
/>
```

### Input with Button
```tsx
<Input 
  label="Filter" 
  button="filter"
  buttonOffScreen="Apply filter"
  clearable={false}
  onClick={(e, val) => console.log('Filter:', val)}
/>
```

### Masked Phone Input
```tsx
<Input 
  label="Phone" 
  maskPlaceholder="(###) ###-####"
  clearable={true}
/>
```

### Validation States
```tsx
// Error state
<Input 
  label="Email"
  validation="error"
  validationMsg="Please enter a valid email"
/>

// Success state
<Input 
  label="Email"
  validation="success"
  validationMsg="Email is valid"
  defaultValue="user@example.com"
/>

// Instructional message
<Input 
  label="Password"
  validation="general"
  validationMsg="Must be at least 8 characters"
/>
```

### Custom Floating Label Background
```tsx
<div className="cb-dark-bg cb-padding-24">
  <Input 
    label="Name" 
    floatingBg="dark"
    required={true}
  />
</div>
```

### Controlled vs Uncontrolled
```tsx
// Uncontrolled (default)
<Input label="Name" defaultValue="John" />

// Controlled
const [name, setName] = useState('');
<Input 
  label="Name"
  value={name}
  onChange={(e, val) => setName(val as string)}
/>
```

## Important Notes

- The `onChange` handler receives both the event and the value: `onChange(event, value)`
- For controlled inputs with floating labels, the component automatically manages the floating state
- The clear button maintains focus on the input after clicking
- The `clearable` prop defaults to `true` - set to `false` when using with a button
- Input masking is applied automatically when `mask` or `maskPlaceholder` is provided
- Password inputs automatically get show/hide functionality
- Validation icons appear on the right side when validation is set to 'error' or 'success'
- Use `validationMsgIconOnly={true}` to show validation message without the icon
- Use `blankValidationIcon={true}` to reserve space for validation icon without showing one

## Accessibility

The component handles ARIA attributes automatically:
- `aria-required` - Set when `required={true}`
- `aria-invalid` - Set when `validation="error"`
- `aria-describedby` - Links validation messages
- `aria-controls` - Links clear button to input
- `aria-label` - Screen reader label when no visible label
- `ariaLive` - For dynamic validation messages (use 'polite')

## Related Components
- `ClearButton` - Exposed subcomponent for the clear functionality
- See InputPhoneInt for international phone number inputs
- See InputStepper for numeric stepper inputs
