import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { selectTodoIds } from './todosSlice'

export const TodoList = () => {
  const todoIds = useSelector(selectTodoIds,shallowEqual)

  // since `todos` is an array, we can loop over it
  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}
