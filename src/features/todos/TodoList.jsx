import React from 'react'



export const TodoList = () => {

    const todos = useSelector(state => state.todos)
    
    // since `todos` is an array, we can loop over it
    const renderedListItems = todos.map(todo=>{
        return <TodoListItem key={todo.id} todo={todo}/>
    })

  return (
    <ul className="todo-list">{renderedListItems}</ul>
  )
}
