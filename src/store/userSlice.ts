import { AxiosErrorData, SignUpResponse, User, UserInitialState } from '../types/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userService } from '../api/userService';
import { AxiosError } from 'axios';
import { tokenService } from '../api/tokenService';

const initialState: UserInitialState = {
  userLoadingStatus: 'idle',
  userUpdatingStatus: 'idle',
  user: {
    id: '',
    name: '',
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
      await userService.deleteUser(id);
      userService.removeUserData();
      tokenService.removeToken();
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
  async ({ id, userData }: updateUserArg, { dispatch, rejectWithValue }) => {
    try {
      const response = await userService.updateUser(id, userData);
      const user = response.data;
      dispatch(setUser(user));
      return user;
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
  reducers: {
    logout: (state) => {
      state.userLoadingStatus = 'idle';
      state.user = {
        id: '',
        name: '',
        login: '',
      };
      tokenService.removeToken();
      userService.removeUserData();
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = { ...action.payload };
      userService.setUserData(action.payload);
    },
    resetLoadingStatus: (state) => {
      state.userLoadingStatus = 'idle';
      state.userUpdatingStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.userLoadingStatus = 'loading';
      })
      .addCase(getUserById.rejected, (state) => {
        state.userLoadingStatus = 'failed';
      })
      .addCase(getUserById.fulfilled, (state) => {
        state.userLoadingStatus = 'succeeded';
      })
      .addCase(updateUser.pending, (state) => {
        state.userUpdatingStatus = 'loading';
      })
      .addCase(updateUser.rejected, (state) => {
        state.userUpdatingStatus = 'failed';
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.userUpdatingStatus = 'succeeded';
      });
  },
});

export const { logout, setUser, resetLoadingStatus } = userSlice.actions;

export const userReducer = userSlice.reducer;
