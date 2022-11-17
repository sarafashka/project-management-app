import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { GetTaskByIdData, Task, TaskState } from 'types/types';
import { createTask, deleteTask, getAllTasks, getTask } from './taskThunk';

const initialState: TaskState = {
  tasksList: {
    id: '',
    title: '',
    description: '',
    columns: [],
  },
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasksList = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, userId, title, description, order, columnId } = action.payload;
        const task = {
          id: id,
          title: title,
          userId: userId,
          description: description,
          order: order,
        };
        state.tasksList.columns.find((column) => column.id === columnId)?.tasks.push(task);
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const { columnId, taskId } = action.payload;
        state.tasksList.columns
          .find((column) => column.id === columnId)
          ?.tasks.filter((task) => task.id !== taskId);
      });
    /*
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
      */
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const taskReducer = taskSlice.reducer;
