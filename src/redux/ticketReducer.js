import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedEvent: null,
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
  },
});

export const { selectEvent } = ticketSlice.actions;

export default ticketSlice.reducer;
