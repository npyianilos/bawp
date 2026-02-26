import { useForm, FormProvider } from 'react-hook-form';
import { Input } from '@bawp/form-controls';
import type { CreateSchoolInput } from '@bawp/onboard-router';
import { ActionModal } from '@bawp/components';

type SchoolFormProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: CreateSchoolInput) => void;
};

export function SchoolForm({ open, onClose, onSave }: SchoolFormProps) {
  const methods = useForm<CreateSchoolInput>({
    defaultValues: { name: '' },
  });
  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    onSave(data);
    reset();
    onClose();
  });

  return (
    <ActionModal
      title="Add School"
      open={open}
      actionLabel="Save"
      onAction={onSubmit}
      onClose={() => {
        reset();
        onClose();
      }}
    >
      <FormProvider {...methods}>
          <Input name="name" label="School Name" required />
      </FormProvider>
    </ActionModal>
  );
}
