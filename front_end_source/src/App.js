import { useEffect } from 'react'
import { initializeCards } from './reducers/cardReducer'
import { initialGameState } from './reducers/guessReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import GuessForm from './components/GuessForm'
import GuessTable from './components/GuessTable'
import Notification from './components/Notification'
import Header from './components/Header'

const App = () => {
  const dispatch = useDispatch()
  const cards = useSelector(state => state.cards)
  const gameState = useSelector(state => state.guesses)
  const loader = document.querySelector('.loader-container')

  useEffect(() => {
    dispatch(initializeCards())
    if (gameState.gameState.roundNumber === '') {
      dispatch(initialGameState(5))
    }
  }, [dispatch])

  if (cards) {
    loader.style.display = 'none'
    return (
      <div>
        <Header />
        <Notification />
        <GuessForm />
        <GuessTable />
        {/* <SetList /> */}
      </div>
    )
  }
}

export default App