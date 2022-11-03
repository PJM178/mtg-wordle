import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.message) {
    return (
      <h1 className={notification.messageType}>{notification.message}</h1>
    )
  }
}

export default Notification