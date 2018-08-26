import React from 'react'
//import { connect } from 'react-redux'
//import { userInitialization } from '../reducers/userReducer'
import PropTypes from 'prop-types'

const User = ({ user }) => {
  if (user)
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        {user.blogs.map(blog => <li key={blog._id} >{blog.title} by {blog.author}</li>)}
      </div>
    )
  else
    return (<div></div>)
}

User.propTypes = {
  user: PropTypes.object,
  //users: PropTypes.array.isRequired,
}

/* const mapStateToProps = (state) => {
  //console.log(state)
  return {
    users: state.userdata.users,
  }
}

export default connect(
  mapStateToProps,
  { userInitialization }
)(User) */

export default User