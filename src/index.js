import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import './api/server'

import store from './store'
import { Provider } from 'react-redux'


// console.log('dispatching action');
// store.dispatch({type:'todos/todoAdded', payload:'Learn about actions'})
// console.log('state after dispatch: ', store.getState());
// console.log('dispatch complete');

// // test

// console.log('initial state', store.getState());

// const unsubscribe = store.subscribe(()=>console.log('state after dispatch', store.getState()))

// // dispatch
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about reducers' })
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about stores' })

// store.dispatch({ type: 'todos/todoToggled', payload: 0 })
// store.dispatch({ type: 'todos/todoToggled', payload: 1 })

// store.dispatch({ type: 'filters/statusFilterChanged', payload: 'Active' })

// store.dispatch({
//   type: 'filters/colorFilterChanged',
//   payload: { color: 'red', changeType: 'added' }
// })

// unsubscribe()

// // Dispatch one more action to see what happens

// store.dispatch({ type: 'todos/todoAdded', payload: 'Try creating a store' })

// // Omit existing React rendering logic

ReactDOM.render(
  // Render a `<Provider>` around the entire `<App>`,
  // and pass the Redux store to as a prop
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
