import {createStore} from 'redux'
import rootReducer from './reducer'

let preloadState
const persistedTodosString = localStorage.getItem('todos')

if (persistedTodosString) {
    preloadState = {
        todos:JSON.parse(persistedTodosString)
    }
}
const store = createStore(rootReducer, preloadState)

export default store