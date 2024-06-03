// store.js
import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../customerDetailsSlice';
import ticketReducer from '../ticketReducer';

const store = configureStore({
  reducer: {
    customer: customerReducer,
    ticket: ticketReducer,
    // Add other reducers if any
  },
});

export default store;
