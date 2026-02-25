import type {
  School,
  Student,
  CreateSchoolInput,
  CreateStudentInput,
} from './types.js';

export interface OnboardDataAccess {
  getSchools(): Promise<School[]>;
  createSchool(data: CreateSchoolInput): Promise<School>;
  deleteSchool(id: string): Promise<void>;

  getStudents(schoolId: string): Promise<Student[]>;
  createStudent(data: CreateStudentInput): Promise<Student>;
  deleteStudent(id: string): Promise<void>;
}
