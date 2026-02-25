import { z } from 'zod';
import {
  createSchoolSchema,
  createStudentSchema,
} from './schemas.js';

// Derive types from Zod schemas - single source of truth
export type CreateSchoolInput = z.infer<typeof createSchoolSchema>;
export type CreateStudentInput = z.infer<typeof createStudentSchema>;

// Domain types with IDs (returned from mutations/queries)
export type School = {
  id: string;
} & CreateSchoolInput;

export type Student = {
  id: string;
} & CreateStudentInput;
