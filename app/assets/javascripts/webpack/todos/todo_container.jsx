import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import store, { visibleTodos, updateVisible } from '../stores/todos_store.js'

class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, editedTitle: this.props.todo.title, submitting: false }

    this.handleBlur     = this.handleBlur.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleDestroy  = this.handleDestroy.bind(this)
  }

  handleBlur(e) {
    console.log("blurred");
  }

  handleCheckbox(e) {
    console.log("checkbox");
  }

  handleDestroy(e) {
    console.log("destroying")
  }

  // TODO - need to fill in these methods, the three changes we can make to the list item
  //        toggle, delete, edit title

  render() {
    return (
      <div className="view" onDoubleClick={ (e) => { this.setState({ editing: true }) } }>
        <input
          type="checkbox"
          className="toggle"
          value="1"
          checked={ this.props.todo.completed }
          onChange={ this.handleCheckbox }
        />

        {
          !this.state.editing ?
            <label>{ this.props.todo.title }</label>
          :
            <input
              type="text"
              value={ this.state.editedTitle }
              onChange={ (e) => { this.setState({ editedTitle: e.target.value }) } }
              onBlur={ this.handleBlur }
            />
        }


        <button className="destroy" onClick={ this.handleDestroy } />
      </div>
    )
  }
}

export default TodoContainer;
