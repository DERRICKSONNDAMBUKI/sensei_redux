const ACTIONS = {
  FILTERS_STATUS_FILTER_CHANGED: 'filters/statusFilterChanged',
}

const initialState = {
  status: 'All',
  colors: [],
}

const filtersReducer = (state = initialState, action) => {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // CHANGE FILTER STATUS
    case ACTIONS.FILTERS_STATUS_FILTER_CHANGED: {
      return {
        // COPY THE WHOLE STATE
        ...state,
        // overwrite the filters value
        filters: {
          // copy the other filter fileds
          ...state.filters,
          // and replace the status filed with the new value
          status: action.payload,
        },
      }
    }
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}

export default filtersReducer