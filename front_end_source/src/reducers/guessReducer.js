import { createSlice } from '@reduxjs/toolkit'

const initialState = { guesses: [], gameState: { roundNumber: '', gameGuesses: [], gameCorrectCard: [] } }
const localState = JSON.parse(window.localStorage.getItem('guesses'))

const guessSlice = createSlice({
  name: 'guesses',
  initialState: localState ? localState : initialState,
  // initialState,
  reducers: {
    setGuess(state, action) {
      state.guesses.push(action.payload)
      window.localStorage.setItem('guesses', JSON.stringify(state))
    },
    setGameGuess(state, action) {
      state.gameState.gameGuesses.push(action.payload)
    },
    setGameCorrectCard(state, action) {
      state.gameState.gameCorrectCard.push(action.payload)
    },
    emptyGuesses(state) {
      state.guesses = []
      window.localStorage.setItem('guesses', JSON.stringify(state))
    },
    emptyGameStateGuesses(state) {
      state.gameState.gameGuesses = []
      window.localStorage.setItem('guesses', JSON.stringify(state))
    },
    initializeGameState(state, action) {
      state.gameState.roundNumber = action.payload
      window.localStorage.setItem('guesses', JSON.stringify(state))
    }
  }
})

export const { setGuess, emptyGuesses, initializeGameState, setGameGuess, emptyGameStateGuesses, setGameCorrectCard } = guessSlice.actions

export const addGuess = (guess) => {
  return async dispatch => {
    dispatch(setGuess(guess))
  }
}

export const addGameGuess = (guess) => {
  return async dispatch => {
    dispatch(setGameGuess(guess))
  }
}

export const addGameCorrectCard = (card) => {
  return async dispatch => {
    dispatch(setGameCorrectCard(card))
  }
}

export const resetGuesses = () => {
  return async dispatch => {
    dispatch(emptyGuesses())
  }
}

export const resetGameStateGuess = () => {
  return async dispatch => {
    dispatch(emptyGameStateGuesses())
  }
}

export const initialGameState = (state) => {
  return async dispatch => {
    dispatch(initializeGameState(state))
  }
}

export default guessSlice.reducer