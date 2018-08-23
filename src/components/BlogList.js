import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
})

const BlogList = (props) => {
  const routeToBlog = (id) => () => {
    props.setselectedblog(id)
    props.history.push(`/blogs/${id}`)
  }

  const blogsSortedByLikes = props.blogs.sort((x, y) => y.likes - x.likes)
  return (
    <Paper className={props.classes.root}>
      <h2>Blogit</h2>
      <Table className={props.classes.root}>
        <TableHead>
          <TableRow>
            <TableCell><strong>Nimi</strong></TableCell>
            <TableCell><strong>Kirjoittaja</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogsSortedByLikes.map(blog =>
            <TableRow className='blogItem' key={blog.id} onClick={routeToBlog(blog.id)} >
              <TableCell> {blog.title} </TableCell>
              <TableCell> {blog.author} </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}

BlogList.propTypes = {
  history: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setselectedblog: PropTypes.func.isRequired,
}

export default withStyles(styles)(BlogList)