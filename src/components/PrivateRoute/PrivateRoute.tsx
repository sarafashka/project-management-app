import React from 'react';
import { authService } from '../../api/authService';
import { Navigate, useLocation } from 'react-router-dom';
import { publicRoutes } from '../../constants/routes';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  if (!authService.isUserLogged() && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
