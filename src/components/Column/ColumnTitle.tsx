import { useAppDispatch } from 'hooks/reduxTypedHooks';
import React from 'react';
import { useState } from 'react';
import { updateColumn } from 'store/columnSlice/columnThunk';
import styles from './ColumnTitle.module.scss';

type Props = {
  title: string;
  id: string;
  //handleClickTitle:
};

const ColumnTitle: React.FC<Props> = (columnTitle) => {
  const { id } = columnTitle;
  const [title, setTitle] = useState(columnTitle.title);
  const [isEdited, setIsEdited] = useState(false);

  const boardId = '8003a52c-82e1-443c-b002-cd1492e00685';
  const dispatch = useAppDispatch(); //move functionality to column tsx
  const dataForUpdateColumn = {
    boardId: boardId,
    columnId: id,
    body: {
      title: title,
      order: null,
    },
  };

  console.log('state', title);
  console.log('props', columnTitle);
  return (
    <>
      <input
        className={styles.input}
        value={title}
        onFocus={() => setIsEdited(true)}
        onBlur={() => setIsEdited(false)}
        onChange={(event) => setTitle(event.target.value)}
      />
      {isEdited && (
        <>
          <button
            className={styles.submit}
            onClick={() => {
              dispatch(updateColumn(dataForUpdateColumn));
              console.log('change');
              setIsEdited(false);
            }}
          >
            ok
          </button>
          <button
            type="button"
            className={styles.cancel}
            onClick={() => {
              setTitle(columnTitle.title);
              console.log('title props', columnTitle.title);
              setIsEdited(false);
            }}
          >
            cancel
          </button>
        </>
      )}
    </>
  );
};
export default ColumnTitle;
