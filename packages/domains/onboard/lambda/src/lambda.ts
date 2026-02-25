import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { onboardRouter } from '@bawp/onboard-router';
import { DynamoOnboardDataAccess } from './data-access.js';

const tableName = process.env.TABLE_NAME!;
const dataAccess = new DynamoOnboardDataAccess(tableName);

export const handler = awsLambdaRequestHandler({
  router: onboardRouter,
  createContext: () => ({ dataAccess }),
});
