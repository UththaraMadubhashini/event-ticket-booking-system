import { createSlice } from '@reduxjs/toolkit';

const ticketSlice = createSlice({
  name: 'ticket',
  initialState: {
    selectedEvent: null,
  },
  reducers: {
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
  },
});

export const { selectEvent } = ticketSlice.actions;
export default ticketSlice.reducer;
