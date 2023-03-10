import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from './index';

import { injectToken } from '@/api/base';
import UserAPI from '@/api/user';
import Cookie from '@/utils/cookie';
import CookieKeys from '@/constants/cookie';

export interface UserState {
  prevPath: string;
  login: boolean;
  token: string;
}

const initialState: UserState = {
  prevPath: '',
  login: false,
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPrevPath: (state, action: PayloadAction<string>) => { state.prevPath = action.payload; },
    setToken: (state, action: PayloadAction<string>) => {
      injectToken(action.payload);
      state.token = action.payload;
      state.login = true;
    },
    logout: (state) => {
      Cookie.Delete(CookieKeys.TOKEN);
      state.prevPath = '';
      state.token = '';
      state.login = false;
    },
  },
});

export const login = (account: string, password: string) => (dispatch: AppDispatch) => {
  UserAPI.Login(account, password).then((resp) => {
    const date = new Date();
    date.setFullYear(2200);
    Cookie.Set(CookieKeys.TOKEN, resp.token, date);
    dispatch(setToken(resp.token));
  });
};

export const { setPrevPath, setToken, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectLogin = (state: RootState) => state.user.login;

export default userSlice.reducer;
