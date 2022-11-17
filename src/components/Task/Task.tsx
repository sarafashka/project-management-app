import { useAppDispatch } from 'hooks/reduxTypedHooks';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTaskList } from 'store/task/taskSlice';
import { getColumn } from 'store/task/taskThunk';
import { RequestGetColumn } from 'types/types';
import TaskCard from './TaskCard';
import styles from './Task.module.scss';

type Props = {
  columnId: string;
};

const TasksList: React.FC<Props> = (columnInfo: Props) => {
  const dispatch = useAppDispatch();
  const tasksList = useSelector(selectTaskList);

  const { columnId } = columnInfo;
  const currentTasks = tasksList.find((item) => item.id === columnId);
  const boardId = '8003a52c-82e1-443c-b002-cd1492e00685'; //add id from props (wait from boards)
  const dataForGetColumn: RequestGetColumn = {
    boardId: boardId,
    columnId: columnId,
  };

  useEffect(() => {
    dispatch(getColumn(dataForGetColumn));
  }, [dispatch]);

  return (
    <>
      {/*<ul className={styles.list}>
        {currentTasks &&
          currentTasks.tasks.map((task) => (
            <TaskCard key={task.id} taskId={task.id} columnId={columnId} />
          ))}
          </ul>*/}
    </>
  );
};
export default TasksList;
