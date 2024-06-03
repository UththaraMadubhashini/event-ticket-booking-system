import { combineReducers } from '@reduxjs/toolkit';
import ticketReducer from './ticketReducer';
import customerDetailsSlice from './customerDetailsSlice';

const rootReducer = combineReducers({
  ticket: ticketReducer,
  customer: customerDetailsSlice,
});

export default rootReducer;
