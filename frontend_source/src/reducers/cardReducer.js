import { createSlice } from '@reduxjs/toolkit'
import cardService from '../services/cardData'
import { initializeAnswer } from './answerReducer'
import { addGameCorrectCard } from './guessReducer'

const cardSlice = createSlice({
  name: 'cards',
  initialState: null,
  reducers: {
    setCards(state, action) {
      return action.payload
    }
  }
})

export const { setCards } = cardSlice.actions

export const initializeCards = () => {
  return async dispatch => {
    const cards = await cardService.getCardData()
    dispatch(setCards(cards))
    if (!window.localStorage.getItem('answer')) {
      const randomCard = cards.allUniqueCardNames[Math.floor(Math.random()*cards.allUniqueCardNames.length)]
      const answerCard = cards.allCards.find(card => card.name === randomCard)
      dispatch(initializeAnswer(answerCard))
      dispatch(addGameCorrectCard(answerCard))
      console.log('jorma')
    } else {
      const storageCard = window.localStorage.getItem('answer')
      const answerCard = cards.allCards.find(card => card.name === storageCard)
      dispatch(initializeAnswer(answerCard))
      dispatch(addGameCorrectCard(answerCard))
    }

  }
}

export default cardSlice.reducer