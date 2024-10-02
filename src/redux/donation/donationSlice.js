import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  donate: 0,
  message: '',
};

const donationSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    UPDATE_TOTAL_DONATE: (state, action) => {
      return Object.assign({}, state, {
        donate: state.donate + action.payload.amount,
      });
    },
    UPDATE_MESSAGE: (state, action) => {
      return Object.assign({}, state, {
        message: action.payload.message,
      });
    },
  },
});

export const { UPDATE_TOTAL_DONATE, UPDATE_MESSAGE } = donationSlice.actions;

export default donationSlice.reducer;
