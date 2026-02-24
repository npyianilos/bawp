# Pagination Components

## Overview
The pagination package from `@cb/apricot-react` provides components for navigating and controlling paginated data displays.

**Components:**
- `Pager` - Page navigation with numbered buttons and prev/next controls
- `PageSize` - Page size selector (buttons or dropdown)
- `PaginationInfo` - Displays record range information (e.g., "Showing 1-10 of 100")

## Basic Usage

### Pager (Page Navigation)
```tsx
import { Pager } from '@cb/apricot-react';

const [currentPage, setCurrentPage] = useState(1);

<Pager 
  current={currentPage}
  max={10}
  delta={2}
  onPageChange={setCurrentPage}
/>
```

### PageSize (Button Mode)
```tsx
import { PageSize } from '@cb/apricot-react';

const [pageSize, setPageSize] = useState(20);

<PageSize 
  current={pageSize}
  pageSizeOptions={[10, 20, 40, 60, 100]}
  maxRecords={240}
  onSizeChange={setPageSize}
/>
```

### PageSize (Select/Dropdown Mode)
```tsx
<PageSize 
  select
  label="Results per Page"
  current={pageSize}
  pageSizeOptions={[10, 20, 40, 60, 100]}
  onSizeChange={setPageSize}
/>
```

### PaginationInfo
```tsx
import { PaginationInfo } from '@cb/apricot-react';

<PaginationInfo 
  currentPage={currentPage}
  pageSize={pageSize}
  totalRecords={240}
/>
// Output: "Showing 1-20 of 240"
```

## Pager Props

**Core:**
- `current` - Current active page number (1-indexed, required)
- `max` - Total number of pages (required)
- `delta` - Number of page buttons shown on each side of current page (default: `3`)
- `responsive` - Auto-reduce visible buttons on smaller screens (default: `true`)

**Interaction:**
- `onPageChange` - `(newPage: number) => void` - Called when user navigates to a page
- `disabled` - Array of page numbers to disable (e.g., `[2, 7]`)
- `disablePager` - Disable entire pager component

**Identification:**
- `pagerId` - Custom ID for pager container (auto-generated if not provided)
- `buttonId` - ID prefix for page buttons (auto-generated if not provided)

**Accessibility:**
- `ariaLabel` - ARIA label for pagination nav landmark (default: `'pagination'`)

## PageSize Props

**Core:**
- `current` - Currently selected page size (required)
- `pageSizeOptions` - Array of available page sizes (e.g., `[10, 20, 40, 60, 100]`, required)
- `maxRecords` - Total number of records in dataset (required)

**Display Mode:**
- `select` - Render as dropdown/select instead of buttons (default: `false`)

**Labels:**
- `label` - Label text for the control (default: `'Show'` for buttons, none for select)
- `labelClassName` - Custom class for label
- `labelId` - ID for label element (select mode)
- `recordCountLabel` - Custom text for record count (default: `'Total {maxRecords} records'`)
- `recordCountLabelClassName` - Custom class for record count label
- `recordCountLabelPositionLeft` - Position record count on left side (default: `true`)

**Interaction:**
- `onSizeChange` - `(size: number) => void` - Called when user changes page size
- `disabled` - Array of page sizes to disable (e.g., `[60]`)
- `disablePageSize` - Disable entire component

**Select Mode (when `select={true}`):**
- `truncate` - Truncate long text in select (default: `false`)
- `describedbyValue` - ID for aria-describedby
- `labelId` - ID for label (used with aria-labelledby)

**Identification:**
- `pagesizeId` - Custom ID for container (auto-generated if not provided)
- `buttonId` - ID prefix for buttons (button mode, auto-generated if not provided)

**Accessibility:**
- `ariaLabel` - ARIA label for component (default: `'page size'`)

## PaginationInfo Props

**Required:**
- `currentPage` - Current page number (1-indexed)
- `pageSize` - Number of items per page
- `totalRecords` - Total number of records in dataset

**Styling:**
- `className` - Custom CSS class
- `role` - ARIA role (default: `'status'`)

## Common Patterns

### Complete Pagination Setup
Combine all three components:

```tsx
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(20);
const totalRecords = 240;
const totalPages = Math.ceil(totalRecords / pageSize);

// Reset to page 1 when page size changes
const handleSizeChange = (newSize) => {
  setPageSize(newSize);
  setCurrentPage(1);
};

<div>
  {/* Top: Info and Page Size */}
  <div className="display-flex justify-content-between align-items-center">
    <PaginationInfo 
      currentPage={currentPage}
      pageSize={pageSize}
      totalRecords={totalRecords}
    />
    <PageSize 
      select
      label="Results per Page"
      current={pageSize}
      pageSizeOptions={[10, 20, 40, 60, 100]}
      onSizeChange={handleSizeChange}
    />
  </div>

  {/* Data display goes here */}
  
  {/* Bottom: Pager */}
  <div className="display-flex justify-content-center cb-margin-top-32">
    <Pager 
      current={currentPage}
      max={totalPages}
      delta={2}
      onPageChange={setCurrentPage}
    />
  </div>
</div>
```

### Responsive Pager with Reduced Buttons
```tsx
<Pager 
  current={currentPage}
  max={20}
  delta={1}  // Show fewer buttons on mobile
  responsive={true}
  onPageChange={setCurrentPage}
/>
```

### PageSize with Buttons and Record Count
```tsx
<PageSize 
  current={pageSize}
  pageSizeOptions={[10, 20, 50]}
  maxRecords={150}
  label="Show"
  recordCountLabel="Total 150 items"
  recordCountLabelPositionLeft={false}
  onSizeChange={setPageSize}
/>
// Output: "Show [10] [20] [50] Total 150 items"
```

### Disable Specific Pages
```tsx
// Disable pages that don't have data or are invalid
<Pager 
  current={1}
  max={10}
  disabled={[4, 5, 9]}  // Pages 4, 5, 9 are disabled
  onPageChange={setCurrentPage}
/>
```

### PageSize with Custom Labels
```tsx
<PageSize 
  select
  label="Items"
  current={pageSize}
  pageSizeOptions={[25, 50, 100, 200]}
  ariaLabel="Number of items per page"
  onSizeChange={setPageSize}
/>
```

### Server-Side Pagination
```tsx
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(20);
const [totalRecords, setTotalRecords] = useState(0);

useEffect(() => {
  fetchData(currentPage, pageSize).then(response => {
    setTotalRecords(response.total);
    // Update data display
  });
}, [currentPage, pageSize]);

const totalPages = Math.ceil(totalRecords / pageSize);

<Pager 
  current={currentPage}
  max={totalPages}
  onPageChange={setCurrentPage}
/>
```

### Disable All Pagination During Loading
```tsx
const [isLoading, setIsLoading] = useState(false);

<Pager 
  current={currentPage}
  max={totalPages}
  disablePager={isLoading}
  onPageChange={setCurrentPage}
/>

<PageSize 
  select
  current={pageSize}
  pageSizeOptions={[10, 20, 40]}
  disablePageSize={isLoading}
  onSizeChange={setPageSize}
/>
```

### Custom Record Count Display
```tsx
<PageSize 
  current={pageSize}
  pageSizeOptions={[10, 20, 50]}
  maxRecords={145}
  recordCountLabel={`Found ${145} matching results`}
  onSizeChange={setPageSize}
/>
```

### No Record Count in Button Mode
```tsx
<PageSize 
  current={pageSize}
  pageSizeOptions={[10, 20, 50]}
  maxRecords={undefined}  // No record count shown
  recordCountLabel=""
  onSizeChange={setPageSize}
/>
```

## Pager Behavior

### Delta and Visible Buttons
The `delta` prop controls how many page buttons appear on each side of the current page:

- `delta={0}` - Only shows first, current, and last page
- `delta={1}` - Shows current ±1 pages (3 pages visible)
- `delta={2}` - Shows current ±2 pages (5 pages visible, default)
- `delta={3}` - Shows current ±3 pages (7 pages visible)

**Examples:**
```tsx
// Current page = 5, max = 10, delta = 2
// Shows: [1] ... [3] [4] [5] [6] [7] ... [10]

// Current page = 5, max = 10, delta = 0
// Shows: [1] ... [5] ... [10]

// Current page = 2, max = 10, delta = 2
// Shows: [1] [2] [3] [4] ... [10]
```

### Responsive Mode
When `responsive={true}`:
- Pager automatically reduces visible buttons on smaller screens
- Prevents button wrapping and overflow
- Dynamically recalculates on window resize
- Adjusts `delta` down until buttons fit

### Ellipsis (...)
- Appears when there's a gap of more than 1 page
- Disabled and non-clickable
- Shows "More Pages" to screen readers

## Accessibility

**Pager:**
- Uses `<nav>` element with `aria-label`
- Previous/Next buttons have descriptive screen reader text
- Active page has `aria-current="page"` and announces "page"
- Disabled buttons have `aria-disabled` and `tabindex="-1"`
- Page buttons announce "Go to page X"

**PageSize:**
- Button mode: Uses `<nav>` with `aria-label="page size"`
- Select mode: Uses standard Select component accessibility
- Buttons announce "Show X rows per page"
- Active size has `aria-current="page"`

**PaginationInfo:**
- Default `role="status"` for live region announcements
- Screen readers announce changes when pagination updates
- Format: "Showing X-Y of Z"

**Best Practices:**
- Provide descriptive `ariaLabel` for both Pager and PageSize
- Ensure PaginationInfo is visible or announced to screen readers
- Use `role="status"` on PaginationInfo for dynamic updates
- Keep labels clear (e.g., "Results per Page", "Product Pagination")

## Important Notes

1. **Page Numbers:**
   - Pages are 1-indexed (first page is 1, not 0)
   - `current` must be between 1 and `max`
   - Component clamps invalid values automatically

2. **PageSize Modes:**
   - Button mode: Default, shows clickable buttons
   - Select mode: Use `select={true}`, renders as dropdown
   - Button mode shows record count label, select mode doesn't (unless customized)

3. **Record Count Calculation:**
   - PaginationInfo automatically calculates start/end records
   - Formula: `start = (currentPage - 1) * pageSize + 1`
   - Formula: `end = Math.min(currentPage * pageSize, totalRecords)`

4. **Responsive Behavior:**
   - Pager listens to window resize events
   - Custom event `apricot_pagerChange_{pagerId}` triggers recalculation
   - Auto-cleanup on unmount

5. **Delta Calculation:**
   - Total visible buttons ≈ `(delta * 2) + 1 + 2` (current ± delta, first, last)
   - Ellipsis buttons add to count
   - Responsive mode may reduce delta to fit

6. **Disabled States:**
   - Previous button disabled when `current === 1`
   - Next button disabled when `current === max`
   - Disabled pages/sizes show but aren't clickable
   - `disablePager`/`disablePageSize` disables entire component

7. **Callback Behavior:**
   - `onPageChange` called with new page number
   - `onSizeChange` called with new size number
   - Callbacks not triggered for disabled buttons/pages
   - Component doesn't manage state internally (controlled)

8. **Auto-Generated IDs:**
   - Uses React `useId()` hook for unique IDs
   - Format: `apricot_pager_{uid}`, `apricot_pager_btn_{uid}`, `page_size_{uid}`
   - Provide custom IDs if needed for testing or external references

9. **Record Count Labels:**
   - Default: `'Total {maxRecords} records'`
   - Set `recordCountLabel=""` to hide
   - Set `recordCountLabel={undefined}` for default
   - Position controlled by `recordCountLabelPositionLeft`

10. **Integration Pattern:**
    - Reset `currentPage` to 1 when changing `pageSize`
    - Recalculate `max` pages when `totalRecords` or `pageSize` changes
    - Update data display in response to `currentPage` and `pageSize` changes

11. **Select Component:**
    - PageSize in select mode uses the [Select component](input.md#select)
    - Inherits Select's truncation and accessibility features
    - See Select documentation for advanced select-specific props

12. **CSS Classes:**
    - Pager uses `.cb-pagination` and `.cb-btn-square .cb-btn-greyscale`
    - PageSize uses `.cb-page-size`
    - PaginationInfo uses `.cb-pagination-info`
    - Active buttons have `.cb-active` class
