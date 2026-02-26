export {
  onboardRouter,
  type OnboardRouter,
  type Context,
} from './lib/router.js';
export type { EventPublisher } from '@bawp/events';
export type { OnboardDataAccess } from './lib/data-access.js';
export { MockOnboardDataAccess } from './lib/mock-data-access.js';
export type {
  School,
  Student,
  CreateSchoolInput,
  CreateStudentInput,
} from './lib/types.js';
export * from './lib/schemas.js';
