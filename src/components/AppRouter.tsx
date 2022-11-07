import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from '../constants/routes';

const AppRouter: React.FC = () => {
  const routeComponents = AppRoutes.map(({ path, component }, key) => (
    <Route path={path} element={component} key={key} />
  ));

  return <Routes>{routeComponents}</Routes>;
};

export default AppRouter;
