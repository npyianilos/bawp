import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Input, SelectDropdown } from '@bawp/form-controls';
import { PrimaryButton } from '@cb/apricot-react';
import { useGetReadyAdapter } from '../contract-context';
import type { School } from '../port';

type SessionFormData = {
  sessionName: string;
  schoolId: string;
};

export const SessionForm = () => {
  const { listSchools } = useGetReadyAdapter();
  const [schools, setSchools] = useState<School[]>([]);

  const methods = useForm<SessionFormData>({
    defaultValues: { sessionName: '', schoolId: '' },
  });

  useEffect(() => {
    listSchools().then(setSchools);
  }, [listSchools]);

  const onSubmit = methods.handleSubmit((data) => {
    console.log('Session created:', data);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Input name="sessionName" label="Session Name" required />
        <SelectDropdown
          name="schoolId"
          label="School"
          required
          values={schools.map((s) => ({ label: s.name, value: s.id }))}
        />
        <PrimaryButton onClick={onSubmit}>Create Session</PrimaryButton>
      </form>
    </FormProvider>
  );
};
