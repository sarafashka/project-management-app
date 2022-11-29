import Endpoint from 'constants/endpoints';
import {
  BoardData,
  UpdateBoardData,
  CreateBoardData,
  GetBoardByIdData,
  BoardsSearchQueryParams,
} from 'types/types';
import { makeUrl } from 'utils/utils';

import axiosApiInstance from './axiosApiInstance';

const { BOARDS, BOARDS_SEARCH } = Endpoint;

const boardsService = {
  async getAllBoardsWithParams(params?: BoardsSearchQueryParams): Promise<BoardData[]> {
    const queryParams = params ? makeUrl(params) : '';

    const { status, data } = await axiosApiInstance.get(`${BOARDS}${BOARDS_SEARCH}${queryParams}`);

    if (status === 200) {
      return data;
    }

    return [];
  },

  async getBoardById(id: string): Promise<GetBoardByIdData> {
    const { data } = await axiosApiInstance.get(`${BOARDS}/${id}`);

    return data;
  },

  async createBoard(boardData: CreateBoardData): Promise<BoardData> {
    const { data } = await axiosApiInstance.post(`${BOARDS}`, boardData);

    return data;
  },

  async updateBoard({ id, body }: UpdateBoardData): Promise<BoardData> {
    const { data } = await axiosApiInstance.put(`${BOARDS}/${id}`, body);

    return data;
  },

  async deleteBoard(id: string): Promise<void> {
    await axiosApiInstance.delete(`${BOARDS}/${id}`);
  },
};

export default boardsService;
