import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const Login = ( { username, password, login, onChange, message } ) => {
  return (
    <div>
      <h2>Kirjaudu sovellukseen</h2>
      <form onSubmit={login}>
        <div>
            käyttäjätunnus
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
          />
        </div>
        <div>
            salasana
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
        <Notification message={message} type='error'/>
      </form>
    </div>
  )
}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  message: PropTypes.string
}

export default Login