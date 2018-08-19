import React from 'react'
import PropTypes from 'prop-types'

const Login = ( { username, password, login, onChange } ) => {
  return (
    <div className='login'>
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
      </form>
    </div>
  )
}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Login