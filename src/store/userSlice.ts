import { AxiosErrorData, SignUpResponse, UserInitialState } from '../types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../api/userService';
import { AxiosError } from 'axios';

const initialState: UserInitialState = {
  loginStatus: 'idle',
  user: {
    userId: '',
    userName: '',
    login: '',
  },
};

export const getAllUsers = createAsyncThunk('user/getAllUsers', async ({}, { rejectWithValue }) => {
  try {
    const response = await userService.getAllUsers();
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    const errorData = error.response?.data as AxiosErrorData;
    return rejectWithValue(errorData?.message || 'Connection error. Try again later!');
  }
});

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userService.getUserById(id);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      const errorData = error.response?.data as AxiosErrorData;
      return rejectWithValue(errorData?.message || 'Connection error. Try again later!');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userService.deleteUser(id);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      const errorData = error.response?.data as AxiosErrorData;
      return rejectWithValue(errorData?.message || 'Connection error. Try again later!');
    }
  }
);

interface updateUserArg {
  id: string;
  userData: SignUpResponse;
}

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, userData }: updateUserArg, { rejectWithValue }) => {
    try {
      const response = await userService.updateUser(id, userData);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      const errorData = error.response?.data as AxiosErrorData;
      return rejectWithValue(errorData?.message || 'Connection error. Try again later!');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const userReducer = userSlice.reducer;
