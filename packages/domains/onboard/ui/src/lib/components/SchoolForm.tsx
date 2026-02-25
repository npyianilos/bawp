import { useForm, useController } from 'react-hook-form';
import { Modal, PrimaryButton, NakedButton, Input } from '@cb/apricot-react';
import type { CreateSchoolInput } from '@bawp/onboard-router';

type SchoolFormProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: CreateSchoolInput) => void;
};

export function SchoolForm({ open, onClose, onSave }: SchoolFormProps) {
  const methods = useForm<CreateSchoolInput>({
    defaultValues: { name: '' },
  });

  const nameField = useController({
    name: 'name',
    control: methods.control,
    rules: { required: 'School Name is required' },
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
      title="Add School"
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
          label="School Name"
          floating
          required
          value={nameField.field.value ?? ''}
          onChange={(_e: unknown, val: unknown) => nameField.field.onChange(val)}
          onBlur={nameField.field.onBlur}
          validation={nameField.fieldState.error ? 'error' : undefined}
          validationMsg={nameField.fieldState.error?.message}
        />
      </form>
    </Modal>
  );
}
