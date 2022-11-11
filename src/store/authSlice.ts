import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthInitialState, NewUser, User } from '../types/types';
import { authService } from '../api/authService';
import { AxiosError } from 'axios';
import { RootState } from './store';
import { tokenService } from '../api/tokenService';

const initialState: AuthInitialState = {
  loginStatus: 'idle',
  registerStatus: 'idle',
};

export const registration = createAsyncThunk(
  'auth/registration',
  async (userData: NewUser, { rejectWithValue }) => {
    try {
      const response = await authService.registerUser(userData);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

interface Error {
  statusCode: number;
  message: string;
}

export const logging = createAsyncThunk(
  'auth/logging',
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await authService.loginUser(userData);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      const errorData = error.response?.data as Error;
      return rejectWithValue(errorData?.message || 'Connection error. Try again later!');
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
      tokenService.removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.registerStatus = 'loading';
      })
      .addCase(registration.fulfilled, (state) => {
        state.registerStatus = 'succeeded';
      })
      .addCase(registration.rejected, (state) => {
        state.registerStatus = 'failed';
      })
      .addCase(logging.pending, (state) => {
        state.loginStatus = 'loading';
      })
      .addCase(logging.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded';
        tokenService.setToken(action.payload.token);
      })
      .addCase(logging.rejected, (state) => {
        state.loginStatus = 'failed';
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectLoginStatus = (state: RootState) => state.auth.loginStatus;
export const selectRegisterStatus = (state: RootState) => state.auth.registerStatus;

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
