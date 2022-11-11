import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Error } from 'types/types';
import { BoardData } from '../types/boardTypes';

import boardsServices from '../api/boardsService';

const { getBoards, deleteBoard } = boardsServices;

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

export const getBoardsAction = createAsyncThunk(
  'boards/getBoardsAction',

  async (_, { rejectWithValue }) => {
    try {
      return await getBoards();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBoardAction = createAsyncThunk(
  'boards/deleteBoardAction',

  async (id: string, { rejectWithValue }) => {
    try {
      await deleteBoard(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardsAction.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(getBoardsAction.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getBoardsAction.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.isLoaded = false;
      })
      .addCase(deleteBoardAction.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(deleteBoardAction.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.error = null;
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteBoardAction.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.isLoaded = false;
      });
  },
});

export default boardsSlice.reducer;
