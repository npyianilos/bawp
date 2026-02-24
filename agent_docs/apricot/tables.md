# Table Components

## Overview
The Table component from `@cb/apricot-react` provides a flexible, accessible data table with support for sorting, pagination, expandable rows, sticky headers/columns, and custom cell renderers.

**Components:**
- `Table` - Main table component
- `Column` - Column definition (JSX children of Table)
- `LoadingWrapper` - Loading overlay with spinner

## Basic Usage

### Simple Table
```tsx
import { Table, Column } from '@cb/apricot-react';

const users = [
  { id: 1, name: 'Alice', age: 30, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 25, email: 'bob@example.com' }
];

<Table data={users}>
  <Column field="id" title="ID" />
  <Column field="name" title="Name" rowHeader />
  <Column field="age" title="Age" />
  <Column field="email" title="Email" />
</Table>
```

### Table with Sorting
```tsx
<Table 
  data={users}
  initialSort={{ field: 'name', ascending: true }}
>
  <Column field="name" title="Name" sortable />
  <Column field="age" title="Age" sortable />
  <Column field="email" title="Email" />
</Table>
```

### Table with Custom Cell Component
```tsx
const EmailCell = ({ value, row }) => (
  <a href={`mailto:${value}`}>{value}</a>
);

<Table data={users}>
  <Column field="name" title="Name" />
  <Column field="email" title="Email" component={EmailCell} />
</Table>
```

## Table Props

**Data:**
- `data` - Array of row objects (required)
- `children` - `<Column>` elements defining columns (required)

**Styling:**
- `condensed` - Compact table style
- `borderless` - Remove all borders
- `borderlessColumn` - Remove column borders only
- `striped` - Alternating row background colors
- `light` - Light color scheme
- `responsive` - Enable horizontal scrolling on small screens
- `noStretch` - Prevent table from filling 100% width
- `className` - Custom CSS class

**Sorting:**
- `sortType` - `'default'` | `'inline'` | `'none'` (default: `'default'`)
  - `'default'` - Sort controls in separate row below headers
  - `'inline'` - Sort controls embedded in header cells
  - `'none'` - No sorting UI
- `initialSort` - `{ field: string, ascending: boolean }` - Initial sort state
- `sortOrder` - Controlled sort state (use with `onSort`)
- `onSort` - `(field, ascending) => Promise<void>` - Sort change handler
- `isExternalSort` - Disable internal sorting (for server-side sorting)
- `sortFn` - Custom sort function: `(data, sortState) => sortedData`
- `threeStateSorting` - Allow cycling back to unsorted state
- `inlineSortTrigger` - `'cell'` | `'icon'` - What triggers inline sort (default: `'cell'`)

**Header:**
- `headless` - Hide header row
- `caption` - Table caption text or element
- `captionAlignment` - `'left'` | `'center'`
- `captionFontWeight` - `'regular'` | `'bold'`
- `captionFontSize` - `'regular'` | `'large'`
- `classNameCaption` - Custom caption class
- `columnTitleSeparator` - Separator for grouped headers (e.g., `'|'`)

**Sticky Features:**
- `stickyHeader` - Sticky header relative to viewport
- `stickyHeaderParent` - Sticky header relative to parent container
- `stickyColumn` - Enable sticky first column(s)
- `maxHeight` - Max height for scroll container (use with `stickyHeaderParent`)
- `minHeight` - Min height for container

**Expandable Rows:**
- `expandableRows` - Enable row expansion
- `expandableRowComponent` - Component to render in expanded row
- `expandableIconClosed` - Icon for collapsed state (default: `'plus-circle'`)
- `expandableIconOpen` - Icon for expanded state (default: `'minus-circle'`)
- `expanderPosition` - `'left'` | `'right'` | `'none'`
- `expanderButtonLabel` - Label function: `(row, expanded) => string`
- `expandableRowExpanded` - Field or function to determine initial expanded state
- `expandableRowDisabled` - Field or function to disable expansion
- `expandOnRowClick` - Expand when clicking anywhere on row
- `onRowExpandToggled` - `(row, newState) => boolean` - Return false to prevent

**Loading:**
- `dataLoader` - Show loading overlay with spinner

**Row Customization:**
- `rowSelected` - `(row) => boolean` - Mark row as selected
- `rowHighlighted` - `(row) => boolean` - Mark row as highlighted
- `rowClassNameFunc` - `(row) => string` - Custom row class
- `rowKeyFunc` - `(row, index) => string` - Custom row key
- `rowAttributes` - Static attributes: `[['data-test', 'value']]`
- `rowAttributesFunc` - Dynamic attributes: `(row, index) => [['data-id', row.id]]`

**Draggable Rows:**
- `draggableRows` - Enable drag-and-drop row reordering
- `onRowReorder` - `(reorderedData) => void` - Called after reorder
- `a11yDragInstruction` - Screen reader instruction for dragging

**Accessibility:**
- `a11yHighlightType` - `'append'` | `'wrap'` | `'none'` - How to announce highlighted cells
- `a11yHighlightText` - Text for highlighted cells (default: `'highlighted cell'`)
- `a11ySelectedText` - Text for selected cells (default: `'selected cell'`)
- `summary` - Table summary attribute
- `tabIndex` - Tab index for table element

**Advanced:**
- `topScroll` - Add horizontal scrollbar at top
- `detachedHeaderComponents` - `'top'` | `'bottom'` | `'none'` - Render headers outside table
- `detachedColumnComponents` - `'top'` | `'bottom'` | `'none'` - Render column components outside
- `forceResize` - Trigger width recalculation (change value to trigger)
- `forceColumnsUpdate` - Force column update (change value to trigger)
- `tableAttributesFunc` - `() => [['attr', 'value']]` - Custom table attributes
- `overflowX` - Control horizontal overflow (default: `true` with sticky)
- `positionRelative` - Apply relative positioning (default: `true` with sticky)

## Column Props

**Basic:**
- `field` - Data field key (required)
- `title` - Column header text
- `sortable` - Enable sorting for this column

**Cell Rendering:**
- `component` - Custom cell renderer: `({ value, row, field, rowIndex }) => JSX`
- `headerComponent` - Custom header renderer: `({ field, title, rowIndex, stickyMode }) => JSX`
- `onValueFormat` - Format display value: `(value, row, rowIndex) => string`

**Styling:**
- `className` - Static class for all cells
- `classNameFunc` - Dynamic class: `(value, row, rowIndex) => string`
- `rowHeader` - Render as `<th scope="row">` for accessibility

**Attributes:**
- `attributes` - Static attributes: `[['data-test', 'value']]`
- `attributesFunc` - Dynamic attributes: `(value, row, rowIndex) => [['data-id', row.id]]`

**Advanced:**
- `groupValues` - Hide repeated consecutive values
- `sticky` - Make this column sticky during horizontal scroll
- `selected` - `(row) => boolean` - Mark cell as selected
- `highlight` - `(row) => boolean` - Mark cell as highlighted
- `onColSpan` - `(row, rowIndex) => number` - Dynamic colspan
- `headerId` - Custom ID for header cell
- `cellId` - `(row, rowIndex) => string` - Custom ID for body cells
- `cellHeaders` - `(row, rowIndex) => string` - Custom headers attribute
- `headHeaders` - `(rowIndex) => string` - Custom headers for header cell
- `withColScope` - Add `scope="col"` to header (default: `true`)
- `scopeFunc` - `(value, row, rowIndex) => string` - Custom scope attribute

**Detached Components:**
- `detachedColumnComponent` - Component rendered in detached area
- `detachedHeaderComponent` - Header component rendered in detached area

## Loading State

### Using dataLoader Prop
```tsx
const [loading, setLoading] = useState(true);
const [data, setData] = useState([]);

useEffect(() => {
  fetchData().then(result => {
    setData(result);
    setLoading(false);
  });
}, []);

<Table data={data} dataLoader={loading}>
  <Column field="name" title="Name" />
  <Column field="email" title="Email" />
</Table>
```

### Using LoadingWrapper
```tsx
import { LoadingWrapper } from '@cb/apricot-react';

<LoadingWrapper 
  loading={isLoading}
  ariaLabel="Loading table data"
  maxHeight={400}
>
  <Table data={data}>
    <Column field="name" title="Name" />
  </Table>
</LoadingWrapper>
```

### LoadingWrapper Props
- `loading` - Show loading overlay (required)
- `ariaLabel` - Accessible label for spinner
- `light` - Light spinner variant
- `overlayBackground` - Overlay color (default: `'rgba(255, 255, 255, 0.3)'`)
- `spinnerClassName` - Custom spinner class
- `wrapperClassName` - Custom wrapper class
- `overflowX` - Hide horizontal overflow (default: `true`)
- `positionRelative` - Relative positioning (default: `true`)
- `maxHeight` - Max height in pixels
- `minHeight` - Min height in pixels

See [spinner.md](spinner.md) for Spinner component details.

## Pagination Integration

### Basic Pagination
```tsx
import { Pager } from '@cb/apricot-react';

const [currentPage, setCurrentPage] = useState(1);
const pageSize = 10;
const totalRecords = 84;
const totalPages = Math.ceil(totalRecords / pageSize);

// Slice data for current page
const pageData = allData.slice(
  (currentPage - 1) * pageSize, 
  currentPage * pageSize
);

<>
  <Table data={pageData} sortType="none">
    <Column field="name" title="Name" />
    <Column field="email" title="Email" />
  </Table>
  
  <Pager 
    current={currentPage}
    max={totalPages}
    delta={2}
    responsive
    onPageChange={setCurrentPage}
  />
</>
```

### Pagination with Page Size Selector
```tsx
import { Pager, PageSize, PaginationInfo } from '@cb/apricot-react';

const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(20);

const totalPages = Math.ceil(totalRecords / pageSize);
const pageData = allData.slice(
  (currentPage - 1) * pageSize, 
  currentPage * pageSize
);

// Reset to page 1 when page size changes
const handlePageSizeChange = (newSize) => {
  setPageSize(newSize);
  setCurrentPage(1);
};

<>
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
      onSizeChange={handlePageSizeChange}
    />
  </div>
  
  <Table data={pageData}>
    <Column field="name" title="Name" />
  </Table>
  
  <Pager 
    current={currentPage}
    max={totalPages}
    onPageChange={setCurrentPage}
  />
</>
```

See [pagination.md](pagination.md) for complete Pagination documentation.

## Sorting

### Client-Side Sorting
Default behavior - table handles sorting internally:

```tsx
<Table 
  data={allData}
  initialSort={{ field: 'name', ascending: true }}
>
  <Column field="name" title="Name" sortable />
  <Column field="age" title="Age" sortable />
  <Column field="email" title="Email" />
</Table>
```

### Server-Side Sorting
```tsx
const [sortState, setSortState] = useState({ field: 'name', ascending: true });
const [data, setData] = useState([]);

const handleSort = async (field, ascending) => {
  const result = await fetchSortedData(field, ascending);
  setData(result);
  setSortState({ field, ascending });
};

<Table 
  data={data}
  sortOrder={sortState}
  onSort={handleSort}
  isExternalSort
>
  <Column field="name" title="Name" sortable />
  <Column field="age" title="Age" sortable />
</Table>
```

### Custom Sort Function
```tsx
const customSort = (data, sortState) => {
  if (!sortState.field) return data;
  
  return [...data].sort((a, b) => {
    const aVal = a[sortState.field];
    const bVal = b[sortState.field];
    
    // Custom sorting logic
    if (sortState.field === 'name') {
      return sortState.ascending 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    return sortState.ascending ? aVal - bVal : bVal - aVal;
  });
};

<Table data={data} sortFn={customSort}>
  <Column field="name" title="Name" sortable />
  <Column field="age" title="Age" sortable />
</Table>
```

### Inline Sort Style
```tsx
// Sort controls embedded in headers
<Table data={data} sortType="inline">
  <Column field="name" title="Name" sortable />
  <Column field="age" title="Age" sortable />
</Table>
```

### Pagination + Sorting (Full Dataset)
Sort the entire dataset, then paginate:

```tsx
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(20);
const [sortedData, setSortedData] = useState(allData);

const handleSort = async (field, ascending) => {
  // Sort entire dataset
  const sorted = orderBy(allData, [field], [ascending ? 'asc' : 'desc']);
  setSortedData(sorted);
  setCurrentPage(1); // Reset to first page
};

const pageData = sortedData.slice(
  (currentPage - 1) * pageSize,
  currentPage * pageSize
);

<>
  <Table 
    data={pageData}
    onSort={handleSort}
    isExternalSort
  >
    <Column field="name" title="Name" sortable />
    <Column field="age" title="Age" sortable />
  </Table>
  
  <Pager 
    current={currentPage}
    max={Math.ceil(sortedData.length / pageSize)}
    onPageChange={setCurrentPage}
  />
</>
```

## Common Patterns

### Expandable Rows
```tsx
const DetailsRow = ({ row }) => (
  <div className="cb-padding-24">
    <p><strong>Email:</strong> {row.email}</p>
    <p><strong>Phone:</strong> {row.phone}</p>
  </div>
);

<Table 
  data={users}
  expandableRows
  expandableRowComponent={DetailsRow}
  expanderPosition="right"
  expanderButtonLabel={(row, expanded) => 
    `${expanded ? 'Collapse' : 'Expand'} details for ${row.name}`
  }
>
  <Column field="name" title="Name" />
  <Column field="age" title="Age" />
</Table>
```

### Sticky Header with Scroll Container
```tsx
<div style={{ maxHeight: '400px', overflow: 'auto' }}>
  <Table 
    data={longDataList}
    stickyHeaderParent
    maxHeight={400}
  >
    <Column field="name" title="Name" />
    <Column field="email" title="Email" />
  </Table>
</div>
```

### Highlighted/Selected Rows
```tsx
<Table 
  data={users}
  rowSelected={(row) => selectedIds.includes(row.id)}
  rowHighlighted={(row) => row.age > 65}
  a11yHighlightType="append"
>
  <Column field="name" title="Name" />
  <Column field="age" title="Age" />
</Table>
```

### Conditional Columns
```tsx
<Table data={users}>
  <Column field="name" title="Name" />
  {showEmail && <Column field="email" title="Email" />}
  {isAdmin && <Column field="role" title="Role" />}
</Table>
```

### Responsive with Horizontal Scroll
```tsx
<Table data={users} responsive>
  <Column field="id" title="ID" />
  <Column field="firstName" title="First Name" />
  <Column field="lastName" title="Last Name" />
  <Column field="email" title="Email" />
  <Column field="phone" title="Phone" />
  <Column field="address" title="Address" />
</Table>
```

### Custom Row Classes
```tsx
<Table 
  data={orders}
  rowClassNameFunc={(row) => 
    row.status === 'pending' ? 'cb-yellow-bg' : ''
  }
>
  <Column field="orderId" title="Order ID" />
  <Column field="status" title="Status" />
</Table>
```

### Draggable Rows
```tsx
const [data, setData] = useState(initialData);

<Table 
  data={data}
  draggableRows
  onRowReorder={setData}
>
  <Column field="position" title="Position" />
  <Column field="name" title="Name" />
</Table>
```

## Accessibility

**Built-in Features:**
- Proper table semantics (`<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`)
- Row headers with `scope="row"` (use `rowHeader` prop on Column)
- Column headers with `scope="col"` by default
- Sort controls announce state (ascending/descending)
- ARIA attributes for expandable rows (`aria-expanded`, `aria-controls`)
- Selected/highlighted cells announced to screen readers

**Best Practices:**
- Use `rowHeader` on the first meaningful column (usually name/title)
- Provide descriptive `caption` for table purpose
- Use `expanderButtonLabel` to describe expand/collapse actions
- Set appropriate `a11yHighlightType` for selected/highlighted rows
- Ensure custom cell components maintain accessibility
- Use `summary` attribute for complex tables

## Important Notes

1. **Sorting Modes:**
   - **Client-side:** Table manages sorting internally (default)
   - **Server-side:** Use `isExternalSort` with `onSort` and `sortOrder`
   - Set `sortType="none"` to disable sorting UI entirely

2. **Pagination Integration:**
   - Table doesn't include built-in pagination
   - Use separate Pager/PageSize components
   - Slice data before passing to Table
   - Reset to page 1 when changing page size or sort order

3. **Loading States:**
   - Use `dataLoader` prop for simple loading overlay
   - Use `LoadingWrapper` for more control over spinner/overlay
   - Both use the [Spinner component](spinner.md) internally

4. **Performance:**
   - Large datasets: Use pagination to limit rows rendered
   - Avoid complex custom components for every cell
   - Use `forceColumnsUpdate` sparingly (triggers full re-render)
   - Consider virtualization for 1000+ rows

5. **Conditional Columns:**
   - Supports JSX conditionals: `{condition && <Column ... />}`
   - Supports arrays: `{columns.map(col => <Column key={col.field} ... />)}`
   - Falsy values (`false`, `null`, `undefined`) are filtered out

6. **Sticky Features:**
   - `stickyHeader`: Sticky relative to viewport
   - `stickyHeaderParent`: Sticky relative to scrollable parent container
   - Cannot use both sticky header modes simultaneously
   - Use `maxHeight` with `stickyHeaderParent` for scroll containers

7. **Custom Components:**
   - `component` prop receives: `{ value, row, field, rowIndex }`
   - `headerComponent` receives: `{ field, title, rowIndex, stickyMode }`
   - Components should be memoized for performance

8. **Row Selection:**
   - Table doesn't manage selection state
   - Use `rowSelected` predicate with external state
   - Combine with custom components for checkboxes/actions

9. **Expandable Rows:**
   - Expanded content rendered in full-width row below parent
   - Use `expandableRowComponent` to define content
   - Control initial state with `expandableRowExpanded`
   - Disable expansion with `expandableRowDisabled`

10. **Sort + Pagination:**
    - **Client-side:** Table sorts visible page only (unless using `isExternalSort` + custom logic)
    - **Best practice:** Sort full dataset, then paginate (see example above)
    - **Server-side:** Handle both sort and pagination in API

11. **Auto-Generated IDs:**
    - Table generates unique IDs using `useId()` hook
    - Format: `apricot_table_{uid}`
    - Provide `tableId` for stable IDs across renders

12. **CSS Classes:**
    - Base: `.cb-table`
    - Variants: `.cb-table-condensed`, `.cb-table-striped`, `.cb-table-borderless`
    - Responsive: `.cb-table-responsive` wrapper
