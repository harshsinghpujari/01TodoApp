import React from 'react'

function FilterButtons({setFilter}) {
  return (
    <>
         <div className='flex border-none mt-5 justify-center items-center gap-5 p-2'>
            <button 
            onClick={() => setFilter("all")}
            className='cursor-pointer hover:bg-amber-800 border rounded-lg bg-amber-600 p-2'>all</button>

            <button
            onClick={() => setFilter("active")}
            className='cursor-pointer hover:bg-amber-800   border bg-amber-600 p-2 rounded-lg'>active</button>

            <button
             onClick={() => setFilter("completed")}
            className='cursor-pointer hover:bg-amber-800  border bg-amber-600 p-2 rounded-lg'>completed</button>
          </div>
    </>
  )
}

export default FilterButtons
