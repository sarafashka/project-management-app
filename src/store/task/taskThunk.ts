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
