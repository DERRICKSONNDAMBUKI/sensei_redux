import { createSelector } from 'reselect'
import { client } from '../../api/client'

export const ACTIONS = {
  TODOS_TODO_ADDED: 'todos/todoAdded',
  TODOS_TODO_TOGGLE: 'todos/todoToggle',
  TODOS_TODOS_LOADED: 'todos/todosLoaded',
  TODOS_ALL_COMPLETED: 'todos/allCompleted',
  TODOS_TODOS_LOADING: 'todos/todosLoading',
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
const initialState = {
  status: 'idle', // or: 'loading', 'succeeded', 'failed'
  entities: [],
}

// set nextTodoId uniquely
// const nextTdoId = (todos) => {
//   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
//   return maxId + 1
// }

// action creators
export const todoLoading=()=>({
  type:ACTIONS.TODOS_TODOS_LOADING,
})
export const todosLoaded = (todos) => ({
  type: ACTIONS.TODOS_TODOS_LOADED,
  payload: todos,
})

export const todoAdded = (todo) => ({
  type: ACTIONS.TODOS_TODO_ADDED,
  payload: todo,
})

// create selector
export const selectTodos = (state) => state.todos.entities
export const selectTodoById = (state, todoId) => {
  return selectTodos(state).find((todo) => todo.id === todoId)
}
export const selectTodoIds = createSelector(
  // First, pass one or more "input selector" functions:
  (state) => state.todos,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (todos) => todos.map((todo) => todo.id)
)
export const selectFilteredTodos = createSelector(
  (state) => state.todos,
  (state) => state.filters.status,
  (todos, status) => {
    if (status === StatusFilters.All) {
      return todos
    }
    const completedStatus = status === StatusFilters.completed
    return todos.filter((todo) => todo.completed === completedStatus)
  },
  // First input selector: all todos
  selectTodos,
  // Second input selector: all filter values
  (state) => state.filters,
  // Output selector: receives both values
  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions && colors.length === 0) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed
    // Return either active or completed todos based on filter
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)
export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
)

// TODO REDUCER
const todosReducer = (state = initialState, action) => {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions

    // ADD TODO
    case ACTIONS.TODOS_TODO_ADDED: {
      // we need to return a new state object
      return { ...state, entities: [...state.entities, action.payload] }
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
        entities: state.entities.map((todo) => {
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
      return {
        ...state,
        status: 'idle',
        entities: action.payload,
      }
    }

    case ACTIONS.TODOS_TODOS_LOADING: {
      return {
        ...state,
        status: 'loading',
      }
    }

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}

// thunk ()=>{}
export const fetchTodos = () => async (dispatch) => {
  dispatch(todoLoading())
  const response = await client.get('/fakeApi/todos')
  dispatch(todosLoaded(response.todos))
}

export const saveNewTodo = (text) => {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    dispatch(todoAdded(response.todo))
  }
}

export default todosReducer
