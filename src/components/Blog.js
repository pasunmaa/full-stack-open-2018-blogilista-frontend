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
  id = ''
  async componentDidMount() {
    //if (!this.props.blogs)
    await this.props.blogInitialization()
    console.log('componentDidMount')
  }

  render() {
    if (!this.props.id) { // if blog is not defined, check if there is a meaningful id on address line
      this.id = this.props.history.location.pathname.replace('/blogs/', '')
      console.log(this.id)
    }
    else
      this.id = this.props.id
    const blog = this.props.blogs.find(blog => blog.id === this.id)
    console.log(blog, this.props.blogs)

    return (
      <div style={blogStyle} key={blog.id}>
        <div>{blog.title} <strong>by</strong> {blog.author}</div>
        <div style={urlStyle}><a href={blog.url}>{blog.url}</a></div>
        <div style={lineStyle}>
          {blog.likes} tykkäystä &nbsp;
          <button onClick={this.props.likeIncrease}>tykkää</button>
        </div>
        <div style={lineStyle}>lisätty by {blog.user ? blog.user.name : 'EI TIEDOSSA'}</div>
        <div style={lineStyle}>
          {(!blog.useranme || blog.user.username === this.props.currentUser) ? 
            <button onClick={this.props.deleteBlog(blog.id)}>poista</button> : 
            {''}
          }
        </div>
        {blog.user ? this.state.user.username === blog.user.username : true}
      </div>
    )
  }
}

Blog.propTypes = {
  id: PropTypes.string,
  likeIncrease: PropTypes.func.isRequired
}

export default Blog