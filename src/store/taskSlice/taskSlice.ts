import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosErrorData, TaskState } from 'types/types';
import { findColumnIndex, findColumnTasks } from 'utils/utils';
import { createColumn, deleteColumn, updateColumn } from './columnThunk';
import { createTask, deleteTask, getAllTasks } from './taskThunk';

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
      .addCase(createColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, title, order } = action.payload;
        const newColumn = {
          id: id,
          title: title,
          order: order,
          tasks: [],
        };
        state.tasksList.columns.push(newColumn);
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasksList.columns = state.tasksList.columns.filter(
          (column) => column.id !== action.payload
        );
      })
      .addCase(updateColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, title, order } = action.payload;
        const index = findColumnIndex(state.tasksList, id);
        state.tasksList.columns[index].order = order;
        state.tasksList.columns[index].title = title;
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
        findColumnTasks(state.tasksList, columnId)?.push(task);
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const { columnId, taskId } = action.payload;
        const columns = state.tasksList.columns;
        const index = columns.findIndex((column) => column.id === columnId);
        const tasksNotDeleted = columns[index].tasks.filter((task) => task.id !== taskId);
        columns[index].tasks = tasksNotDeleted;
      })

      /*
      .addCase(updateTaskpending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns = state.columns.map((column) =>
          column.id === action.payload.id ? action.payload : column
        );
      }) */
      .addMatcher(isError, (state, action: PayloadAction<AxiosErrorData>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const taskReducer = taskSlice.reducer;
