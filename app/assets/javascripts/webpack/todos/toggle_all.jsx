import React from 'react'
import { connect } from 'react-redux'

import { visibleTodos, updateVisible } from '../stores/todos_store.js'

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
  (state, props) => {
    const _visibleTodos = visibleTodos(state.todoFilter, state.todos);

    return { checked: _visibleTodos.length > 0 && _visibleTodos.every((e) => ( e.completed )) };
  }
)(ToggleAll)

export default ToggleAll;
