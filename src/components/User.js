import React from 'react'
import { connect } from 'react-redux'
import { userInitialization } from '../reducers/userReducer'
import PropTypes from 'prop-types'

const User = ({ users, id, history }) => {
  if (!id) { // if id is not defined, check if there is a meaningful id on address line
    id = history.location.pathname.replace('/users/', '')
    //console.log(id)
  }
  if (!users)
    this.props.userInitialization()

  const user = users.find(user => user._id === id)
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
  users: PropTypes.array.isRequired,
  id: PropTypes.string,
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    users: state.userdata.users,
    id: state.userdata.selecteduserid
  }
}

export default connect(
  mapStateToProps,
  { userInitialization }
)(User)
