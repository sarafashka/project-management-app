import { AxiosResponse } from 'axios';

import { BoardData } from 'types/boardTypes';

import api from './api';

export enum BoardsEndpoints {
  BOARDS = '/boards',
  DELETE_BOARD = '/boards/',
}

type GetBoardsResponse = AxiosResponse<BoardData[]>;

const boardsService = {
  async getBoards(): Promise<BoardData[]> {
    const { status, data }: GetBoardsResponse = await api.get(BoardsEndpoints.BOARDS);

    if (status === 200) {
      return data;
    }

    return [];
  },

  async deleteBoards(id: string) {
    const { status } = await api.delete(`${BoardsEndpoints.DELETE_BOARD}${id}`);

    return status;
  },
};

export default boardsService;
