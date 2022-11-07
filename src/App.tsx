import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">RSS final task: Project management app</div>);
    </Provider>
  );
}

export default App;
