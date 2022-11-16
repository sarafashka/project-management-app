import React, { useEffect } from 'react';
import AppRouter from './components/AppRouter';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { userService } from './api/userService';
import { tokenService } from './api/tokenService';
import { useAppDispatch } from './hooks/reduxTypedHooks';
import { setUser } from './store/userSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = userService.getUserData();
    const token = tokenService.getToken();

    if (user && token) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <PrivateRoute>
      <AppRouter />
    </PrivateRoute>
  );
};

export default App;
