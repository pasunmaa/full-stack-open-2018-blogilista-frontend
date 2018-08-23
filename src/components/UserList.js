import React from 'react'
import { connect } from 'react-redux'
import { setSelectedUser } from '../reducers/userReducer'
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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const UserList = (props) => {
  const routeToUser = (id) => () => {
    //console.log(id, props)
    props.setSelectedUser(id)
    props.history.push(`/users/${id}`)
  }

  return (
    <Paper className={props.classes.root}>
      <h2>Käyttäjät</h2>
      <Table className={props.classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Käyttäjä</CustomTableCell>
            <CustomTableCell>Blogien määrä</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
            <TableRow
              className={props.classes.row} hover={true}
              key={user._id} onClick={routeToUser(user._id)} >
              <CustomTableCell component="th" scope="row"> {user.name} </CustomTableCell>
              <CustomTableCell> {user.blogs.length} </CustomTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    users: state.userdata.users,
  }
}

const mapDispatchToProps = {
  setSelectedUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserList))

//export default withStyles(styles)(UserList)