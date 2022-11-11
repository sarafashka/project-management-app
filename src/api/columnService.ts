import { ColumnItem } from '../types/types';
import axiosApiInstance from './axiosApiInstance';
import endpoints from '../constants/endpoints';
import { AxiosResponse } from 'axios';

export const columnService = {
  getAllColumns(boardId: string): Promise<AxiosResponse<ColumnItem[]>> {
    return axiosApiInstance.get(
      `${endpoints.BASE_URL}${endpoints.BOARDS}/${boardId}${endpoints.COLUMNS}`
    );
  },
  deleteColumn(boardId: string, columnId: string) {
    return axiosApiInstance.delete(
      `${endpoints.BASE_URL}${endpoints.BOARDS}/${boardId}${endpoints.COLUMNS}/${columnId}`
    );
  },
};
