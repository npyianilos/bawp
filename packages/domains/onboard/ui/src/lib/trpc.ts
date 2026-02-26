import React from 'react';
import {
  createTRPCContext,
  type TRPCOptionsProxy,
} from '@trpc/tanstack-react-query';
import type { TRPCClient } from '@trpc/client';
import type { QueryClient } from '@tanstack/react-query';
import type { OnboardRouter } from '@bawp/onboard-router';

const _ctx = createTRPCContext<OnboardRouter>();

export const TRPCProvider: React.FC<{
  children: React.ReactNode;
  queryClient: QueryClient;
  trpcClient: TRPCClient<OnboardRouter>;
}> = _ctx.TRPCProvider;

export const useTRPC: () => TRPCOptionsProxy<OnboardRouter> = _ctx.useTRPC;
