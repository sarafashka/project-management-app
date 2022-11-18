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

export const createColumn = createAsyncThunk<
  ColumnItem,
  RequestCreateColumn,
  { rejectValue: unknown }
>('task/createColumn', async function (data, { rejectWithValue }) {
  try {
    const response = await columnService.createColumn(data);
    return response.data;
  } catch (error) {
    const axiosError = <AxiosError>error;
    return rejectWithValue(axiosError.response?.data);
  }
});

export const deleteColumn = createAsyncThunk<string, RequestDeleteColumn, { rejectValue: unknown }>(
  'task/deleteColumn',
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
>('task/updateColumn', async function (data, { rejectWithValue }) {
  try {
    const response = await columnService.updateColumn(data);
    return response.data;
  } catch (error) {
    const axiosError = <AxiosError>error;
    return rejectWithValue(axiosError.response?.data);
  }
});
