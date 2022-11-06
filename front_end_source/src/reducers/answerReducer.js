import { createSlice } from '@reduxjs/toolkit'

const answerSlice = createSlice({
  name: 'answer',
  initialState: '',
  reducers: {
    setAnswer(state, action){
      return action.payload
    }
  }
})

export const { setAnswer } = answerSlice.actions

export const initializeAnswer = (answer) => {
  return async dispatch => {
    window.localStorage.setItem('answer', answer.name)
    dispatch(setAnswer(answer))
  }
}

export default answerSlice.reducer