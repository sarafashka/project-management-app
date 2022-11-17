import { createAsyncThunk } from '@reduxjs/toolkit';
import { columnService } from 'api/columnService';
import { AxiosError } from 'axios';
import { RootState } from 'store/store';
import {
  ColumnItem,
  RequestCreateColumn,
  RequestDeleteColumn,
  RequestUpdateColumn,
} from 'types/types';

export const getAllColumns = createAsyncThunk<ColumnItem[], string, { rejectValue: unknown }>(
  'column/getAllColumns',
  async function (boardId, { rejectWithValue }) {
    try {
      const response = await columnService.getAllColumns(boardId);
      return response.data;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const createColumn = createAsyncThunk<
  ColumnItem,
  RequestCreateColumn,
  { rejectValue: unknown }
>('column/createColumn', async function (data, { rejectWithValue }) {
  try {
    const response = await columnService.createColumn(data);
    return response.data;
  } catch (error) {
    const axiosError = <AxiosError>error;
    return rejectWithValue(axiosError.response?.data);
  }
});

export const deleteColumn = createAsyncThunk<string, RequestDeleteColumn, { rejectValue: unknown }>(
  'column/deleteColumn',
  async function (data, { rejectWithValue }) {
    try {
      await columnService.deleteColumn(data);
      return data.columnId;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const updateColumn = createAsyncThunk<
  ColumnItem,
  RequestUpdateColumn,
  { rejectValue: unknown; state: RootState }
>('column/updateColumn', async function (data, { rejectWithValue, getState }) {
  const { columnsList } = getState().column;
  const columnForUpdate = columnsList.filter((column) => data.columnId === column.id);
  const { order } = columnForUpdate[0];
  data.body.order = order;

  try {
    const response = await columnService.updateColumn(data);
    return response.data;
  } catch (error) {
    const axiosError = <AxiosError>error;
    return rejectWithValue(axiosError.response?.data);
  }
});
