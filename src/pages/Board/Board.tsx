import Column from 'components/Column';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { testBoard } from './test';
import cn from 'classnames';
import styles from './Board.module.scss';

const Board: React.FC = () => {
  const { id, title, description, columns } = testBoard;

  const navigate = useNavigate();
  const goToBoards = () => navigate('/main');

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button className={cn(styles.button, 'btn')} />
      </div>
      <button className={styles.allBoards} onClick={goToBoards}>
        &#8592; All boards
      </button>
      <div>{columns.length === 0 && 'Add new column'}</div>
      <div className={styles.list}>
        {columns.map((item) => (
          <Column key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default Board;
