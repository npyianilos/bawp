import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { GetReadyRouter } from '@bawp/get-ready-router';
import type { SearchStudent } from '@bawp/get-ready-router';
import { UserSearch } from './user-search';
import { TRPCProvider } from './trpc';

const FUNCTION_URL =
  'https://q2pkc6hqqbhpxlheplrioj7kda0wfhie.lambda-url.us-east-1.on.aws';

function StoryWrapper({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createTRPCClient<GetReadyRouter>({
      links: [httpBatchLink({ url: FUNCTION_URL })],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}

const meta: Meta<typeof UserSearch> = {
  component: UserSearch,
  title: 'GetReady/UserSearch',
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserSearch>;

export const Default: Story = {};

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<SearchStudent | null>(null);
    return (
      <div>
        <h1>User Search Story!!!</h1>
        <UserSearch onSelect={setSelected} />
        {selected && (
          <p style={{ marginTop: '1rem' }}>
            Selected: {selected.firstName} {selected.lastName} (
            {selected.schoolId})
          </p>
        )}
      </div>
    );
  },
};
