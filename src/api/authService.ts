import { NewUser, User } from '../types/types';
import axiosApiInstance from './axiosApiInstance';
import endpoints from '../constants/endpoints';

export const authService = {
  registerUser(userData: NewUser) {
    return axiosApiInstance
      .post(endpoints.BASE_URL + endpoints.SIGN_UP, { ...userData })
      .then((response) => response.data);
  },
  loginUser(userData: User) {
    return axiosApiInstance
      .post(endpoints.BASE_URL + endpoints.SIGN_IN, { ...userData })
      .then((response) => response.data);
  },
};
