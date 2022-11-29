import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosErrorData, GetBoardByIdTaskData, TaskState } from 'types/types';
import { findColumnIndex, findColumnTasks, findTaskIndex } from 'utils/utils';
import { createColumn, deleteColumn, updateColumn, updateOrderColumn } from './columnThunk';
import { createTask, deleteTask, getAllTasks, updateOrderTask, updateTask } from './taskThunk';

const defaultTasksList = {
  id: '',
  title: '',
  description: '',
  columns: [],
};

const initialState: TaskState = {
  tasksList: defaultTasksList,
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resetTasksList(state) {
      state.tasksList = defaultTasksList;
    },
  },
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

      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, columnId, description, order, title, userId } = action.payload;
        const indexTask = findTaskIndex(state.tasksList, columnId, id);
        const indexColumn = findColumnIndex(state.tasksList, columnId);

        const taskUpdating: GetBoardByIdTaskData = {
          id: id,
          description: description,
          order: order,
          title: title,
          userId: userId,
        };
        if (indexTask !== undefined && indexTask >= 0) {
          state.tasksList.columns[indexColumn].tasks.splice(indexTask, 1, taskUpdating);
        }
      })
      .addCase(updateOrderTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasksList = action.payload;
      })
      .addCase(updateOrderColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasksList = action.payload;
      })

      .addMatcher(isError, (state, action: PayloadAction<AxiosErrorData>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

const isError = (action: { type: string }) => {
  return /^task\/[a-z]+\/rejected$/i.test(action.type);
};

export const { resetTasksList } = taskSlice.actions;

export const taskReducer = taskSlice.reducer;
