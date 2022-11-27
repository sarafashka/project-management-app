import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { UpdateBoardData, CreateBoardData, BoardsSearchQueryParams } from '../../types/types';

import boardsServices from '../../api/boardsService';

const { getAllBoardsWithParams, deleteBoard, createBoard, updateBoard } = boardsServices;

export const getAllBoardsWithParamsAction = createAsyncThunk(
  'boards/getAllBoardsWithParamsAction',

  async (query: BoardsSearchQueryParams | undefined, { rejectWithValue }) => {
    try {
      return await getAllBoardsWithParams(query);
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
