import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';
import styles from './Task.module.scss';
import { selectTasksList } from 'store/selectors/selectors';
import { findColumnTasks } from 'utils/utils';

type Props = {
  columnId: string;
};

const TasksList: React.FC<Props> = (columnInfo: Props) => {
  const tasksList = useSelector(selectTasksList);

  const { columnId } = columnInfo;

  const currentTasks = findColumnTasks(tasksList, columnId);

  return (
    <>
      <ul className={styles.list}>
        {currentTasks &&
          currentTasks.map((task) => (
            <TaskCard key={task.id} taskId={task.id} columnId={columnId} />
          ))}
      </ul>
    </>
  );
};
export default TasksList;
