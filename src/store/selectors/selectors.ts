import { RootState } from 'store/store';

export const selectBoards = (state: RootState) => state.boards;

export const selectColumns = (state: RootState) => state.column;

export const selectTasksList = (state: RootState) => state.task.tasksList;
