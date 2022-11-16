import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { ColumnState } from 'types/types';
import { createColumn, deleteColumn, getAllColumns, updateColumn } from './columnThunk';

const initialState: ColumnState = {
  columns: [],
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
        state.columns = [...state.columns, ...action.payload]; // = action.payload;
      })
      .addCase(createColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns.push(action.payload);
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns = state.columns.filter((column) => column.id !== action.payload);
      })
      .addCase(updateColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns = state.columns.map((column) =>
          column.id === action.payload.id ? action.payload : column
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const selectColumnList = (state: RootState) => state.column.columns;

export const columnReducer = columnSlice.reducer;
