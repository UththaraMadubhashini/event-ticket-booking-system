import { createSlice } from '@reduxjs/toolkit';
import { SELECT_EVENT } from '../constants';

const ticketSlice = createSlice({
  name: 'ticket',
  initialState: {
    selectedEvent: null,
  },
  reducers: {
    [SELECT_EVENT]: (state, action) => {
      state.selectedEvent = action.payload;
    },
  },
});

export const { selectEvent } = ticketSlice.actions;
export default ticketSlice.reducer;