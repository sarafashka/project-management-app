import axiosApiInstance from './axiosApiInstance';
import endpoints from '../constants/endpoints';
import { AxiosResponse } from 'axios';
import { RequestGetAllTasks, Task } from 'types/types';

export const taskService = {
  getAllTasks(request: RequestGetAllTasks): Promise<AxiosResponse<Task[]>> {
    return axiosApiInstance.get(
      `${endpoints.BOARDS}/${request.boardId}${endpoints.COLUMNS}/${request.columnId}${endpoints.TASKS}`
    );
  },
  /* createColumn(request: RequestCreateColumn) {
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
  */
};
