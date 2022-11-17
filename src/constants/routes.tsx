import React from 'react';
import Welcome from 'pages/Welcome';
import Error404 from '../pages/Error404/Error404';
import Board from 'pages/Board/Board';
import Auth from '../pages/Auth/Auth';
import Profile from '../pages/Profile/Profile';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Main from 'pages/Main';

const AppRoutes = [
  {
    path: '/',
    component: <Welcome />,
  },
  {
    path: '/auth',
    component: (
      <ErrorBoundary>
        <Auth />
      </ErrorBoundary>
    ),
  },
  {
    path: '/profile',
    component: <Profile />,
  },
  {
    path: '*',
    component: <Error404 />,
  },
  {
    path: '/board/:id',
    component: <Board />,
  },
  {
    path: '/boards',
    component: <Main />,
  },
];

export default AppRoutes;

export const publicRoutes = ['/', '/auth'];
