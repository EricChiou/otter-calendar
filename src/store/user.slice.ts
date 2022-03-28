import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export interface UserState {
  prevPath: string;
  login: boolean;
}

const initialState: UserState = {
  prevPath: '',
  login: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPrevPath: (state, action: PayloadAction<string>) => { state.prevPath = action.payload; },
    login: (state) => { state.login = true; },
    logout: (state) => { state.prevPath = '', state.login = false; },
  },
});

export const { setPrevPath, login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectLogin = (state: RootState) => state.user.login;

export default userSlice.reducer;
