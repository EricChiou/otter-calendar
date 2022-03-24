import axios, { AxiosError } from 'axios';

function errorHandler(error: AxiosError): Promise<AxiosError> {
  console.log('api error:', error.toJSON());
  return Promise.reject(error);
}

const request = axios.create({
  baseURL: 'https://www.calicomoomoo.com/otter-calendar',
  headers: { 'Content-Type': 'application/json' },
});

request.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => errorHandler(error),
);

export default request;
