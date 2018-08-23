import React from 'react'
import { connect } from 'react-redux'
import { setSelectedUser } from '../reducers/userReducer'
import PropTypes from 'prop-types'

const UserList = (props) => {
  const routeToUser = (id) => () => {
    //console.log(id, props)
    props.setSelectedUser(id)
    props.history.push(`/users/${id}`)
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td><strong>name</strong></td>
            <td><strong>blogs added</strong></td>
          </tr>
        </thead>
        <tbody>
          {props.users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
            <tr key={user._id} onClick={routeToUser(user._id)} >
              <td> {user.name} </td>
              <td> {user.blogs.length} </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    users: state.userdata.users,
  }
}

const mapDispatchToProps = {
  setSelectedUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)
