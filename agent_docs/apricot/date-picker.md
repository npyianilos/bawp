# DatePicker Component

## Overview

The `DatePicker` component provides a calendar interface for selecting single dates or date ranges. It supports two modes: button-triggered (standard) and interactive (inline inputs with calendar popover).

## Basic Usage

### Single Date Picker

```tsx
import { DatePicker } from "@cb/apricot-react";

// Single date with button trigger
<DatePicker
  singleDate={true}
  startDate="06/23/2024"
  ariaLabel="Select a date"
  onSelect={event => console.log("Date selected:", event)}
/>;
```

### Date Range Picker

```tsx
// Date range with button trigger
<DatePicker
  singleDate={false}
  startDate="06/01/2024"
  endDate="06/15/2024"
  onSelectStart={event => console.log("Start date:", event)}
  onSelectEnd={event => console.log("End date:", event)}
  onUpdate={event => console.log("Range updated:", event)}
/>
```

### Interactive Mode (Inline Inputs)

```tsx
// Date range with inline inputs
<DatePicker
  interactiveInput={true}
  floating={true}
  startLabel="Check-in"
  endLabel="Check-out"
  defaultValueStartInput="06/01/2024"
  defaultValueEndInput="06/15/2024"
  inputStartOnChange={(e, value) => console.log("Start:", value)}
  inputEndOnChange={(e, value) => console.log("End:", value)}
/>
```

## Key Props

### Mode & Display

- `singleDate` - Select single date instead of range (default: false)
- `singlePanel` - Show single calendar panel (default: false)
- `interactiveInput` - Use inline inputs instead of button trigger (default: false)
- `footer` - Show Reset and Update buttons (default: true)

### Dates

- `startDate` - Initial start (or single) date (string or Date)
- `endDate` - Initial end date (string or Date)
- `minDate` - Minimum selectable date (string or Date)
- `maxDate` - Maximum selectable date (string or Date)
- `minDays` - Minimum range length in days
- `maxDays` - Maximum range length in days

### Date Restrictions

- `disableWeekends` - Disable Saturdays and Sundays (default: false)
- `disableDates` - Array of disabled dates or ranges: `['2024-06-23', ['2024-06-01', '2024-06-15']]`

### Formatting

- `dateFormat` - Display format for trigger button (default: 'MM/DD/YY')
- `inputDateFormat` - Format for input fields (default: 'MM/DD/YYYY')
- `lang` - Language for month/day names (default: 'auto')

### Labels

- `singleLabel` - Label for single date (default: 'Date')
- `startLabel` - Label for start date (default: 'Start Date')
- `endLabel` - Label for end date (default: 'End Date')
- `resetLabel` - Label for Reset button (default: 'Reset')
- `updateLabel` - Label for Update button (default: 'Update')

### Button/Trigger (Standard Mode)

- `disableButton` - Disable the trigger button
- `buttonClassName` - CSS class for trigger button
- `palette` - Button color: 'blue5' | 'blue2' | 'purple1'

### Interactive Input Props

- `floating` - Enable floating labels (default: true)
- `condensed` - Condensed input style
- `required` - Mark inputs as required
- `defaultValueStartInput` - Uncontrolled initial value for start input
- `valueStartInput` - Controlled value for start input
- `defaultValueEndInput` - Uncontrolled initial value for end input
- `valueEndInput` - Controlled value for end input
- `disabledStartInput` - Disable start input
- `disabledEndInput` - Disable end input
- `placeholderStartInput` - Start input placeholder (default: 'mm/dd/yyyy')
- `placeholderEndInput` - End input placeholder (default: 'mm/dd/yyyy')
- `nameStartInput` - Name attribute for start input
- `nameEndInput` - Name attribute for end input

### Input Validation (Interactive Mode)

- `validationStartInput` - Validation state: 'error' | 'success' | 'general'
- `validationMsgStartInput` - Validation message for start input
- `validationEndInput` - Validation state for end input
- `validationMsgEndInput` - Validation message for end input
- `inputMask` - Enable input masking (default: true)
- `inputDateMask` - Mask pattern (default: '##/##/####')
- `inputValidation` - Enable input validation (default: false)
- `helperText` - Validation messages: `['Invalid date message', 'Start before end message']`

### Behavior

- `setPreviousDates` - Keep previous dates until Update clicked (default: false)
- `updateClose` - Close popover after Update (default: true)
- `closeOnClickOutside` - Close on outside click (default: true)
- `firstDay` - Week start day (1=Monday, 7=Sunday, default: 7)
- `minPanel` - Align panel to minDate when provided (default: true)

### Popover Positioning

- `placement` - Popover position: 'bottom-start' | 'top-start' | 'bottom-end' | 'top-end' (default: 'bottom-start')
- `offset` - Popover offset `[x, y]` (default: `[0, 8]`)
- `flipVariations` - Flip preference (default: 'top-start')
- `modifiers` - Additional Popper modifiers

### Styling

- `datePickerClassName` - CSS class for popover
- `condensedButtons` - Condensed button styling
- `inputColClassStart` - Column class for start input (default: 'col-sm-4')
- `inputColClassEnd` - Column class for end input (default: 'col-sm-4 cb-margin-xs-top-24')

### Accessibility

- `ariaLabel` - Accessible label for trigger
- `ariaLabelPrefix` - Prefix for accessible label
- `ariaLabelledby` - External label ID (overrides ariaLabel)
- `ariaDescribedby` - Additional description for trigger
- `ariaDescribedbyStartInput` - Description for start input
- `ariaDescribedbyEndInput` - Description for end input
- `ariaLive` - Politeness for validation messages
- `previousMonthBtnOffscreen` - Screen reader label for prev button (default: 'Previous Month')
- `nextMonthBtnOffscreen` - Screen reader label for next button (default: 'Next Month')

### IDs

- `buttonId` - Trigger button ID
- `datePickerId` - Popover element ID
- `startInputID` - Start input ID (interactive mode)
- `endInputID` - End input ID (interactive mode)
- `startInputBtnID` - Start calendar button ID
- `endInputBtnID` - End calendar button ID

### Callbacks

- `onSelect(event)` - Date selected (single date mode)
- `onSelectStart(event)` - Start date selected
- `onSelectEnd(event)` - End date selected
- `onUpdate(event)` - Update button clicked
- `onReset(event)` - Reset button clicked
- `onShow(event)` - Popover opened
- `onHide(event)` - Popover closed
- `startInputOnChange(event)` - Start input raw change event
- `endInputOnChange(event)` - End input raw change event
- `inputStartOnChange(event, value)` - Start input change with value
- `inputEndOnChange(event, value)` - End input change with value
- `startInputOnKeyUp(event)` - Start input keyup
- `endInputOnKeyUp(event)` - End input keyup

### Callback Event Structure

> **Note:** The TypeScript types declare `onSelect`, `onSelectStart`, `onSelectEnd`, and `onUpdate` as `(event: Event) => void`, but the actual argument is **not** a DOM `Event`. The underlying `CBDatePicker` passes an object with the following shape:

```ts
{
  dateObj: {
    start: Date | null; // Native JS Date for the start (or single) date
    end: Date | null; // Native JS Date for the end date (null in single-date mode)
  }
  momentObj: {
    start: Moment | null; // Moment.js object for the start date
    end: Moment | null; // Moment.js object for the end date
  }
}
```

**Example usage:**

```tsx
<DatePicker
  singleDate={true}
  onSelect={event => {
    // event is typed as Event, but at runtime it's the object above
    const e = event as any;
    console.log("Selected date:", e.dateObj.start); // Date object
  }}
/>
```

Which callback receives which dates:

- `onSelect` — always receives both `start` and `end`
- `onSelectStart` — receives `start` only (`end` is null)
- `onSelectEnd` — receives `end` only (`start` is null)
- `onUpdate` — receives both `start` and `end`

### Advanced

- `shadowRoot` - Enable for shadow DOM compatibility (default: false)
- `startInput` - Bind external start input (ID or element)
- `endInput` - Bind external end input (ID or element)
- `cbRef` - Ref to CBDatePicker instance for programmatic control

## Common Patterns

### Single Date Selection

```tsx
<DatePicker
  singleDate={true}
  singleLabel="Birth Date"
  startDate="01/15/1990"
  ariaLabel="Select birth date"
  onSelect={event => {
    console.log("Selected date:", event);
  }}
/>
```

### Date Range with Min/Max

```tsx
<DatePicker
  startDate="06/01/2024"
  endDate="06/15/2024"
  minDate={new Date()}
  maxDate="12/31/2024"
  minDays={2}
  maxDays={14}
  onUpdate={event => {
    console.log("Range updated:", event);
  }}
/>
```

### Disable Weekends and Specific Dates

```tsx
<DatePicker
  singleDate={true}
  disableWeekends={true}
  disableDates={["2024-07-04", ["2024-12-24", "2024-12-26"]]}
  ariaLabel="Select a weekday"
/>
```

### Interactive with Validation

```tsx
const [startValue, setStartValue] = useState("");
const [endValue, setEndValue] = useState("");
const [startError, setStartError] = useState(false);

<DatePicker
  interactiveInput={true}
  floating={true}
  required={true}
  startLabel="Check-in"
  endLabel="Check-out"
  valueStartInput={startValue}
  valueEndInput={endValue}
  inputStartOnChange={(e, val) => {
    setStartValue(val as string);
    setStartError(!val);
  }}
  inputEndOnChange={(e, val) => setEndValue(val as string)}
  validationStartInput={startError ? "error" : undefined}
  validationMsgStartInput={startError ? "Required field" : ""}
  inputValidation={true}
/>;
```

### Single Panel Range

```tsx
<DatePicker
  singlePanel={true}
  startDate="06/01/2024"
  endDate="06/15/2024"
  startLabel="From"
  endLabel="To"
/>
```

### Programmatic Control with Ref

```tsx
import { useRef } from "react";
import { ICBDatePicker } from "@cb/apricot-react";

const datePickerRef = useRef<ICBDatePicker>(null);

<DatePicker cbRef={datePickerRef} singleDate={true} />;

// Control methods:
datePickerRef.current?.show(); // Open popover
datePickerRef.current?.hide(); // Close popover
datePickerRef.current?.reset(); // Reset to initial
datePickerRef.current?.setStartValue("06/01/2024"); // Set start date
datePickerRef.current?.setEndValue("06/15/2024"); // Set end date
datePickerRef.current?.destroy(); // Clean up
```

### Custom Column Layout (Interactive)

```tsx
<DatePicker
  interactiveInput={true}
  inputColClassStart="col-md-6"
  inputColClassEnd="col-md-6"
  startLabel="From"
  endLabel="To"
/>
```

### Keep Previous Dates Until Update

```tsx
<DatePicker
  setPreviousDates={true}
  updateClose={false}
  startDate="06/01/2024"
  endDate="06/15/2024"
  onUpdate={event => {
    console.log("User confirmed dates");
  }}
/>
```

### Bind to External Inputs

```tsx
<input id="external-start" type="text" />
<input id="external-end" type="text" />

<DatePicker
  startInput="external-start"
  endInput="external-end"
  ariaLabel="Select date range"
/>
```

### Custom Date Format

```tsx
<DatePicker
  singleDate={true}
  dateFormat="MMMM DD, YYYY"
  inputDateFormat="MM/DD/YYYY"
  ariaLabel="Select date"
/>
```

### Controlled Interactive Inputs

```tsx
const [start, setStart] = useState("06/01/2024");
const [end, setEnd] = useState("06/15/2024");

<DatePicker
  interactiveInput={true}
  valueStartInput={start}
  valueEndInput={end}
  inputStartOnChange={(e, val) => setStart(val as string)}
  inputEndOnChange={(e, val) => setEnd(val as string)}
/>;
```

## Accessibility

### ARIA Labels

```tsx
// Single picker with label
<DatePicker
  singleDate={true}
  ariaLabel="Select appointment date"
/>

// Range picker with external label
<label id="date-range-label">Travel Dates</label>
<DatePicker
  ariaLabelledby="date-range-label"
/>

// With description
<p id="date-help">Select dates within 30 days</p>
<DatePicker
  ariaDescribedby="date-help"
/>
```

### Keyboard Navigation

- `Tab` - Navigate between inputs/buttons
- `Enter`/`Space` - Open calendar, select date
- `Arrow keys` - Navigate calendar days
- `Page Up/Down` - Navigate months
- `Home/End` - First/last day of week
- `Escape` - Close popover

### Best Practices

```tsx
// Always provide accessible labels
<DatePicker
  singleDate={true}
  ariaLabel="Select event date"
  ariaLabelPrefix="Event:"
/>

// Use validation messages
<DatePicker
  interactiveInput={true}
  required={true}
  validationStartInput="error"
  validationMsgStartInput="Start date is required"
  ariaLive="polite"
/>

// Provide helpful month navigation labels
<DatePicker
  previousMonthBtnOffscreen="Go to previous month"
  nextMonthBtnOffscreen="Go to next month"
/>
```

## Important Notes

- DatePicker uses Apricot's CBDatePicker JavaScript library and Popper.js
- `interactiveInput={true}` renders inline inputs instead of a button trigger
- Input masking and validation only apply in interactive mode
- `setPreviousDates={true}` requires user to click Update to confirm selection
- Date format follows Luxon DateTime format tokens
- `startInput`/`endInput` bind to external inputs (values set at init only)
- Interactive inputs support both controlled and uncontrolled modes
- `minPanel={true}` aligns initial view to `minDate` when provided
- Week starts on Sunday (7) by default; use `firstDay={1}` for Monday
- Disabled dates can be individual dates or ranges
- Component handles focus management and keyboard navigation automatically
- Popover positioning adjusts automatically to stay in viewport
- Use `cbRef` for programmatic control of picker state
- Footer buttons can be hidden with `footer={false}`
