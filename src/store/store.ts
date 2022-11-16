import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { columnReducer } from './columnSlice/columnSlice';
import { taskReducer } from './task/taskSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    column: columnReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
