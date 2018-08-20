import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navi = ( props ) => {
  const menuStyle = {
    backgroundColor: 'lightgreen',
    padding: 10
  }
  const activeStyle = {
    color: 'white',
    backgroundColor: 'black',
    padding: 10
  }

  return (
    <span className='navi' style={menuStyle}>
      <NavLink exact activeStyle={activeStyle} to="/">blogs</NavLink> &nbsp;
      <NavLink exact activeStyle={activeStyle} to="/users">users</NavLink> &nbsp;
      &nbsp; &nbsp;
      <b>{props.name}</b> kirjautuneena. &nbsp;
      <button type="button" onClick={props.logout}>kirjaudu ulos</button>
    </span>
  )
}

Navi.propTypes = {
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}

export default Navi