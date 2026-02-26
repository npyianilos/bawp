import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from './trpc.js';
import { SchoolList } from './components/SchoolList.js';
import { SchoolForm } from './components/SchoolForm.js';
import { StudentList } from './components/StudentList.js';
import { StudentForm } from './components/StudentForm.js';
import type { School, Student } from '@bawp/onboard-router';

import '@cb/apricot/CBGrid';

export function OnboardUi() {
  return <OnboardPanel />;
}

function OnboardPanel() {
  const trpc = useTRPC();
  const qc = useQueryClient();

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [schoolFormOpen, setSchoolFormOpen] = useState(false);
  const [studentFormOpen, setStudentFormOpen] = useState(false);

  // ── Schools ──────────────────────────────────────────────
  const schoolsQuery = useQuery(trpc.schools.list.queryOptions());

  const createSchool = useMutation(
    trpc.schools.create.mutationOptions({
      onSuccess: () =>
        qc.invalidateQueries({ queryKey: trpc.schools.list.queryKey() }),
    })
  );

  const deleteSchool = useMutation(
    trpc.schools.delete.mutationOptions({
      onSuccess: (_data, { id: deletedId }) => {
        qc.invalidateQueries({ queryKey: trpc.schools.list.queryKey() });
        if (selectedSchool?.id === deletedId) {
          setSelectedSchool(null);
        }
      },
    })
  );

  // ── Students (only when a school is selected) ───────────
  const studentsQuery = useQuery(
    trpc.students.list.queryOptions(
      { schoolId: selectedSchool?.id ?? '' },
      { enabled: !!selectedSchool }
    )
  );

  const createStudent = useMutation(
    trpc.students.create.mutationOptions({
      onSuccess: () =>
        qc.invalidateQueries({ queryKey: trpc.students.list.queryKey() }),
    })
  );
  const deleteStudent = useMutation(
    trpc.students.delete.mutationOptions({
      onSuccess: () =>
        qc.invalidateQueries({ queryKey: trpc.students.list.queryKey() }),
    })
  );

  const handleDeleteSchool = (school: School) => {
    deleteSchool.mutate({ id: school.id });
  };

  const handleCreateStudent = (data: {
    firstName: string;
    lastName: string;
  }) => {
    if (!selectedSchool) return;
    createStudent.mutate({ ...data, schoolId: selectedSchool.id });
  };

  const handleDeleteStudent = (student: Student) => {
    deleteStudent.mutate({ id: student.id });
  };

  return (
    <div className="container">
      <div className="row">
        {/* Left panel: Schools */}
        <div className="col-xs-12 col-md-4">
          <SchoolList
            schools={schoolsQuery.data ?? []}
            selectedSchoolId={selectedSchool?.id ?? null}
            loading={schoolsQuery.isLoading}
            onSelect={setSelectedSchool}
            onAdd={() => setSchoolFormOpen(true)}
            onDelete={handleDeleteSchool}
          />
        </div>

        {/* Right panel: Students for selected school */}
        <div className="col-xs-12 col-md-8">
          {selectedSchool ? (
            <StudentList
              students={studentsQuery.data ?? []}
              schoolName={selectedSchool.name}
              loading={studentsQuery.isLoading}
              onAdd={() => setStudentFormOpen(true)}
              onDelete={handleDeleteStudent}
            />
          ) : (
            <div
              style={{ padding: '3rem', textAlign: 'center', color: '#666' }}
            >
              <h2>Select a school</h2>
              <p>Choose a school from the list to manage its students.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <SchoolForm
        open={schoolFormOpen}
        onClose={() => setSchoolFormOpen(false)}
        onSave={createSchool.mutate}
      />
      <StudentForm
        open={studentFormOpen}
        onClose={() => setStudentFormOpen(false)}
        onSave={handleCreateStudent}
      />
    </div>
  );
}

export default OnboardUi;
