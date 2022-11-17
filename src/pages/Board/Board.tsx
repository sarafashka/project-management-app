import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import Column from 'components/Column';
import { createColumn, getAllColumns } from 'store/columnSlice/columnThunk';
import { selectColumns, selectTasksList } from 'store/selectors/selectors';
import Button from 'components/Button/Button';
import { RequestCreateColumn } from 'types/types';
import cn from 'classnames';
import styles from './Board.module.scss';
import { getAllTasks } from 'store/taskSlice/taskThunk';
import Loader from 'components/Loader';

const Board: React.FC = () => {
  const navigate = useNavigate();
  const goToBoards = () => navigate('/boards');

  const dispatch = useAppDispatch();
  const { isLoading, error, columnsList } = useAppSelector(selectColumns);
  const board = useAppSelector(selectTasksList); //change;

  const { id, title, description, columns } = board;

  const boardId = useParams().id;

  const columnRequestData: RequestCreateColumn = {
    boardId: id,
    body: {
      title: 'test',
    },
  }; //delete after implementation of 'add column' popup;

  useEffect(() => {
    if (boardId) {
      dispatch(getAllTasks(boardId));
      dispatch(getAllColumns(boardId));
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
        <h2 className={styles.title}>{title}</h2> {/*add from boards slice*/}
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
      <div>{columnsList.length === 0 && 'Add new column'}</div>
      <div className={styles.list}>
        {columnsList.map((item) => (
          <Column key={item.id} id={item.id} title={item.title} boardId={id} />
        ))}
      </div>
    </>
  );
};

export default Board;
