import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ActionModal } from './action-modal';

const meta: Meta<typeof ActionModal> = {
  component: ActionModal,
  title: 'Components/ActionModal',
};

export default meta;
type Story = StoryObj<typeof ActionModal>;

function ActionModalDemo() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <ActionModal
        title="Confirm Action"
        open={open}
        onClose={() => setOpen(false)}
        onAction={() => {
          console.log('Action confirmed');
          setOpen(false);
        }}
        actionLabel="Confirm"
      >
        <p>Are you sure you want to proceed with this action?</p>
      </ActionModal>
    </>
  );
}

export const Default: Story = {
  render: () => <ActionModalDemo />,
};
