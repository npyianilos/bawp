import { createContext, useContext } from 'react';
import type { School, CreateSchoolInput } from '../types/school.js';
import type { Student, CreateStudentInput } from '../types/student.js';

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
