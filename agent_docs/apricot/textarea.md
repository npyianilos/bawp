# TextArea Component

## Overview
Multi-line text input component with floating labels, validation states, and flexible sizing.

**Import:** `import { TextArea } from "@cb/apricot-react";`

## Props

```typescript
interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    // Content
    label?: string | React.ReactElement;
    placeholder?: string;              // Only use if floating is false
    rows?: number;                     // Default: 3
    
    // Floating label
    floating?: boolean;                // Default: true
    floatingBg?: 'dark' | 'light';    // Background color for floating label
    
    // States
    disabled?: boolean;                // Default: false
    readOnly?: boolean;                // Default: false
    required?: boolean;
    condensed?: boolean;               // Default: false
    
    // Validation
    validation?: 'success' | 'error' | 'general';
    validationMsg?: string;
    validationMsgIconOnly?: boolean;   // Show message without icon
    blankValidationIcon?: boolean;     // Reserve space for validation icon
    
    // Accessibility
    ariaLabel?: string;
    ariaDescribedby?: string;
    ariaLive?: 'polite' | 'assertive' | 'off';
    labelId?: string;
    validationMessageId?: string;
    validationMsgRole?: string;
    
    // Styling
    className?: string;
    mainClassName?: string;            // Class for wrapper div
    labelClassName?: string;
    helperClassName?: string;
    
    // Events
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    
    // Form attributes
    name?: string;
    defaultValue?: string | number | string[];
    value?: string | number | string[];
}
```

## Basic Usage

### Uncontrolled TextArea
```tsx
<TextArea 
    label="Message"
    rows={3}
/>
```

### Controlled TextArea
```tsx
const [message, setMessage] = useState('');

<TextArea 
    label="Message"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    rows={3}
/>
```

### Without Floating Label
```tsx
<TextArea 
    label="Message"
    floating={false}
    placeholder="Enter your message here"
    rows={3}
/>
```

### Condensed Style
```tsx
<TextArea 
    label="Comment"
    condensed
    rows={2}
/>
```

## Common Patterns

### With Validation Error
```tsx
<TextArea 
    label="Description"
    validation="error"
    validationMsg="Description is required"
    rows={4}
/>
```

### With Validation Success
```tsx
<TextArea 
    label="Review"
    validation="success"
    validationMsg="Thank you for your review"
    rows={5}
/>
```

### Error Message Only (No Icon)
```tsx
<TextArea 
    label="Feedback"
    validation="error"
    validationMsg="Please provide more details (minimum 50 characters)"
    validationMsgIconOnly
    rows={4}
/>
```

### Required Field
```tsx
<TextArea 
    label="Required Message"
    required
    rows={3}
/>
```

### Disabled State
```tsx
<TextArea 
    label="Disabled Message"
    disabled
    value="This field cannot be edited"
    rows={3}
/>
```

### Read-Only State
```tsx
<TextArea 
    label="Terms and Conditions"
    readOnly
    value="You agree to the terms..."
    rows={8}
/>
```

### Single Row (Expanding Input)
```tsx
<TextArea 
    label="Title"
    rows={1}
/>
```

### Large Text Area
```tsx
<TextArea 
    label="Essay"
    rows={10}
/>
```

### Custom Background (Dark Mode)
```tsx
<div className="cb-gray1-bg cb-padding-24">
    <TextArea 
        label="Message"
        floating
        floatingBg="dark"
        rows={3}
    />
</div>
```

### With Character Counter
```tsx
const [text, setText] = useState('');
const maxLength = 500;

<>
    <TextArea 
        label="Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
        rows={5}
    />
    <p className="cb-text-meta cb-align-right">
        {text.length}/{maxLength}
    </p>
</>
```

### Form with Multiple TextAreas
```tsx
<form>
    <TextArea 
        label="Title"
        rows={1}
        required
    />
    
    <TextArea 
        label="Description"
        mainClassName="cb-margin-top-24"
        rows={3}
        required
    />
    
    <TextArea 
        label="Additional Notes"
        mainClassName="cb-margin-top-24"
        rows={5}
    />
</form>
```

### With Custom Validation
```tsx
const [feedback, setFeedback] = useState('');
const [error, setError] = useState('');

const handleChange = (e) => {
    const value = e.target.value;
    setFeedback(value);
    
    if (value.length < 50) {
        setError('Please provide at least 50 characters');
    } else {
        setError('');
    }
};

<TextArea 
    label="Feedback"
    value={feedback}
    onChange={handleChange}
    validation={error ? 'error' : undefined}
    validationMsg={error}
    rows={5}
/>
```

### With aria-live for Dynamic Validation
```tsx
<TextArea 
    label="Comment"
    validation="error"
    validationMsg="This field is required"
    ariaLive="polite"
    validationMsgRole="alert"
    rows={3}
/>
```

### With Custom aria-describedby
```tsx
<>
    <p id="message-help">
        Please provide a detailed message about your issue.
    </p>
    
    <TextArea 
        label="Message"
        ariaDescribedby="message-help"
        rows={5}
    />
</>
```

### Blank Validation Icon Spacing
```tsx
// Reserves space for validation icon without showing one
<TextArea 
    label="Consistent Width"
    blankValidationIcon
    rows={3}
/>
```

### With Event Handlers
```tsx
const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.metaKey) {
        // Submit on Cmd/Ctrl + Enter
        handleSubmit();
    }
};

<TextArea 
    label="Message"
    onKeyDown={handleKeyDown}
    onFocus={() => console.log('Focused')}
    onBlur={() => console.log('Blurred')}
    rows={5}
/>
```

### Auto-growing TextArea (CSS)
```tsx
<TextArea 
    label="Message"
    rows={3}
    style={{ resize: 'vertical' }}  // Allow vertical resize
/>

// Or disable resize
<TextArea 
    label="Message"
    rows={3}
    style={{ resize: 'none' }}
/>
```

## Accessibility

1. **Labels:**
   - Use `label` prop for visible label
   - Use `ariaLabel` when no visible label
   - Required fields show asterisk automatically

2. **Validation Messages:**
   - Auto-linked via `aria-describedby`
   - Use `ariaLive="polite"` for dynamic errors
   - Set `validationMsgRole="alert"` for errors

3. **Required Fields:**
   - Set `required` prop
   - Use `aria-required` (auto-applied)

4. **Error States:**
   - Use `validation="error"`
   - Provide descriptive `validationMsg`
   - Use `aria-invalid` (auto-applied)

5. **Helper Text:**
   - Use `ariaDescribedby` to link to helper text
   - Helper text IDs are auto-generated

6. **Keyboard Navigation:**
   - Standard textarea keyboard behavior
   - Tab to focus, Shift+Tab to exit
   - Arrow keys for cursor movement

## Important Notes

1. **Floating Labels:**
   - Default behavior (`floating={true}`)
   - Label floats up when focused or has value
   - Don't use `placeholder` with floating labels

2. **Placeholder Text:**
   - Only use when `floating={false}`
   - Avoid relying on placeholder for critical info
   - Not a substitute for labels

3. **Rows Attribute:**
   - Default: 3 rows
   - Set to 1 for single-line expanding input
   - Users can resize if `resize` not disabled

4. **Validation States:**
   - `success` - Green checkmark icon
   - `error` - Red exclamation icon
   - `general` - No icon, just helper text
   - Use `validationMsgIconOnly` to hide icons

5. **Condensed Style:**
   - Smaller padding and font size
   - Use for compact forms
   - Still fully accessible

6. **Read-Only vs Disabled:**
   - `readOnly` - Can focus, can't edit, submits with form
   - `disabled` - Can't focus, can't edit, doesn't submit

7. **Event Handlers:**
   - All standard textarea events supported
   - `onChange` receives full event object
   - Use `e.target.value` to get text

8. **Controlled vs Uncontrolled:**
   - Controlled: Provide `value` and `onChange`
   - Uncontrolled: Provide only `defaultValue` (optional)
   - Don't mix modes

9. **IDs:**
   - Auto-generated if not provided
   - Use custom IDs for testing or external control
   - Validation message IDs auto-linked

10. **CSS Classes:**
    - `cb-textarea` - Main wrapper
    - `cb-floating-label` - Floating label mode
    - `cb-input-condensed` - Condensed style
    - `cb-validation-error` / `cb-validation-success` - Validation states
    - `cb-disabled` - Disabled state
    - `cb-readonly` - Read-only state

11. **Background Colors:**
    - Use `floatingBg="dark"` for dark backgrounds
    - Use `floatingBg="light"` for light backgrounds (default)
    - Affects floating label positioning

12. **Character Limits:**
    - Use native `maxLength` attribute
    - Implement custom counter with state
    - Show remaining characters for better UX
