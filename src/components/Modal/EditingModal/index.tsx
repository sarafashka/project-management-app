import React from 'react';

import { CloseModalEvent, DataFromEditForm } from 'types/types';

import styles from './EditingModal.module.scss';
import EditingForm from 'components/Forms/EditingForm';
import EditingFormShort from 'components/Forms/EditingFormShort';

const { Editing, content } = styles;

type EditingModalProps = {
  entity: 'board' | 'column' | 'task';
  operation: 'create' | 'edit';
  value?: string;
  onCancel: (event: CloseModalEvent) => void;
  onConfirm: (data: DataFromEditForm) => void;
  isOpen: boolean;
  currentValue?: DataFromEditForm;
};

const EditingModal: React.FC<EditingModalProps> = ({
  entity,
  operation,
  onCancel,
  onConfirm,
  isOpen,
  currentValue,
}) => {
  const props = {
    onConfirm,
    onCancel,
    isOpen,
    currentValue,
    operation,
  };
  return (
    <div className={Editing}>
      <p className={content}>
        {operation} {entity}
      </p>
      {entity === 'column' ? <EditingFormShort {...props} /> : <EditingForm {...props} />}
    </div>
  );
};

export default EditingModal;