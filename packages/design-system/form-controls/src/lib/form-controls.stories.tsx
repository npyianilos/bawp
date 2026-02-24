import type { Meta, StoryObj } from '@storybook/react';
import { BawpFormControls } from './form-controls';

const meta: Meta<typeof BawpFormControls> = {
  component: BawpFormControls,
  title: 'FormControls/BawpFormControls',
  argTypes: {
    vertical: {
      control: 'boolean',
      description: 'Stack radio buttons vertically',
    },
    defaultValue: {
      control: 'select',
      options: ['email', 'phone', 'sms', 'mail'],
      description: 'Initially selected value',
    },
    required: {
      control: 'boolean',
      description: 'Whether a selection is required',
    },
  },
};
export default meta;

type Story = StoryObj<typeof BawpFormControls>;

export const Default: Story = {};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
};

export const Preselected: Story = {
  args: {
    defaultValue: 'phone',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const VerticalPreselected: Story = {
  args: {
    vertical: true,
    defaultValue: 'sms',
  },
};
