import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 100,
    messages: 'Hello World',
    address: '广州市',
    height: 1.88
  },
  reducers: {
    changeMessages(state, { payload }) {
      state.messages = payload
    }
  }
})

export const { changeMessages } = counterSlice.actions

export default counterSlice.reducer
