import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const selectTodoById = (state, todoId) => {
  return state.todos.find((todo) => todo.id === todoId)
}

export const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id))
  const { text, completed, color } = todo
  const dispatch = useDispatch()
  const handleCompletedChanged = () => {
    dispatch({ type: 'todos/todoToggled', payload: todo.id })
  }

  // omit other change handlers
  // omit other list item rendering logic and contents

  return (
    <li>
      <div className="view">omit other rendering output</div>
    </li>
  )
}
