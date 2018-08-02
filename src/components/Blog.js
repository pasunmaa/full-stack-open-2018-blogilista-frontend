import React from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 7,
  paddingLeft: 4,
  paddingBottom: 7,
  border: 'solid',
  borderWidth: 1,
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

const Blog = ({ blog }) => (
  <div style={blogStyle}>
    <div>{blog.title} <strong>by</strong> {blog.author}</div>
    <div style={urlStyle}><a href={blog.url}>{blog.url}</a></div>
    <div style={lineStyle}>{blog.likes} tykkäystä <button>tykkää</button></div>
    <div style={lineStyle}>lisätty by {blog.user.name}</div>
  </div>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog