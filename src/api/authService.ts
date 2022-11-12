import { JwtUserData, NewUser, SignInResponse, SignUpResponse, User } from '../types/types';
import axiosApiInstance from './axiosApiInstance';
import endpoints from '../constants/endpoints';
import { AxiosResponse } from 'axios';
import { tokenService } from './tokenService';
import jwt_decode from 'jwt-decode';

export const authService = {
  registerUser(userData: NewUser): Promise<AxiosResponse<SignUpResponse>> {
    return axiosApiInstance.post(endpoints.SIGN_UP, { ...userData });
  },
  loginUser(userData: User): Promise<AxiosResponse<SignInResponse>> {
    return axiosApiInstance.post(endpoints.SIGN_IN, { ...userData });
  },
  isUserLogged() {
    const token = tokenService.getToken();
    return !!token;
  },
  setUserData(token: string) {
    const jwtUserData = jwt_decode<JwtUserData>(token);
    localStorage.setItem('user', JSON.stringify(jwtUserData));
  },
  getUserData() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  },
  removeUserData() {
    localStorage.removeItem('user');
  },
};
