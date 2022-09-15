import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

export default rootReducer = (state = {}, action) => {
  // always return anew object for the root state
  return {
    todos: todosReducer(state.todos, action),
    filters: filtersReducer(state.filters, action),
  }
}
