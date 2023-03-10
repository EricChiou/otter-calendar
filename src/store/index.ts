import { useDispatch as ud } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = ud;

export default store;
