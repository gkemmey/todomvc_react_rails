import { createStore, combineReducers } from 'redux';
import { csrfHeader } from '../helpers/async_helpers.js'

const todoFilter = (state = "ALL", action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      return action.filter;
    }
    default: {
      return state;
    }
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE': {
      return [
        ...action.todos
      ];
    }
    case 'ADD_TODO': {
      return [
        ...state,
        { id: action.id, title: action.title, completed: false }
      ];
    }
    case 'TOGGLE_TODO': {
      return state.map((todo) => {
        if (todo.id !== action.id) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed
        };
      });
    }
    case 'UPDATE_MULTIPLE_TODOS': {
      return state.map((todo) => {
        if (!action.ids.includes(todo.id)) {
          return todo;
        }

        return {
          ...todo,
          completed: action.completed
        };
      })
    }
    default: {
      return state;
    }
  }
}

const message = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE': {
      return action.message
    }
    default: {
      return state;
    }
  }
}

const meta = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALIZE': {
      return {
        ...action.meta
      }
    }
    default: {
      return state;
    }
  }
}

const store = createStore(
  combineReducers({
    todoFilter: todoFilter,
    todos:      todos,
    message:    message,
    meta:       meta
  }),

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

export const initialize = ({ todos, meta }) => {
  store.dispatch({ type: 'INITIALIZE', todos: todos, meta: meta });
}

export const setMessage = (message) => {
  store.dispatch({ type: "SET_MESSAGE", message: message })
}

export const visibleTodos = () => {
  // all, active, completed
  switch (store.getState().todoFilter) {
    case "ALL": {
      return store.getState().todos
    }

    case "ACTIVE": {
      return store.getState().todos.filter((e) => ( !e.completed ))
    }

    case "COMPLETED": {
      return store.getState().todos.filter((e) => ( e.completed ))
    }

    default: {
      return store.getState().todos
    }
  }
}

export const addTodo = (title) => {
  return fetch(store.getState().meta.addTodoPath, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({ todo: { title: title } }),
      headers: new Headers({ ...csrfHeader(), 'Content-Type': 'application/json' })
    }).
    then((response) => ( response.ok ? response : (() => { throw Error(response.statusText) })() )).
    then((response) => ( response.json() )).
    then((todo) => {
      store.dispatch({
        type: "ADD_TODO",
        ...todo
      })
    }).
    catch((error) => { console.log("error in addTodo:", error) });
}

export const toggleTodo = (id) => {
  const path = store.getState().meta.toggleTodoPath.replace(/:id/gi, id);

  fetch(path, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: new Headers({ ...csrfHeader() })
    }).
    then((response) => ( response.ok ? response : (() => { throw Error(response.statusText) })() )).
    then((response) => {
      store.dispatch({ type: "TOGGLE_TODO", id: id })
    }).
    catch((error) => { console.log("error in toggleTodo:", error ) })
}

export const updateVisible = (completed) => {
  let idsOfVisibleTodos = visibleTodos().reduce((r, e) => ( r.concat(e.id) ), []);

  return fetch(store.getState().meta.updateMultipleTodosPath, {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify({
        ids: idsOfVisibleTodos,
        completed: completed
      }),
      headers: new Headers({ ...csrfHeader(), 'Content-Type': 'application/json' })
    }).
    then((response) => ( response.ok ? response : (() => { throw Error(response.statusText) })() )).
    then((response) => {
      store.dispatch({ type: "UPDATE_MULTIPLE_TODOS", ids: idsOfVisibleTodos, completed: completed })
    }).
    catch((error) => { console.log("error in updateVisible:", error ) })
}
