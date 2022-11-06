import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', timer: null, messageType: '' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      const notification = action.payload
      if (state.timer) {
        clearTimeout(state.timer)
      }
      return { ...state, message: notification.message, timer: notification.timer, messageType: notification.messageType }
    }
  }
})

export const { createNotification } = notificationSlice.actions

export const setNotification = (message, timeout, messageType) => {
  return async dispatch => {
    console.log(message)
    const timer = setTimeout(
      () => dispatch(createNotification(initialState)), 1000 * timeout
    )
    dispatch(createNotification({ message, timer, messageType }))
  }
}

export default notificationSlice.reducer