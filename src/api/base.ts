import axios, { AxiosError } from 'axios';

import API from '@/constants/api';

function errorHandler(error: AxiosError) {
  console.log('api error handler:', error);
}

const request = axios.create({
  baseURL: API.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

request.interceptors.response.use(
  (response) => { return response; },
  (error) => {
    errorHandler(error);
    return Promise.reject(error);
  },
);

export default request;
