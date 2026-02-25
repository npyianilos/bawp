import { createContext, useContext } from 'react';
import type {
  School,
  Student,
  CreateSchoolInput,
  CreateStudentInput,
} from '@bawp/onboard-router';

export interface OnboardService {
  getSchools(): Promise<School[]>;
  createSchool(data: CreateSchoolInput): Promise<School>;
  deleteSchool(id: string): Promise<void>;

  getStudents(schoolId: string): Promise<Student[]>;
  createStudent(data: CreateStudentInput): Promise<Student>;
  deleteStudent(id: string): Promise<void>;
}

export const OnboardServiceContext = createContext<OnboardService | null>(null);

export function useOnboardService(): OnboardService {
  const service = useContext(OnboardServiceContext);
  if (!service) {
    throw new Error(
      'OnboardService not provided. Wrap your component tree with <OnboardServiceContext.Provider>.',
    );
  }
  return service;
}
