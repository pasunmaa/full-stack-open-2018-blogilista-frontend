import React from 'react'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const UserList = (props) => {
  return (
    <div>
      <h2>Users</h2>
      <strong>name  blogs added</strong>
      {props.users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
        <div key={user._id}>
          <div>
            {user.name} {user.blogs.length}
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  showNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)
