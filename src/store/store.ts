import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './authSlice';
import { columnReducer } from './columnSlice/columnSlice';
import { taskReducer } from './taskSlice/taskSlice';
import { userReducer } from './userSlice';
import boardsReducer from './boardsSlice/boardsSlice';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    auth: authReducer,
    user: userReducer,
    column: columnReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
