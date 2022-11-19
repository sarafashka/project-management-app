import {
  ColumnDetail,
  ColumnItem,
  RequestCreateColumn,
  RequestDeleteColumn,
  RequestGetColumn,
  RequestUpdateColumn,
} from '../types/types';
import axiosApiInstance from './axiosApiInstance';
import endpoints from '../constants/endpoints';
import { AxiosResponse } from 'axios';

export const columnService = {
  getAllColumns(boardId: string): Promise<AxiosResponse<ColumnItem[]>> {
    return axiosApiInstance.get(`${endpoints.BOARDS}/${boardId}${endpoints.COLUMNS}`);
  },
  getColumn(request: RequestGetColumn): Promise<AxiosResponse<ColumnDetail>> {
    return axiosApiInstance.get(
      `${endpoints.BOARDS}/${request.boardId}${endpoints.COLUMNS}/${request.columnId}`
    );
  },
  createColumn(request: RequestCreateColumn) {
    return axiosApiInstance.post(`${endpoints.BOARDS}/${request.boardId}${endpoints.COLUMNS}`, {
      ...request.body,
    });
  },
  deleteColumn(request: RequestDeleteColumn) {
    return axiosApiInstance.delete(
      `${endpoints.BOARDS}/${request.boardId}${endpoints.COLUMNS}/${request.columnId}`
    );
  },
  updateColumn(request: RequestUpdateColumn) {
    return axiosApiInstance.put(
      `${endpoints.BOARDS}/${request.boardId}${endpoints.COLUMNS}/${request.columnId}`,
      {
        ...request.body,
      }
    );
  },
};
