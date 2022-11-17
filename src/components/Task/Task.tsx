import { useAppDispatch } from 'hooks/reduxTypedHooks';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {} from 'store/taskSlice/taskThunk';
import { RequestGetColumn } from 'types/types';
import TaskCard from './TaskCard';
import styles from './Task.module.scss';
import { selectTasksList } from 'store/selectors/selectors';

type Props = {
  columnId: string;
};

const TasksList: React.FC<Props> = (columnInfo: Props) => {
  const dispatch = useAppDispatch();
  const tasksList = useSelector(selectTasksList);

  const { columnId } = columnInfo;

  const currentTasks = tasksList.columns.find((column) => columnId === column.id)?.tasks;

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
