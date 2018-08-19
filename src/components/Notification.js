import React from 'react'
import { connect } from 'react-redux'
import './notification.css'
//import PropTypes from 'prop-types'

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

/* Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
} */

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    type: state.notification.notificationtype,
    filter: state.filter,
    anecdotes: state.anecdotes
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)

