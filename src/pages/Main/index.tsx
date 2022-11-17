import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHooks';

import { selectBoards } from '../../store/selectors/selectors';

import BoardCard from 'components/BoardCard';
import Loader from 'components/Loader';
import { getAllBoardsAction } from 'store/boardsSlice/boardsThunk';

import styles from './Main.module.scss';

const { container, list, item } = styles;

const Main: React.FC = () => {
  const { boards, isLoaded, error } = useAppSelector(selectBoards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBoardsAction());
  }, [dispatch]);

  return (
    <div className={container}>
      {isLoaded && <Loader />}
      {error && (
        <div>
          {error.statusCode} {error.message}
        </div>
      )}
      {boards.length !== 0 && (
        <ul className={list}>
          {boards.map((board) => (
            <li key={board.id} className={item}>
              <BoardCard boardData={board} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Main;
