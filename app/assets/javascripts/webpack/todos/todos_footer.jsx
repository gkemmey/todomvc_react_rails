import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

let TodosFooter = ({ todos }) => (
  <footer id="footer" className={ todos.length > 0 ? "" : "hidden" }></footer>
)

TodosFooter = connect(
  (state, props) => ({
    todos: state.todos
  })
)(TodosFooter);

export default TodosFooter;
