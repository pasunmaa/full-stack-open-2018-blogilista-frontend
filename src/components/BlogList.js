import React from 'react'
import PropTypes from 'prop-types'

const BlogList = (props) => {
  const routeToBlog = (id) => () => {
    //console.log(id, props)
    props.setselectedblog(id)
    props.history.push(`/blogs/${id}`)
  }

  const blogsSortedByLikes = props.blogs.sort((x, y) => y.likes - x.likes)
  return (
    <div className='clickableBlog'>
      <table>
        <tbody>
          {blogsSortedByLikes.map(blog =>
            <tr className='blogItem' key={blog.id} onClick={routeToBlog(blog.id)} >
              <td> {blog.title} by {blog.author} </td>
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
  setselectedblog: PropTypes.func.isRequired,
}

export default BlogList