import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    value: 0
  },
  reducers: {
    setErrorStatus: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setErrorStatus } = errorSlice.actions;

export const selectError = (state) => state.error.value;

export default errorSlice.reducer;
