import { useSelector, useDispatch } from 'react-redux'
import { setModalStateInfo, setModalStateConfig } from '../reducers/modalReducer'
import InfoPanel from './InfoPanel'
import ConfigPanel from './ConfigPanel'

const Header = () => {
  const dispatch = useDispatch()
  const modalState = useSelector(state => state.modal)

  const infoToggle = () => {
    if (!modalState.info) {
      dispatch(setModalStateInfo(true))
    } else if (modalState.info) {
      dispatch(setModalStateInfo(null))
    }
  }

  const configToggle = () => {
    if (!modalState.config) {
      dispatch(setModalStateConfig(true))
    } else if (modalState.config) {
      dispatch(setModalStateConfig(null))
    }
  }

  return (
    <div className="header">
      <div><h1>This is a Magic: The Gathering wordle-like app heavily inspired by https://enchantworldle.com/</h1></div>
      <div><button className='config-button' type='button' onClick={configToggle}>Config</button></div>
      <div><button className='info-button' type='button' onClick={infoToggle}>Info</button></div>
      {(modalState.info) ? <InfoPanel /> : null}
      {(modalState.config) ? <ConfigPanel /> : null}
    </div>
  )
}

export default Header