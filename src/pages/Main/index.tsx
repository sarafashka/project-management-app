import React, { useEffect } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHooks';

import AppRoutes from '../../constants/routes';
import { selectBoards } from '../../store/selectors/selectors';
import {
  resetBoards,
  setSearchValue,
  setQueryParam,
  resetSearch,
} from 'store/boardsSlice/boardsSlice';

import SearchBar from 'components/SearchBar';
import BoardCard from 'components/BoardCard';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { getAllBoardsWithParamsAction } from 'store/boardsSlice/boardsThunk';

import styles from './Main.module.scss';

const { container, list, item, searchBar, input } = styles;

const Main: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'main' });
  const messages = {
    true: {
      title: t('messages.invalidSearchTitle'),
      message: <>{t('messages.invalidSearchContent')}</>,
    },
    false: {
      title: t('messages.emptyBoardsListTitle'),
      message: <>{t('messages.emptyBoardsListContent')}</>,
    },
  };

  const { boards, isLoading, error, searchValue, queryParam } = useAppSelector(selectBoards);
  const dispatch = useAppDispatch();

  const handleSearchSubmit = (query: string) => {
    const queryParams = query.trim();
    dispatch(setQueryParam(queryParams));
  };

  const handleSearchSave = (value: string) => {
    dispatch(setSearchValue(value));
  };

  const handleResetSearch = () => {
    dispatch(resetSearch());
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
      <Loader isOpen={isLoading} />
      {error && (
        <div>
          {error.statusCode} {error.message}
        </div>
      )}
      <SearchBar
        onSubmit={handleSearchSubmit}
        className={searchBar}
        inputClassName={input}
        placeholder={t('searchPlaceholder') || ''}
        value={searchValue}
        saveSearchValue={handleSearchSave}
        resetSearch={handleResetSearch}
      />
      {boards.length !== 0 && (
        <ul className={list}>
          {boards.map((board) => (
            <li key={board.id} className={item}>
              <BoardCard boardData={board} />
            </li>
          ))}
        </ul>
      )}
      {boards.length === 0 && !error && !isLoading && (
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
