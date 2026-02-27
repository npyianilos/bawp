import { FC, useState } from 'react';
import { GetReadyPort } from '../port';
import { ContractContext } from '../contract-context';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { GetReadyRouter } from '@bawp/get-ready-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TRPCProvider } from './trpc';
import { Sessions } from './sessions';

const FUNCTION_URL =
  'https://q2pkc6hqqbhpxlheplrioj7kda0wfhie.lambda-url.us-east-1.on.aws';

type Props = {
  adapter: GetReadyPort;
};

export const GetReady: FC<Props> = ({ adapter }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createTRPCClient<GetReadyRouter>({
      links: [httpBatchLink({ url: FUNCTION_URL })],
    })
  );
  return (
    <ContractContext.Provider value={adapter}>
      <QueryClientProvider client={queryClient}>
        <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
          <Sessions />
        </TRPCProvider>
      </QueryClientProvider>
    </ContractContext.Provider>
  );
};

export default GetReady;
