import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Error } from 'types/types';
import { BoardData } from '../types/boardTypes';

import boardsServices from '../services/boardsService';

const { getBoards } = boardsServices;

interface BoardsState {
  data: BoardData[];
  isLoaded: boolean;
  error: Error | null;
}

const initialState: BoardsState = {
  data: [],
  isLoaded: false,
  error: null,
};

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',

  async (_, { rejectWithValue }) => {
    try {
      return await getBoards();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    deleteData: (state, { payload }: { payload: string }) => {
      state.data = state.data.filter((item) => item.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.isLoaded = false;
      });
  },
});

export const { deleteData } = boardsSlice.actions;

export default boardsSlice.reducer;
