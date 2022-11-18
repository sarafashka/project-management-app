import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from '../constants/routes';
import Layout from './Layout';
import Error404 from '../pages/Error404/Error404';
import Board from '../pages/Board';
import Welcome from '../pages/Welcome';
import Auth from '../pages/Auth/Auth';
import Main from '../pages/Main';
import Profile from '../pages/Profile/Profile';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={AppRoutes.WELCOME} element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path={AppRoutes.AUTH} element={<Auth />} />
        <Route path={AppRoutes.BOARDS} element={<Main />}>
          <Route path={AppRoutes.BOARD_ID} element={<Board />} />
        </Route>
        <Route path={AppRoutes.PROFILE} element={<Profile />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
