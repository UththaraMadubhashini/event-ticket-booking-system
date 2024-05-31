import { combineReducers } from '@reduxjs/toolkit';
import ticketReducer from './ticketReducer';

const rootReducer = combineReducers({
  ticket: ticketReducer,
});

export default rootReducer;
