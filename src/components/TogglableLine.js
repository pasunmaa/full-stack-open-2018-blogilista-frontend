import React from 'react'
import PropTypes from 'prop-types'

class TogglableLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <div onClick={this.toggleVisibility}>
            {this.props.linetext} &nbsp;
        </div>
        <button onClick={this.props.actionbutton}>{this.props.actionlable}</button>
        </div>
        <div style={showWhenVisible}>
          <div onClick={this.toggleVisibility}>{this.props.linetext}</div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

TogglableLine.propTypes = {
  linetext: PropTypes.string.isRequired,
  actionlable: PropTypes.string.isRequired,
  actionbutton: PropTypes.func.isRequired
}

export default TogglableLine