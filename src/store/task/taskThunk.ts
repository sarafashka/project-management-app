import { createAsyncThunk } from '@reduxjs/toolkit';
import { columnService } from 'api/columnService';
import { taskService } from 'api/taskService';
import { AxiosError } from 'axios';
import { RootState } from 'store/store';
import {
  ColumnDetail,
  RequestCreateTask,
  RequestGetAllTasks,
  RequestGetTask,
  Task,
  TaskCreated,
} from 'types/types';

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
export const getTask = createAsyncThunk<Task, RequestGetTask, { rejectValue: string }>(
  'task/getTask',
  async function (data, { rejectWithValue }) {
    try {
      const response = await taskService.getTask(data);
      return response.data;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.message);
    }
  }
);

export const createTask = createAsyncThunk<TaskCreated, RequestCreateTask, { rejectValue: string }>(
  'task/createTask',
  async function (data, { rejectWithValue }) {
    try {
      const response = await taskService.createTask(data);
      return response.data;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.message);
    }
  }
);
