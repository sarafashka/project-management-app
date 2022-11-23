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
import CreateColumn from './CreateColumn';

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

      <div className={styles.list}>
        {columns.map((item) => (
          <Column key={item.id} id={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Board;
