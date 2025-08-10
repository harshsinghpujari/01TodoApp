import React from 'react'

function TodoInput({todo,setTodo,handleSubmit}) {
  return (
    <>
      <div className='flex '>
        <div className='flex flex-col'>
          <label htmlFor="addTodo"
             className='flex justify-center text-3xl text-white font-bold'
             >Add Todo
          </label>

          <div className='flex items-center mt-3 shadow-lg rounded-lg overflow-hidden'>
            <input type="text" id='addTodo'
            value={todo}
            onKeyDown={(e) => {
              if(e.key === "Enter"){
                handleSubmit()
              }
            }}
            onChange={(e)=>setTodo(e.target.value)}
            className='border-none shadow-lg p-2 px-4 outline-none rounded-lg text-xl'
            />

            <button 
              onClick={handleSubmit}
              className='transition duration-300 ease-in-out text-2xl px-2 bg-red-400 h-full rounded-lg cursor-pointer hover:bg-red-600'>Add
            </button>

          </div>

        </div>

      </div>
    </>
  )
}

export default TodoInput
