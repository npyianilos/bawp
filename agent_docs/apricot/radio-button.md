# RadioButton Components

## Overview
Radio button components for single-selection within a group. Supports controlled and uncontrolled modes, horizontal/vertical layouts, validation, and custom grid layouts.

**Import:** `import { RadioButton, RadioButtonGroup } from "@cb/apricot-react";`

## Components

### RadioButtonGroup
Container that manages radio button state and layout.

**Props:**
```typescript
interface IRadioButtonGroupProps {
    // Content
    name: string;                        // Radio group name (required)
    legend?: string | React.ReactElement; // Group label
    legendId?: string;
    legendClassName?: string;
    
    // State
    value?: string;                      // Selected value (controlled)
    defaultValue?: string;               // Initial value (uncontrolled)
    onChange?: (value: string, e: React.ChangeEvent) => void;
    
    // Layout
    vertical?: boolean;                  // Default: false (horizontal)
    labelPosition?: 'left' | 'right';   // Default: 'right'; left only works with vertical
    vSpacing?: string;                   // Vertical spacing (default: '16')
    hSpacing?: string;                   // Horizontal spacing (default: '16')
    hasGrid?: boolean;                   // Custom grid layout
    condensed?: boolean;                 // Default: false
    
    // Validation
    required?: boolean;
    validation?: 'success' | 'error' | 'general';
    validationMsg?: string;
    validationMsgRole?: string;          // Default: 'alert'
    
    // Accessibility
    fieldsetId?: string;
    validationMessageId?: string;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedby?: string;
    ariaLive?: 'polite' | 'assertive' | 'off';
    helperClassName?: string;
    
    children?: React.ReactNode;
}
```

### RadioButton
Individual radio button within a group.

**Props:**
```typescript
interface IRadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;                       // Radio value (required)
    id?: string;
    label?: string | React.ReactElement;
    ariaLabel?: string;
    ariaDescribedby?: string;
    labelClassName?: string;
    labelPosition?: 'left' | 'right';   // Overrides group setting
    disabled?: boolean;                  // Default: false
    className?: string;
}
```

## Basic Usage

### Uncontrolled
```tsx
<RadioButtonGroup
    legend="Gender"
    name="gender"
    defaultValue="female"
    onChange={(value) => console.log(value)}
>
    <RadioButton value="female" label="Female" />
    <RadioButton value="male" label="Male" />
    <RadioButton value="other" label="Other" />
</RadioButtonGroup>
```

### Controlled
```tsx
const [selected, setSelected] = useState('');

<RadioButtonGroup
    legend="Gender"
    name="gender"
    value={selected}
    onChange={(value) => setSelected(value)}
>
    <RadioButton value="female" label="Female" />
    <RadioButton value="male" label="Male" />
    <RadioButton value="other" label="Other" />
</RadioButtonGroup>
```

## Common Patterns

### Vertical Layout
```tsx
<RadioButtonGroup
    legend="Size"
    name="size"
    vertical
    defaultValue="md"
>
    <RadioButton value="sm" label="Small" />
    <RadioButton value="md" label="Medium" />
    <RadioButton value="lg" label="Large" />
</RadioButtonGroup>
```

### With Validation Error
```tsx
<RadioButtonGroup
    legend="Payment Method"
    name="payment"
    required
    validation="error"
    validationMsg="A selection is required"
>
    <RadioButton value="credit" label="Credit Card" />
    <RadioButton value="debit" label="Debit Card" />
    <RadioButton value="paypal" label="PayPal" />
</RadioButtonGroup>
```

### Disabled Option
```tsx
<RadioButtonGroup legend="Plan" name="plan" defaultValue="basic">
    <RadioButton value="basic" label="Basic" />
    <RadioButton value="pro" label="Pro" disabled />
    <RadioButton value="enterprise" label="Enterprise" />
</RadioButtonGroup>
```

### Custom Grid Layout
```tsx
<RadioButtonGroup
    legend="Select a Number"
    name="number"
    hasGrid
    onChange={(value) => console.log(value)}
>
    <div className="row">
        {data.map((item, i) => (
            <div className="col-xs-6 col-sm-3 cb-margin-top-24" key={i}>
                <RadioButton value={item.value} label={item.label} />
            </div>
        ))}
    </div>
</RadioButtonGroup>
```

### Labels on Left (Vertical Only)
```tsx
<RadioButtonGroup
    legend="Options"
    name="options"
    vertical
    labelPosition="left"
>
    <RadioButton value="a" label="Option A" />
    <RadioButton value="b" label="Option B" />
    <RadioButton value="c" label="Option C" />
</RadioButtonGroup>
```

### Custom Legend
```tsx
const CustomLegend = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon name="acorn" />
        <span className="cb-margin-left-8 cb-font-weight-medium cb-required">
            Custom Legend
        </span>
    </div>
);

<RadioButtonGroup
    legend={<CustomLegend />}
    name="custom"
    onChange={(value) => console.log(value)}
>
    <RadioButton value="1" label="One" />
    <RadioButton value="2" label="Two" />
</RadioButtonGroup>
```

### No Legend (aria-label)
```tsx
<RadioButtonGroup
    name="options"
    ariaLabel="Select an option"
    onChange={(value) => console.log(value)}
>
    <RadioButton value="a" label="Option A" />
    <RadioButton value="b" label="Option B" />
</RadioButtonGroup>
```

### Dynamic Options
```tsx
const options = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
];

<RadioButtonGroup
    legend="Count"
    name="count"
    defaultValue="1"
    onChange={(value) => console.log(value)}
>
    {options.map((opt, i) => (
        <RadioButton key={i} value={opt.value} label={opt.label} />
    ))}
</RadioButtonGroup>
```

### Custom Spacing
```tsx
// Horizontal with wider spacing
<RadioButtonGroup legend="Choice" name="choice" hSpacing="32">
    <RadioButton value="a" label="A" />
    <RadioButton value="b" label="B" />
</RadioButtonGroup>

// Vertical with tighter spacing
<RadioButtonGroup legend="Choice" name="choice" vertical vSpacing="8">
    <RadioButton value="a" label="A" />
    <RadioButton value="b" label="B" />
</RadioButtonGroup>
```

### Condensed Style
```tsx
<RadioButtonGroup legend="Size" name="size" condensed>
    <RadioButton value="s" label="S" />
    <RadioButton value="m" label="M" />
    <RadioButton value="l" label="L" />
</RadioButtonGroup>
```

## Accessibility

1. **ARIA Roles:**
   - RadioButtonGroup renders `<fieldset>` with `role="radiogroup"`
   - Each RadioButton renders `<input type="radio">`

2. **Legend:**
   - Use `legend` for visible group label
   - Use `ariaLabel` when no visible legend
   - Use `ariaLabelledBy` to reference external label

3. **Validation Messages:**
   - Auto-linked via `aria-describedby`
   - `validationMsgRole` defaults to `"alert"`
   - Use `ariaLive="polite"` for dynamic errors

4. **Required State:**
   - `aria-required` set on fieldset
   - `aria-invalid` set when `validation="error"`
   - Legend shows required indicator automatically

5. **Disabled State:**
   - Set on individual RadioButton
   - Input gets `disabled` attribute

## Important Notes

1. **Controlled vs Uncontrolled:**
   - Controlled: Provide `value` and `onChange` on RadioButtonGroup
   - Uncontrolled: Provide `defaultValue` on RadioButtonGroup
   - Don't mix both; `value` overrides `defaultValue`

2. **Layout:**
   - Default: horizontal with flexbox
   - `vertical={true}`: stacked layout
   - `labelPosition="left"`: only works with `vertical={true}`
   - `hasGrid={true}`: you manage layout with grid classes (no auto-spacing)

3. **Spacing:**
   - Horizontal: controlled by `hSpacing` (default: '16')
   - Vertical: controlled by `vSpacing` (default: '16')
   - Uses Spacer/SpacerH components internally

4. **Validation:**
   - Only `'error'` and `'general'` show validation messages
   - `'error'` adds red styling to legend and message
   - `'general'` shows message without error styling

5. **onChange Callback:**
   - Receives `(value: string, event: React.ChangeEvent)`
   - Set on RadioButtonGroup, not individual RadioButtons
   - Called when any radio in the group is selected

6. **IDs:**
   - Auto-generated if not provided
   - Use custom IDs for testing or external control

7. **CSS Classes:**
   - `cb-radio` - Individual radio wrapper
   - `cb-disabled` - Disabled state
   - `cb-condensed` - Condensed style
   - `cb-label-left` - Left-positioned label
   - `cb-validation-error` - Error state
