import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { AxiosErrorData, ColumnState } from 'types/types';
import { createColumn, deleteColumn, getAllColumns, updateColumn } from './columnThunk';

const initialState: ColumnState = {
  columnsList: [],
  isLoading: false,
  error: null,
};

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllColumns.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllColumns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columnsList = action.payload;
      })
      .addCase(createColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columnsList.push(action.payload);
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columnsList = state.columnsList.filter((column) => column.id !== action.payload);
      })
      .addCase(updateColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columnsList = state.columnsList.map((column) =>
          column.id === action.payload.id ? action.payload : column
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<AxiosErrorData>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const columnReducer = columnSlice.reducer;
