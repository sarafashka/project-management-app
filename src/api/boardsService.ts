import { AxiosResponse } from 'axios';

import Endpoint from 'constants/endpoints';
import { BoardData } from 'types/boardTypes';

import axiosApiInstance from './axiosApiInstance';

const { BOARDS } = Endpoint;

type GetBoardsResponse = AxiosResponse<BoardData[]>;

const boardsService = {
  async getBoards(): Promise<BoardData[]> {
    const { status, data }: GetBoardsResponse = await axiosApiInstance.get(BOARDS);

    if (status === 200) {
      return data;
    }

    return [];
  },

  async deleteBoard(id: string) {
    return await axiosApiInstance.delete(`${BOARDS}/${id}`);
  },
};

export default boardsService;
