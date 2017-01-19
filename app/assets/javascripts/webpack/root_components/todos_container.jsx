import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

import store, { initialize, visibleTodos } from '../stores/todos_store.js'

import NewTodo from '../todos/new_todo.jsx'
import ToggleAll from '../todos/toggle_all.jsx'
import TodoContainer from '../todos/todo_container.jsx'

class TodosContainer extends React.Component {
  constructor(props) {
    super(props);

    // at this point props is just stuff rails has sent down to us. we'll go ahead and load that
    // into our redux store and get this show on the road
    initialize(this.props);
  }

  render() {
    return (
      <Provider store={ store }>
        <section id="todoapp">
          <header id="header">
            <h1>todos</h1>
            <NewTodo />
          </header>

          <section id="main">
            <ToggleAll />

            <ul id="todos">
              {
                visibleTodos().map((todo) => (
                  <TodoContainer key={ todo.id } id={ todo.id } />
                ))
              }
            </ul>
          </section>

          <footer id="footer" className={ store.getState().todos.length > 0 ? "" : "hidden" }>
          </footer>
        </section>
      </Provider>
    )
  }
}

export default TodosContainer;
