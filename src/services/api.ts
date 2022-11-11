import axios from 'axios';

import { Error } from 'types/types';

const api = axios.create({
  baseURL: 'https://murmuring-earth-86260.herokuapp.com',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwYmVhYjZiYS1mNzc5LTRmYTEtYjRjMi03ZDFiYTBmNTE1ODYiLCJsb2dpbiI6ImthdGUiLCJpYXQiOjE2NjgxMjIzODB9.GoiQ03Fn4PQ2_o5HizJ8i46HmAv9EnRXnto-Tp5a2Bc`,
  },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const err: Error = { ...error.response.data };
    return Promise.reject(err);
  }
);

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    const err: Error = {
      statusCode: error.request.data.statusCode,
      title: 'Oops!',
      message: "Server isn't responding. Please, try later",
    };
    return Promise.reject(err);
  }
);

export default api;
