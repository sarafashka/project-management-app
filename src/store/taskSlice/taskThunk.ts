import { createAsyncThunk } from '@reduxjs/toolkit';
import boardsService from 'api/boardsService';
import { taskService } from 'api/taskService';
import { AxiosError } from 'axios';
import {
  GetBoardByIdData,
  GetTaskByIdData,
  RequestCreateTask,
  RequestDeleteTask,
  RequestGetTask,
  RequestUpdateTask,
  Task,
} from 'types/types';

export const getAllTasks = createAsyncThunk<GetBoardByIdData, string, { rejectValue: unknown }>(
  'task/getAllTasks',
  async function (id, { rejectWithValue }) {
    try {
      const response = await boardsService.getBoardById(id);
      return response;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getTask = createAsyncThunk<Task, RequestGetTask, { rejectValue: unknown }>(
  'task/getTask',
  async function (data, { rejectWithValue }) {
    try {
      const response = await taskService.getTask(data);
      return response.data;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const createTask = createAsyncThunk<
  GetTaskByIdData,
  RequestCreateTask,
  { rejectValue: unknown }
>('task/createTask', async function (data, { rejectWithValue }) {
  try {
    const response = await taskService.createTask(data);
    return response.data;
  } catch (error) {
    const axiosError = <AxiosError>error;
    return rejectWithValue(axiosError.response?.data);
  }
});

export const deleteTask = createAsyncThunk<
  RequestDeleteTask,
  RequestDeleteTask,
  { rejectValue: unknown }
>('column/deleteTask', async function (data, { rejectWithValue }) {
  try {
    await taskService.deleteTask(data);
    return data;
  } catch (error) {
    const axiosError = <AxiosError>error;
    return rejectWithValue(axiosError.response?.data);
  }
});

export const updateTask = createAsyncThunk<Task, RequestUpdateTask, { rejectValue: unknown }>(
  'task/updateTask',
  async function (data, { rejectWithValue }) {
    try {
      const response = await taskService.updateTask(data);
      return response.data;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.message);
    }
  }
);

export const updateOrderTask = createAsyncThunk<
  GetBoardByIdData,
  RequestUpdateTask,
  { rejectValue: unknown }
>('task/updateOrderTask', async function (data, { rejectWithValue }) {
  try {
    await taskService.updateTask(data);
    try {
      const response = await boardsService.getBoardById(data.boardId);
      return response;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  } catch (error) {
    const axiosError = <AxiosError>error;
    return rejectWithValue(axiosError.response?.data);
  }
});
