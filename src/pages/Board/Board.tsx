import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import Column from 'components/Column';
import { selectBoard } from 'store/selectors/selectors';
import Button from 'components/Button/Button';
import styles from './Board.module.scss';
import { getAllTasks, updateTask } from 'store/taskSlice/taskThunk';
import Loader from 'components/Loader';
import { resetTasksList } from 'store/taskSlice/taskSlice';
import CreateColumn from './BoardCreateColumn';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import {
  GetBoardByIdColumnData,
  GetBoardByIdTaskData,
  RequestUpdateColumn,
  RequestUpdateTask,
} from 'types/types';
import { findColumn, findTask } from 'utils/utils';
import { updateColumn } from 'store/taskSlice/columnThunk';

const Board: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();

  const boardId = params.boardId as string;

  const goToBoards = () => {
    navigate('/boards/');
    dispatch(resetTasksList());
  };

  useEffect(() => {
    if (boardId) {
      dispatch(getAllTasks(boardId));
    }
  }, [boardId, dispatch]);

  const board = useAppSelector(selectBoard);
  const { isLoading, error, tasksList } = board;
  const { id, title, columns } = tasksList;

  const columnsSorting = [...columns].sort((a, b) => a.order - b.order);

  const onDragEnd: OnDragEndResponder = async (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === 'column') {
      const currentColumn = findColumn(tasksList, draggableId) as GetBoardByIdColumnData;

      console.log('hello');
      columnsSorting.splice(source.index, 1);
      columnsSorting.splice(destination.index, 0, currentColumn);

      const { order, title } = currentColumn;
      const distance = source.index - destination.index;

      const dataForUpdateColumn: RequestUpdateColumn = {
        boardId: id,
        columnId: draggableId,
        body: {
          title: title,
          order: order - distance,
        },
      };
      await dispatch(updateColumn(dataForUpdateColumn));
      await dispatch(getAllTasks(id));
    }
    if (type === 'task') {
      const currentTask = findTask(
        tasksList,
        source.droppableId,
        draggableId
      ) as GetBoardByIdTaskData;

      const { title, order, description, userId } = currentTask;
      const distance = source.index - destination.index;

      const dataForUpdateTask: RequestUpdateTask = {
        boardId: id,
        columnId: source.droppableId,
        taskId: draggableId,
        body: {
          title: title,
          order: order - distance,
          description: description,
          userId: userId,
          boardId: id,
          columnId: destination.droppableId,
        },
      };
      await dispatch(updateTask(dataForUpdateTask));
      await dispatch(getAllTasks(id));
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {error && (
        <div>
          {error.statusCode} {error.message}
        </div>
      )}

      <div className={styles.header}>
        {console.log('render', columnsSorting)}
        <h2 className={styles.title}>{title}</h2>
        <CreateColumn boardId={id} />
      </div>
      <Button className={styles.allBoards} onClick={goToBoards}>
        &#8592; All boards
      </Button>
      <div>{columns.length === 0 && 'Add new column'}</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columns" direction="horizontal" type="column">
          {(provided) => (
            <div className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>
              {columnsSorting.map((item, index) => (
                <Column key={item.id} id={item.id} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
