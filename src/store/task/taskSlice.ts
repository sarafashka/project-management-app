import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { TaskState } from 'types/types';
import { createTask, getColumn, getTask } from './taskThunk';

const initialState: TaskState = {
  tasksList: [],
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const taskWithId = {
          id: action.payload.id,
          task: action.payload,
        };
        const taskExist = state.tasksList.find((task) => task.id === action.payload.id);
        if (taskExist) {
          state.tasksList = state.tasksList.map((task) => {
            if (task.id === action.payload.id) {
              return taskWithId;
            } else return task;
          });
        } else state.tasksList.push(taskWithId);
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const selectTaskList = (state: RootState) => state.task.tasksList;

export const taskReducer = taskSlice.reducer;
