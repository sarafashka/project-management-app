import React from 'react';

import Button from 'components/Button/Button';

import styles from './ConfirmationModal.module.scss';
import { OpenModalEvent } from 'types/types';

const { confirmation, attributeValue, container, content, btn } = styles;

type ConfirmationModalProps = {
  entity: 'user' | 'board' | 'column' | 'task';
  value?: string;
  onCancel: (event: OpenModalEvent) => void;
  onConfirm: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  entity,
  value,
  onCancel,
  onConfirm,
}) => {
  const text =
    entity === 'user' ? (
      'your account'
    ) : (
      <>
        {entity} with title <span className={attributeValue}>{value}</span>
      </>
    );

  return (
    <div className={confirmation}>
      <p className={content}>Confirm delete {text}</p>
      <div className={container}>
        <Button kind="cancel" className={btn} onClick={onCancel}>
          Cancel
        </Button>
        <Button kind="confirm" className={btn} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
