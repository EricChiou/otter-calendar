import axios, { AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';

import { APIResponse, APIResponseStatus } from './interface/common';

import Message, { MessageType } from '@/components/Message';
import { logout } from '@/store/user.slice';

let dispatch: Dispatch | null = null;

export function injectDispatch(d: Dispatch) { dispatch = d; }

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
  baseURL: import.meta.env.DEV ? 'http://127.0.0.1:7000' : 'https://www.calicomoomoo.com/otter-calendar',
  headers: { 'Content-Type': 'application/json' },
});

request.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => errorHandler(error),
);

export default request;
