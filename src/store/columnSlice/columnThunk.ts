import { createAsyncThunk } from '@reduxjs/toolkit';
import { columnService } from 'api/columnService';
import { AxiosError } from 'axios';
import { RootState } from 'store/store';
import {
  ColumnItem,
  ColumnState,
  RequestCreateColumn,
  RequestDeleteColumn,
  RequestUpdateColumn,
} from 'types/types';

export const getAllColumns = createAsyncThunk<ColumnItem[], string, { rejectValue: string }>(
  'column/getAllColumns',
  async function (boardId, { rejectWithValue }) {
    try {
      const response = await columnService.getAllColumns(boardId);
      return response.data;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.message);
    }
  }
);

export const createColumn = createAsyncThunk<
  ColumnItem,
  RequestCreateColumn,
  { rejectValue: string }
>('column/createColumn', async function (request, { rejectWithValue }) {
  try {
    const response = await columnService.createColumn(request);
    return response.data;
  } catch (error) {
    const axiosError = <AxiosError>error;
    return rejectWithValue(axiosError.message);
  }
});

export const deleteColumn = createAsyncThunk<string, RequestDeleteColumn, { rejectValue: string }>(
  'column/deleteColumn',
  async function (request, { rejectWithValue }) {
    try {
      await columnService.deleteColumn(request);
      return request.columnId;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.message);
    }
  }
);

export const updateColumn = createAsyncThunk<
  ColumnItem,
  RequestUpdateColumn,
  { rejectValue: string; state: RootState }
>('column/updateColumn', async function (data, { rejectWithValue, getState }) {
  const { columns } = getState().column;
  const columnForUpdate = columns.filter((column) => data.columnId === column.id);
  const { order } = columnForUpdate[0];
  data.body.order = order;

  try {
    const response = await columnService.updateColumn(data);
    return response.data;
  } catch (error) {
    const axiosError = <AxiosError>error;
    return rejectWithValue(axiosError.message);
  }
});
