import type { Meta, StoryObj } from '@storybook/react-vite';
import { OnboardUi } from './ui';
import { OnboardServiceContext } from './services/OnboardService';
import { MockOnboardService } from './services/MockOnboardService';

const mockService = new MockOnboardService();

const meta: Meta<typeof OnboardUi> = {
  component: OnboardUi,
  title: 'Onboard/SchoolsAndStudents',
  decorators: [
    (Story) => (
      <OnboardServiceContext.Provider value={mockService}>
        <Story />
      </OnboardServiceContext.Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OnboardUi>;

export const Default: Story = {};
