import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    avatar: '',
    tg: false
  },
  reducers: {
    setUserAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setTg: (state, action) => {
      state.tg = action.payload;
    }
  }
});

export const { setUserAvatar, setTg } = userSlice.actions;

export const selectUser = (state) => state.user.value;

export default userSlice.reducer;
