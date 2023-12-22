import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './slices/chatSlice'
import statusMidReducer from './slices/statusMidSlice'
import errorReducer from './slices/errorSlice'

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        status: statusMidReducer,
        error: errorReducer
    },
})
