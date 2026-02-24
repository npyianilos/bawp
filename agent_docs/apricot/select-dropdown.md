# SelectDropdown Component

Agent documentation for the Apricot SelectDropdown component - a styled dropdown select with floating labels and grouping.

## Overview

SelectDropdown is an enhanced select component built on top of the Dropdown component, providing form-specific features like floating labels, validation, and both flat and grouped option lists.

**Import Statement**:

```tsx
import { SelectDropdown } from "@cb/apricot-react";
```

---

## TypeScript Interface

```typescript
interface ISelectDropdownProps {
  /** Select element ID */
  selectId?: string;

  /** Values/options for the dropdown */
  values?: ISelectDropdownItemsProps[] | ISelectDropdownGroupItemsProps[];

  /** Default value for uncontrolled component */
  defaultValue?: string;

  /** Current value for controlled component */
  value?: string | number;

  /** Label text */
  label?: string | React.ReactElement;

  /** Label ID */
  labelId?: string;

  /** Accessible label when no visible label */
  ariaLabel?: string;

  /** Use floating label style */
  floating?: boolean;

  /** Floating label background: 'light' | 'dark' */
  floatingBg?: IFloatingBg;

  /** Use condensed styling */
  condensed?: boolean;

  /** Mark as required */
  required?: boolean;

  /** Disable the select */
  disabled?: boolean;

  /** Reset the select to default */
  reset?: boolean;

  /** Validation state: 'error' | 'success' | 'warning' | 'general' */
  validation?: IValidationState;

  /** Validation message text */
  validationMsg?: string;

  /** Display item icons on left (default: right) */
  iconLeft?: boolean;

  /** Change event handler */
  onChange: (value?: string | number, label?: string) => void;

  /** Focus event handler */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;

  /** Blur event handler */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;

  /** Ref to access CBDropdown instance */
  cbRef?: RefObject<ICBDropdown | undefined>;

  /** Additional props */
  className?: string;
  mainClassName?: string;
  classNameMenu?: string;
  labelClassName?: string;
  helperClassName?: string;
  ariaDescribedby?: string;
  ariaLive?: "polite" | "assertive" | "off";
  validationMsgRole?: string;
  validationMessageId?: string;
}

// Option item interface
interface ISelectDropdownItemsProps {
  /** Option label */
  label?: string | React.ReactElement;

  /** Option value */
  value?: string | number;

  /** Disable this option */
  disabled?: boolean;

  /** Icon for the option */
  icon?: IconName | React.ReactElement;

  /** Icon on left side */
  iconLeft?: boolean;

  /** Mark as selected */
  selected?: boolean;

  /** Render as divider */
  divider?: boolean;
}

// Grouped options interface
interface ISelectDropdownGroupItemsProps {
  /** Group label */
  optgroup: string;

  /** Options in this group */
  options?: ISelectDropdownItemsProps[];
}
```

---

## Usage Examples

### Example 1: Basic Select

Simple select with flat options.

```tsx
<SelectDropdown
  label="Choose an option"
  values={[
    { label: "First", value: "1" },
    { label: "Second", value: "2" },
    { label: "Third", value: "3" }
  ]}
  onChange={(value, label) => console.log(value, label)}
/>
```

### Example 2: Controlled Select

Manage value with state.

```tsx
const [value, setValue] = useState("2");

<SelectDropdown
  label="Select Item"
  value={value}
  values={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" }
  ]}
  onChange={val => setValue(val as string)}
/>;
```

### Example 3: Floating Label

Modern floating label style.

```tsx
<SelectDropdown
  label="State"
  floating
  defaultValue="CA"
  values={[
    { label: "California", value: "CA" },
    { label: "Texas", value: "TX" },
    { label: "New York", value: "NY" }
  ]}
  onChange={value => console.log(value)}
/>
```

### Example 4: Grouped Options

Organize options into labeled groups.

```tsx
<SelectDropdown
  label="Select Month"
  floating
  defaultValue="08-2019"
  values={[
    {
      optgroup: "2019",
      options: [
        { label: "July", value: "07-2019" },
        { label: "August", value: "08-2019" },
        { label: "September", value: "09-2019" }
      ]
    },
    {
      optgroup: "2020",
      options: [
        { label: "January", value: "01-2020" },
        { label: "February", value: "02-2020" },
        { label: "March", value: "03-2020" }
      ]
    }
  ]}
  onChange={value => console.log(value)}
/>
```

### Example 5: With Validation

Display error state and message.

```tsx
<SelectDropdown
  label="Required Field"
  required
  validation="error"
  validationMsg="Please select a valid option"
  values={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" }
  ]}
  onChange={value => console.log(value)}
/>
```

### Example 6: With Icons

Add icons to options.

```tsx
<SelectDropdown
  label="Select with Icon"
  floating
  iconLeft
  values={[
    { label: "Home", value: "home", icon: "home" },
    { label: "Settings", value: "settings", icon: "settings" },
    { label: "Profile", value: "profile", icon: "user" }
  ]}
  onChange={value => console.log(value)}
/>
```

### Example 7: Disabled Options

Some options are non-selectable.

```tsx
<SelectDropdown
  label="Choose Service"
  values={[
    { label: "Available Service", value: "1" },
    { label: "Premium (Upgrade Required)", value: "2", disabled: true },
    { label: "Another Service", value: "3" }
  ]}
  onChange={value => console.log(value)}
/>
```

### Example 8: Floating on Dark Background

Floating label with custom background.

```tsx
<div className="cb-padding-48 cb-blue5-bg">
  <SelectDropdown
    label="Select Option"
    floating
    floatingBg="dark"
    values={[
      { label: "First", value: "1" },
      { label: "Second", value: "2" },
      { label: "Third", value: "3" }
    ]}
    onChange={value => console.log(value)}
  />
</div>
```

### Example 9: Condensed Style

Compact styling for space-constrained layouts.

```tsx
<SelectDropdown
  label="Compact Select"
  condensed
  values={[
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" }
  ]}
  onChange={value => console.log(value)}
/>
```

---

## Key Features

### Controlled vs Uncontrolled

**Uncontrolled** (with `defaultValue`):

```tsx
<SelectDropdown
  defaultValue="2"
  values={[...]}
  onChange={(value) => console.log(value)}
/>
```

**Controlled** (with `value`):

```tsx
const [selected, setSelected] = useState('2');

<SelectDropdown
  value={selected}
  values={[...]}
  onChange={(value) => setSelected(value as string)}
/>
```

### Change Handler

The `onChange` callback receives both value and label:

```tsx
<SelectDropdown
  values={[
    { label: "California", value: "CA" },
    { label: "Texas", value: "TX" }
  ]}
  onChange={(value, label) => {
    console.log("Value:", value); // 'CA'
    console.log("Label:", label); // 'California'
  }}
/>
```

### Programmatic Control

Access dropdown methods via ref:

```tsx
const selectRef = useRef<ICBDropdown>();

<SelectDropdown
  cbRef={selectRef}
  values={[...]}
  onChange={(value) => console.log(value)}
/>

// Later: selectRef.current?.reset();
```

---

## Best Practices

1. **Always provide a label**: For accessibility and usability

   ```tsx
   <SelectDropdown label="State" values={[...]} /> {/* ✓ */}
   ```

2. **Use floating labels for modern forms**: Cleaner, space-efficient

   ```tsx
   <SelectDropdown label="Email" floating values={[...]} />
   ```

3. **Group related options**: When you have many options

   ```tsx
   <SelectDropdown
     label="Month"
     values={[
       { optgroup: '2023', options: [...] },
       { optgroup: '2024', options: [...] },
     ]}
   />
   ```

4. **Controlled for dynamic updates**: Use controlled mode when value changes externally

   ```tsx
   const [state, setState] = useState("");

   <SelectDropdown value={state} values={stateOptions} onChange={val => setState(val as string)} />;
   ```

5. **Provide helpful validation messages**: Be specific about errors

   ```tsx
   <SelectDropdown
     validation="error"
     validationMsg="Please select your home state"
     values={[...]}
   />
   ```

6. **Use value/label pairs**: Always provide both value and label
   ```tsx
   { label: 'California', value: 'CA' } {/* ✓ */}
   { label: 'California' } {/* ✗ Missing value */}
   ```

---

## Common Issues

### Issue: Value Not Updating

**Problem**: Selected value doesn't change.

**Solution**: For controlled mode, ensure `onChange` updates state:

```tsx
const [value, setValue] = useState('1');

<SelectDropdown
  value={value}
  onChange={(val) => setValue(val as string)} // Must update state
  values={[...]}
/>
```

### Issue: Floating Label Not Animating

**Problem**: Floating label doesn't move when selected.

**Solution**: Ensure `floating` prop is set:

```tsx
<SelectDropdown floating label="Label" values={[...]} />
```

### Issue: Options Not Rendering

**Problem**: Dropdown opens but shows no options.

**Solution**: Check `values` array structure:

```tsx
// Correct
values={[
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
]}

// Incorrect
values={['Option 1', 'Option 2']} // Must be objects
```

### Issue: Grouped Options Showing Flat

**Problem**: Groups don't display.

**Solution**: Use correct grouped structure:

```tsx
values={[
  {
    optgroup: 'Group 1',
    options: [
      { label: 'Item 1', value: '1' },
      { label: 'Item 2', value: '2' },
    ],
  },
]}
```

---

## Accessibility

- **Labels**: Always provide `label` or `ariaLabel`
- **ARIA Attributes**: Automatically managed (role, aria-selected, etc.)
- **Keyboard Navigation**: Full keyboard support (arrow keys, enter, escape)
- **Disabled State**: Proper `aria-disabled` attribute
- **Validation**: `aria-invalid` and `aria-describedby` for errors
- **Required**: Visual and screen reader indication

---

## Differences from Standard Dropdown

| Feature              | SelectDropdown    | Dropdown     |
| -------------------- | ----------------- | ------------ |
| **Purpose**          | Form select input | General menu |
| **Floating Labels**  | ✓ Yes             | ✗ No         |
| **Validation**       | ✓ Yes             | ✗ No         |
| **Form Integration** | ✓ Native          | Manual       |
| **Single Selection** | ✓ Always          | Optional     |
| **ARIA Role**        | `listbox`         | `menu`       |

**Use SelectDropdown for**: Form inputs, single-choice selections  
**Use Dropdown for**: Action menus, navigation

---

## Reference

- [Forms Documentation](../agent_docs/react_components/forms/)
- [Dropdown Documentation](../agent_docs/react_components/dropdowns.md)
- [Select Documentation](../agent_docs/react_components/forms/select.md)
