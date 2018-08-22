import React from 'react'
import PropTypes from 'prop-types'

const BlogList = (props) => {
  //console.log(props)
  const routeToBlog = (id) => () => {
    //console.log(id, props)
    props.setselectedblog(id)
    props.history.push(`/blogs/${id}`)
  }

  const blogsSortedByLikes = props.blogs.sort((x, y) => y.likes - x.likes)
  //console.log(props.blogs, blogsSortedByLikes)
  return (
    <div className='clickableBlog'>
      <table>
        <tbody>
          {blogsSortedByLikes.map(blog =>
            <tr className='blogItem' key={blog.id} onClick={routeToBlog(blog.id)} >
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
  setselectedblog: PropTypes.func.isRequired,
  //actionlable: PropTypes.string.isRequired,
}

export default BlogList