import React from 'react';
import { useAppSelector } from 'hooks/reduxTypedHooks';
import { selectTaskList } from 'store/task/taskSlice';
import styles from './TaskCard.module.scss';
import Button from 'components/Button/Button';

type Props = {
  taskId: string;
  columnId: string;
};

const TaskCard: React.FC<Props> = (props) => {
  const { taskId, columnId } = props;
  const tasksList = useAppSelector(selectTaskList);

  const taskItem = tasksList
    .find((column) => column.id === columnId)
    ?.tasks.find((task) => task.id === taskId);

  return (
    <li className={styles.item}>
      <div className={styles.header}>
        <h2 className={styles.title}>{taskItem?.title}</h2>
        <Button type="button" className={styles.delete}>
          x
        </Button>
      </div>
      <div className={styles.description}>{taskItem?.description}</div>
    </li>
  );
};
export default TaskCard;
