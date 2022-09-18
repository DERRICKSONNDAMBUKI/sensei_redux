import React from 'react'
import { useSelector } from 'react-redux'

export const TodoList = () => {
  const todoIds = useSelector((state) => state.todos.map((todo) => todo.id))

  // since `todos` is an array, we can loop over it
  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}
