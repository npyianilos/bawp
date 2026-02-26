import { FC, ReactNode } from 'react';
import {
  NakedButton,
  PrimaryButton,
  Modal,
  IModalProps,
} from '@cb/apricot-react';

type ActionModalProps = Pick<IModalProps, 'open' | 'title' | 'onClose'> & {
  actionLabel?: string;
  onClose(): void;
  onAction(): void;
  children?: ReactNode;
};

export const ActionModal: FC<ActionModalProps> = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      title={props.title}
      footer={
        <>
          <NakedButton data-cb-modal-close>Cancel</NakedButton>
          <PrimaryButton onClick={props.onAction}>
            {props.actionLabel || 'Save'}
          </PrimaryButton>
        </>
      }
    >
      {props.children}
    </Modal>
  );
};
