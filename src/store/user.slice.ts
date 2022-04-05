import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

import UserAPI from '@/api/user';
import Message from '@/components/Message';
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

export const login = (account: string, password: string) => (dispatch: Dispatch) => {
  UserAPI.Login(account, password).then((r) => {
    const date = new Date();
    date.setFullYear(2200);
    Cookie.Set(CookieKeys.TOKEN, r.token, date);
    dispatch(userSlice.actions.setToken(r.token));
  });
};

export const { setPrevPath, setToken, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectLogin = (state: RootState) => state.user.login;

export default userSlice.reducer;
