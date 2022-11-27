import React, { useEffect } from 'react';
import { Outlet, useMatch } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHooks';

import AppRoutes from '../../constants/routes';
import { selectBoards } from '../../store/selectors/selectors';
import { resetBoards, setSearchValue } from 'store/boardsSlice/boardsSlice';

import SearchBar from 'components/SearchBar';
import BoardCard from 'components/BoardCard';
import Loader from 'components/Loader';
import { getAllBoardsWithParamsAction } from 'store/boardsSlice/boardsThunk';

import styles from './Main.module.scss';

const { container, list, item, searchBar } = styles;

const Main: React.FC = () => {
  const { boards, isLoaded, error, searchValue } = useAppSelector(selectBoards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBoardsWithParamsAction());

    return () => {
      dispatch(resetBoards());
    };
  }, [dispatch]);

  const handleSearchSubmit = (query: string) => {
    const queryParams = query.trim();
    dispatch(getAllBoardsWithParamsAction({ titleOrDescriptionParam: queryParams }));
  };

  const handleSearchSave = (value: string) => {
    dispatch(setSearchValue(value));
  };

  return useMatch(AppRoutes.BOARDS) ? (
    <div className={container}>
      <SearchBar
        onSubmit={handleSearchSubmit}
        className={searchBar}
        placeholder="Search by board title or description"
        value={searchValue}
        saveSearchValue={handleSearchSave}
      />
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
  ) : (
    <Outlet />
  );
};

export default Main;
