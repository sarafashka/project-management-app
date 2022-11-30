import React from 'react';
import styles from './Column.module.scss';
import { updateColumn } from 'store/taskSlice/columnThunk';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import { GetBoardByIdColumnData } from 'types/types';
import ColumnTitle from './ColumnTitle/ColumnTitle';
import Task from 'components/Task';
import { selectUser } from 'store/selectors/selectors';
import { selectTasksList } from 'store/selectors/selectors';
import ColumnDelete from './ColumnDelete';
import ColumnAddTask from './ColumnAddTask';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  id: string;
  index: number;
  column: GetBoardByIdColumnData;
};

const Column: React.FC<Props> = (props) => {
  const { id, index, column } = props;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const board = useAppSelector(selectTasksList);
  const { title, tasks, order } = column;

  const handleSubmit = (title: string) => {
    if (title) {
      const newTitle = title;
      const dataForUpdateColumn = {
        boardId: board.id,
        columnId: id,
        body: {
          title: newTitle,
          order: order,
        },
      };
      dispatch(updateColumn(dataForUpdateColumn));
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div className={styles.item} {...provided.draggableProps} ref={provided.innerRef}>
          <div className={styles.header}>
            <p className={styles.count}>({tasks.length})</p>
            <ColumnTitle title={title} submit={handleSubmit} />
            <div className={styles.actions}>
              <div className={styles.handle} {...provided.dragHandleProps}></div>
              <ColumnDelete columnId={id} boardId={board.id} title={title} />
            </div>
          </div>
          {tasks && <Task columnId={id} tasks={tasks} />}
          <ColumnAddTask boardId={board.id} columnId={id} userId={user.id} />
        </div>
      )}
    </Draggable>
  );
};

const MemoizedColumn = React.memo(Column);
export default MemoizedColumn;
