import axios, { AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';

import { APIResponse, APIResponseStatus } from './interface/common';

import Message, { MessageType } from '@/components/Message';
import { logout } from '@/store/user.slice';

let dispatch: Dispatch | null = null;
let token = '';

export function injectDispatch(d: Dispatch) { dispatch = d; }
export function injectToken(t: string) { token = t; }

function errorHandler(error: AxiosError): Promise<AxiosError> {
  if (error.response && error.response.data) {
    const data = error.response.data as APIResponse;
    if (data.status === APIResponseStatus.TokenError) {
      if (dispatch) { dispatch(logout()); }
    }
    if (typeof data.message === 'string') {
      Message.add(data.message, MessageType.Error);
    }
  }
  return Promise.reject(error);
}

const request = axios.create({
  baseURL: import.meta.env.DEV ? 'https://www.calicomoomoo.com/otter-calendar-ws' : 'https://www.calicomoomoo.com/otter-calendar-ws',
  headers: { 'Content-Type': 'application/json' },
});

request.interceptors.request.use(
  (config) => {
    if (token) { config.headers.set('Authorization', `Bearer ${token}`); }
    return config;
  },
);

request.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => errorHandler(error),
);


export default request;
