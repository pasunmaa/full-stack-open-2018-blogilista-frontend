import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  button: {
    margin: 10,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 10,
  },
}

class Navi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
    }
  }

  menuStyle = {
    color: 'white',
    padding: 10
  }
  activeStyle = {
    color: 'white',
    backgroundColor: 'black',
    padding: 10
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    const { name, logout, classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar style={this.menuStyle}>
            <Hidden smUp>
              <IconButton
                className={classes.menuButton}
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                color="inherit" aria-label="Menu"
                onClick={this.handleClick} >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <NavLink exact to="/">blogs</NavLink>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <NavLink exact to="/users">users</NavLink>
                </MenuItem>
              </Menu>
            </Hidden>
            <Hidden xsDown>
              <span style={this.menuStyle}>
                <NavLink exact activeStyle={this.activeStyle} to="/">blogs</NavLink> &nbsp;
                <NavLink exact activeStyle={this.activeStyle} to="/users">users</NavLink> &nbsp; &nbsp; &nbsp;
              </span>
            </Hidden>
            <Typography variant="body1" color="inherit" align="right" className={classes.flex}>
              {name} kirjautuneena
            </Typography>
            <Button className={classes.button} variant="contained" color="default" size="small"
              onClick={logout}>kirjaudu ulos</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navi.propTypes = {
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Navi)
