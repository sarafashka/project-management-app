import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { UpdateBoardData, CreateBoardData } from '../../types/types';

import boardsServices from '../../api/boardsService';

const { getAllBoards, deleteBoard, createBoard, updateBoard } = boardsServices;

export const getAllBoardsAction = createAsyncThunk(
  'boards/getAllBoardsAction',

  async (_, { rejectWithValue }) => {
    try {
      return await getAllBoards();
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const createBoardAction = createAsyncThunk(
  'boards/createBoardAction',

  async (board: CreateBoardData, { rejectWithValue }) => {
    try {
      return await createBoard(board);
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const deleteBoardAction = createAsyncThunk(
  'boards/deleteBoardAction',

  async (id: string, { rejectWithValue }) => {
    try {
      await deleteBoard(id);
      return id;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const updateBoardAction = createAsyncThunk(
  'boards/updateBoardAction',

  async (board: UpdateBoardData, { rejectWithValue }) => {
    try {
      return await updateBoard(board);
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
