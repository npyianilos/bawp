import { useForm, FormProvider } from 'react-hook-form';
import { Modal, PrimaryButton, NakedButton } from '@cb/apricot-react';
import { Input } from '@bawp/form-controls';

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
    <Modal
      open={open}
      onClose={handleClose}
      title="Add Student"
      footer={
        <>
          <NakedButton onClick={handleClose}>Cancel</NakedButton>
          <PrimaryButton onClick={handleSubmit}>Save</PrimaryButton>
        </>
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <Input name="firstName" label="First Name" required />
          <Input name="lastName" label="Last Name" required />
        </form>
      </FormProvider>
    </Modal>
  );
}
