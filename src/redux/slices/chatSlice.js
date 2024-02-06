import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    value: '',
    chats: {
      sessions: [],
      folders: []
    }
  },
  reducers: {
    setNewChat: (state, action) => {
      state.value = action.payload;
    },
    setChats: (state, action) => {
      if (action.payload !== undefined) {
        state.chats = action.payload;
        console.log(state.chats);
      }
    }
  }
});

export const { setNewChat, setChats } = chatSlice.actions;

export const selectChat = (state) => state.chat.value;

export default chatSlice.reducer;
