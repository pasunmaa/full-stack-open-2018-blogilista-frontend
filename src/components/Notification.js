import React from 'react'
import './notification.css'

const Notification = ({ message, type }) => {
  if (message === null|| message === '') {
    return null
  }
  if (!type)
    type = 'standard'

  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification