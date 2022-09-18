import { createStore, compose, applyMiddleware } from 'redux'
import {
  includeMeaningOfLife,
  sayHiOnDispatch,
} from './exampleAddons/enhancers'
import { print1, print2, print3 } from './exampleAddons/middleware'
import rootReducer from './reducer'

// let preloadState
// const persistedTodosString = localStorage.getItem('todos')

// if (persistedTodosString) {
//     preloadState = {
//         todos:JSON.parse(persistedTodosString)
//     }
// }
// const store = createStore(rootReducer, preloadState)

const middlewareEnhancer = applyMiddleware(print1, print2, print3)

const composedEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife, middlewareEnhancer)
// Pass enhancer as the second arg, since there's no preloadedState
const store = createStore(
  rootReducer,
//   middlewareEnhancer
  composedEnhancer
)

export default store
