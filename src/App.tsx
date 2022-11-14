import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRouter from './components/AppRouter';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PrivateRoute>
        <AppRouter />
      </PrivateRoute>
    </Provider>
  );
};

export default App;
