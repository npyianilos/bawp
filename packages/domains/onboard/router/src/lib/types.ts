export type School = {
  id: string;
  name: string;
};

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  schoolId: string;
};

export type CreateSchoolInput = {
  name: string;
};

export type CreateStudentInput = {
  firstName: string;
  lastName: string;
  schoolId: string;
};
