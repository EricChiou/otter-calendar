import { AxiosError } from 'axios';

import { APIResponse } from './interface/common';
import { Login } from './interface/user';

import request from './base';

export default class UserAPI {
  private static readonly PRE_URL = '/user';

  public static SignUp(account: string, password: string): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      const body = { account, password };
      request.post<APIResponse>(`${this.PRE_URL}/signup`, body)
        .then((response) => { resolve(response.data); })
        .catch((error: AxiosError) => { reject(error.response?.data || error); });
    });
  }

  public static Login(account: string, password: string): Promise<Login> {
    return new Promise((resolve, reject) => {
      const body = { account, password };
      request.post<APIResponse<Login>>(`${this.PRE_URL}/login`, body)
        .then((response) => { if (response.data.result) { resolve(response.data.result); } })
        .catch((error: AxiosError) => { reject(error.response?.data || error); });
    });
  }
}