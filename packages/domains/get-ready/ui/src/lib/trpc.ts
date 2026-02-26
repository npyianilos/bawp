import React from 'react';
import {
  createTRPCContext,
  type TRPCOptionsProxy,
} from '@trpc/tanstack-react-query';
import type { TRPCClient } from '@trpc/client';
import type { QueryClient } from '@tanstack/react-query';
import type { GetReadyRouter } from '@bawp/get-ready-router';

const _ctx = createTRPCContext<GetReadyRouter>();

export const TRPCProvider: React.FC<{
  children: React.ReactNode;
  queryClient: QueryClient;
  trpcClient: TRPCClient<GetReadyRouter>;
}> = _ctx.TRPCProvider;

export const useTRPC: () => TRPCOptionsProxy<GetReadyRouter> = _ctx.useTRPC;
