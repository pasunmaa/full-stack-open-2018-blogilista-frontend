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
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible} className='clickableLine'>
          <table>
            <tbody>
              <tr>
                <td onClick={this.toggleVisibility}>
                  {this.props.linetext}
                </td>
                <td>
                  {this.props.showactionbutton ?
                    <button onClick={this.props.actionbutton}>{this.props.actionlable}</button> : ''}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={showWhenVisible} className='togglableContent'>
          <table>
            <tbody>
              <tr>
                <td onClick={this.toggleVisibility}>
                  {this.props.linetext}
                </td>
                <td>
                  {this.props.showactionbutton ?
                    <button onClick={this.props.actionbutton}>{this.props.actionlable}</button> : ''}
                </td>
              </tr>
            </tbody>
          </table>
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