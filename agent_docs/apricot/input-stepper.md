# InputStepper Component

Agent documentation for the Apricot InputStepper component - a numeric input with increment/decrement buttons.

## Overview

InputStepper is a number input field with built-in increment (+) and decrement (-) buttons for adjusting values within a specified range.

**Import Statement**:

```tsx
import { InputStepper } from "@cb/apricot-react";
```

---

## TypeScript Interface

```typescript
interface IInputStepperProps {
  /** Step increment/decrement value */
  step?: number;

  /** Minimum allowed value */
  min?: number;

  /** Maximum allowed value */
  max?: number;

  /** Number of digits to display (affects width: 2, 3, 4, or unset) */
  digits?: number;

  /** Current value */
  value?: number;

  /** Label text */
  label?: string;

  /** Label ID */
  labelId?: string;

  /** Accessible label when no visible label */
  ariaLabel?: string;

  /** Input name attribute */
  name?: string;

  /** Use condensed styling */
  condensed?: boolean;

  /** Disable the entire component */
  disabled?: boolean;

  /** Make input read-only */
  readOnly?: boolean;

  /** Disable only the increase button */
  increaseButtonDisabled?: boolean;

  /** Disable only the decrease button */
  decreaseButtonDisabled?: boolean;

  /** Mark as required */
  required?: boolean;

  /** Validation state: 'error' | 'success' | 'warning' | 'general' */
  validation?: IValidationState;

  /** Validation message text */
  validationMsg?: string;

  /** Helper message text */
  helperMsg?: string;

  /** Screen reader text for decrease button */
  decreaseBtnOffscreen?: string;

  /** Screen reader text for increase button */
  increaseBtnOffscreen?: string;

  /** Callback when value changes (via buttons or input) */
  onValueChange?: (value: number) => void;

  /** Callback when validation fails */
  onValidation?: (value: number) => void;

  /** Callback when decrease button clicked */
  onDecreaseClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Callback when increase button clicked */
  onIncreaseClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Standard input event handlers */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /** Additional props */
  className?: string;
  labelClassName?: string;
  helperClassName?: string;
  mainClassName?: string;
  id?: string;
  ariaDescribedby?: string;
  ariaLive?: "polite" | "assertive" | "off";
  validationMsgRole?: string;
  validationMessageId?: string;
}
```

**Default Props**:

- `step`: `1`
- `digits`: `2`
- `condensed`: `false`
- `disabled`: `false`
- `readOnly`: `false`
- `increaseButtonDisabled`: `false`
- `decreaseButtonDisabled`: `false`

---

## Usage Examples

### Example 1: Basic Stepper

Simple counter with min/max range.

```tsx
<InputStepper label="Quantity" min={1} max={10} value={1} step={1} />
```

### Example 2: Controlled Stepper

Manage value with state.

```tsx
const [quantity, setQuantity] = useState(5);

<InputStepper
  label="Items"
  min={0}
  max={100}
  value={quantity}
  onValueChange={setQuantity}
  helperMsg="Select quantity (0-100)"
/>;
```

### Example 3: With Validation

Built-in validation for min/max range.

```tsx
<InputStepper
  label="Age"
  min={18}
  max={120}
  value={25}
  validation="error"
  validationMsg="Age must be between 18 and 120"
/>
```

### Example 4: Custom Validation

Implement custom validation logic.

```tsx
const [value, setValue] = useState(3);
const [error, setError] = useState(false);

const handleChange = (v: number) => {
  setValue(v);
  setError(v < 1 || v > 12);
};

<InputStepper
  label="Number of bags"
  value={value}
  onValueChange={handleChange}
  validation={error ? "error" : undefined}
  validationMsg={error ? "Please select 1 to 12 bags" : ""}
/>;
```

### Example 5: Condensed Style

Compact styling for space-constrained layouts.

```tsx
<InputStepper label="Count" min={0} max={999} value={10} condensed digits={3} />
```

### Example 6: Large Step Increments

Increment by larger values.

```tsx
<InputStepper label="Price ($)" min={0} max={1000} value={50} step={10} digits={4} />
```

### Example 7: With Validation Callback

Respond to validation errors.

```tsx
const [value, setValue] = useState(5);
const [errorMsg, setErrorMsg] = useState("");

<InputStepper
  label="Guests (1-10)"
  min={1}
  max={10}
  value={value}
  onValidation={v => {
    if (v > 10) {
      setErrorMsg("Maximum 10 guests. Resetting to 10...");
      setTimeout(() => setValue(10), 2000);
    }
  }}
  validationMsg={errorMsg}
/>;
```

---

## Key Features

### Auto-Disable Buttons

Buttons automatically disable at min/max limits:

- Decrease button disabled when `value <= min`
- Increase button disabled when `value >= max`

```tsx
<InputStepper min={0} max={10} value={10} />;
{
  /* Increase button is automatically disabled */
}
```

### Digits Width

Control input width based on expected digit count:

```tsx
<InputStepper digits={2} /> {/* Width for 2 digits (default) */}
<InputStepper digits={3} /> {/* Width for 3 digits */}
<InputStepper digits={4} /> {/* Width for 4 digits */}
<InputStepper digits={5} /> {/* Unset width for 5+ digits */}
```

### Validation

Built-in validation triggers on blur when value is outside min/max:

```tsx
<InputStepper
  min={5}
  max={10}
  onValidation={value => {
    console.log("Invalid value:", value);
  }}
/>
```

### Screen Reader Support

Customize button labels for accessibility:

```tsx
<InputStepper step={5} decreaseBtnOffscreen="Decrease by 5" increaseBtnOffscreen="Increase by 5" />
```

---

## Best Practices

1. **Always set min/max**: Provides validation and auto-disables buttons

   ```tsx
   <InputStepper min={1} max={100} /> {/* ✓ */}
   <InputStepper /> {/* ✗ No boundaries */}
   ```

2. **Provide helper text**: Show valid range to users

   ```tsx
   <InputStepper min={1} max={10} helperMsg="Select 1-10 items" />
   ```

3. **Choose appropriate step**: Match user expectations

   ```tsx
   <InputStepper label="Age" step={1} /> {/* ✓ Age increments by 1 */}
   <InputStepper label="Price" step={10} /> {/* ✓ Price increments by $10 */}
   ```

4. **Set appropriate digits**: Match expected value range

   ```tsx
   <InputStepper max={99} digits={2} /> {/* ✓ */}
   <InputStepper max={999} digits={3} /> {/* ✓ */}
   ```

5. **Use condensed for forms**: More compact in form layouts
   ```tsx
   <InputStepper condensed label="Quantity" />
   ```

---

## Common Issues

### Issue: Buttons Not Auto-Disabling

**Problem**: Buttons remain enabled at limits.

**Solution**: Ensure min/max are set:

```tsx
<InputStepper min={0} max={10} value={10} />
```

### Issue: Validation Not Triggering

**Problem**: Custom validation doesn't fire.

**Solution**: Use `onValidation` callback (fires when value is outside min/max on blur):

```tsx
<InputStepper
  min={1}
  max={10}
  onValidation={value => {
    // Handle invalid value
  }}
/>
```

### Issue: Value Not Updating

**Problem**: Value doesn't change when buttons clicked.

**Solution**: Use `onValueChange` in controlled mode:

```tsx
const [value, setValue] = useState(0);

<InputStepper
  value={value}
  onValueChange={setValue} {/* Must update state */}
/>
```

---

## Accessibility

- **ARIA Labels**: Automatically managed for input and buttons
- **Screen Reader Text**: Customize with `decreaseBtnOffscreen` / `increaseBtnOffscreen`
- **Keyboard Support**: Standard number input keyboard behavior
- **Live Regions**: Input uses `aria-live="polite"` for value changes
- **Disabled States**: Proper `aria-disabled` and `disabled` attributes

---

## Reference

- [Forms Documentation](../agent_docs/react_components/forms/)
- [Input Documentation](../agent_docs/react_components/forms/input.md)
