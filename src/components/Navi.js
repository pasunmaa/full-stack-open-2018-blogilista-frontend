import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 10,
  },
}

const Navi = ( { name, logout, classes } ) => {
  const menuStyle = {
    backgroundColor: 'lightgreen',
    padding: 10
  }
  const activeStyle = {
    color: 'white',
    backgroundColor: 'black',
    padding: 10
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <NavLink exact activeStyle={activeStyle} to="/">blogs</NavLink> &nbsp;
          <NavLink exact activeStyle={activeStyle} to="/users">users</NavLink> &nbsp; &nbsp; &nbsp;
          <Typography variant="title" color="inherit" className={classes.flex}>
            {name} kirjautuneena.
          </Typography>
          <Button color="inherit" onClick={logout}>kirjaudu ulos</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Navi.propTypes = {
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Navi)
