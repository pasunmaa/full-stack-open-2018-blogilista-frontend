import React from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 7,
  paddingLeft: 4,
  paddingBottom: 7,
  border: 'solid',
  borderWidth: 1,
  marginTop: 15,
  marginBottom: 5
}

const urlStyle = {
  paddingTop: 2,
  paddingLeft: 8,
  paddingBottom: 2,
}

const lineStyle = {
  paddingLeft: 8,
}

class Blog extends React.Component {
  deleteBackToBlogs = () => {
    this.props.deleteBlog(this.props.blog._id)
    this.props.history.push('/')
  }

  render() {
    const blog = this.props.blog
    if (!blog) return (null) // if blog fetching from server is not completed do not render anything
    return (
      <div style={blogStyle} key={blog._id}>
        <div>{blog.title} <strong>by</strong> {blog.author}</div>
        <div style={urlStyle}><a href={blog.url}>{blog.url}</a></div>
        <div style={lineStyle}>
          {blog.likes} tykkäystä &nbsp;
          <button onClick={this.props.likeIncrease}>tykkää</button>
        </div>
        <div style={lineStyle}>lisännyt {blog.user ? blog.user.name : 'EI TIEDOSSA'}
          &nbsp;
          {(blog.user === undefined || blog.user.username === this.props.currentUser) ?
            <button onClick={this.deleteBackToBlogs}>poista</button> : <span></span>
          }
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object,
  likeIncrease: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
  history: PropTypes.object,
}

export default Blog