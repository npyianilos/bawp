import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, unstable_localLink } from '@trpc/client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  onboardRouter,
  MockOnboardDataAccess,
  type OnboardRouter,
} from '@bawp/onboard-router';
import { OnboardUi } from './ui';
import { TRPCProvider } from './trpc';

const mockDataAccess = new MockOnboardDataAccess();

const mockTrpcClient = createTRPCClient<OnboardRouter>({
  links: [
    unstable_localLink({
      router: onboardRouter,
      createContext: async () => ({ dataAccess: mockDataAccess }),
    }),
  ],
});

function StoryWrapper({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={mockTrpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}

const meta: Meta<typeof OnboardUi> = {
  component: OnboardUi,
  title: 'Onboard/SchoolsAndStudents',
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OnboardUi>;

export const Default: Story = {};
