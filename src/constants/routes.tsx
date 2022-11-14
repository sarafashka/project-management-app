import React from 'react';
import Welcome from '../pages/Welcome';
import Error404 from '../pages/Error404';
import Board from 'pages/Board/Board';
import Auth from '../pages/Auth/Auth';
import Profile from '../pages/Profile/Profile';

const AppRoutes = [
  {
    path: '/',
    component: <Welcome />,
  },
  {
    path: '/auth',
    component: <Auth />,
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
