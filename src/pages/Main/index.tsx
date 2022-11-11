import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHooks';

import BoardCard from 'components/BoardCard';
import Loader from 'components/Loader';
import { getBoardsAction } from 'store/boardsSlice';

import styles from './Main.module.scss';

const { container, list, item } = styles;

const Main: React.FC = () => {
  const { data, isLoaded, error } = useAppSelector((state) => state.boardsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardsAction());
  }, [dispatch]);

  return (
    <div className={container}>
      {isLoaded && <Loader />}
      {error && (
        <div>
          {error.statusCode} {error.message}
        </div>
      )}
      {data.length !== 0 && (
        <ul className={list}>
          {data.map((cardData) => (
            <li key={cardData.id} className={item}>
              <BoardCard boardData={cardData} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Main;
