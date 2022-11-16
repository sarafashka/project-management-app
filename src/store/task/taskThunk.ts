import { createAsyncThunk } from '@reduxjs/toolkit';
import { columnService } from 'api/columnService';
import { taskService } from 'api/taskService';
import { AxiosError } from 'axios';
import { RootState } from 'store/store';
import { ColumnDetail, RequestGetAllTasks, Task } from 'types/types';

export const getColumn = createAsyncThunk<
  ColumnDetail,
  RequestGetAllTasks,
  { rejectValue: string }
>('task/getColumn', async function (data, { rejectWithValue }) {
  try {
    const response = await columnService.getColumn(data);
    console.log('allTasks', response.data);
    return response.data;
  } catch (error) {
    const axiosError = <AxiosError>error;
    return rejectWithValue(axiosError.message);
  }
});

/*export const createColumn = createAsyncThunk<
  ColumnItem,
  RequestCreateColumn,
  { rejectValue: string }
>('column/createColumn', async function (data, { rejectWithValue }) {
  try {
    const response = await columnService.createColumn(data);
    return response.data;
  } catch (error) {
    const axiosError = <AxiosError>error;
    return rejectWithValue(axiosError.message);
  }
});

export const deleteColumn = createAsyncThunk<string, RequestDeleteColumn, { rejectValue: string }>(
  'column/deleteColumn',
  async function (data, { rejectWithValue }) {
    try {
      await columnService.deleteColumn(data);
      return data.columnId;
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
*/
