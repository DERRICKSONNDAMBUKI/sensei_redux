const createStore = (reducer, preloadedState) => {
  let state = preloadedState
  const listeners = []

  const getState = () => {
    return state
  }

  const subscribe = (listener) => {
    listeners.push(listener)
    return (unsubscribe = () => {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    })
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }

  dispatch({ type: '@@redux/INIT' })

  return { dispatch, subscribe, getState }
}
