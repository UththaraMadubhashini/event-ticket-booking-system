import { createSlice } from '@reduxjs/toolkit';
import { SOME_OTHER_ACTION } from '../constants'; // This should match the path where constants.js is located

const anotherSlice = createSlice({
  name: 'another',
  initialState: {
    someData: null,
  },
  reducers: {
    [SOME_OTHER_ACTION]: (state, action) => {
      state.someData = action.payload;
    },
  },
});
export const { someOtherAction } = anotherSlice.actions;
export default anotherSlice.reducer;