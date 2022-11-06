import { useDispatch, useSelector } from 'react-redux'
import { setModalStateConfig } from '../reducers/modalReducer'
import { initialGameState, resetGameStateGuess, resetGuesses, addGameCorrectCard } from '../reducers/guessReducer'
import { initializeAnswer } from '../reducers/answerReducer'
import { useState } from 'react'

import StatPanel from './StatPanel'

const ConfigPanel = () => {
  const dispatch = useDispatch()
  const [guessInput, setGuessInput] = useState(null)
  const initialGuesses = useSelector(state => state.guesses)
  const cards = useSelector(state => state.cards)

  const closeModal = (event) => {
    if (event.target.className === 'modal-background' || event.target.className === 'close') {
      dispatch(setModalStateConfig(null))
      if (guessInput) {
        if (window.confirm(`Set guesses to ${guessInput}?`)) {
          if (guessInput <= initialGuesses.guesses.length) {
            window.alert('Cannot set guesses to lower than the current guesses')
            setGuessInput(null)
          } else {
            dispatch(initialGameState(guessInput))
            setGuessInput(null)
          }

        }
      }
    }
  }

  const setGuesses = (event) => {
    setGuessInput(event.target.value)
    if (event.keyCode === 13 && event.target.value > initialGuesses.guesses.length) {
      dispatch(initialGameState(event.target.value))
      event.target.value = null
      setGuessInput(null)
    } else if (event.keyCode === 13) {
      window.alert('Cannot set guesses to lower than the current guesses')
      event.target.value = null
      setGuessInput(null)
    }
  }

  const resetGame = () => {
    dispatch(resetGameStateGuess())
    dispatch(resetGuesses())
    const randomCard = cards.allUniqueCardNames[Math.floor(Math.random()*cards.allUniqueCardNames.length)]
    const answerCard = cards.allCards.find(card => card.name === randomCard)
    dispatch(initializeAnswer(answerCard))
    dispatch(addGameCorrectCard(answerCard))
    window.localStorage.setItem('guesses', JSON.stringify({ guesses: [], gameState: { roundNumber: '', gameGuesses: [], gameCorrectCard: [] } }))
  }

  return (
    <div className='modal-background' onMouseDown={(event) => closeModal(event)}>
      <div className='modal-content'>
        <div className='modal-header'>
          <div id='modal-header-text'>Config</div>
          <span className="close" onClick={(event) => closeModal(event)}>&times;</span>
        </div>
        <div className='modal-body'>
          <div>Current guesses {initialGuesses.gameState.roundNumber} - set guesses: <input onKeyDown={(event) => setGuesses(event)} onChange={(event) => setGuesses(event)} type="number" min="0" step="1" placeholder={'Set the number of tries...'}/></div>
          <div>Reset the game: <button type='button' onClick={resetGame}>Reset</button> </div>
        </div>
        <div className='modal-footer'>
          <StatPanel />
        </div>
      </div>
    </div>
  )
}

export default ConfigPanel