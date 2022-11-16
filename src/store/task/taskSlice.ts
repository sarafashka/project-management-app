import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { TaskState } from 'types/types';
import { getColumn } from './taskThunk';

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
      .addCase(getColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getColumn.fulfilled, (state, action) => {
        state.isLoading = false;

        const columnExist = state.tasksList.find((item) => item.id === action.payload.id);
        if (columnExist) {
          state.tasksList = state.tasksList.map((item) => {
            if (item.id === action.payload.id) {
              return action.payload;
            } else return item;
          });
        } else {
          state.tasksList.push(action.payload);
        }
      });
    /*.addCase(createColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns.push(action.payload);
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns = state.columns.filter((column) => column.id !== action.payload);
      })
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

export const selectTaskList = (state: RootState) => state.task.tasksList;

export const taskReducer = taskSlice.reducer;
