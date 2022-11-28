import React from 'react';

import { OpenModalEvent, DataFromEditForm } from 'types/types';

import styles from './EditingModal.module.scss';
import EditingForm from 'components/Forms/EditingForm';
import EditingFormShort from 'components/Forms/EditingFormShort';
import { useTranslation } from 'react-i18next';

const { Editing, content } = styles;

type EditingModalProps = {
  entity: 'board' | 'column' | 'task';
  operation: 'create' | 'edit';
  value?: string;
  onCancel: (event?: OpenModalEvent) => void;
  onConfirm: (data: DataFromEditForm) => void;
  currentValue?: DataFromEditForm;
};

const EditingModal: React.FC<EditingModalProps> = ({
  entity,
  operation,
  onCancel,
  onConfirm,
  currentValue,
}) => {
  const props = {
    onConfirm,
    onCancel,
    currentValue,
    operation,
  };

  const { t } = useTranslation('translation', { keyPrefix: 'editingModal' });

  return (
    <div className={Editing}>
      <p className={content}>
        {t(`${operation}`)} {t(`${entity}`)}
      </p>
      {entity === 'column' ? <EditingFormShort {...props} /> : <EditingForm {...props} />}
    </div>
  );
};

export default EditingModal;
