import axios from 'axios';
import Endpoint from '../constants/endpoints';
import { tokenService } from './tokenService';

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
    Promise.reject(error);
  }
);

export default axiosApiInstance;
