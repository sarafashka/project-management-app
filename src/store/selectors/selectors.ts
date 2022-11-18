import { RootState } from 'store/store';

export const selectBoards = (state: RootState) => state.boards;

export const selectTasksList = (state: RootState) => state.task.tasksList;

export const selectBoard = (state: RootState) => state.task;
