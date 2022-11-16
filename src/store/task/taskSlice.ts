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
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const selectTaskList = (state: RootState) => state.task.tasksList;

export const taskReducer = taskSlice.reducer;
