import { z } from 'zod';

export const createSchoolSchema = z.object({
  name: z.string().min(1, 'School name is required'),
});

export const deleteSchoolSchema = z.object({
  id: z.string(),
});

export const getStudentsSchema = z.object({
  schoolId: z.string(),
});

export const createStudentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  schoolId: z.string(),
});

export const deleteStudentSchema = z.object({
  id: z.string(),
});
