import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterText(state, action) {
      return action.payload
    }
  }
})

export const { filterText } = filterSlice.actions

export const filterInput = (text) => {
  return async dispatch => {
    dispatch(filterText(text))
  }
}

export default filterSlice.reducer