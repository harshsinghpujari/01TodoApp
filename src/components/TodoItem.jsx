import React from 'react'

function TodoItem({todo, editId, editMsg, setEditMsg, handleToggle, handleSave, handleEdit, handleDelete }) {
  return (
    <>
         
        <div className='flex justify-center items-center gap-2'>
          <input type="checkbox"
             checked={todo.completed}
             onChange={() => handleToggle(todo.id)}
             className="md:w-7 md:h-7 w-5 h-5 rounded-md border-blue-950 border-2 bg-gradient-to-tl from-gray-700 to-white cursor-pointer
             checked:bg-emerald-600 checked:border-emerald-800
             "
            />
            {editId === todo.id ? (
              <div className='flex border pl-2 overflow-hidden bg-amber-400 px-0 md:h-10 h-8 m-2 md:m-3'>
                <input 
                value={editMsg}
                onKeyDown={(e) => {
                  if(e.key === "Enter")
                  {
                    handleSave(editMsg,editId) 
                    
                  }
                }}
                onChange={(e) => setEditMsg(e.target.value)}
                type="text"className='w-72 bg-amber-400 md:w-sm break-words font-medium md:text-2xl text-xl  flex items-center flex-grow '/>
                <button
                onClick={ () => handleSave(editMsg,editId)}
                className='cursor-pointer hover:bg-green-800  border p-1 flex justify-center items-center bg-green-600'>save</button>
              </div>
            ):
            (
              <div className='flex border pl-2 overflow-hidden bg-transparent px-0 md:h-10 h-8 m-2 md:m-3'>
              <p
                className = {`w-72 bg-transparent md:w-sm break-words font-bold md:text-2xl text-xl text-gray-200   flex items-center flex-grow ${todo.completed? "line-through text-cyan-500": "text-blue"}`}
                >
                {todo.text}
              </p> 
              <button
                onClick={() => handleEdit(todo.id,todo.text)}
                className='cursor-pointer hover:bg-green-800  border-2 border-white bg-green-700 p-1 text-lg flex justify-center items-center'>
                edit
              </button>
              <button 
                onClick={() => (handleDelete(todo.id))}
                className='cursor-pointer hover:bg-blue-800  border-2 border-white p-1 text-lg bg-blue-700 flex justify-center items-center'>Del
              </button>
              </div>

          )}
        </div>
      
    </>
  )
}

export default TodoItem
