import { z } from 'zod';

// --- Student search ---

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

// --- Sessions ---

export const sessionSchema = z.object({
  id: z.string(),
  name: z.string(),
  schoolId: z.string(),
  date: z.string(), // ISO date string
});

export const createSessionSchema = z.object({
  name: z.string().min(1),
  schoolId: z.string().min(1),
  date: z.string().min(1),
});

export const listSessionsSchema = z.object({
  schoolId: z.string().optional(),
});

export const sessionStudentSchema = z.object({
  studentId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  schoolId: z.string(),
});

export const addStudentToSessionSchema = z.object({
  sessionId: z.string().min(1),
  studentId: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  schoolId: z.string().min(1),
});

export const getSessionStudentsSchema = z.object({
  sessionId: z.string().min(1),
});

export type Session = z.infer<typeof sessionSchema>;
export type CreateSessionInput = z.infer<typeof createSessionSchema>;
export type ListSessionsInput = z.infer<typeof listSessionsSchema>;
export type SessionStudent = z.infer<typeof sessionStudentSchema>;
export type AddStudentToSessionInput = z.infer<
  typeof addStudentToSessionSchema
>;
export type GetSessionStudentsInput = z.infer<typeof getSessionStudentsSchema>;
