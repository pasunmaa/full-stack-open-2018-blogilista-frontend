import React from 'react'
import { BrowserRouter as NavLink } from 'react-router-dom'

const Navi = () => {
  const menuStyle = {
    backgroundColor: 'lightblue',
    padding: 10
  }
  const activeStyle = {
    color: 'white',
    backgroundColor: 'black',
    padding: 10
  }

  return (
    <div style={menuStyle}>
      <NavLink exact activeStyle={activeStyle} to="/">blogs</NavLink> &nbsp;
      <NavLink exact activeStyle={activeStyle} to="/users">users</NavLink> &nbsp;
    </div>
  )
}

export default Navi