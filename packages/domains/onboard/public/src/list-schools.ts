import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { OnboardRouter } from '@bawp/onboard-router';

const url =
  'https://a7hvippzbwtzpigl7ippdv4yim0frjee.lambda-url.us-east-1.on.aws';

const client = createTRPCClient<OnboardRouter>({
  links: [httpBatchLink({ url })],
});

export function listSchools() {
  return client.schools.list.query();
}
