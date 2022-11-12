import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthInitialState, AxiosErrorData, NewUser, UserLogin } from '../types/types';
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
      const errorData = error.response?.data as AxiosErrorData;
      return rejectWithValue(errorData?.message || 'Connection error. Try again later!');
    }
  }
);

export const logging = createAsyncThunk(
  'auth/logging',
  async (userData: UserLogin, { rejectWithValue }) => {
    try {
      const response = await authService.loginUser(userData);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      const errorData = error.response?.data as AxiosErrorData;
      return rejectWithValue(errorData?.message || 'Connection error. Try again later!');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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

export const selectLoginStatus = (state: RootState) => state.auth.loginStatus;
export const selectRegisterStatus = (state: RootState) => state.auth.registerStatus;

export const authReducer = authSlice.reducer;
