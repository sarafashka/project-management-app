import React from 'react';
import Welcome from '../pages/Welcome';
import Error404 from '../pages/Error404';
import Board from 'pages/Board/Board';

const AppRoutes = [
  {
    path: '/',
    component: <Welcome />,
  },
  {
    path: '*',
    component: <Error404 />,
  },
  {
    path: 'board/:title',
    component: <Board />,
  },
];

export default AppRoutes;
