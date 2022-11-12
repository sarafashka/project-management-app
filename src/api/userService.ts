import axiosApiInstance from './axiosApiInstance';
import endpoints from '../constants/endpoints';
import { SignUpResponse, User } from '../types/types';
import { AxiosResponse } from 'axios';

export const userService = {
  getAllUsers(): Promise<AxiosResponse<User[]>> {
    return axiosApiInstance.get(endpoints.USERS);
  },
  getUserById(id: string): Promise<AxiosResponse<User>> {
    return axiosApiInstance.get(`${endpoints.USERS}/${id}`);
  },
  deleteUser(id: string): Promise<AxiosResponse<void>> {
    return axiosApiInstance.delete(`${endpoints.USERS}/${id}`);
  },
  updateUser(id: string, userData: SignUpResponse): Promise<AxiosResponse<User>> {
    return axiosApiInstance.put(`${endpoints.USERS}/${id}`, userData);
  },
  setUserData(userData: User) {
    localStorage.setItem('user', JSON.stringify(userData));
  },
  getUserData() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  },
  removeUserData() {
    localStorage.removeItem('user');
  },
};
