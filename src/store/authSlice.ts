import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthInitialState, NewUser, User } from '../types/types';
import { authService } from '../api/authService';
import { AxiosError } from 'axios';
import { RootState } from './store';

const initialState: AuthInitialState = {
  loginStatus: 'idle',
  registerStatus: 'idle',
};

export const registeration = createAsyncThunk(
  'auth/registeration',
  async (userData: NewUser, { rejectWithValue }) => {
    try {
      return await authService.registerUser(userData);
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const logining = createAsyncThunk(
  'auth/logining',
  async (userData: User, { rejectWithValue }) => {
    try {
      return await authService.loginUser(userData);
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loginStatus = 'idle';
      state.registerStatus = 'idle';
      delete state.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registeration.pending, (state) => {
        state.registerStatus = 'loading';
      })
      .addCase(registeration.fulfilled, (state) => {
        state.registerStatus = 'succeeded';
      })
      .addCase(registeration.rejected, (state) => {
        state.registerStatus = 'failed';
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectLoginStatus = (state: RootState) => state.auth.loginStatus;
export const selectRegisterStatus = (state: RootState) => state.auth.registerStatus;

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
