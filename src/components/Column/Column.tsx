import React from 'react';
import cn from 'classnames';
import styles from './Column.module.scss';
import Button from 'components/Button/Button';
import { deleteColumn, updateColumn } from 'store/taskSlice/columnThunk';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import { RequestDeleteColumn } from 'types/types';
import ColumnTitle from './ColumnTitle';
import Task from 'components/Task';
import { createTask } from 'store/taskSlice/taskThunk';
import { selectUser } from 'store/selectors/selectors';
import { selectTasksList } from 'store/selectors/selectors';
import { findColumn } from 'utils/utils';

type Props = {
  id: string;
};

const Column: React.FC<Props> = (column) => {
  const { id } = column;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const board = useAppSelector(selectTasksList);
  const currentColumn = findColumn(board, id);

  const dataForDeleteColumn: RequestDeleteColumn = {
    columnId: id,
    boardId: board.id,
  };

  const handleSubmit = (title: string | undefined) => {
    if (title) {
      const newTitle = title;
      const dataForUpdateColumn = {
        boardId: board.id,
        columnId: id,
        body: {
          title: newTitle,
          order: currentColumn?.order,
        },
      };
      dispatch(updateColumn(dataForUpdateColumn));
    }
  };

  const dataForCreateTask = {
    boardId: board.id,
    columnId: id,
    body: {
      title: 'task',
      description: 'Something descriprion here. It is very interisting and usefull task',
      userId: user.id,
    },
  }; // delete when modal will be finish

  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <p className={styles.count}>({currentColumn?.tasks.length})</p>
        <ColumnTitle title={currentColumn?.title} submit={handleSubmit} />
        <Button
          className={cn(styles.button)}
          type="button"
          kind="delete"
          onClick={() => {
            dispatch(deleteColumn(dataForDeleteColumn));
          }}
        />
      </div>

      {<Task columnId={id} />}

      <Button className={styles.newTask} onClick={() => dispatch(createTask(dataForCreateTask))}>
        + Add a task
      </Button>
    </div>
  );
};

export default Column;
