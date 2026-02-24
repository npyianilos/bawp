# ToggleSwitch Component

## Overview
An on/off toggle switch with label, description, and controlled/uncontrolled modes. Renders as a checkbox with `role="switch"`.

**Import:** `import { ToggleSwitch } from "@cb/apricot-react";`

## Props

```typescript
interface IToggleSwitchProps {
    // State
    on?: boolean;                        // Current state (controlled)
    defaultOn?: boolean;                 // Initial state (uncontrolled)
    onChange?: (on: boolean) => void;     // Called with new state
    disabled?: boolean;                  // Default: false

    // Labels
    onLabel?: string | React.ReactElement;   // Default: 'On'
    offLabel?: string | React.ReactElement;  // Default: 'Off'
    labelPosition?: 'left' | 'right';        // Default: 'right'
    ariaLabel?: string;

    // Description
    additionalDesc?: string | React.ReactElement;  // Extra description text
    additionalDescClass?: string;

    // Styling
    condensed?: boolean;                 // Default: false
    mainClassName?: string;

    // IDs
    switchId?: string;
    descId?: string;
    labelId?: string;
}
```

## Basic Usage

### Uncontrolled
```tsx
<ToggleSwitch
    ariaLabel="Enable notifications"
    onLabel="On"
    offLabel="Off"
    onChange={(on) => console.log('Toggled:', on)}
/>
```

### Controlled
```tsx
const [enabled, setEnabled] = useState(false);

<ToggleSwitch
    on={enabled}
    onChange={(on) => setEnabled(on)}
    ariaLabel="Enable notifications"
/>
```

### Default On
```tsx
<ToggleSwitch
    defaultOn
    ariaLabel="Feature enabled"
    onLabel="Enabled"
    offLabel="Disabled"
/>
```

## Common Patterns

### With Additional Description
```tsx
<ToggleSwitch
    additionalDesc="Enable High Contrast"
    additionalDescClass="cb-margin-bottom-8"
    onLabel="On"
    offLabel="Off"
    onChange={(on) => console.log(on)}
/>
```

### Label on Left
```tsx
<ToggleSwitch
    labelPosition="left"
    onLabel="Active"
    offLabel="Inactive"
    ariaLabel="Toggle status"
/>
```

### Condensed Style
```tsx
<ToggleSwitch
    condensed
    ariaLabel="Compact toggle"
    onLabel="On"
    offLabel="Off"
/>
```

### Disabled State
```tsx
<ToggleSwitch
    disabled
    on={false}
    ariaLabel="Unavailable feature"
/>
```

### Custom Labels
```tsx
<ToggleSwitch
    onLabel="Yes"
    offLabel="No"
    ariaLabel="Agree to terms"
    onChange={(on) => setAgreed(on)}
/>
```

### Settings List
```tsx
<div>
    <ToggleSwitch
        additionalDesc="Dark Mode"
        additionalDescClass="cb-margin-bottom-8"
        on={darkMode}
        onChange={setDarkMode}
    />

    <div className="cb-margin-top-24">
        <ToggleSwitch
            additionalDesc="Email Notifications"
            additionalDescClass="cb-margin-bottom-8"
            on={emailNotifs}
            onChange={setEmailNotifs}
        />
    </div>

    <div className="cb-margin-top-24">
        <ToggleSwitch
            additionalDesc="Auto-save"
            additionalDescClass="cb-margin-bottom-8"
            on={autoSave}
            onChange={setAutoSave}
        />
    </div>
</div>
```

## Accessibility

1. **Role:**
   - Renders `<input type="checkbox" role="switch">`
   - `aria-checked` reflects current state

2. **Labels:**
   - Use `ariaLabel` for accessible name
   - `additionalDesc` auto-linked via `aria-labelledby`
   - Label text updates dynamically (on/off)

3. **Focus:**
   - Visual focus ring on keyboard focus
   - `cb-focus` class applied on focus

4. **Disabled:**
   - Input gets `disabled` attribute
   - Visual styling indicates disabled state

## Important Notes

1. **Controlled vs Uncontrolled:**
   - Controlled: Provide `on` (boolean) and `onChange`
   - Uncontrolled: Optionally provide `defaultOn`
   - Don't mix both modes

2. **Label Behavior:**
   - Label text switches between `onLabel`/`offLabel` based on state
   - Defaults: `onLabel="On"`, `offLabel="Off"`
   - Label is clickable (toggles the switch)

3. **onChange Callback:**
   - Receives `boolean` (new state), not the event
   - Called for both controlled and uncontrolled modes

4. **Label Position:**
   - `'right'` (default): Label appears after switch
   - `'left'`: Label appears before switch, applies `cb-width-100`

5. **Additional Description:**
   - Rendered as `<p>` above the switch
   - Linked to switch via `aria-labelledby`
   - Use `additionalDescClass` for spacing (e.g., `cb-margin-bottom-8`)

6. **CSS Classes:**
   - `cb-toggle-switch` - Main wrapper
   - `cb-switch` - Switch element
   - `cb-checked` - On state
   - `cb-focus` - Focused state
   - `cb-disabled` - Disabled state
   - `cb-condensed` - Compact style
   - `cb-label-left` - Left label position
