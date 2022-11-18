import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import Column from 'components/Column';
import { createColumn } from 'store/taskSlice/columnThunk';
import { selectBoard } from 'store/selectors/selectors';
import Button from 'components/Button/Button';
import { RequestCreateColumn } from 'types/types';
import cn from 'classnames';
import styles from './Board.module.scss';
import { getAllTasks } from 'store/taskSlice/taskThunk';
import Loader from 'components/Loader';

const Board: React.FC = () => {
  const navigate = useNavigate();
  const goToBoards = () => navigate('/boards');
  const boardId = useParams().id;

  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);
  const { isLoading, error, tasksList } = board;
  const { id, title, columns } = tasksList;

  const columnRequestData: RequestCreateColumn = {
    boardId: id,
    body: {
      title: 'test',
    },
  }; //delete after implementation of 'add column' popup;

  useEffect(() => {
    if (boardId) {
      dispatch(getAllTasks(boardId));
    }
  }, [boardId, dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      {error && (
        <div>
          {error.statusCode} {error.message}
        </div>
      )}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Button
          className={cn(styles.button)}
          type="button"
          onClick={() => {
            dispatch(createColumn(columnRequestData));
          }}
          kind="boardBtn"
        >
          {''}
        </Button>
      </div>
      <Button className={styles.allBoards} onClick={goToBoards}>
        &#8592; All boards
      </Button>
      <div>{columns.length === 0 && 'Add new column'}</div>
      <div className={styles.list}>
        {columns.map((item) => (
          <Column key={item.id} id={item.id} />
        ))}
      </div>
    </>
  );
};

export default Board;
