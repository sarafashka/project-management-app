import Endpoint from 'constants/endpoints';
import { BoardData, CreateBoardData, GetBoardByIdData } from 'types/types';

import axiosApiInstance from './axiosApiInstance';

const { BOARDS } = Endpoint;

const boardsService = {
  async getAllBoards(): Promise<BoardData[]> {
    const { status, data } = await axiosApiInstance.get(BOARDS);

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

  async updateBoard({ id, ...boardData }: BoardData): Promise<BoardData> {
    const { data } = await axiosApiInstance.put(`${BOARDS}/${id}`, boardData);

    return data;
  },

  async deleteBoard(id: string): Promise<void> {
    await axiosApiInstance.delete(`${BOARDS}/${id}`);
  },
};

export default boardsService;
