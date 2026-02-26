import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { getReadyRouter } from '@bawp/get-ready-router';
import { OpenSearchDataAccess } from './data-access.js';

const endpoint = process.env.OPENSEARCH_ENDPOINT!;
const dataAccess = new OpenSearchDataAccess(endpoint);

export const handler = awsLambdaRequestHandler({
  router: getReadyRouter,
  createContext: () => ({ dataAccess }),
});
