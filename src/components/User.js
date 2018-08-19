import React from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const User = ({ users, id }) => {
  const user = users.find(user => user._id === id)
  if (user)
    return (
      <div>
        <br></br>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        {user.blogs.map(blog => <li key={blog._id} >{blog.title} by {blog.author}</li>)}
      </div>
    )
  else
    return (<div></div>)

}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    users: state.userdata.users,
    id: state.userdata.selecteduserid
  }
}

const mapDispatchToProps = {
  showNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
