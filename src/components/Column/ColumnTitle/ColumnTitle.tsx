import Button from 'components/Button/Button';
import React from 'react';
import { useState } from 'react';
import styles from './ColumnTitle.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  submit: (title: string) => void;
};

const ColumnTitle: React.FC<Props> = (columnTitle) => {
  const [title, setTitle] = useState(columnTitle.title);
  const [isEdited, setIsEdited] = useState(false);
  const { t } = useTranslation('translation');

  const clickSubmit = () => {
    if (!title) {
      clickCancel();
    }
    columnTitle.submit(title);
    setIsEdited(false);
  };

  const clickCancel = () => {
    setTitle(columnTitle.title);
    setIsEdited(false);
  };

  const updateInputValue = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const elementClicked = event.relatedTarget;
    if (elementClicked?.hasAttribute('type')) {
      if ((elementClicked as HTMLInputElement).type === 'submit') {
        clickSubmit();
      }
    } else clickCancel();
  };

  return (
    <div className={styles.form}>
      <input
        className={styles.input}
        value={title}
        onFocus={() => setIsEdited(true)}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={(event) => updateInputValue(event)}
      />
      {isEdited && (
        <div className={styles.buttons}>
          <Button type="button" className={styles.cancel} onClick={() => clickCancel()}>
            {t('button.cancel')}
          </Button>
          <Button type="submit" className={styles.submit} onClick={() => clickSubmit()}>
            {t('button.submit')}
          </Button>
        </div>
      )}
    </div>
  );
};
export default ColumnTitle;
