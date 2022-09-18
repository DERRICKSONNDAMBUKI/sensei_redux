import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveNewTodo } from '../todos/todosSlice'

export const Header = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => setText(e.target.value)

  const handleKeyDown = (e) => {
    const trimmedText = text.trim()
    // if the user pressed the Enter key:
    if (e.which === 13 && trimmedText) {
      // Create the thunk function with the text the user wrote

      // Then dispatch the thunk function itself
      dispatch(saveNewTodo(trimmedText))
      setText('')
    }
  }
  return (
    <input
      type="text"
      placeholder="what needs to be done?"
      autoFocus={true}
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}
