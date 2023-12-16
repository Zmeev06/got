import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './slices/chatSlice'
import statusMidReducer from './slices/statusMidSlice'

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        status: statusMidReducer
    },
})
