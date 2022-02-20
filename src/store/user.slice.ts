import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

interface UserState {
  login: boolean;
}

const initialState: UserState = {
  login: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => { state.login = action.payload; },
  },
});

export const { setLogin } = userSlice.actions;
export const selectLogin = (state: RootState) => state.user.login;

export default userSlice.reducer;
