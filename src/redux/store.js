import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from './slices/ticketSlice';
import anotherReducer from './slices/anotherSlice';

const store = configureStore({
  reducer: {
    ticket: ticketReducer,
    another: anotherReducer,
  },
});

export default store;