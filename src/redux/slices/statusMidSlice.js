import { createSlice } from '@reduxjs/toolkit';

export const statusMidSlice = createSlice({
  name: 'statusMid',
  initialState: {
    value: 'ready',
    progress: 0,
    taskId: '',
    promt: ''
  },
  reducers: {
    setNewStatus: (state, action) => {
      state.value = action.payload;
      console.log(state.value);
    },
    setNewTaskId: (state, action) => {
      state.taskId = action.payload;
    },
    setPromt: (state, action) => {
      state.promt = action.payload;
    }
  }
});

export const { setNewStatus, setNewTaskId } = statusMidSlice.actions;

export const selectChat = (state) => state.status.value;

export default statusMidSlice.reducer;
