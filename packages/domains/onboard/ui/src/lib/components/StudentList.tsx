import { Table, Column, PrimaryButton, NakedButton } from '@cb/apricot-react';
import type { Student } from '@bawp/onboard-router';

type StudentListProps = {
  students: Student[];
  schoolName: string;
  loading?: boolean;
  onAdd: () => void;
  onDelete: (student: Student) => void;
};

export function StudentList({
  students,
  schoolName,
  loading,
  onAdd,
  onDelete,
}: StudentListProps) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h2>{schoolName} — Students</h2>
        <PrimaryButton icon="plus" iconLeft onClick={onAdd} className='flex-shrink-0'>
          Add Student
        </PrimaryButton>
      </div>

      <Table data={students} dataLoader={loading} condensed>
        <Column field="firstName" title="First Name" sortable rowHeader />
        <Column field="lastName" title="Last Name" sortable />
        <Column
          field="actions"
          title=""
          component={({ row }) => {
            const student = row as Student;
            return (
              <NakedButton small onClick={() => onDelete(student)}>
                Delete
              </NakedButton>
            );
          }}
        />
      </Table>

      {!loading && students.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
          No students enrolled yet. Click &quot;Add Student&quot; to enroll one.
        </p>
      )}
    </div>
  );
}
