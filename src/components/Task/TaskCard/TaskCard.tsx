import React from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import { selectTasksList } from 'store/selectors/selectors';
import styles from './TaskCard.module.scss';
import Button from 'components/Button/Button';
import { deleteTask } from 'store/taskSlice/taskThunk';
import { RequestDeleteTask } from 'types/types';
import { selectUser } from 'store/userSlice';
import { findTask } from 'utils/utils';

type Props = {
  taskId: string;
  columnId: string;
};

const TaskCard: React.FC<Props> = (props) => {
  const { taskId, columnId } = props;

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const tasksList = useAppSelector(selectTasksList);

  const currentTask = findTask(tasksList, columnId, taskId);

  const dataForDeleteTask: RequestDeleteTask = {
    taskId: taskId,
    boardId: tasksList.id,
    columnId: columnId,
  };

  const isOwner = () => currentTask?.userId === user.id;

  return (
    <li className={styles.item}>
      <div className={styles.header}>
        <h2 className={styles.title}>{currentTask?.title}</h2>
        <Button
          type="button"
          className={styles.delete}
          kind="delete"
          onClick={() => dispatch(deleteTask(dataForDeleteTask))}
        ></Button>
      </div>
      <div className={styles.description}>{currentTask?.description}</div>
      {isOwner() && <div className={styles.owner}>My task</div>}
    </li>
  );
};
export default TaskCard;
