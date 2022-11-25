import React from 'react';

import Button from 'components/Button/Button';

import styles from './ConfirmationModal.module.scss';
import { OpenModalEvent } from 'types/types';
import { useTranslation } from 'react-i18next';

const { confirmation, attributeValue, container, content, btn } = styles;

type ConfirmationModalProps = {
  entity: 'user' | 'board' | 'column' | 'task';
  value?: string;
  onCancel: (event?: OpenModalEvent) => void;
  onConfirm: (event?: OpenModalEvent) => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  entity,
  value,
  onCancel,
  onConfirm,
}) => {
  const { t } = useTranslation('translation');

  const text =
    entity === 'user' ? (
      t('editingModal.your-account')
    ) : (
      <>
        {t(`editingModal.${entity}`)} {t('editingModal.with-title')}{' '}
        <span className={attributeValue}>{value}</span>?
      </>
    );

  return (
    <div className={confirmation}>
      <p className={content}>
        {t('editingModal.confirm-delete')} {text}
      </p>
      <div className={container}>
        <Button kind="cancel" className={btn} onClick={onCancel}>
          {t('button.cancel')}
        </Button>
        <Button kind="confirm" className={btn} onClick={onConfirm}>
          {t('button.confirm')}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
