# Dropdown Components

## Overview
The dropdown package provides components for creating accessible dropdown menus and select lists. Includes `Dropdown` (container), `DropdownItem` (menu items), and `DropdownGroup` (item grouping).

## Dropdown Component

### Basic Usage

```tsx
import { Dropdown, DropdownItem } from '@cb/apricot-react';

// Simple dropdown menu
<Dropdown title="Menu" closeOnClick={true}>
  <DropdownItem label="First" onClick={() => console.log('First')} />
  <DropdownItem label="Second" onClick={() => console.log('Second')} />
  <DropdownItem divider />
  <DropdownItem label="Third" onClick={() => console.log('Third')} />
</Dropdown>
```

### Key Props

**Display**
- `title` - Text or element displayed in toggle button (default: 'Menu List')
- `titleIcon` - Icon displayed next to title (see icon.md for available icon names)
- `caret` - Show caret icon in toggle (default: true)
- `disabled` - Disable the dropdown
- `condensed` - Compact styling

**Behavior**
- `closeOnClick` - Close dropdown when item clicked (default: false)
- `closeOnClickOutside` - Close when clicking outside (default: true)
- `ignoreClickOutsideElements` - Elements that don't trigger close
- `callBack(node)` - Called when menu item clicked (receives anchor element)

**Controlled Mode**
- `open` - Control open/closed state
- `onOpen()` - Called when dropdown opens
- `onClose()` - Called when dropdown closes
- `cbRef` - Ref to access dropdown methods

**Select List Mode**
- `selectList` - Style as select list with ARIA semantics
- `selectListLabelId` - ID of external label element

**Filter**
- `withFilter` - Add search input to filter items
- `inputFilterProps` - Props for filter Input component
- `customFilter(children, filterValue)` - Custom filter function
- `showNoResultsMessage` - Show message when no results (default: true)
- `noResultsMessage` - Custom no results message

**Styling**
- `className` - Dropdown container CSS class
- `classNameMenu` - Menu container CSS class
- `classNameToggle` - Toggle button CSS class
- `iconLeft` - Position icons on left (default: false/right)

**Accessibility**
- `dropdownId` - Container element ID
- `dropdownMenuId` - Menu element ID
- `ariaLabel` - Accessible label for toggle

## DropdownItem Component

Individual menu item within a dropdown.

### Basic Usage

```tsx
import { DropdownItem } from '@cb/apricot-react';

// Simple item
<DropdownItem label="Menu Item" onClick={() => console.log('Clicked')} />

// With icon
<DropdownItem 
  label="Settings" 
  icon="settings" 
  onClick={() => console.log('Settings')} 
/>

// Disabled item
<DropdownItem label="Disabled" disabled={true} />

// Divider
<DropdownItem divider />

// Selected item
<DropdownItem label="Current" selected={true} />
```

### Key Props

- `label` - Item text
- `onClick()` - Click handler
- `icon` - Icon name or custom React element (see icon.md)
- `iconLeft` - Position icon on left (default: false/right)
- `disabled` - Disable the item
- `selected` - Show as selected/active
- `divider` - Render as divider (ignores other props)
- `dropdownItemId` - Element ID
- `role` - ARIA role (default: 'menuitem' or 'option' with filter)

## DropdownGroup Component

Groups related dropdown items under a common label.

### Basic Usage

```tsx
import { Dropdown, DropdownItem, DropdownGroup } from '@cb/apricot-react';

<Dropdown title="Grouped Menu" closeOnClick={true}>
  <DropdownGroup label="Group 1">
    <DropdownItem label="Item 1" />
    <DropdownItem label="Item 2" />
  </DropdownGroup>
  <DropdownItem divider />
  <DropdownGroup label="Group 2">
    <DropdownItem label="Item 3" />
    <DropdownItem label="Item 4" />
  </DropdownGroup>
</Dropdown>
```

### Key Props

- `label` (required) - Group header text
- `children` - DropdownItems in the group

## Common Patterns

### Dropdown with Icons

```tsx
<Dropdown title="Actions" closeOnClick={true}>
  <DropdownItem label="Edit" icon="edit" onClick={() => {}} />
  <DropdownItem label="Delete" icon="trash" onClick={() => {}} />
  <DropdownItem label="Share" icon="share" onClick={() => {}} />
</Dropdown>
```

### Select List Style

```tsx
import { useRef } from 'react';

const cbRef = useRef<ICBDropdown>();

<Dropdown
  title="Select Color"
  selectList={true}
  closeOnClick={true}
  cbRef={cbRef}
>
  <DropdownItem label="Red" />
  <DropdownItem label="Blue" />
  <DropdownItem label="Green" />
  <DropdownItem label="Yellow" disabled={true} />
</Dropdown>

// Reset selection
<button onClick={() => cbRef.current?.reset()}>
  Reset
</button>
```

### Dropdown with Filter

```tsx
<Dropdown
  title="Search Items"
  withFilter={true}
  inputFilterProps={{
    placeholder: 'Type to filter...',
    label: 'Filter',
    clearable: true,
  }}
  showNoResultsMessage={true}
  noResultsMessage="No matches found"
  closeOnClick={true}
>
  <DropdownItem label="Apple" />
  <DropdownItem label="Banana" />
  <DropdownItem label="Cherry" />
  <DropdownItem label="Date" />
</Dropdown>
```

### Custom Filter Function

```tsx
const customFilter = (children: React.ReactNode[], filterValue: string) => {
  const searchTerm = filterValue.toLowerCase().trim();
  
  return React.Children.toArray(children).filter(child => {
    if (React.isValidElement(child)) {
      const label = child.props.label;
      return label && label.toLowerCase().includes(searchTerm);
    }
    return false;
  });
};

<Dropdown
  title="Custom Filter"
  withFilter={true}
  customFilter={customFilter}
  inputFilterProps={{ label: 'Search' }}
>
  {/* items */}
</Dropdown>
```

### Controlled Dropdown

```tsx
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(!open)}>
  Toggle Dropdown
</button>

<Dropdown
  title="Controlled"
  open={open}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
>
  <DropdownItem label="Item 1" />
  <DropdownItem label="Item 2" />
</Dropdown>
```

### Dropdown with Callback

```tsx
const handleItemClick = (node: HTMLAnchorElement) => {
  console.log('Clicked:', node.textContent);
};

<Dropdown title="Menu" callBack={handleItemClick} closeOnClick={true}>
  <DropdownItem label="First" />
  <DropdownItem label="Second" />
</Dropdown>
```

### Dropdown with Title Icon

```tsx
<Dropdown
  title="Settings"
  titleIcon="settings"
  closeOnClick={true}
>
  <DropdownItem label="Profile" icon="user" />
  <DropdownItem label="Preferences" icon="tool" />
</Dropdown>
```

### Icons on Left

```tsx
<Dropdown title="Menu" iconLeft={true} closeOnClick={true}>
  <DropdownItem label="Copy" icon="copy" iconLeft={true} />
  <DropdownItem label="Paste" icon="paste" iconLeft={true} />
  <DropdownItem label="Cut" icon="cut" iconLeft={true} />
</Dropdown>
```

### Without Caret

```tsx
<Dropdown title="•••" caret={false}>
  <DropdownItem label="Action 1" />
  <DropdownItem label="Action 2" />
</Dropdown>
```

## Dropdown Ref Methods

Access methods via `cbRef` prop:

```tsx
import { useRef } from 'react';
import { ICBDropdown } from '@cb/apricot-react';

const dropdownRef = useRef<ICBDropdown>();

<Dropdown cbRef={dropdownRef} title="Menu">
  {/* items */}
</Dropdown>

// Available methods:
dropdownRef.current?.reset();           // Reset to initial state
dropdownRef.current?.toggle();          // Toggle open/closed
dropdownRef.current?.destroy();         // Clean up
dropdownRef.current?.setValue('value'); // Set value programmatically
dropdownRef.current?.keyBoardReset();   // Reset keyboard navigation
dropdownRef.current?.adjustDropdown();  // Recalculate positioning
dropdownRef.current?.selectDropdownInit(); // Initialize as select
```

## Accessibility

### ARIA Semantics

- Dropdown uses proper `role="menu"` and `role="menuitem"` by default
- Select list mode uses `role="listbox"` and `role="option"`
- Groups use `role="group"` with `aria-labelledby`
- Filter mode updates roles to support combobox pattern
- Dividers use `role="separator"`

### Keyboard Navigation

- `Enter`/`Space` - Open dropdown and activate items
- `Escape` - Close dropdown
- `Arrow Up/Down` - Navigate items
- `Tab` - Move focus outside dropdown
- First letter navigation for quick access

### Best Practices

```tsx
// Provide accessible title
<Dropdown title="Actions" ariaLabel="Available actions">
  {/* items */}
</Dropdown>

// Label select lists
<label id="colorLabel">Choose Color</label>
<Dropdown 
  title="Color" 
  selectList={true}
  selectListLabelId="colorLabel"
>
  {/* items */}
</Dropdown>

// Mark decorative icons
<DropdownItem label="Settings" icon="settings" />
```

## Important Notes

- Dropdown uses Apricot's CBDropdown JavaScript library
- Default behavior keeps dropdown open after item click (set `closeOnClick={true}` to auto-close)
- `closeOnClickOutside` is true by default for better UX
- Filter input automatically manages ARIA attributes and roles
- Select list mode provides single-selection behavior with proper semantics
- Icon positioning can be controlled per-item or globally via dropdown
- Divider items ignore all props except `divider`
- Default filter function matches on label text (case-insensitive)
- Use `customFilter` for advanced filtering logic
- Dropdown automatically handles focus management and keyboard navigation
- Ref methods allow programmatic control of dropdown state
