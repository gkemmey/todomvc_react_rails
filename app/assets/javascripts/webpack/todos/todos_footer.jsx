import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { setFilter, visibleTodos, destroyCompleted } from '../stores/todos_store.js'


let TodosFooter = ({ totalTodos, incompleteTodos, completedTodos, isSelected }) => (
  <footer id="footer" className={ totalTodos > 0 ? "" : "hidden" }>
    <span id="todo-count">
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

    {
      completedTodos > 0 &&
        <button id="clear-completed" onClick={ destroyCompleted }>
          Clear completed
        </button>
    }
  </footer>
)

TodosFooter = connect(
  (state, props) => {
    const todoFilter = state.todoFilter
    const todos = state.todos

    return {
      totalTodos: todos.length,

      // punt to helper method rather than duplicate
      incompleteTodos:  visibleTodos("ACTIVE", todos).length,
      completedTodos:   visibleTodos("COMPLETED", todos).length,

      isSelected: (id) => ( id.toUpperCase() === todoFilter ? "selected" : "" )
    }
  }
)(TodosFooter);

export default TodosFooter;
