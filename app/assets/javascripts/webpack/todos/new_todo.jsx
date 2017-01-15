import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import store, { addTodo } from '../stores/todos_store.js'

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' }

    this.handleChange        = this.handleChange.bind(this);
    this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleEnterKeyPress(e) {
    if (e.key !== "Enter") { return; }

    addTodo(this.state.title).then(() => { this.setState({ title: '' }) });
  }

  render() {
    return (
      <input
        type="text"
        id="new-todo"
        placeholder="What needs to be done?"
        autoFocus="autofocus"
        autoComplete="off"
        value={ this.state.title }
        onChange={ this.handleChange }
        onKeyPress={ this.handleEnterKeyPress }
      />
    )
  }
}

export default NewTodo;
