import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { setFilter, visibleTodos } from '../stores/todos_store.js'


let TodosFooter = ({ totalTodos, incompleteTodos, isSelected }) => (
  <footer id="footer" className={ totalTodos > 0 ? "" : "hidden" }>
    <span id="todo-count">
      { console.log("incompleteTodos:", incompleteTodos) }
      { incompleteTodos } { incompleteTodos === 0 || incompleteTodos > 1 ? "items" : "item" } left
    </span>

    <ul id="filters">
      <li>
        <a
          id="all"
          href=""
          className={ isSelected("all") }
          onClick={ (e) => { e.preventDefault(); setFilter("ALL") } }>

          All
        </a>
      </li>
      <li>
        <a
          id="active"
          href=""
          className={ isSelected("active") }
          onClick={ (e) => { e.preventDefault(); setFilter("ACTIVE") } }>

          Active
        </a>
      </li>
      <li>
        <a
          id="completed"
          href=""
          className={ isSelected("completed") }
          onClick={ (e) => { e.preventDefault(); setFilter("COMPLETED") } }>

          Completed
        </a>
      </li>
    </ul>
  </footer>
)

TodosFooter = connect(
  (state, props) => {
    const todoFilter = state.todoFilter
    const todos = state.todos

    return {
      totalTodos: todos.length,
      incompleteTodos: visibleTodos("ACTIVE", todos).length, // punt to helper method rather than duplicate
      isSelected: (id) => ( id.toUpperCase() === todoFilter ? "selected" : "" )
    }
  }
)(TodosFooter);

export default TodosFooter;
