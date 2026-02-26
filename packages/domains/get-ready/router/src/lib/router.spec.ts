import { getReadyRouter } from './router.js';

describe('getReadyRouter', () => {
  it('should have searchStudents procedure', () => {
    expect(getReadyRouter.searchStudents).toBeDefined();
  });
});
