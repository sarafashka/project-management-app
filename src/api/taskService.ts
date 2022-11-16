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
};
