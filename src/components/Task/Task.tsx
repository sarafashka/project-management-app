import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';
import styles from './Task.module.scss';
import { selectTasksList } from 'store/selectors/selectors';
import { findColumnTasks } from 'utils/utils';
import { Droppable } from 'react-beautiful-dnd';

type Props = {
  columnId: string;
};

const TasksList: React.FC<Props> = (columnInfo: Props) => {
  const tasksList = useSelector(selectTasksList);

  const { columnId } = columnInfo;

  const currentTasks = findColumnTasks(tasksList, columnId);
  const currentTasksSorting = currentTasks ? [...currentTasks] : undefined;
  currentTasksSorting?.sort((a, b) => a.order - b.order);

  return (
    <Droppable droppableId={columnId} type="task">
      {(provided) => (
        <ul className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>
          {currentTasksSorting &&
            currentTasksSorting.map((task, index) => (
              <TaskCard key={task.id} taskId={task.id} columnId={columnId} index={index} />
            ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};
export default TasksList;
