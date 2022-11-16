import React from 'react';
import cn from 'classnames';
import styles from './Column.module.scss';
import Button from 'components/Button/Button';
import { deleteColumn, updateColumn } from 'store/columnSlice/columnThunk';
import { useAppDispatch } from 'hooks/reduxTypedHooks';
import { RequestDeleteColumn } from 'types/types';
import ColumnTitle from './ColumnTitle';
import Task from 'components/Task';

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
          className={cn(styles.button)}
          type="button"
          kind="boardBtn"
          onClick={() => {
            dispatch(deleteColumn(dataForDeleteColumn));
          }}
        >
          x
        </Button>
      </div>

      <Task columnId={id} />

      <button className={styles.newTask}>+ Add a task</button>
    </div>
  );
};

export default Column;
