import React from 'react';
import styles from './Task.module.scss';
import { Droppable } from 'react-beautiful-dnd';
import MemoizedTaskCard from './TaskCard';
import { GetBoardByIdTaskData } from 'types/types';

type Props = {
  columnId: string;
  tasks: GetBoardByIdTaskData[];
};

const TasksList: React.FC<Props> = (props) => {
  const { columnId, tasks } = props;
  const currentTasks = tasks ? [...tasks] : undefined;

  return (
    <Droppable droppableId={columnId} type="task">
      {(provided) => (
        <ul className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>
          {currentTasks &&
            currentTasks.map((task, index) => (
              <MemoizedTaskCard key={task.id} columnId={columnId} index={index} task={task} />
            ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};
export default TasksList;
