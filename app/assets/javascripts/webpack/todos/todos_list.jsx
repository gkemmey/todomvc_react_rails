import React from 'react'
import { connect } from 'react-redux'

import { visibleTodos } from '../stores/todos_store.js'

import TodoContainer from './todo_container.jsx'

let TodosList = ({ todoFilter, todos }) => (
  <ul id="todos">
    {
      visibleTodos(todoFilter, todos).map((todo) => {
        // kind of weird passing the id here, but we want the TodoContainer to connect
        // to the store and get the details of the todo its ownself so it's notified of
        // changes to the todo in the store and re-renders
        return <TodoContainer key={ todo.id } id={ todo.id } />
      })
    }
  </ul>
)

TodosList = connect(
  (state, props) => ({
    todoFilter: state.todoFilter,
    todos: state.todos
  })
)(TodosList);

export default TodosList;
