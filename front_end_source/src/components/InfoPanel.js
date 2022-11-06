import { useDispatch } from 'react-redux'
import { setModalStateInfo } from '../reducers/modalReducer'

const InfoPanel = () => {
  const dispatch = useDispatch()

  const closeModal = (event) => {
    if (event.target.className === 'modal-background' || event.target.className === 'close') {
      dispatch(setModalStateInfo(null))
    }
  }

  return (
    <div className='modal-background' onMouseDown={(event) => closeModal(event)}>
      <div className='modal-content'>
        <div className='modal-header'>
          <div id='modal-header-text'>Rules</div>
          <span className="close" onClick={(event) => closeModal(event)}>&times;</span>
        </div>
        <div className='modal-body'>
          <div>The aim of the game is to guess the correct Magic: The Gathering card.
              The card is a random card, drawn from a pool of cards comprised of cards
              from all the core and expansion sets, i.e. only sets which have been at some
              point playable in standard play mode, starting from Limited Edition Alpha.
              Cards are represented by their name, mana value, colour, rarity, type, subtypes
              and set along with its release year. The number of rounds is configurable by the player.
          <p></p>
              There are several hints offered to the player. At the time of writing this, if any
              field pertaining to the guessed card is exactly the same as the correct card, the background
              of that field is green. In the case of mana value, rarity and set year, the down or up triangle
              indicated that the correct answer is lesser or greater value, respectively. In the case of mana
              value, the backgroung is yellow if the mana value is within 2 of the correct value and in the case
              of set year the background is yellow if the year is correct but not the set.
          <p></p>
              Note: due to limited allowed dataset sizes on various free hosting services,
              this app on a website might contain different set of cards. However, it&apos;s built
              with Scryfall.com api data types in mind so it can accept any dataset in that form.
          </div>
        </div>
        <div className='modal-footer'>
          <div>The main purpose of this app is to put the teachings of Full Stack Open course by University of Helsinki
            in use as well as just get more familiar with web developing in general. This app has been built
            with React using Redux and Redux Toolkit for most state management. It&apos;s heavily inspired by
            enchantwordle.com, which I found randomly and which I find functinally and visually pleasing, however all
            the code is my own.

          <p></p>
            This app is a work of Petri Montonen (https://github.com/PJM178/mtg-wordle - 2022) and is WIP.
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoPanel