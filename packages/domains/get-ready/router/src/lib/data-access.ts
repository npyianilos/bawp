import type { SearchStudent, SearchStudentsInput } from './schemas.js';

export interface GetReadyDataAccess {
  searchStudents(input: SearchStudentsInput): Promise<SearchStudent[]>;
}
