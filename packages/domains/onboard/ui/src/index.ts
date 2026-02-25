export { OnboardUi } from './lib/ui.js';
export {
  OnboardServiceContext,
  useOnboardService,
  type OnboardService,
} from './lib/services/OnboardService.js';
export { MockOnboardService } from './lib/services/MockOnboardService.js';
export type {
  School,
  Student,
  CreateSchoolInput,
  CreateStudentInput,
} from '@bawp/onboard-router';
