import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button
            className={this.props.classes.button}
            variant="contained" color="primary"
            onClick={this.toggleVisibility} >
            {this.props.buttonLabel}
          </Button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <Button
            className={this.props.classes.button}
            variant="outlined" color="default"
            onClick={this.toggleVisibility} >
            peru
          </Button>
        </div>
      </div>
    )
  }
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Togglable)