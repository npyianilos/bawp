import { useForm, FormProvider } from 'react-hook-form';
import { Input } from '@bawp/form-controls';
import { ActionModal } from '@bawp/components';

type StudentFormData = {
  firstName: string;
  lastName: string;
};

type StudentFormProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: StudentFormData) => void;
};

export function StudentForm({ open, onClose, onSave }: StudentFormProps) {
  const methods = useForm<StudentFormData>({
    defaultValues: { firstName: '', lastName: '' },
  });

  const handleSubmit = methods.handleSubmit((data) => {
    onSave(data);
    methods.reset();
    onClose();
  });

  const handleClose = () => {
    methods.reset();
    onClose();
  };

  return (
    <ActionModal
      open={open}
      onClose={handleClose}
      title="Add Student"
      onAction={handleSubmit}
      actionLabel="Save"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <Input name="firstName" label="First Name" required />
          <Input name="lastName" label="Last Name" required />
        </form>
      </FormProvider>
    </ActionModal>
  );
}
