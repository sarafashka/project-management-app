import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BoardData, AxiosErrorData } from '../../types/types';

import {
  getAllBoardsAction,
  createBoardAction,
  deleteBoardAction,
  updateBoardAction,
} from './boardsThunk';

interface BoardsState {
  boards: BoardData[];
  isLoaded: boolean;
  error: AxiosErrorData | null;
  currentBoardId: string;
}

const initialState: BoardsState = {
  boards: [],
  isLoaded: false,
  error: null,
  currentBoardId: '',
};

const isPending = (action: { type: string }) => {
  return action.type.endsWith('/pending');
};

const isRejected = (action: { type: string }) => {
  return action.type.endsWith('/rejected');
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    selectBoard: (state, { payload }: PayloadAction<string>) => {
      state.currentBoardId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBoardsAction.fulfilled, (state, { payload }) => {
        state.isLoaded = false;
        state.boards = payload;
      })
      .addCase(deleteBoardAction.fulfilled, (state, { payload }) => {
        state.isLoaded = false;
        state.boards = state.boards.filter((board) => board.id !== payload);
      })
      .addCase(createBoardAction.fulfilled, (state, { payload }) => {
        state.isLoaded = false;
        state.boards.push(payload);
      })
      .addCase(updateBoardAction.fulfilled, (state, { payload }) => {
        state.isLoaded = false;
        state.boards = state.boards.map((board) => (board.id === payload.id ? payload : board));
      })
      .addMatcher(isPending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addMatcher(isRejected, (state, { payload }: PayloadAction<AxiosErrorData>) => {
        state.error = payload;
        state.isLoaded = false;
      });
  },
});

export const { selectBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
