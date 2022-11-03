import { configureStore } from '@reduxjs/toolkit'

import cardReducer from './reducers/cardReducer'
import filterReducer from './reducers/filterReducer'
import filteredCardsReducer from './reducers/filteredCardsReducer'
import answerReducer from './reducers/answerReducer'
import guessReducer from './reducers/guessReducer'
import notificationReducer from './reducers/notificationReducer'
import modalReducer from './reducers/modalReducer'

const store = configureStore({
  reducer: {
    cards: cardReducer,
    filter: filterReducer,
    filteredCards: filteredCardsReducer,
    answer: answerReducer,
    guesses: guessReducer,
    notification: notificationReducer,
    modal: modalReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    // immutableCheck: false
  })
})

export default store