import { useForm, FormProvider } from 'react-hook-form';
import { Modal, PrimaryButton, NakedButton } from '@cb/apricot-react';
import { Input } from '@bawp/form-controls';
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
  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    onSave(data);
    reset();
    onClose();
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Add School"
      footer={
        <>
          <NakedButton data-cb-modal-close>Cancel</NakedButton>
          <PrimaryButton onClick={onSubmit}>Save</PrimaryButton>
        </>
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Input name="name" label="School Name" required />
        </form>
      </FormProvider>
    </Modal>
  );
}
