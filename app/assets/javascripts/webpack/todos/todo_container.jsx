import React from 'react'
import { connect } from 'react-redux'

import { updateTodo, destroyTodo } from '../stores/todos_store.js'

class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, editedTitle: this.props.todo.title, submitting: false }

    this.handleBlur        = this.handleBlur.bind(this)
    this.handleCheckbox    = this.handleCheckbox.bind(this)
    this.handleDestroy     = this.handleDestroy.bind(this)
  }

  handleBlur(e) {
    e.preventDefault();
    e.persist();

    if (this.props.todo.title !== this.state.editedTitle) { // we can just do nothing in this case
      updateTodo({ id: this.props.todo.id, title: this.state.editedTitle }).
        then((response) => {
          this.setState({ editing: false })
          e.target.blur();
        })

      return;
    }

    this.setState({ editing: false })
    e.target.blur();
  }

  handleCheckbox(e) {
    updateTodo({ id: this.props.todo.id, completed: !this.props.todo.completed })
  }

  handleDestroy(e) {
    destroyTodo(this.props.todo.id)
  }

  render() {
    const { todo } = this.props;

    return (
      <li className={ (todo.completed ? "completed " : "") }>
        <div className="view" onDoubleClick={ (e) => { this.setState({ editing: true }) } }>
          <input
            type="checkbox"
            className="toggle"
            value="1"
            checked={ todo.completed }
            onChange={ this.handleCheckbox }
          />

          {
            !this.state.editing ?
              <label>{ todo.title }</label>
            :
              <input
                type="text"
                className="edit"
                value={ this.state.editedTitle }
                onChange={ (e) => { this.setState({ editedTitle: e.target.value }) } }
                onBlur={ this.handleBlur }
                ref={ (input) => { input && input.focus()} }
              />
          }


          <button className="destroy" onClick={ this.handleDestroy } />
        </div>
      </li>
    )
  }
}

TodoContainer = connect(
  (state, props) => {
    return {
      todo: state.todos.find((t) => ( t.id === props.id ))
    }
  }
)(TodoContainer);

export default TodoContainer;
