import React from 'react'
import PropTypes from 'prop-types'

const BlogList = (props) => {
  //console.log(props)
  const routeToBlog = (id) => () => {
    console.log(id, props)
    props.setSelectedBlog(id)
    props.history.push(`/blogs/${id}`)
    //props.history.history.push(`/users/${id}`)
  }

  const blogsSortedByLikes = props.blogs.sort((x, y) => y.likes - x.likes)
  console.log(props.blogs, blogsSortedByLikes)
  return (
    <div className='clickableBlog'>
      <table>
        <tbody>
          {blogsSortedByLikes.map(blog =>
            <tr key={blog.id} onClick={routeToBlog(blog.id)} >
              <td> {blog.title} by {blog.author} </td>
              {/*  <td>
                  {this.props.showactionbutton ?
                    <button onClick={this.props.actionbutton}>{this.props.actionlable}</button> : ''}
                </td> */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

BlogList.propTypes = {
  history: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  //actionlable: PropTypes.string.isRequired,
  //actionbutton: PropTypes.func.isRequired
}

export default BlogList