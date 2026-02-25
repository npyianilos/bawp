import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useOnboardService } from './services/OnboardService.js';
import { SchoolList } from './components/SchoolList.js';
import { SchoolForm } from './components/SchoolForm.js';
import { StudentList } from './components/StudentList.js';
import { StudentForm } from './components/StudentForm.js';
import type {
  School,
  Student,
  CreateSchoolInput,
  CreateStudentInput,
} from '@bawp/onboard-router';

import '@cb/apricot/CBGrid';

const queryClient = new QueryClient();

export function OnboardUi() {
  return (
    <QueryClientProvider client={queryClient}>
      <OnboardPanel />
    </QueryClientProvider>
  );
}

function OnboardPanel() {
  const service = useOnboardService();
  const qc = useQueryClient();

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [schoolFormOpen, setSchoolFormOpen] = useState(false);
  const [studentFormOpen, setStudentFormOpen] = useState(false);

  // ── Schools ──────────────────────────────────────────────
  const schoolsQuery = useQuery({
    queryKey: ['schools'],
    queryFn: () => service.getSchools(),
  });

  const createSchool = useMutation({
    mutationFn: (data: CreateSchoolInput) => service.createSchool(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['schools'] }),
  });

  const deleteSchool = useMutation({
    mutationFn: (id: string) => service.deleteSchool(id),
    onSuccess: (_data, deletedId) => {
      qc.invalidateQueries({ queryKey: ['schools'] });
      if (selectedSchool?.id === deletedId) {
        setSelectedSchool(null);
      }
    },
  });

  // ── Students (only when a school is selected) ───────────
  const studentsQuery = useQuery({
    queryKey: ['students', selectedSchool?.id],
    queryFn: () => {
      if (!selectedSchool) throw new Error('No school selected');
      return service.getStudents(selectedSchool.id);
    },
    enabled: !!selectedSchool,
  });

  const createStudent = useMutation({
    mutationFn: (data: CreateStudentInput) => service.createStudent(data),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ['students', selectedSchool?.id] }),
  });

  const deleteStudent = useMutation({
    mutationFn: (id: string) => service.deleteStudent(id),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ['students', selectedSchool?.id] }),
  });

  // ── Handlers ────────────────────────────────────────────
  const handleCreateSchool = (data: CreateSchoolInput) => {
    createSchool.mutate(data);
  };

  const handleDeleteSchool = (school: School) => {
    deleteSchool.mutate(school.id);
  };

  const handleCreateStudent = (data: { firstName: string; lastName: string }) => {
    if (!selectedSchool) return;
    createStudent.mutate({ ...data, schoolId: selectedSchool.id });
  };

  const handleDeleteStudent = (student: Student) => {
    deleteStudent.mutate(student.id);
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
            <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>
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
        onSave={handleCreateSchool}
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
