import { createSlice } from '@reduxjs/toolkit'

const filteredCardsSlice = createSlice({
  name: 'filteredCards',
  initialState: [],
  reducers: {
    filteredCardList(state, action) {
      return action.payload
    }
  }
})

export default filteredCardsSlice.reducer