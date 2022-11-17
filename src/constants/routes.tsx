import React from 'react';
import Welcome from 'pages/Welcome';
import Error404 from '../pages/Error404/Error404';
import Board from 'pages/Board/Board';
import Auth from '../pages/Auth/Auth';
import Profile from '../pages/Profile/Profile';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Layout from 'components/Layout';

const AppRoutes = [
  {
    path: '/',
    component: <Layout />,
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
    path: 'board/:id',
    component: <Board />,
  },
];

export default AppRoutes;

export const publicRoutes = ['/', '/auth'];
