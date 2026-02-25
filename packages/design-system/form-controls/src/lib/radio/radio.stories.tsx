import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormProvider, useForm } from 'react-hook-form';
import { PrimaryButton, RadioButton } from '@cb/apricot-react';
import { RadioButtonGroup } from './radio';

function RadioDemo() {
  const methods = useForm({
    defaultValues: {
      gender: '',
      size: '',
      plan: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          console.log('Submitted:', data);
        })}
        style={{ maxWidth: '480px', padding: '24px' }}
      >
        <RadioButtonGroup
          name="gender"
          required
          helperClassName="cb-margin-bottom-16"
        >
          <RadioButton value="female" label="Female" />
          <RadioButton value="male" label="Male" />
          <RadioButton value="other" label="Other" />
        </RadioButtonGroup>

        <RadioButtonGroup
          name="size"
          legend="T-Shirt Size"
          vertical
          helperClassName="cb-margin-bottom-16"
        >
          <RadioButton value="sm" label="Small" />
          <RadioButton value="md" label="Medium" />
          <RadioButton value="lg" label="Large" />
          <RadioButton value="xl" label="Extra Large" />
        </RadioButtonGroup>

        <RadioButtonGroup
          name="plan"
          legend="Subscription Plan"
          required
          vertical
          helperClassName="cb-margin-bottom-16"
        >
          <RadioButton value="basic" label="Basic - $9/month" />
          <RadioButton value="pro" label="Pro - $29/month" />
          <RadioButton value="enterprise" label="Enterprise - Custom pricing" />
        </RadioButtonGroup>

        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </FormProvider>
  );
}

const meta: Meta<typeof RadioButtonGroup> = {
  component: RadioButtonGroup,
  title: 'RadioButtonGroup',
  decorators: [
    (Story) => {
      const methods = useForm({ defaultValues: { demo: '' } });
      return (
        <FormProvider {...methods}>
          <div style={{ maxWidth: '480px', padding: '24px' }}>
            <Story />
          </div>
        </FormProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

export const Default: Story = {
  args: { name: 'demo' },
  render: (args) => (
    <RadioButtonGroup {...args}>
      <RadioButton value="option1" label="Option 1" />
      <RadioButton value="option2" label="Option 2" />
      <RadioButton value="option3" label="Option 3" />
    </RadioButtonGroup>
  ),
};

export const Required: Story = {
  args: { name: 'demo', required: true },
  render: (args) => (
    <RadioButtonGroup {...args}>
      <RadioButton value="yes" label="Yes" />
      <RadioButton value="no" label="No" />
    </RadioButtonGroup>
  ),
};

export const Vertical: Story = {
  args: { name: 'demo', legend: 'Choose an option', vertical: true },
  render: (args) => (
    <RadioButtonGroup {...args}>
      <RadioButton value="option1" label="Option 1" />
      <RadioButton value="option2" label="Option 2" />
      <RadioButton value="option3" label="Option 3" />
    </RadioButtonGroup>
  ),
};

export const WithCustomLegend: Story = {
  args: {
    name: 'demo',
    legend: 'What is your preferred contact method?',
    vertical: true,
    required: true,
  },
  render: (args) => (
    <RadioButtonGroup {...args}>
      <RadioButton value="email" label="Email" />
      <RadioButton value="phone" label="Phone" />
      <RadioButton value="text" label="Text Message" />
    </RadioButtonGroup>
  ),
};

export const FullForm: Story = {
  render: () => <RadioDemo />,
};
