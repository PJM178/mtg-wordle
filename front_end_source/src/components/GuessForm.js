import { useDispatch, useSelector } from 'react-redux'
import { filterText } from '../reducers/filterReducer'
import { initializeAnswer } from '../reducers/answerReducer'
import { useState, useEffect } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { addGuess as setGuess, resetGuesses, resetGameStateGuess, addGameGuess, addGameCorrectCard } from '../reducers/guessReducer'
import { addGame, addWin, addStreak, emptyStreak, addLastCard } from '../reducers/statReducer'

const GuessForm = () => {
  const dispatch = useDispatch()
  const allCards = useSelector(state => state.cards)
  const inputField = useSelector(state => state.filter)
  const correctCard = useSelector(state => state.answer)
  const guesses = useSelector(state => state.guesses)
  const [filteredCards, setFilteredCards] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (inputField.length > 2) {
      const filteredCards = allCards.allUniqueCardNames.filter(card => card.toLowerCase().includes(inputField.toLowerCase()))
      const sortedCards = filteredCards.sort((a, b) => (a > b) ? 1 : ((b> a) ? -1 : 0))
      setFilteredCards(sortedCards)
    }
    console.log('correct card:', correctCard.name)
    setIndex(0)
  }, [inputField])

  // log the correct answer to the console during dev or maybe in production too
  useEffect(() => {
    console.log('correct card:', correctCard.name)
  }, [])

  const handleInputKeyDown = (event) => {
    // down arrow
    if (event.keyCode === 40 && index < filteredCards.length - 1) {
      setIndex(index + 1)
    // up arrow
    } else if (event.keyCode === 38 && index > 0) {
      setIndex(index - 1)
    }
  }

  const addGuess = (card) => {
    // in the case of correct guess, reset the game
    if (card.name === correctCard.name) {
      dispatch(addLastCard(card))
      dispatch(addGame())
      dispatch(addWin())
      dispatch(addStreak())
      console.log('congratulations')
      dispatch(addGameGuess(card))
      dispatch(setGuess(card))
      dispatch(filterText(''))
      const randomCard = allCards.allUniqueCardNames[Math.floor(Math.random()*allCards.allUniqueCardNames.length)]
      const answerCard = allCards.allCards.find(card => card.name === randomCard)
      dispatch(addGameCorrectCard(answerCard))
      dispatch(setNotification('WINNER WINNER CHICKEN DINNER', 5, 'winner'))
      document.querySelector('.guess-form-input').setAttribute('disabled', true)
      setFilteredCards([])
      setTimeout(() => {
        window.localStorage.removeItem('answer')
        const randomCard = allCards.allUniqueCardNames[Math.floor(Math.random()*allCards.allUniqueCardNames.length)]
        const answerCard = allCards.allCards.find(card => card.name === randomCard)
        dispatch(addGameCorrectCard(answerCard))
        dispatch(initializeAnswer(answerCard))
        dispatch(resetGameStateGuess())
        dispatch(resetGuesses())
        document.querySelector('.guess-form-input').removeAttribute('disabled')
      }, 5000)
    // otherwise add guess to the list
    } else if (guesses.guesses.length + 1 < guesses.gameState.roundNumber && card.name !== correctCard.name) {
      dispatch(setGuess(card))
      dispatch(addGameGuess(card))
      dispatch(filterText(''))
      setFilteredCards([])
    } else {
      dispatch(addLastCard(card))
      dispatch(addGame())
      dispatch(emptyStreak())
      dispatch(setNotification('YOU LOSE', 5, 'loser'))
      dispatch(setGuess(card))
      document.querySelector('.guess-form-input').setAttribute('disabled', true)
      setTimeout(() => {
        dispatch(resetGuesses())
        document.querySelector('.guess-form-input').removeAttribute('disabled')
      }, 5000)
      dispatch(filterText(''))
      setFilteredCards([])
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const cardGuess = allCards.allCards.find(card => card.name === filteredCards[index])
    try {
      addGuess(cardGuess)
    } catch (error) {
      // console.log(error)
    }
  }

  const handleInputChange = (event) => {
    dispatch(filterText(event.target.value))
  }

  const handleClickSubmit = (card) => {
    const cardGuess = allCards.allCards.find(cards => cards.name === card)
    addGuess(cardGuess)
  }

  const doomGuyState = (x) => {
    if (x) {
      return '/assets/images/doomguy/doomguy_v.png'
    }
    else if (guesses.guesses.length < Math.floor(0.2 * guesses.gameState.roundNumber)) {
      return '/assets/images/doomguy/doomguy_0_t.gif'
    } else if (guesses.guesses.length >= Math.floor(0.2 * guesses.gameState.roundNumber) && guesses.guesses.length < Math.floor(0.4 * guesses.gameState.roundNumber)) {
      return '/assets/images/doomguy/doomguy_1_t.gif'
    } else if (guesses.guesses.length >= Math.floor(0.4 * guesses.gameState.roundNumber) && guesses.guesses.length < Math.floor(0.6 * guesses.gameState.roundNumber)) {
      return '/assets/images/doomguy/doomguy_2_t.gif'
    } else if (guesses.guesses.length >= Math.floor(0.6 * guesses.gameState.roundNumber) && guesses.guesses.length < Math.floor(0.8 * guesses.gameState.roundNumber)) {
      return '/assets/images/doomguy/doomguy_3_t.gif'
    } else {
      return '/assets/images/doomguy/doomguy_4_t.gif'
    }
  }

  const inputPlaceholder = () => {
    if (guesses.guesses.length === 0) {
      return 'Type a card name...'
    } else if (guesses.guesses.length < guesses.gameState.roundNumber) {
      return `Guess ${guesses.guesses.length + 1} of ${guesses.gameState.roundNumber}`
    } else {
      return `Guess ${guesses.guesses.length} of ${guesses.gameState.roundNumber}`
    }
  }

  return (
    <div className='guess-form-container'>
      <form onSubmit={handleSubmit}>
        <div className='guess-form-wrapper'>
          <input
            className='guess-form-input'
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            value={inputField}
            placeholder={inputPlaceholder()}
          />
          <ul className='guess-form-ul'>
            {inputField.length > 2
              ? filteredCards.map((card, i) =>
                <li
                  className={index === i ? 'active-guess' : 'guess-form-li'}
                  onClick={() => handleClickSubmit(card)}
                  key={card}>
                  {card}
                </li>
              )
              : null }
          </ul>
        </div>
      </form>
      <div><img className='doomguy' src={(guesses.gameState.gameCorrectCard.at(-2) === guesses.gameState.gameGuesses.at(-1) && guesses.gameState.gameCorrectCard.at(-2) !== undefined) ? doomGuyState('x') : doomGuyState()} /></div>
      <div><img className='mtg-logo' src='/assets/images/mtg_logo/gcYrmy5q9f.png'/></div>
    </div>
  )
}

export default GuessForm