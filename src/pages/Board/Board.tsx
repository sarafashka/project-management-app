import Column from 'components/Column';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './Board.module.scss';
import { columnService } from 'api/columnService';
import { ColumnItem } from 'types/types';

const Board: React.FC = () => {
  const [columnsList, setColumnList] = useState<ColumnItem[]>([]);
  // const [error, setError] = useState('');

  const navigate = useNavigate();
  const goToBoards = () => navigate('/main');

  const boardId = '79b1e016-e840-4ac1-9c65-ba18aee1e015'; //add id from props (wait from boards)
  const { getAllColumns } = columnService;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllColumns(boardId);
        setColumnList(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []); //add id to dependency

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Example board</h2> {/*add from boards*/}
        <button className={cn(styles.button, 'btn')} />
      </div>
      <button className={styles.allBoards} onClick={goToBoards}>
        &#8592; All boards
      </button>
      <div>{columnsList.length === 0 && 'Add new column'}</div>
      <div className={styles.list}>
        {columnsList.map((item) => (
          <Column key={item.id} id={item.id} title={item.title} />
        ))}
      </div>
    </>
  );
};

export default Board;
