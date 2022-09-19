import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTIONS_FILTER, colorFilterChanged } from '../filters/filtersSlice'
import { ACTIONS } from '../todos/todosSlice'

export const Footer = () => {
  const dispatch = useDispatch()

  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = state.todos.filter((todo) => !todo.completed)
    return uncompletedTodos.length
  })

  const { status, colors } = useSelector(state > state.filters)

  const onMaarkCompletedClicked = () =>
    dispatch({
      type: ACTIONS.TODOS_ALL_COMPLETED,
    })
  const onColorChange = (color, changeType) =>
    dispatch(colorFilterChanged(color, changeType))
  const onStatusChange = (status) =>
    dispatch({
      type: ACTIONS_FILTER.FILTERS_STATUS_FILTER_CHANGED,
      payload: status,
    })
  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button">Mark All Completed</button>
        <button className="button">Clear Completed</button>
      </div>
      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  )
}
