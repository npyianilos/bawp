import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { OnboardRouter } from '@bawp/onboard-router';
import { TRPCProvider } from './trpc.js';
import { OnboardUi } from './ui.js';

export function OnboardWithTrpc({ apiUrl }: { apiUrl: string }) {
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
