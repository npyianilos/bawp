import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { onboardRouter } from '@bawp/onboard-router';
import { DynamoOnboardDataAccess } from './data-access.js';
import { EventBridgePublisher } from '@bawp/event-publisher';

const tableName = process.env.TABLE_NAME!;
const eventBusName = process.env.EVENT_BUS_NAME!;

const dataAccess = new DynamoOnboardDataAccess(tableName);
const eventPublisher = new EventBridgePublisher(eventBusName);

export const handler = awsLambdaRequestHandler({
  router: onboardRouter,
  createContext: () => ({ dataAccess, eventPublisher }),
});
