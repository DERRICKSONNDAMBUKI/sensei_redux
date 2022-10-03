const reduxThunkMiddleware = (storeAPI) => (next) => (action) => {
  // if the 'action' is actually a function instead...
  if (typeof action === 'function') {
    // then call the function and pass `dispatch` and `getState` as arguments
    // Also, return whatever the thunk function returns
    return action(storeAPI.dispatch, storeAPI.getState)
  }
  // Otherwise, it's a normal action - send it onwards
  return next(action)
}
