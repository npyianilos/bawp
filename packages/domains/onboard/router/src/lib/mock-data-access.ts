import type { OnboardDataAccess } from './data-access.js';
import type {
  School,
  Student,
  CreateSchoolInput,
  CreateStudentInput,
} from './types.js';

let nextId = 1;
function generateId(): string {
  return String(nextId++);
}

export class MockOnboardDataAccess implements OnboardDataAccess {
  private schools: School[] = [
    { id: '1', name: 'Springfield Elementary' },
    { id: '2', name: 'Shelbyville Academy' },
  ];

  private students: Student[] = [
    { id: '1', firstName: 'Bart', lastName: 'Simpson', schoolId: '1' },
    { id: '2', firstName: 'Lisa', lastName: 'Simpson', schoolId: '1' },
    { id: '3', firstName: 'Milhouse', lastName: 'Van Houten', schoolId: '1' },
  ];

  constructor() {
    nextId = 100;
  }

  async getSchools(): Promise<School[]> {
    return [...this.schools];
  }

  async createSchool(data: CreateSchoolInput): Promise<School> {
    const school: School = { id: generateId(), name: data.name };
    this.schools.push(school);
    return school;
  }

  async deleteSchool(id: string): Promise<void> {
    this.schools = this.schools.filter((s) => s.id !== id);
    this.students = this.students.filter((s) => s.schoolId !== id);
  }

  async getStudents(schoolId: string): Promise<Student[]> {
    return this.students.filter((s) => s.schoolId === schoolId);
  }

  async createStudent(data: CreateStudentInput): Promise<Student> {
    const student: Student = { id: generateId(), ...data };
    this.students.push(student);
    return student;
  }

  async deleteStudent(id: string): Promise<void> {
    this.students = this.students.filter((s) => s.id !== id);
  }
}
