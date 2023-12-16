import { createSlice } from '@reduxjs/toolkit'

export const statusMidSlice = createSlice({
    name: 'statusMid',
    initialState: {
        value: 'ready',
        progress: 0
    },
    reducers: {
        setNewStatus: (state, action) => {
            state.value = action.payload
            console.log(state.value)
        },
    },
})

export const { setNewStatus } = statusMidSlice.actions

export const selectChat = (state) => state.status.value

export default statusMidSlice.reducer
