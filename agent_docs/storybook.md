# Storybook Guidelines

## Children must use `render`, not `args`

React elements passed as `children` via `args` are serialized by Storybook for the controls panel, which strips them. Always pass `children` through a `render` function instead.

**❌ Wrong** — children in `args` won't render:
```tsx
export const Default: Story = {
  args: {
    name: 'demo',
    children: (
      <>
        <RadioButton value="a" label="A" />
        <RadioButton value="b" label="B" />
      </>
    ),
  },
};
```

**✅ Correct** — keep serializable props in `args`, put JSX in `render`:
```tsx
export const Default: Story = {
  args: { name: 'demo' },
  render: (args) => (
    <MyComponent {...args}>
      <RadioButton value="a" label="A" />
      <RadioButton value="b" label="B" />
    </MyComponent>
  ),
};
```

This applies to any prop whose value is a React element (JSX), not just `children`.
