import { createSlice } from '@reduxjs/toolkit'

const initialState = { gamesPlayed: 0, wins: 0, streak: 0, lastCard: null }
const localState = JSON.parse(window.localStorage.getItem('stats'))

const statsSlice = createSlice({
  name: 'stats',
  initialState: localState ? localState : initialState,
  // initialState,
  reducers: {
    setGames(state) {
      state.gamesPlayed = state.gamesPlayed + 1
      window.localStorage.setItem('stats', JSON.stringify(state))
    },
    setWins(state) {
      state.wins = state.wins + 1
      window.localStorage.setItem('stats', JSON.stringify(state))
    },
    setStreak(state) {
      state.streak = state.streak + 1
      window.localStorage.setItem('stats', JSON.stringify(state))
    },
    resetStreak(state) {
      state.streak = 0
      window.localStorage.setItem('stats', JSON.stringify(state))
    },
    setLastCard(state, action) {
      state.lastCard = action.payload
      window.localStorage.setItem('stats', JSON.stringify(state))
    }
  }
})

export const { setGames, setWins, setStreak, resetStreak, setLastCard } = statsSlice.actions

export const addGame = () => {
  return async dispatch => {
    dispatch(setGames())
  }
}

export const addWin = () => {
  return async dispatch => {
    dispatch(setWins())
  }
}

export const addStreak = () => {
  return async dispatch => {
    dispatch(setStreak())
  }
}

export const emptyStreak = () => {
  return async dispatch => {
    dispatch(resetStreak())
  }
}

export const addLastCard = (card) => {
  return async dispatch => {
    dispatch(setLastCard(card))
  }
}

export default statsSlice.reducer