import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SimpleCard, PrimaryButton } from '@cb/apricot-react';
import { Input, SelectDropdown, DatePicker } from '@bawp/form-controls';
import { ActionModal } from '@bawp/components';
import { useTRPC } from './trpc.js';
import { useGetReadyContract } from '../contract-context';
import { SessionDetail } from './session-detail.js';
import type { School } from '../contract';
import type { Session } from '@bawp/get-ready-router';

type CreateSessionFormData = {
  name: string;
  schoolId: string;
  date: Date | null;
};

export const Sessions = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { listSchools } = useGetReadyContract();
  const [schools, setSchools] = useState<School[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    listSchools().then(setSchools);
  }, [listSchools]);

  const { data: sessions = [] } = useQuery(trpc.sessions.list.queryOptions({}));

  const createSession = useMutation(
    trpc.sessions.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.sessions.list.queryKey(),
        });
        setModalOpen(false);
        methods.reset();
      },
    })
  );

  const methods = useForm<CreateSessionFormData>({
    defaultValues: { name: '', schoolId: '', date: null },
  });

  const onSubmit = methods.handleSubmit((data) => {
    createSession.mutate({
      name: data.name,
      schoolId: data.schoolId,
      date: data.date ? data.date.toISOString().split('T')[0] : '',
    });
  });

  if (selectedSession) {
    const school = schools.find((s) => s.id === selectedSession.schoolId);
    return (
      <SessionDetail
        session={selectedSession}
        schoolName={school?.name ?? selectedSession.schoolId}
        onBack={() => setSelectedSession(null)}
      />
    );
  }

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
        <h2>Sessions</h2>
        <PrimaryButton onClick={() => setModalOpen(true)}>
          Create Session
        </PrimaryButton>
      </div>

      {sessions.length === 0 && (
        <p>No sessions yet. Create one to get started.</p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
        }}
      >
        {sessions.map((session) => {
          const school = schools.find((s) => s.id === session.schoolId);
          return (
            <SimpleCard
              key={session.id}
              onClick={() => setSelectedSession(session)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ padding: '1rem' }}>
                <h3>{session.name}</h3>
                <p style={{ color: '#666', margin: '0.5rem 0' }}>
                  {school?.name ?? session.schoolId}
                </p>
                <p style={{ color: '#888', fontSize: '0.875rem' }}>
                  {session.date}
                </p>
              </div>
            </SimpleCard>
          );
        })}
      </div>

      <ActionModal
        open={modalOpen}
        title="Create Session"
        onClose={() => {
          setModalOpen(false);
          methods.reset();
        }}
        onAction={onSubmit}
        actionLabel="Create"
      >
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Input name="name" label="Session Name" required />
            <SelectDropdown
              name="schoolId"
              label="School"
              required
              values={schools.map((s) => ({ label: s.name, value: s.id }))}
            />
            <DatePicker name="date" singleLabel="Date" singleDate required />
          </form>
        </FormProvider>
      </ActionModal>
    </div>
  );
};
