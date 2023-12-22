import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value = state.value + 1
      console.log(state.value)
    },
  },
})

export const { increment } = counterSlice.actions

export const selectCounter = (state) => state.counter.value

export default counterSlice.reducer
