import { createSlice } from '@reduxjs/toolkit'

const initialState = { info: null, config: null }

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalStateInfo(state, action) {
      state.info = action.payload
    },
    modalStateConfig(state, action) {
      state.config = action.payload
    }
  }
})

export const { modalStateInfo, modalStateConfig } = modalSlice.actions

export const setModalStateInfo = (state) => {
  return async dispatch => {
    dispatch(modalStateInfo(state))
  }
}
export const setModalStateConfig = (state) => {
  return async dispatch => {
    dispatch(modalStateConfig(state))
  }
}

export default modalSlice.reducer