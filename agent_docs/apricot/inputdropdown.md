# InputDropdown Component

## Overview
The `InputDropdown` component is an autocomplete/typeahead input that displays filtered suggestions in a dropdown as the user types. It combines an input field with a dynamic dropdown menu for search and selection functionality.

## Basic Usage

```tsx
import { InputDropdown } from '@cb/apricot-react';
import { useState } from 'react';

const states = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  // ...more items
];

// Simple autocomplete
const [items, setItems] = useState(states);

<InputDropdown
  label="State"
  placeholder="Type to search..."
  floating={true}
  clearable={true}
  dataItems={items}
  closeOnSelect={true}
  onChange={(event, value) => {
    // Filter items based on input value
    const filtered = states.filter(item =>
      item.label.toLowerCase().includes(value.toString().toLowerCase())
    );
    setItems(filtered);
  }}
  callBack={(label, value) => {
    console.log('Selected:', label, value);
  }}
/>
```

## Key Props

### Data & Items
- `dataItems` (required) - Array of dropdown items: `{ label: string; value: string | number; icon?: IconName }[]`
- `defaultItems` - Items to show on load before filtering
- `openOnLoad` - Open dropdown on initial render (requires `defaultItems`)

### Behavior
- `closeOnSelect` - Close dropdown when item selected (default: true)
- `closeOnClickOutside` - Close when clicking outside (default: true)
- `escClose` - Close on Escape key (default: true)
- `dropdownOverlay` - Dropdown overlays content instead of pushing it down (default: false)

### Display & Styling
- `scrollLimit` - Number of visible items before scrolling (0 = no limit)
- `itemHeight` - Height of each dropdown item in pixels (default: 48)
- `showNoItemsText` - Show message when no items match (default: false)
- `noItemsText` - Custom no results message (default: 'no suggestions available')

### Scroll Helper
- `scrollLimitHelper` - Show helper text when items exceed limit
- `scrollLimitHelperLimit` - Threshold to show helper (default: `scrollLimit`)
- `scrollLimitHelperText` - Custom helper text
- `scrollLimitHelperClass` - CSS class for helper element

### Item Customization
- `dropDownItemIcon` - Icon for all items (see icon.md for available icon names)
- `dropDownItemIconLeft` - Position icons on left (default: false/right)
- `highlightInputValue` - Highlight matching text in items (default: false)
- `dropDownItemFunc(label, value, searchValue)` - Custom render function for items
- `dropDownItemClassNameFunc(label, value)` - Custom class function for items
- `dropDownItemAnchorAttributes` - Additional attributes for item anchors

### Callbacks
- `onChange(event, value)` - Called when input value changes
- `callBack(label, value)` - Called when item selected
- `itemLabelFunc(event, label, value)` - Custom label processing
- `onOpen(inputValue, items)` - Called when dropdown opens
- `onClose(inputValue, items)` - Called when dropdown closes

### Reset
- `reset` - Trigger reset of input and dropdown
- `onReset()` - Called after reset

### Input Props
All props from `Input` component are supported:
- `label`, `placeholder`, `floating`, `clearable`, `required`, `disabled`, `readOnly`
- `icon`, `iconRight`, `condensed`, `validation`, `validationMsg`
- `onKeyDown`, `onKeyUp`, `onClear`, `onClick`
- See [input.md](input.md) for full list

### Accessibility
- `inputId` - Input element ID
- `dropdownId` - Dropdown element ID
- `labelId` - Label element ID
- `validationMessageId` - Validation message ID
- `ariaLabel` - Accessible label
- `ariaDescribedby` - Additional descriptive element IDs
- `srMessageText` - Screen reader messages: `['suggestion available', 'suggestions available']`
- `shadowRoot` - Enable for shadow DOM usage

## Common Patterns

### Async Search with Debouncing

```tsx
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

const [schools, setSchools] = useState([]);
const [hasTyped, setHasTyped] = useState(false);

const searchSchools = useCallback(
  debounce(async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) {
      setSchools([]);
      return;
    }
    
    const results = await fetchSchools(searchTerm);
    setSchools(results);
  }, 500),
  []
);

<InputDropdown
  label="School"
  placeholder="Search by name or location"
  dataItems={schools.map(s => ({ label: s.name, value: s.id }))}
  onChange={(e, value) => {
    setHasTyped(value.toString().length >= 2);
    searchSchools(value);
  }}
  showNoItemsText={hasTyped && schools.length === 0}
  noItemsText="No matches. Please try again."
  closeOnSelect={true}
  callBack={(label, value) => {
    console.log('Selected school:', label, value);
  }}
/>
```

### Custom Dropdown Items

```tsx
const customRender = (label, value, searchValue) => {
  const school = schools.find(s => s.id === value);
  
  return (
    <div style={{ width: '100%' }}>
      <HighlightedString
        sourceString={label}
        matcherString={searchValue}
      />
      <div className="cb-font-size-small cb-font-weight-light">
        {school?.city}, {school?.state}
      </div>
    </div>
  );
};

<InputDropdown
  label="School"
  dataItems={schools.map(s => ({ label: s.name, value: s.id }))}
  dropDownItemFunc={customRender}
  itemHeight={78}
  scrollLimit={3}
  closeOnSelect={true}
/>
```

### Highlighted Matching Text

```tsx
<InputDropdown
  label="Search"
  dataItems={items}
  highlightInputValue={true}
  onChange={(e, value) => {
    const filtered = allItems.filter(item =>
      item.label.toLowerCase().includes(value.toString().toLowerCase())
    );
    setItems(filtered);
  }}
/>
```

### With Icons

```tsx
const states = [
  { label: 'California', value: 'CA', icon: 'location' },
  { label: 'New York', value: 'NY', icon: 'location' },
  // ...
];

<InputDropdown
  label="State"
  dataItems={states}
  dropDownItemIconLeft={true}
  closeOnSelect={true}
/>
```

### Scroll Limiting with Helper Text

```tsx
<InputDropdown
  label="Country"
  dataItems={countries}
  scrollLimit={5}
  scrollLimitHelper={true}
  scrollLimitHelperLimit={10}
  scrollLimitHelperText="There are more results. Keep typing to refine your search."
  scrollLimitHelperClass="cb-blue5-tint-1"
  closeOnSelect={true}
/>
```

### Default Items on Load

```tsx
const defaultSuggestions = [
  { label: 'Popular Choice 1', value: 'p1' },
  { label: 'Popular Choice 2', value: 'p2' },
];

<InputDropdown
  label="Suggestions"
  defaultItems={defaultSuggestions}
  openOnLoad={true}
  dataItems={searchResults}
  onChange={(e, value) => {
    // Fetch search results
    setSearchResults(performSearch(value));
  }}
/>
```

### Programmatic Control with Ref

```tsx
import { useRef } from 'react';
import { IInputDropdownHandle } from '@cb/apricot-react';

const ref = useRef<IInputDropdownHandle>(null);

<InputDropdown
  ref={ref}
  label="Search"
  dataItems={items}
/>

// Available ref methods:
ref.current?.clear();                    // Clear input and reset
ref.current?.getValue();                 // Get current input value
ref.current?.setValue({ label: 'X', value: '1' }); // Set value
ref.current?.dispatchEvent(new Event('input')); // Trigger events
```

### Reset Functionality

```tsx
const [resetTrigger, setResetTrigger] = useState(false);

<InputDropdown
  label="Search"
  dataItems={items}
  reset={resetTrigger}
  onReset={() => setResetTrigger(false)}
  callBack={(label, value) => {
    console.log('Selected:', label, value);
    // Clear after selection
    setResetTrigger(true);
  }}
/>

<button onClick={() => setResetTrigger(true)}>
  Reset
</button>
```

### Delayed Data Loading

```tsx
const [items, setItems] = useState([]);
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  fetchData().then(data => {
    setItems(data);
    setIsLoaded(true);
  });
}, []);

// Show regular Input while loading
{!isLoaded ? (
  <Input label="Search" floating disabled />
) : (
  <InputDropdown
    label="Search"
    dataItems={items}
    defaultItems={[{ label: 'Select an option', value: '' }]}
    onChange={(e, value) => {
      // Handle search
    }}
  />
)}
```

### With Validation

```tsx
<InputDropdown
  label="Required Field"
  dataItems={items}
  required={true}
  validation="error"
  validationMsg="Please select an option"
  closeOnSelect={true}
/>
```

### Dropdown Overlay Mode

```tsx
// Dropdown floats over content instead of pushing it down
<InputDropdown
  label="Search"
  dataItems={items}
  dropdownOverlay={true}
  scrollLimit={5}
/>
```

## HighlightedString Component

Utility component for highlighting matching text in custom dropdown items:

```tsx
import { HighlightedString } from '@cb/apricot-react';

<HighlightedString
  sourceString="California"
  matcherString="cal"
  className="cb-font-weight-bold"
/>
// Renders: <p><bold>Cal</bold>ifornia</p>
```

### Props
- `sourceString` - Full text to display
- `matcherString` - Text to highlight (case-insensitive)
- Standard HTML attributes supported

## Accessibility

### ARIA Attributes
- Component uses `role="combobox"` pattern
- Dropdown uses `role="listbox"` with `role="option"` items
- Automatically manages `aria-expanded`, `aria-activedescendant`, `aria-autocomplete`
- Screen reader announcements for suggestion count

### Keyboard Navigation
- `Arrow Down` - Open dropdown and move to first item
- `Arrow Up/Down` - Navigate items when open
- `Enter` - Select focused item
- `Escape` - Close dropdown
- `Tab` - Close dropdown and move focus

### Best Practices

```tsx
// Always provide a label
<InputDropdown
  label="Search Schools"
  ariaLabel="Search for schools by name or location"
  dataItems={schools}
/>

// Provide helpful no-results text
<InputDropdown
  label="Search"
  dataItems={results}
  showNoItemsText={true}
  noItemsText="No matches found. Try a different search term."
/>

// Use scroll limits for long lists
<InputDropdown
  label="Country"
  dataItems={countries}
  scrollLimit={8}
  scrollLimitHelper={true}
  scrollLimitHelperText="Scroll or keep typing to see more results"
/>
```

## Important Notes

- InputDropdown combines Input and Dropdown functionality
- `dataItems` must be updated in `onChange` to filter results
- Use `closeOnSelect={true}` for single-selection behavior
- `dropdownOverlay={true}` prevents layout shift but may cover content
- Scroll limiting improves performance with large datasets
- `highlightInputValue` only works with default item rendering (not with `dropDownItemFunc`)
- Custom item rendering via `dropDownItemFunc` receives `searchValue` for manual highlighting
- Component handles focus management and keyboard navigation automatically
- Use `reset` prop for controlled reset behavior
- Ref methods provide programmatic control when needed
- Screen reader messages update automatically based on result count
- `itemHeight` should match actual item height for proper scroll calculation
- Helper text appears when `items.length > scrollLimitHelperLimit`
