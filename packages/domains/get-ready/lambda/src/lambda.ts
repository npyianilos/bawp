import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { getReadyRouter } from '@bawp/get-ready-router';
import { GetReadyDataAccessImpl } from './data-access.js';

const endpoint = process.env.OPENSEARCH_ENDPOINT!;
const tableName = process.env.TABLE_NAME!;
const dataAccess = new GetReadyDataAccessImpl(endpoint, tableName);

export const handler = awsLambdaRequestHandler({
  router: getReadyRouter,
  createContext: () => ({ dataAccess }),
});
