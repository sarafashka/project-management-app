import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BoardData, AxiosErrorData } from '../../types/types';

import {
  getAllBoardsWithParamsAction,
  createBoardAction,
  deleteBoardAction,
  updateBoardAction,
} from './boardsThunk';

interface BoardsState {
  boards: BoardData[];
  isLoading: boolean;
  error: AxiosErrorData | null;
  currentBoardId: string;
  queryParam: string;
  searchValue: string;
}

const initialState: BoardsState = {
  boards: [],
  isLoading: false,
  error: null,
  currentBoardId: '',
  queryParam: '',
  searchValue: '',
};

const isPending = (action: { type: string }) => {
  return /^boards\/[a-z]+\/pending$/i.test(action.type);
};

const isRejected = (action: { type: string }) => {
  return /^boards\/[a-z]+\/rejected$/i.test(action.type);
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    selectBoard: (state, { payload }: PayloadAction<string>) => {
      state.currentBoardId = payload;
    },
    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
    },
    setQueryParam: (state, { payload }: PayloadAction<string>) => {
      state.queryParam = payload;
    },
    resetSearch: (state) => {
      state.searchValue = '';
      state.queryParam = '';
    },
    resetBoards: (state) => {
      state.boards = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBoardsWithParamsAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.boards = payload;
      })
      .addCase(deleteBoardAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.boards = state.boards.filter((board) => board.id !== payload);
      })
      .addCase(createBoardAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.boards.push(payload);
      })
      .addCase(updateBoardAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.boards = state.boards.map((board) => (board.id === payload.id ? payload : board));
      })
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isRejected, (state, { payload }: PayloadAction<AxiosErrorData>) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export const { selectBoard, resetBoards, setSearchValue, resetSearch, setQueryParam } =
  boardsSlice.actions;

export default boardsSlice.reducer;
