import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import promise from 'redux-promise';

export const store = configureStore({
  reducer: reducer,
  middleware: [promise]
});

export default store;
