import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthInitialState, AxiosErrorData, NewUser, UserLogin } from '../types/types';
import { authService } from '../api/authService';
import { AxiosError } from 'axios';
import { tokenService } from '../api/tokenService';
import { userService } from '../api/userService';
import { setUser } from './userSlice';

const initialState: AuthInitialState = {
  loginStatus: 'idle',
  registerStatus: 'idle',
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: NewUser, { dispatch, rejectWithValue }) => {
    try {
      await authService.registerUser(data);
      const userData = { login: data.login, password: data.password };
      const signInResponse = await authService.loginUser(userData);
      tokenService.setToken(signInResponse.data.token);
      const id = authService.getUserId(signInResponse.data.token);
      const user = await userService.getUserById(id);
      dispatch(setUser(user.data));
    } catch (e) {
      const error = e as AxiosError;
      const errorData = error.response?.data as AxiosErrorData;
      return rejectWithValue(errorData?.message || 'Connection error. Try again later!');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData: UserLogin, { dispatch, rejectWithValue }) => {
    try {
      const signInResponse = await authService.loginUser(userData);
      tokenService.setToken(signInResponse.data.token);
      const id = authService.getUserId(signInResponse.data.token);
      const user = await userService.getUserById(id);
      dispatch(setUser(user.data));
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
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerStatus = 'succeeded';
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerStatus = 'failed';
      })
      .addCase(login.pending, (state) => {
        state.loginStatus = 'loading';
      })
      .addCase(login.fulfilled, (state) => {
        state.loginStatus = 'succeeded';
      })
      .addCase(login.rejected, (state) => {
        state.loginStatus = 'failed';
      });
  },
});

export const authReducer = authSlice.reducer;
