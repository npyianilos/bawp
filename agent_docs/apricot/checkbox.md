# Checkbox Component

## Overview
The Checkbox component from `@cb/apricot-react` provides accessible single and grouped checkbox inputs with validation, indeterminate state, and flexible label positioning.

**Components:**
- `Checkbox` - Individual checkbox input
- `CheckboxGroup` - Fieldset wrapper for grouping multiple checkboxes

## Basic Usage

### Single Checkbox (Uncontrolled)
```tsx
import { Checkbox } from '@cb/apricot-react';

<Checkbox 
  label="Accept terms and conditions"
  required
  onChange={(checked, event) => console.log(checked)}
/>
```

### Controlled Checkbox
```tsx
const [checked, setChecked] = useState(false);

<Checkbox 
  label="Subscribe to newsletter"
  checked={checked}
  onChange={setChecked}
/>
```

### CheckboxGroup
```tsx
import { Checkbox, CheckboxGroup } from '@cb/apricot-react';

<CheckboxGroup 
  legend="Preferred contact methods"
  required
  vertical
  vSpacing="16"
>
  <Checkbox label="Email" onChange={(checked) => console.log('Email:', checked)} />
  <Checkbox label="Phone" onChange={(checked) => console.log('Phone:', checked)} />
  <Checkbox label="Text message" onChange={(checked) => console.log('Text:', checked)} />
</CheckboxGroup>
```

## Key Props

### Checkbox Props

**Label & Identification:**
- `label` - Checkbox label text
- `labelPosition` - `'left'` | `'right'` (default: `'right'`)
- `labelClassName` - Custom class for label element
- `labelId` - ID for label element
- `id` - Checkbox input ID (auto-generated if not provided)
- `name` - Input name attribute

**States:**
- `checked` - Controlled checked state
- `defaultChecked` - Initial checked state (uncontrolled)
- `indeterminate` - Indeterminate/mixed state (e.g., "select all" checkbox when some items selected)
- `disabled` - Disable the checkbox
- `required` - Mark as required (adds visual indicator)

**Styling:**
- `condensed` - Smaller, more compact checkbox (default: `false`)
- `className` - Custom class for checkbox wrapper

**Validation:**
- `validation` - `'error'` | `'general'` - Validation state
- `validationMsg` - Error/validation message text
- `validationMsgRole` - ARIA role for validation message (default: `'alert'`)
- `ariaLive` - ARIA live region setting for validation message

**Event Handlers:**
- `onChange` - `(checked: boolean, event: React.ChangeEvent) => void` - Called when checkbox state changes

**Accessibility:**
- `ariaLabel` - ARIA label for screen readers
- `ariaDescribedby` - IDs of describing elements
- `validationMessageId` - Custom ID for validation message element

### CheckboxGroup Props

**Structure:**
- `legend` - Fieldset legend text
- `legendId` - Custom ID for legend element
- `legendClassName` - Custom class for legend
- `fieldsetId` - Custom ID for fieldset element
- `children` - Checkbox components to group

**Layout:**
- `vertical` - Stack vertically (default: `true`)
- `vSpacing` - Vertical spacing size (`'0'` | `'8'` | `'16'` | `'24'` | `'32'` | `'48'` | `'72'`)
- `hSpacing` - Horizontal spacing size when `vertical={false}`
- `hasGrid` - Use custom grid layout (disables automatic spacing)
- `labelPosition` - `'left'` | `'right'` - Label position for all child checkboxes (unless overridden)

**Validation:**
- `required` - Mark group as required
- `validation` - `'error'` | `'general'` - Group validation state
- `validationMsg` - Group-level validation message
- `validationMsgRole` - ARIA role for validation message
- `a11yValidation` - Validation for accessibility only (no visible message)
- `ariaLive` - ARIA live region setting

**Accessibility:**
- `ariaLabel` - ARIA label for fieldset
- `ariaDescribedby` - IDs of describing elements
- `role` - ARIA role (default: `'group'`)

## Common Patterns

### Indeterminate State
Used for "select all" checkboxes when some items are selected:

```tsx
const [items, setItems] = useState({
  item1: false,
  item2: true,
  item3: false
});

const allChecked = Object.values(items).every(Boolean);
const someChecked = Object.values(items).some(Boolean);
const isIndeterminate = someChecked && !allChecked;

<Checkbox 
  label="Select all"
  checked={allChecked}
  indeterminate={isIndeterminate}
  onChange={(checked) => {
    setItems({ item1: checked, item2: checked, item3: checked });
  }}
/>
<CheckboxGroup legend="Items">
  <Checkbox label="Item 1" checked={items.item1} onChange={(v) => setItems({...items, item1: v})} />
  <Checkbox label="Item 2" checked={items.item2} onChange={(v) => setItems({...items, item2: v})} />
  <Checkbox label="Item 3" checked={items.item3} onChange={(v) => setItems({...items, item3: v})} />
</CheckboxGroup>
```

### Form Validation
Validate on submit, then revalidate on change:

```tsx
const [checkedItems, setCheckedItems] = useState({});
const [hasSubmitted, setHasSubmitted] = useState(false);
const [validationMsg, setValidationMsg] = useState('');

const validate = (items) => {
  const count = Object.values(items).filter(Boolean).length;
  if (count < 2) {
    setValidationMsg('Select at least two options');
    return false;
  }
  setValidationMsg('');
  return true;
};

const handleChange = (name, checked) => {
  const updated = { ...checkedItems, [name]: checked };
  setCheckedItems(updated);
  if (hasSubmitted) validate(updated); // Revalidate after initial submit
};

const handleSubmit = (e) => {
  e.preventDefault();
  setHasSubmitted(true);
  if (validate(checkedItems)) {
    // Submit form
  }
};

<form onSubmit={handleSubmit}>
  <CheckboxGroup 
    legend="Contact preferences" 
    required
    validation={validationMsg ? 'error' : undefined}
    validationMsg={validationMsg}
  >
    <Checkbox label="Email" name="email" onChange={(v, e) => handleChange(e.target.name, v)} />
    <Checkbox label="Phone" name="phone" onChange={(v, e) => handleChange(e.target.name, v)} />
    <Checkbox label="Text" name="text" onChange={(v, e) => handleChange(e.target.name, v)} />
  </CheckboxGroup>
</form>
```

### Left-Aligned Labels
```tsx
<CheckboxGroup 
  legend="Options" 
  labelPosition="left"
  vertical
>
  <Checkbox label="Option 1" />
  <Checkbox label="Option 2" />
</CheckboxGroup>
```

### Horizontal Layout
```tsx
<CheckboxGroup 
  legend="Quick options" 
  vertical={false}
  hSpacing="24"
>
  <Checkbox label="Yes" />
  <Checkbox label="No" />
  <Checkbox label="Maybe" />
</CheckboxGroup>
```

### Grid Layout
For custom responsive layouts, use `hasGrid={true}` and manually structure:

```tsx
<CheckboxGroup legend="Services" hasGrid>
  <div className="container">
    <div className="row">
      <div className="col-xs-6 col-sm-3">
        <Checkbox label="Service 1" />
      </div>
      <div className="col-xs-6 col-sm-3">
        <Checkbox label="Service 2" />
      </div>
      <div className="col-xs-6 col-sm-3">
        <Checkbox label="Service 3" />
      </div>
    </div>
  </div>
</CheckboxGroup>
```

### Disabled Checkboxes
```tsx
<Checkbox label="Cannot be changed" disabled checked />
<Checkbox label="Cannot be checked" disabled />
```

### Condensed Mode
Smaller checkboxes for compact layouts:

```tsx
<Checkbox label="Compact option" condensed />
```

## Accessibility

**Built-in Features:**
- Proper fieldset/legend structure for groups
- ARIA attributes automatically managed
- Keyboard support (Space to toggle, Enter key handled)
- Required and validation states announced to screen readers
- Indeterminate state properly announced with `aria-checked="mixed"`

**Best Practices:**
- Use `CheckboxGroup` with `legend` for related checkboxes (not standalone labels)
- Provide `ariaLabel` if checkbox has no visible label
- Use `ariaDescribedby` to reference helper text or instructions
- Set appropriate `validationMsgRole` (default: `'alert'`)
- For dynamic validation, use `ariaLive` to announce changes

**Screen Reader Announcements:**
- Required checkboxes announce "required"
- Invalid checkboxes announce "invalid"
- Validation messages use `role="alert"` by default
- Indeterminate state announces as "mixed"

## Important Notes

1. **Controlled vs Uncontrolled:**
   - Use `checked` + `onChange` for controlled (React state manages value)
   - Use `defaultChecked` for uncontrolled (DOM manages value)
   - Never mix `checked` and `defaultChecked`

2. **onChange Signature:**
   - Receives `(checked: boolean, event: React.ChangeEvent)` 
   - First argument is the new checked state (convenient for simple updates)
   - Event is second argument (use `event.target.name` to identify checkbox)

3. **Indeterminate State:**
   - Must be managed with controlled `checked` prop
   - Set `indeterminate={true}` to show mixed state
   - User interaction clears indeterminate state automatically
   - Commonly used for "select all" scenarios

4. **Validation:**
   - Individual checkboxes can have their own `validation`/`validationMsg`
   - `CheckboxGroup` can have group-level validation
   - Both can coexist (e.g., group requires selection + individual checkbox has error)
   - Validation only displays for `'error'` or `'general'` states

5. **Spacing:**
   - `CheckboxGroup` automatically spaces children with `Spacer` components
   - Use `hasGrid={true}` to disable automatic spacing for custom layouts
   - Default vertical spacing is `'16'`, horizontal is `'16'`

6. **Label Position:**
   - `labelPosition` in `CheckboxGroup` sets default for all children
   - Individual `Checkbox` can override with its own `labelPosition`
   - Left-aligned labels use `'left'` (common in forms with long labels)

7. **Custom Attributes:**
   - Pass any HTML input attributes via props (e.g., `data-*` attributes)
   - Component uses `{...props}` spread for extensibility

8. **Enter Key:**
   - Enter key toggles checkbox (in addition to Space)
   - Handled via `onKeyDown` event
