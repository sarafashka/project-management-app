import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './authSlice';
import { columnReducer } from './columnSlice/columnSlice';
import { userReducer } from './userSlice';
import boardsReducer from './boardsSlice';

export const store = configureStore({
  reducer: {
    boardsState: boardsReducer,
    auth: authReducer,
    column: columnReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
