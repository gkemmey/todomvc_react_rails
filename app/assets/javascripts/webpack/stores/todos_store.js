import { createStore, combineReducers } from 'redux';

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
    default: {
      return state;
    }
  }
}

const message = (state = '', action) => {
  switch (action.type) {
    case: 'SET_MESSAGE': {
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
    message:    message
  }),

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

export const initialize = (todos, meta) => {
  store.dispatch({ type: 'INITIALIZE', todos: todos, meta: meta });
}

export const setMessage = (message) => {
  store.dispatch({ type: "SET_MESSAGE", message: message })
}

export const addTodo = (title) => {
  var data = new FormData();
  data.append('title', title;

  fetch(store.getState().meta.addTodoPath, {
      method: 'POST',
      credentials: 'same-origin',
      body: data
    }).
    then((response) => ( response.ok ? response : throw Error(response.statusText) )).
    then((response) => ( response.json() )).
    then((todo) => {
      store.dispatch({
        type: "ADD_TODO",
        { ...todo }
      })
    }).
    catch((error) => { console.log("error in addTodo:", error) });
}

export const toggleTodo = (id) => {
  fetch(`${store.getState().meta.toggleTodoPath}/${id}`, { method: 'PUT', credentials: 'same-origin' }).
    then((response) => ( response.ok ? response : throw Error(response.statusText) )).
    then((response) => {
      store.dispatch({ type: "TOGGLE_TODO", id: id })
    }).
    catch((error) => { console.log("error in toggleTodo:", error ) })
}
