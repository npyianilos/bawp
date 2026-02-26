import type {
  SearchStudent,
  SearchStudentsInput,
  Session,
  CreateSessionInput,
  ListSessionsInput,
  SessionStudent,
  AddStudentToSessionInput,
  GetSessionStudentsInput,
} from './schemas.js';

export interface GetReadyDataAccess {
  searchStudents(input: SearchStudentsInput): Promise<SearchStudent[]>;
  createSession(input: CreateSessionInput): Promise<Session>;
  listSessions(input: ListSessionsInput): Promise<Session[]>;
  addStudentToSession(input: AddStudentToSessionInput): Promise<SessionStudent>;
  getSessionStudents(input: GetSessionStudentsInput): Promise<SessionStudent[]>;
}
