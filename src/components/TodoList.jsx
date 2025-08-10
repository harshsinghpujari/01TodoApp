import React from 'react'
import TodoItem from './TodoItem'

function TodoList({todos,editId,editMsg,setEditMsg,handleToggle,handleSave,handleEdit,handleDelete}) {
  return (
    <>
      
        <div className='mt-4 w-lg'>
          {
            todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editId={editId}
              editMsg={editMsg}
              setEditMsg={setEditMsg}
              handleToggle={handleToggle}
              handleSave={handleSave}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            ))
        }
      </div> 
    </>
  )
}

export default TodoList
