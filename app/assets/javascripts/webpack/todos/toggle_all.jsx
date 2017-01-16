import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import store, { visibleTodos, updateVisible } from '../stores/todos_store.js'

class ToggleAll extends React.Component {
  constructor(props) {
    super(props);

    this.state = { submitting: false }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if(this.state.submitting) { return }

    this.setState({ submitting: true })
    updateVisible(!this.props.checked).
      then(() => { this.setState({ submitting: false }) }).
      catch(() => { this.setState({ submitting: false}) })
  }

  render() {
    return (
      <input
        id="toggle-all"
        type="checkbox"
        value="1"
        checked={ this.props.checked }
        onChange={ this.handleChange }
      />
    )
  }
}

ToggleAll = connect(
  (state, props) => ({
    checked: visibleTodos().length > 0 && visibleTodos().every((e) => ( e.completed ))
  })
)(ToggleAll)

export default ToggleAll;
