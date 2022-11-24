import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import Column from 'components/Column';
import { selectBoard } from 'store/selectors/selectors';
import Button from 'components/Button/Button';
import styles from './Board.module.scss';
import { getAllTasks } from 'store/taskSlice/taskThunk';
import Loader from 'components/Loader';
import { resetTasksList } from 'store/taskSlice/taskSlice';
import CreateColumn from './BoardCreateColumn';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';

const Board: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);
  const { isLoading, error, tasksList } = board;
  const { id, title, columns } = tasksList;

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

  const onDragEnd: OnDragEndResponder = (result) => {
    console.log(result);
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === 'column') {
      console.log('column');
    }
    if (type === 'task') {
      console.log('task');
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
              {columns.map((item, index) => (
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
