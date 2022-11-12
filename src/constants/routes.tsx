import React from 'react';
import Welcome from '../pages/Welcome';
import Error404 from '../pages/Error404';
import Auth from '../pages/Auth/Auth';

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
    path: '*',
    component: <Error404 />,
  },
];

export default AppRoutes;
