// HeaderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  headerChange: false, // Initial state is false
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderChange: (state, action) => {
      state.headerChange = action.payload;
    },
  },
});

export const { setHeaderChange } = headerSlice.actions;
export default headerSlice.reducer;
