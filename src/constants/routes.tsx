import React from 'react';
import Welcome from '../pages/Welcome';
import Error404 from '../pages/Error404';

const AppRoutes = [
  {
    path: '/',
    component: <Welcome />,
  },
  {
    path: '*',
    component: <Error404 />,
  },
];

export default AppRoutes;
