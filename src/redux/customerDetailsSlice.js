import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customerDetails: null,
};

const customerDetailsSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerDetails: (state, action) => {
      state.customerDetails = action.payload;
    },
  },
});

export const { setCustomerDetails } = customerDetailsSlice.actions;

export default customerDetailsSlice.reducer;
