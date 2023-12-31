import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import statusMidReducer from './slices/statusMidSlice';
import errorReducer from './slices/errorSlice';
import counterReducer from './slices/counterSlice';
import userReducer from './slices/userSlice';
import { userApi } from './services/userService';
import { chatApi } from './services/chatService';
import { messagesApi } from './services/messagesService';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    status: statusMidReducer,
    error: errorReducer,
    counter: counterReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(chatApi.middleware)
      .concat(messagesApi.middleware)
});
