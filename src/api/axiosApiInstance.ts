import axios from 'axios';
import Endpoint from '../constants/endpoints';
import { tokenService } from './tokenService';
import { userService } from './userService';

const axiosApiInstance = axios.create({
  baseURL: Endpoint.BASE_URL,
});

axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: tokenService.authToken(),
      'Content-Type': 'application/json',
    };
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      userService.removeUserData();
      tokenService.removeToken();
      window.location.replace('/');
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
