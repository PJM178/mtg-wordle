import { useSelector } from 'react-redux'

const StatPanel = () => {
  const stats = useSelector(state => state.stats)
  const gamesPlayed = stats.gamesPlayed
  const wins = stats.wins

  const imageContainerStyle = {
    transition: 'transform .1s',
    display: 'none',
    zIndex: '2',
    position: 'absolute',
    bottom: '200px'
  }

  const imageSizeStyle = {
    width: '300px',
    height: 'auto'
  }

  const getMouse = (e) => {
    const mouse = { x:0, y:0 }
    mouse.x = e.pageX
    mouse.y = e.pageY
    const image = document.getElementById('image-container-stat')
    image.style.display = 'block'
    image.style.left = mouse.x + 50 + 'px'
    image.style.top = mouse.y + -75 + 'px'
  }

  const mouseImage = (e) => {
    const test = document.getElementById('test-stat')
    test.addEventListener('mousemove', getMouse(e))
  }

  const hideImage = () => {
    const image = document.getElementById('image-container-stat')
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
    <div>
      <div id="modal-header-text">Stats</div>
      <br></br>
      <table className="stat-table">
        <tbody>
          <tr>
            <td>Games Played:</td><td className='stat-td-stat'>{gamesPlayed}</td>
          </tr>
          <tr>
            <td>Wins:</td><td className='stat-td-stat'>{wins}</td>
          </tr>
          <tr>
            <td>Win %:</td><td className='stat-td-stat'>{wins !== 0 ? `${Math.round(wins/gamesPlayed*100)}%` : '-'}</td>
          </tr>
          <tr>
            <td>Streak:</td><td className='stat-td-stat'>{stats.streak}</td>
          </tr>
          <tr>
            <td>Last card:</td>
            <td className='stat-td-stat'>{stats.lastCard
              ? <div>
                <a className='card-link' id={'test-stat'} href="#" onMouseMove={(event) => mouseImage(event)} onMouseLeave={() => hideImage()}>{stats.lastCard.name}</a>
                <div id={'image-container-stat'} style={imageContainerStyle}>
                  <img id={'image-size-stat'} style={imageSizeStyle} src={imageBorder(stats.lastCard)}/>
                </div>
              </div>
              : null }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default StatPanel