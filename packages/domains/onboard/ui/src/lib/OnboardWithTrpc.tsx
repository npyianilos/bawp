import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { OnboardRouter } from '@bawp/onboard-router';
import { TRPCProvider } from './trpc.js';
import { OnboardUi } from './ui.js';

const apiUrl =
  'https://cfpqdc7w5acfqsz432uouka4xy0joyyq.lambda-url.us-east-1.on.aws';

export function Onboard() {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    createTRPCClient<OnboardRouter>({
      links: [httpBatchLink({ url: apiUrl })],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <OnboardUi />
      </TRPCProvider>
    </QueryClientProvider>
  );
}
