import { useSelector } from 'react-redux'

const SetList = () => {
  const allSets = useSelector(state => state.cards)

  return (
    <div>
      {allSets ? allSets.allSets.map(set =>
        <div className='set-container' key={set.id}><img className='set-image' src={`/assets/images/sets/${set.id}.svg`} />{set.name}</div>
      ) : null}
    </div>
  )
}

export default SetList