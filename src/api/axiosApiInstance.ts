import axios from 'axios';
import Endpoint from '../constants/endpoints';
import { tokenService } from './tokenService';
import { userService } from './userService';

import { Error } from 'types/types';

const axiosApiInstance = axios.create({
  baseURL: Endpoint.BASE_URL,
});

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const err: Error = { ...error.response.data };
    return Promise.reject(err);
  }
);

axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: tokenService.authToken(),
      'Content-Type': 'application/json',
    };
    return config;
  },

  (error) => {
    const err: Error = {
      statusCode: error.request.data.statusCode,
      title: 'Oops!',
      message: "Server isn't responding. Please, try later",
    };
    return Promise.reject(err);
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
      window.location.replace('/auth');
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
