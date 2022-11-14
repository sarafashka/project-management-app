import Button from 'components/Button/Button';
import React from 'react';
import { useState } from 'react';
import styles from './ColumnTitle.module.scss';

type Props = {
  title: string;
  submit: (title: string) => void;
};

const ColumnTitle: React.FC<Props> = (columnTitle) => {
  const [title, setTitle] = useState(columnTitle.title);
  const [isEdited, setIsEdited] = useState(false);

  const handleSubmit = () => {
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
        handleSubmit();
      }
    } else clickCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={title}
        onFocus={() => setIsEdited(true)}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={(event) => updateInputValue(event)}
      />
      {isEdited && (
        <>
          <Button type="submit" className={styles.submit} onClick={() => handleSubmit()}>
            ok
          </Button>
          <Button type="button" className={styles.cancel} onClick={() => clickCancel()}>
            cancel
          </Button>
        </>
      )}
    </form>
  );
};
export default ColumnTitle;
