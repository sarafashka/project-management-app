import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import Column from 'components/Column';
import { createColumn, getAllColumns } from 'store/columnSlice/columnThunk';
import { selectColumnList } from 'store/columnSlice/columnSlice';
import Button from 'components/Button/Button';
import { RequestCreateColumn } from 'types/types';
import cn from 'classnames';
import styles from './Board.module.scss';

const Board: React.FC = () => {
  // const [error, setError] = useState('');

  const navigate = useNavigate();
  const goToBoards = () => navigate('/');
  const dispatch = useAppDispatch();

  const columnsList = useAppSelector(selectColumnList);

  const boardId = '8003a52c-82e1-443c-b002-cd1492e00685'; //add id from props (wait from boards)
  const columnRequestData: RequestCreateColumn = {
    boardId: boardId,
    body: {
      title: 'test',
    },
  }; //delete after implementation of 'add column' popup;

  useEffect(() => {
    dispatch(getAllColumns(boardId));
  }, [dispatch]);

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Example board</h2> {/*add from boards slice*/}
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
          <Column key={item.id} id={item.id} title={item.title} boardId={boardId} />
        ))}
      </div>
    </>
  );
};

export default Board;
