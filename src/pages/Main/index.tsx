import React, { useEffect } from 'react';
import { Outlet, useMatch } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHooks';

import AppRoutes from '../../constants/routes';
import { selectBoards } from '../../store/selectors/selectors';
import { resetBoards, setSearchValue, setQueryParam } from 'store/boardsSlice/boardsSlice';

import SearchBar from 'components/SearchBar';
import BoardCard from 'components/BoardCard';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { getAllBoardsWithParamsAction } from 'store/boardsSlice/boardsThunk';

import styles from './Main.module.scss';

const { container, list, item, searchBar } = styles;

const messages = {
  true: {
    title: 'Sorry!',
    message: <>Nothing was found for your query. Try to search another term.</>,
  },
  false: {
    title: 'Ooops!',
    message: (
      <>There is no boards yet. For beginning, create one with &apos;New board&apos; button!</>
    ),
  },
};

const Main: React.FC = () => {
  const { boards, isLoaded, error, searchValue, queryParam } = useAppSelector(selectBoards);
  const dispatch = useAppDispatch();

  const handleSearchSubmit = (query: string) => {
    const queryParams = query.trim();
    dispatch(setQueryParam(queryParams));
  };

  const handleSearchSave = (value: string) => {
    dispatch(setSearchValue(value));
  };

  useEffect(() => {
    dispatch(
      getAllBoardsWithParamsAction(queryParam ? { titleOrDescriptionParam: queryParam } : undefined)
    );

    return () => {
      dispatch(resetBoards());
    };
  }, [dispatch, queryParam]);

  return useMatch(AppRoutes.BOARDS) ? (
    <div className={container}>
      <SearchBar
        onSubmit={handleSearchSubmit}
        className={searchBar}
        placeholder="Search by board title or description…"
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
      {boards.length === 0 && !error && !isLoaded && (
        <Message title={messages[`${!!queryParam}`].title}>
          {messages[`${!!queryParam}`].message}
        </Message>
      )}
    </div>
  ) : (
    <Outlet />
  );
};

export default Main;
