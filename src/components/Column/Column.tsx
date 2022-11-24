import React from 'react';
import styles from './Column.module.scss';
import { updateColumn } from 'store/taskSlice/columnThunk';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import { GetBoardByIdColumnData } from 'types/types';
import ColumnTitle from './ColumnTitle/ColumnTitle';
import Task from 'components/Task';
import { selectUser } from 'store/selectors/selectors';
import { selectTasksList } from 'store/selectors/selectors';
import { findColumn } from 'utils/utils';
import ColumnDelete from './ColumnDelete';
import ColumnAddTask from './ColumnAddTask';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  id: string;
  index: number;
};

const Column: React.FC<Props> = (column) => {
  const { id, index } = column;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const board = useAppSelector(selectTasksList);
  const currentColumn = findColumn(board, id) as GetBoardByIdColumnData;
  const { title, tasks } = currentColumn;

  const handleSubmit = (title: string) => {
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

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={styles.item}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.header}>
            <p className={styles.count}>({tasks.length})</p>
            <ColumnTitle title={title} submit={handleSubmit} />
            <ColumnDelete columnId={id} boardId={board.id} title={title} />
          </div>
          {<Task columnId={id} />}
          <ColumnAddTask boardId={board.id} columnId={id} userId={user.id} />
        </div>
      )}
    </Draggable>
  );
};

export default Column;
