import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export const Header = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => setText(e.target.value)

  const handleKeyDown = (e) => {
    const trimmedText = e.target.value.trim()
    // if the user pressed the Enter key:
    if (e.key === 'Enter' && trimmedText) {
      // dispatch the "todo added" action with this text
      dispatch({ type: 'todos.todoAdded', payload: trimmedText })
      // and clear out the text input
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
