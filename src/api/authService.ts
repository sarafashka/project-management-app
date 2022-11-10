import { NewUser, SignInResponse, SignUpResponse, User } from '../types/types';
import axiosApiInstance from './axiosApiInstance';
import endpoints from '../constants/endpoints';
import { AxiosResponse } from 'axios';
import { tokenService } from './tokenService';

export const authService = {
  registerUser(userData: NewUser): Promise<AxiosResponse<SignUpResponse>> {
    return axiosApiInstance.post(endpoints.BASE_URL + endpoints.SIGN_UP, { ...userData });
  },
  loginUser(userData: User): Promise<AxiosResponse<SignInResponse>> {
    return axiosApiInstance.post(endpoints.BASE_URL + endpoints.SIGN_IN, { ...userData });
  },
  isUserLogged() {
    const token = tokenService.getToken();
    return !!token;
  },
};
