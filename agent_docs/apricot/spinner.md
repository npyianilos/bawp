# Spinner Component

## Overview
The Spinner component from `@cb/apricot-react` provides loading indicators with support for static spinners, animated progress counters, and progress rings.

**Types:**
- Static spinner (default) - Simple spinning indicator
- Animated spinner - Counter that animates from min to max
- Progress spinner - Circular progress ring showing percentage

## Basic Usage

### Static Spinner
```tsx
import { Spinner } from '@cb/apricot-react';

<Spinner 
  show={true}
  size="32"
  ariaLabel="Loading content"
/>
```

### Spinner with Text
```tsx
<Spinner 
  size="64"
  text="34%"
  ariaLabel="34% has been loaded"
/>
```

### Animated Progress Counter
```tsx
<Spinner 
  animated
  min={0}
  max={100}
  end={100}
  duration={20000}
  suffix="%"
/>
```

### Progress Ring
```tsx
<Spinner 
  progress
  end={75}
  duration={800}
  suffix="%"
/>
```

## Key Props

**Display:**
- `show` - Show/hide spinner with CSS transition (default: `true`)
- `size` - Size in pixels: `'16'` | `'24'` | `'32'` | `'64'`
- `text` - Static text label to display with spinner
- `spinnerId` - Custom ID for spinner element (auto-generated if not provided)

**Styling:**
- `light` - Use light variant on dark backgrounds (default: `false`)
- `palette` - Color palette: `'blue5'` | `'blue2'` | `'purple1'`
- `className` - Custom class for spinner wrapper
- `classNameSpinnerIndicator` - Custom class for the text indicator

**Animated Mode:**
- `animated` - Enable animated counter (default: `false`)
- `min` - Minimum value for animation (default: 0)
- `max` - Maximum value for animation (default: 100)
- `end` - Target end value
- `duration` - Animation duration in milliseconds
- `suffix` - Text suffix (e.g., `'%'`, `'MB'`)

**Progress Mode:**
- `progress` - Enable circular progress ring (default: `false`)
- `end` - Progress percentage (0-100)
- `duration` - Animation duration in milliseconds
- `suffix` - Text suffix for progress value

**Transition:**
- `timeout` - CSS transition timeout in milliseconds (default: `500`)
- `transitionClassName` - CSS transition class name (default: `'cb-css-transition'`)

**Accessibility:**
- `ariaLabel` - Accessible label (default: `'Loading ...'`)
- `removeMainRole` - Remove role and aria-labelledby from wrapper (default: `false`)
- `testId` - Test ID (renders as `data-testid`)

## Common Patterns

### Full-Page Loading Spinner
Center spinner on full viewport:

```tsx
<div className="display-flex justify-content-center align-items-center cb-height-100-vh">
  <Spinner size="64" ariaLabel="Loading page content" />
</div>
```

### Light Spinner on Dark Background
```tsx
<div className="cb-gray1-bg display-flex justify-content-center align-items-center cb-height-100-vh">
  <Spinner light size="32" />
</div>
```

### Loading Percentage Display
```tsx
const [loadingProgress, setLoadingProgress] = useState(0);

<Spinner 
  size="64"
  text={`${loadingProgress}%`}
  ariaLabel={`${loadingProgress}% loaded`}
/>
```

### Animated Upload Progress
```tsx
<Spinner 
  animated
  min={0}
  max={100}
  end={uploadProgress}
  duration={2000}
  suffix="%"
  size="64"
/>
```

### File Size Progress
```tsx
<Spinner 
  animated
  min={0}
  max={500}
  end={downloadedMB}
  duration={5000}
  suffix="MB"
  text=""
/>
```

### Progress Ring with Custom Colors
```tsx
<Spinner 
  progress
  end={66}
  palette="blue5"
  suffix="%"
/>
```

### Conditional Display with Transition
```tsx
const [isLoading, setIsLoading] = useState(true);

<Spinner 
  show={isLoading}
  timeout={300}
  size="32"
/>
```

### Custom Sized Spinner
```tsx
// Small inline spinner
<Spinner size="16" ariaLabel="Loading" />

// Large spinner
<Spinner size="64" ariaLabel="Loading" />
```

### Removing ARIA Roles
For custom accessibility implementations:

```tsx
<Spinner 
  removeMainRole
  size="64"
  text="Loading..."
/>
```

## Spinner Modes

### Static Spinner
- Default mode
- Shows spinning indicator with 12 segments
- Optionally displays static text
- Role: `'status'` or `'img'` (if text provided)

### Animated Spinner
- Set `animated={true}`
- Animates counter from `min` to `end` value
- Requires `min`, `max`, `end`, `duration` props
- Role: `'progressbar'`
- Uses CBSpinner.Animated plugin

### Progress Spinner
- Set `progress={true}`
- Circular progress ring
- Shows percentage from 0 to `end`
- Requires `end` prop
- Role: `'img'`
- Uses CBSpinner.Progress plugin

## Accessibility

**Built-in Features:**
- Proper ARIA roles based on spinner type
- `aria-label` for screen reader announcements
- High contrast mode support (`.ms-high-contrast` "Loading" text)
- Keyboard navigation friendly (non-interactive)

**Role Assignments:**
- Static spinner: `role="status"` or `role="img"` (with text)
- Animated spinner: `role="progressbar"`
- Progress spinner: `role="img"`

**Best Practices:**
- Provide descriptive `ariaLabel` (e.g., "Loading user profile" instead of "Loading")
- Use `text` prop to show progress percentage for progress indicators
- Update `ariaLabel` dynamically to announce progress (e.g., "45% complete")
- For inline spinners, ensure surrounding content provides context
- Use `removeMainRole={true}` only when implementing custom ARIA structure

**Screen Reader Announcements:**
- Static: "Loading ... status" or custom ariaLabel
- Animated: Announces as progressbar with current value
- Progress: Announces percentage complete

## Important Notes

1. **Modes are Mutually Exclusive:**
   - Cannot use `animated` and `progress` together
   - Default is static spinner when neither is set

2. **Plugin Lifecycle:**
   - Animated and Progress modes use CBSpinner plugins
   - Plugins are automatically destroyed on unmount or mode change
   - No manual cleanup required

3. **CSS Transitions:**
   - Spinner uses `CSSTransition` from react-transition-group
   - Controlled by `show` prop with smooth fade in/out
   - Transition duration set with `timeout` prop
   - Custom transitions via `transitionClassName`

4. **Size Reference:**
   - `'16'` - 16px (small, inline use)
   - `'24'` - 24px (small)
   - `'32'` - 32px (default, medium)
   - `'64'` - 64px (large, full-page loading)

5. **Light vs Dark:**
   - Default spinner is dark (for light backgrounds)
   - Use `light={true}` on dark backgrounds
   - Progress mode automatically disables `light` prop

6. **Animated Props:**
   - `min` - Starting value (default: 0)
   - `max` - Maximum possible value (default: 100)
   - `end` - Target value to animate to
   - `duration` - Time to complete animation in ms
   - Animation runs once from min to end

7. **Progress Props:**
   - `end` - Percentage to display (0-100)
   - `duration` - Animation duration
   - Shows circular progress ring
   - Text displays inside ring

8. **Suffix:**
   - Appended to displayed number (e.g., `'%'`, `'MB'`, `' items'`)
   - Works with both `animated` and `progress` modes
   - Also appends to static `text` if provided

9. **Color Palettes:**
   - `'blue5'` - Default blue
   - `'blue2'` - Lighter blue
   - `'purple1'` - Purple variant

10. **Centering Pattern:**
    ```tsx
    // Common pattern for full-page spinner
    <div className="display-flex justify-content-center align-items-center cb-height-100-vh">
      <Spinner />
    </div>
    ```
    See [grid.md](grid.md) for more layout utilities.

11. **Test ID:**
    - Use `testId` prop for testing
    - Renders as `data-testid` attribute on wrapper

12. **Auto-Generated ID:**
    - If `spinnerId` not provided, generates unique ID with `useId()`
    - ID used for `aria-labelledby` on static spinners
