import React from 'react';
import cn from 'classnames';
import styles from './Column.module.scss';
import Button from 'components/Button/Button';
import { deleteColumn, updateColumn } from 'store/columnSlice/columnThunk';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import { RequestDeleteColumn } from 'types/types';
import ColumnTitle from './ColumnTitle';
import Task from 'components/Task';
import { createTask } from 'store/taskSlice/taskThunk';
import { selectUser } from 'store/userSlice';
import { selectTasksList } from 'store/selectors/selectors';

type Props = {
  id: string;
  title: string;
  boardId: string;
};

const Column: React.FC<Props> = (column) => {
  const { id, title, boardId } = column;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const board = useAppSelector(selectTasksList); //change;
  const countOfTasks = board.columns.find((column) => column.id === id)?.tasks.length;

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

  const dataForCreateTask = {
    boardId: boardId,
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
        <p className={styles.count}>({countOfTasks})</p>
        <ColumnTitle title={title} submit={handleSubmit} />
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
