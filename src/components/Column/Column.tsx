import React from 'react';
import cn from 'classnames';
import styles from './Column.module.scss';
import Button from 'components/Button/Button';
import { deleteColumn, updateColumn } from 'store/columnSlice/columnThunk';
import { useAppDispatch } from 'hooks/reduxTypedHooks';
import { RequestDeleteColumn } from 'types/types';
import ColumnTitle from './ColumnTitle';

type Props = {
  id: string;
  title: string;
  boardId: string;
};

const Column: React.FC<Props> = (column) => {
  const { id, title, boardId } = column;
  const dispatch = useAppDispatch();
  const dataForDeleteColumn: RequestDeleteColumn = {
    columnId: id,
    boardId: boardId,
  };

  const handleSubmit = (title: string) => {
    const newTitle = title;
    const dataForUpdateColumn = {
      boardId: boardId,
      columnId: id,
      body: {
        title: newTitle,
        order: null,
      },
    };
    dispatch(updateColumn(dataForUpdateColumn));
  };

  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <ColumnTitle title={title} submit={handleSubmit} />
        <Button
          className={cn(styles.button, 'btn')}
          type="button"
          onClick={() => {
            dispatch(deleteColumn(dataForDeleteColumn));
          }}
        >
          x
        </Button>
      </div>

      <div className={styles.task}>
        <h4>1 task</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className={styles.task}>
        <h4>2 task</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>

      <button className={styles.newTask}>+ Add a task</button>
    </div>
  );
};

export default Column;
