import { useSelector } from 'react-redux'


const GuessTable = () => {
  const guesses = useSelector(state => state.guesses)
  const correctCard = useSelector(state => state.answer)
  const cards = useSelector(state => state.cards)

  const manaValueElement = (card) => {
    if (card.cmc > correctCard.cmc) {
      return `${card.cmc} ▼`
    } else if (card.cmc < correctCard.cmc) {
      return `${card.cmc} ▲`
    } else {
      return card.cmc
    }
  }

  const nameClass = (i) => {
    const nameCorrect = correctCard.name
    const nameGuess = guesses.guesses[i].name
    if (nameCorrect === nameGuess) {
      return 'correct'
    }
  }

  const manaValueClass = (i) => {
    const manaCorrect = correctCard.cmc
    const manaGuess = guesses.guesses[i].cmc
    if (manaGuess === manaCorrect) {
      return 'correct'
    } else if (manaGuess + 2 === manaCorrect || manaGuess - 2 === manaCorrect) {
      return 'correct-almost'
    }
  }

  const coloursClass = (i) => {
    const colorCorrect = correctCard.color_identity.toString()
    const colorGuess = guesses.guesses[i].color_identity.toString()
    if (colorGuess === colorCorrect) {
      return 'correct'
    }
  }

  const rarityToInteger = (card) => {
    const rarities = ['common', 'uncommon', 'rare', 'mythic']
    const dummyCard = { ...card }
    rarities.forEach((rarity, i) => dummyCard.rarity === rarity ? dummyCard.rarity = i : null)
    return dummyCard
  }

  const rarityElement = (card) => {
    const correctDummyCard = rarityToInteger(correctCard)
    const dummyCard = rarityToInteger(card)
    if (dummyCard.rarity < correctDummyCard.rarity) {
      return `${card.rarity} ▲`
    } else if (dummyCard.rarity > correctDummyCard.rarity) {
      return `${card.rarity} ▼`
    } else {
      return card.rarity
    }
  }

  const rarityClass = (i) => {
    const rarityCorrect = correctCard.rarity
    const rarityGuess = guesses.guesses[i].rarity
    if (rarityGuess === rarityCorrect) {
      return 'correct'
    }
  }

  const typeClass = (i) => {
    const typeCorrect = correctCard.type_line.split('—', 1).toString()
    const typeGuess = guesses.guesses[i].type_line.split('—', 1).toString()
    if (typeGuess === typeCorrect) {
      return 'correct'
    }
  }

  const subTypeClass = (i) => {
    const subTypeCorrect = correctCard.type_line.split('—').filter(word => word.toString() !== correctCard.type_line.split('—', 1).toString())
    const subTypeGuess = guesses.guesses[i].type_line.split('—').filter(word => word.toString() !== guesses.guesses[i].type_line.split('—', 1).toString())
    if (subTypeGuess.toString() === subTypeCorrect.toString()) {
      return 'correct'
    }
  }

  const setElement = (card) => {
    const correctSetYear = Number(cards.allSets.find(set =>
      set.id === correctCard.set_id).released_at.split('-', 1).toString())
    const guessSetYear = Number(cards.allSets.find(set =>
      set.id === card.set_id).released_at.split('-', 1).toString())
    if (guessSetYear < correctSetYear) {
      return `${guessSetYear.toString().substring(2,4)} ▲`
    } else if (guessSetYear > correctSetYear) {
      return `${guessSetYear.toString().substring(2,4)} ▼`
    } else {
      return correctSetYear.toString().substring(2,4)
    }
  }

  const setClass = (card) => {
    const correctSetYear = Number(cards.allSets.find(set =>
      set.id === correctCard.set_id).released_at.split('-', 1).toString().substring(2,4))
    const guessSetYear = Number(cards.allSets.find(set =>
      set.id === card.set_id).released_at.split('-', 1).toString().substring(2,4))
    if (guessSetYear === correctSetYear && card.set_id === correctCard.set_id) {
      return 'correct'
    } else if (guessSetYear === correctSetYear) {
      return 'correct-almost'
    }
  }

  // hover over image


  const imageContainerStyle = {
    transition: 'transform .1s',
    display: 'none',
    zIndex: '2',
    position: 'absolute'
  }

  const imageSizeStyle = {
    width: '300px',
    height: 'auto'
  }

  const getMouse = (e, i) => {
    const mouse = { x:0, y:0 }
    mouse.x = e.pageX
    mouse.y = e.pageY
    const image = document.getElementById(`image-container-${i}`)
    image.style.display = 'block'
    image.style.left = mouse.x + 50 + 'px'
    image.style.top = mouse.y + 'px'
  }

  const mouseImage = (e, i) => {
    const test = document.getElementById(`test-${i}`)
    test.addEventListener('mousemove', getMouse(e, i))
  }

  const hideImage = (i) => {
    const image = document.getElementById(`image-container-${i}`)
    image.style.display = 'none'
  }

  const imageBorder = (card) => {
    if (card.image_uris) {
      return card.image_uris.border_crop
    } else {
      return card.card_faces[0].image_uris.border_crop
    }
  }

  return (
    <table className='guess-table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Card Name</th>
          <th>Mana Value</th>
          <th>Colours</th>
          <th>Rarity</th>
          <th>Type</th>
          <th>Subtype</th>
          <th>Set</th>
        </tr>
      </thead>
      <tbody>
        {guesses.guesses.map((card, i) => {
          return (
            <tr key={i}>
              <td>{i+1}</td>
              <td className={nameClass(i)}>
                <div>
                  <a className='card-link' id={`test-${i}`} href="#" onMouseMove={(event) => mouseImage(event, i)} onMouseLeave={() => hideImage(i)}>{card.name}</a>
                  <div id={`image-container-${i}`} style={imageContainerStyle}>
                    <img id={`image-size-${i}`} style={imageSizeStyle} src={imageBorder(card)}/>
                  </div>
                </div>
              </td>
              <td className={manaValueClass(i)}>{manaValueElement(card)}</td>
              <td className={coloursClass(i)}><div className='indicator-bar'></div>{card.color_identity}</td>
              <td className={rarityClass(i)}>{rarityElement(card)}</td>
              <td className={typeClass(i)}>{card.type_line.split('—', 1)}</td>
              <td className={subTypeClass(i)}>
                {card.type_line.split('—').filter(word => word.toString() !== card.type_line.split('—', 1).toString())}
              </td>
              <td id='set-column' className={setClass(card)}>
                <div className='table-set-centered'>
                  <img className='table-set-image' src={`/assets/images/sets/${card.set_id}.svg`}/>
                  {/* {card.set} */}
                  {` '${setElement(card)}`}
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default GuessTable