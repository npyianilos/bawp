import { z } from 'zod';

export const searchStudentSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  schoolId: z.string(),
  enrolledAt: z.string(),
});

export const searchStudentsSchema = z.object({
  query: z.string().min(1),
  schoolId: z.string().optional(),
});

export type SearchStudent = z.infer<typeof searchStudentSchema>;
export type SearchStudentsInput = z.infer<typeof searchStudentsSchema>;
