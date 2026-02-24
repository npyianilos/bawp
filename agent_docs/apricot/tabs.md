# Tabs Components

## Overview
Tab components provide accessible navigation between different content panels. Includes controlled and uncontrolled modes with keyboard navigation, icons, and carousel support.

**Import:** `import { Tabs, TabList, Tab, TabPanelList, TabPanel } from "@cb/apricot-react";`

## Components

### Tabs
Main container that manages tab state and keyboard navigation.

**Props:**
```typescript
interface ITabsProps {
    id?: string;
    className?: string;
    renderTabPanel?: boolean;        // Render all panels (default: only active)
    defaultTab?: number;             // Initial tab index (uncontrolled, zero-based)
    selectedTab?: number;            // Current tab index (controlled, zero-based)
    onSelected?: (index: number, lastIndex: number, event: React.MouseEvent) => void;
    onSelectTab?: (index: number, event: React.MouseEvent) => boolean;  // Intercept selection
    children?: React.ReactNode;
}
```

### TabList
Container for tab buttons with optional carousel.

**Props:**
```typescript
interface ITabListProps {
    className?: string;
    condensed?: boolean;             // Use condensed style
    hasIcon?: boolean;               // Tabs display icons
    iconOnly?: boolean;              // Show only icons (condensed only)
    hasFloatRight?: boolean;         // Tabs include right-floated items
    hasCarousel?: boolean;           // Wrap in horizontal carousel
    carouselId?: string;             // Carousel ID
    ariaLabelCarousel?: string;      // Carousel accessible label
    children?: React.ReactNode;
}
```

### Tab
Individual tab button.

**Props:**
```typescript
interface ITabProps {
    id?: string;
    controlsID?: string;             // Panel ID this tab controls
    selected?: boolean;              // Tab is selected (managed by Tabs)
    focus?: boolean;                 // Tab has focus (managed by Tabs)
    disabled?: boolean;              // Tab is disabled
    floatRight?: boolean;            // Float tab to right
    className?: string;
    anchorClassName?: string;        // Class for anchor element
    children?: React.ReactNode;
}
```

### TabPanelList
Container for tab panels.

**Props:**
```typescript
interface TabPanelListProps {
    className?: string;
    children?: React.ReactNode;
}
```

### TabPanel
Individual content panel.

**Props:**
```typescript
interface ITabPanelProps {
    id?: string;
    labelledbyID?: string;           // Tab ID that controls this panel
    selected?: boolean;              // Panel is visible (managed by Tabs)
    forceRender?: boolean;           // Render even when not active
    className?: string;
    children?: React.ReactNode;
}
```

## Basic Usage

### Uncontrolled Tabs
```tsx
<Tabs id="basic-tabs" defaultTab={0}>
    <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
    </TabList>
    
    <TabPanelList>
        <TabPanel>
            <p>Content for Tab 1</p>
        </TabPanel>
        <TabPanel>
            <p>Content for Tab 2</p>
        </TabPanel>
        <TabPanel>
            <p>Content for Tab 3</p>
        </TabPanel>
    </TabPanelList>
</Tabs>
```

### Controlled Tabs
```tsx
const [selectedTab, setSelectedTab] = useState(0);

<Tabs 
    id="controlled-tabs"
    selectedTab={selectedTab}
    onSelected={(index) => setSelectedTab(index)}
>
    <TabList>
        <Tab>Dashboard</Tab>
        <Tab>Settings</Tab>
        <Tab>Profile</Tab>
    </TabList>
    
    <TabPanelList>
        <TabPanel><Dashboard /></TabPanel>
        <TabPanel><Settings /></TabPanel>
        <TabPanel><Profile /></TabPanel>
    </TabPanelList>
</Tabs>
```

### Condensed Style
```tsx
<Tabs id="condensed-tabs">
    <TabList condensed>
        <Tab>Overview</Tab>
        <Tab>Details</Tab>
        <Tab>History</Tab>
    </TabList>
    
    <TabPanelList>
        <TabPanel><p>Overview content</p></TabPanel>
        <TabPanel><p>Details content</p></TabPanel>
        <TabPanel><p>History content</p></TabPanel>
    </TabPanelList>
</Tabs>
```

## Common Patterns

### Tabs with Icons
```tsx
<Tabs id="icon-tabs">
    <TabList hasIcon>
        <Tab>
            <Icon name="home" decorative />
            <span>Home</span>
        </Tab>
        <Tab>
            <Icon name="settings" decorative />
            <span>Settings</span>
        </Tab>
        <Tab>
            <Icon name="user" decorative />
            <span>Profile</span>
        </Tab>
    </TabList>
    
    <TabPanelList>
        <TabPanel><p>Home content</p></TabPanel>
        <TabPanel><p>Settings content</p></TabPanel>
        <TabPanel><p>Profile content</p></TabPanel>
    </TabPanelList>
</Tabs>
```

### Icon-Only Tabs (Condensed)
```tsx
<Tabs id="icon-only-tabs">
    <TabList condensed hasIcon iconOnly>
        <Tab aria-label="Home">
            <Icon name="home" />
        </Tab>
        <Tab aria-label="Settings">
            <Icon name="settings" />
        </Tab>
        <Tab aria-label="Profile">
            <Icon name="user" />
        </Tab>
    </TabList>
    
    <TabPanelList>
        <TabPanel><p>Home</p></TabPanel>
        <TabPanel><p>Settings</p></TabPanel>
        <TabPanel><p>Profile</p></TabPanel>
    </TabPanelList>
</Tabs>
```

### Disabled Tab
```tsx
<Tabs id="disabled-tabs">
    <TabList>
        <Tab>Active Tab</Tab>
        <Tab disabled>Disabled Tab</Tab>
        <Tab>Another Active Tab</Tab>
    </TabList>
    
    <TabPanelList>
        <TabPanel><p>Active content</p></TabPanel>
        <TabPanel><p>Disabled content</p></TabPanel>
        <TabPanel><p>More content</p></TabPanel>
    </TabPanelList>
</Tabs>
```

### Right-Floated Tabs
```tsx
<Tabs id="float-tabs">
    <TabList hasFloatRight>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab floatRight>Settings</Tab>
    </TabList>
    
    <TabPanelList>
        <TabPanel><p>Content 1</p></TabPanel>
        <TabPanel><p>Content 2</p></TabPanel>
        <TabPanel><p>Settings content</p></TabPanel>
    </TabPanelList>
</Tabs>
```

### Tabs with Carousel
```tsx
<Tabs id="carousel-tabs">
    <TabList 
        hasCarousel 
        carouselId="tab-carousel"
        ariaLabelCarousel="Tab navigation"
    >
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
        <Tab>Tab 4</Tab>
        <Tab>Tab 5</Tab>
        <Tab>Tab 6</Tab>
        <Tab>Tab 7</Tab>
    </TabList>
    
    <TabPanelList>
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <TabPanel key={i}><p>Content {i}</p></TabPanel>
        ))}
    </TabPanelList>
</Tabs>
```

### Intercepting Tab Selection
```tsx
const handleSelectTab = (index: number, event: React.MouseEvent) => {
    // Return false to prevent tab change
    if (hasUnsavedChanges && index !== currentTab) {
        const confirmed = confirm('You have unsaved changes. Continue?');
        return confirmed;  // Only change if user confirms
    }
    return true;  // Allow tab change
};

<Tabs 
    id="intercept-tabs"
    selectedTab={currentTab}
    onSelectTab={handleSelectTab}
    onSelected={(index) => setCurrentTab(index)}
>
    <TabList>
        <Tab>Edit</Tab>
        <Tab>Preview</Tab>
    </TabList>
    
    <TabPanelList>
        <TabPanel><EditForm /></TabPanel>
        <TabPanel><Preview /></TabPanel>
    </TabPanelList>
</Tabs>
```

### Force Render All Panels
```tsx
// Useful for forms or state that should persist when switching tabs
<Tabs id="render-all" renderTabPanel>
    <TabList>
        <Tab>Step 1</Tab>
        <Tab>Step 2</Tab>
        <Tab>Step 3</Tab>
    </TabList>
    
    <TabPanelList>
        <TabPanel><FormStep1 /></TabPanel>
        <TabPanel><FormStep2 /></TabPanel>
        <TabPanel><FormStep3 /></TabPanel>
    </TabPanelList>
</Tabs>

// Or per panel
<TabPanelList>
    <TabPanel forceRender><FormStep1 /></TabPanel>
    <TabPanel><FormStep2 /></TabPanel>
    <TabPanel><FormStep3 /></TabPanel>
</TabPanelList>
```

### Dynamic Tabs
```tsx
const tabs = ['Overview', 'Details', 'History'];
const [selectedTab, setSelectedTab] = useState(0);

<Tabs 
    id="dynamic-tabs"
    selectedTab={selectedTab}
    onSelected={(index) => setSelectedTab(index)}
>
    <TabList>
        {tabs.map((label, index) => (
            <Tab key={index}>{label}</Tab>
        ))}
    </TabList>
    
    <TabPanelList>
        {tabs.map((label, index) => (
            <TabPanel key={index}>
                <h2>{label}</h2>
                <p>Content for {label}</p>
            </TabPanel>
        ))}
    </TabPanelList>
</Tabs>
```

### Tabs with Dropdown Menu
```tsx
<Tabs id="dropdown-tabs">
    <TabList hasFloatRight>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab floatRight>
            <Dropdown 
                label="More" 
                iconRight="chevron-down"
                variant="link"
            >
                <DropdownItem href="/export">Export</DropdownItem>
                <DropdownItem href="/share">Share</DropdownItem>
            </Dropdown>
        </Tab>
    </TabList>
    
    <TabPanelList>
        <TabPanel><p>Content 1</p></TabPanel>
        <TabPanel><p>Content 2</p></TabPanel>
        <TabPanel><p>Menu content</p></TabPanel>
    </TabPanelList>
</Tabs>
```

## Keyboard Navigation

Tabs component provides built-in keyboard support:

- **Arrow Left/Right:** Navigate between tabs
- **Home:** Focus first tab
- **End:** Focus last tab
- **Tab:** Move focus to active panel
- **Enter/Space:** Activate focused tab

Disabled tabs are automatically skipped during keyboard navigation.

## Accessibility

1. **ARIA Roles:**
   - TabList has `role="tablist"`
   - Tab has `role="tab"`
   - TabPanel has `role="tabpanel"`

2. **ARIA States:**
   - `aria-selected` on tabs (true/false)
   - `aria-disabled` on disabled tabs
   - `aria-controls` links tab to panel
   - `aria-labelledby` links panel to tab

3. **Tab Index:**
   - Selected tab: `tabIndex={0}`
   - Unselected tabs: `tabIndex={-1}`
   - Selected panel: `tabIndex={0}`
   - Hidden panels: `tabIndex={-1}`

4. **Icon-Only Tabs:**
   - Provide `aria-label` on each Tab
   - Icons should be decorative

5. **IDs:**
   - Tabs auto-generate IDs if not provided
   - Use explicit IDs for testing or external control

6. **Focus Management:**
   - Focus moves to newly selected tab on click
   - Focus restored when using keyboard navigation
   - Panel receives focus when Tab key pressed

## Important Notes

1. **Tab Indices:**
   - Zero-based (0, 1, 2, ...)
   - `defaultTab` for uncontrolled mode
   - `selectedTab` for controlled mode

2. **Controlled vs Uncontrolled:**
   - Controlled: Provide `selectedTab` and `onSelected`
   - Uncontrolled: Provide only `defaultTab` (optional)
   - Don't mix modes

3. **Rendering Behavior:**
   - Default: Only active panel rendered
   - `renderTabPanel={true}`: All panels rendered, visibility toggled
   - `forceRender` per panel: Individual panel always rendered

4. **Disabled Tabs:**
   - Cannot be selected via click or keyboard
   - Keyboard navigation skips disabled tabs
   - Visual styling indicates disabled state

5. **Float Right:**
   - Set `hasFloatRight` on TabList
   - Set `floatRight` on Tab (and subsequent tabs)
   - Useful for utility tabs (settings, menu)

6. **Carousel:**
   - Wraps TabList in HorizontalCarousel
   - Provides scroll arrows for overflow
   - Requires `hasCarousel` and optional `carouselId`

7. **Condensed Style:**
   - Smaller, more compact tabs
   - Required for `iconOnly` mode
   - Use for secondary navigation

8. **onSelectTab Callback:**
   - Return `false` to prevent tab change
   - Return `true` to allow tab change
   - Useful for validation or confirmations

9. **Custom IDs:**
   - Provide `id` on Tabs, Tab, and TabPanel
   - Auto-generated if not provided
   - IDs must be unique on page

10. **CSS Classes:**
    - TabList: `cb-tabs-menu`, `cb-condensed`
    - Tab: `cb-menu-link`, `cb-selected`, `cb-disabled`
    - TabPanel: `cb-tabs-content`, `cb-selected`
    - See Apricot CSS for styling customization

11. **Performance:**
    - Default rendering (active panel only) is more performant
    - Use `forceRender` only when needed (forms, media players)
    - Large numbers of tabs: consider carousel

12. **Tab Content:**
    - Can contain text, icons, or both
    - Avoid complex interactive elements inside tabs
    - Use buttons or links for actions
