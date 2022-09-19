import { client } from '../../api/client'

export const ACTIONS = {
  TODOS_TODO_ADDED: 'todos/todoAdded',
  TODOS_TODO_TOGGLE: 'todos/todoToggle',
  TODOS_TODOS_LOADED: 'todos/todosLoaded',
  TODOS_ALL_COMPLETED: 'todos/allCompleted',
}

// const initialState = {
//   todos: [
//     // { id: 0, text: 'Learn React', completed: true },
//     // { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
//     // { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
//   ],
//   filters: {
//     status: 'All',
//     color: [],
//   },
// }
const initialState = []

// set nextTodoId uniquely
// const nextTdoId = (todos) => {
//   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
//   return maxId + 1
// }

// action creators
export const todosLoaded = (todos) => {
  return {
    type: ACTIONS.TODOS_TODOS_LOADED,
    payload: todos,
  }
}
export const todoAdded = (todo) => {
  return {
    type: ACTIONS.TODOS_TODO_ADDED,
    payload: todo,
  }
}

const todosReducer = (state = initialState, action) => {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions

    // ADD TODO
    case ACTIONS.TODOS_TODO_ADDED: {
      // we need to return a new state object
      return [...state, action.payload]
      // return {
      //   // that has all the existing state data
      //   ...state,
      //   // but has a new array for the `todos` field
      //   todos: [
      //     // with all of the old todos
      //     ...state.todos,
      //     // and the new todo object
      //     {
      //       // use an auto-incrementing numeric ID for this example
      //       id: nextTdoId(state.todos),
      //       text: action.payload,
      //       completed: false,
      //     },
      //   ],
      // }
    }

    // TOGGLE/EDIT TODO
    case ACTIONS.TODOS_TODO_TOGGLE: {
      return {
        // again copy th entire state object
        ...state,
        // this time, we nee to make a copy of the old todos array
        todos: state.todos.map((todo) => {
          // If this isn't the todo item we're looking fo r, leave it alone
          if (todo.id !== action.payload) return todo

          //   we've found the todo that has to change. Return a copy
          return {
            ...todo,
            // flip the completed flag
            completed: !todo.completed,
          }
        }),
      }
    }

    case ACTIONS.TODOS_TODOS_LOADED: {
      // Replace the existing state entirely by returning the new value
      return action.payload
    }
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}

// thunk ()=>{}
export const fetchTodos = () => {
  return async function fetchTodosThunk(dispatch, getState) {
    const response = await client.get('/fakeApi/todos')
    dispatch(todosLoaded(response.todos))
  }
}

export const saveNewTodo = (text) => {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    dispatch(todoAdded(response.todo))
  }
}

export default todosReducer
