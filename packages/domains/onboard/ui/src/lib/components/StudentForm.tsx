import { useForm, useController } from 'react-hook-form';
import { Modal, PrimaryButton, NakedButton, Input } from '@cb/apricot-react';

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

  const firstNameField = useController({
    name: 'firstName',
    control: methods.control,
    rules: { required: 'First Name is required' },
  });

  const lastNameField = useController({
    name: 'lastName',
    control: methods.control,
    rules: { required: 'Last Name is required' },
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
      withHeader
      withFooter
      footer={
        <>
          <NakedButton onClick={handleClose}>Cancel</NakedButton>
          <PrimaryButton onClick={handleSubmit}>Save</PrimaryButton>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="First Name"
          floating
          required
          value={firstNameField.field.value ?? ''}
          onChange={(_e: unknown, val: unknown) => firstNameField.field.onChange(val)}
          onBlur={firstNameField.field.onBlur}
          validation={firstNameField.fieldState.error ? 'error' : undefined}
          validationMsg={firstNameField.fieldState.error?.message}
        />
        <Input
          label="Last Name"
          floating
          required
          value={lastNameField.field.value ?? ''}
          onChange={(_e: unknown, val: unknown) => lastNameField.field.onChange(val)}
          onBlur={lastNameField.field.onBlur}
          validation={lastNameField.fieldState.error ? 'error' : undefined}
          validationMsg={lastNameField.fieldState.error?.message}
        />
      </form>
    </Modal>
  );
}
