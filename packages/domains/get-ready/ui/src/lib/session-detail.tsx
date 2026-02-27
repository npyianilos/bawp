import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from './trpc.js';
import { UserSearch } from './user-search.js';
import type { Session, SearchStudent } from '@bawp/get-ready-router';

type SessionDetailProps = {
  session: Session;
  schoolName: string;
  onBack: () => void;
};

export const SessionDetail = ({
  session,
  schoolName,
  onBack,
}: SessionDetailProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: students = [] } = useQuery(
    trpc.sessions.listStudents.queryOptions({ sessionId: session.id })
  );

  const addStudent = useMutation(
    trpc.sessions.addStudent.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.sessions.listStudents.queryKey(),
        });
      },
    })
  );

  const handleSelectStudent = (student: SearchStudent) => {
    addStudent.mutate({
      sessionId: session.id,
      studentId: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      schoolId: student.schoolId,
    });
  };

  const existingStudentIds = new Set(students.map((s) => s.studentId));

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: '#0077c8',
          cursor: 'pointer',
          fontSize: '0.875rem',
          padding: 0,
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
        }}
      >
        ← Back to Sessions
      </button>

      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ margin: '0 0 0.25rem' }}>{session.name}</h2>
        <p style={{ color: '#666', margin: '0 0 0.25rem' }}>{schoolName}</p>
        <p style={{ color: '#888', fontSize: '0.875rem', margin: 0 }}>
          {session.date}
        </p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Add Student</h3>
        <UserSearch
          schoolId={session.schoolId}
          onSelect={handleSelectStudent}
          excludeIds={existingStudentIds}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Students ({students.length})</h3>
        {students.length === 0 ? (
          <p style={{ color: '#888' }}>
            No students added yet. Search above to add students.
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {students.map((student) => (
              <li
                key={student.studentId}
                style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#e8f0fe',
                    color: '#0077c8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    flexShrink: 0,
                  }}
                >
                  {student.firstName[0]}
                  {student.lastName[0]}
                </span>
                <span>
                  {student.firstName} {student.lastName}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
