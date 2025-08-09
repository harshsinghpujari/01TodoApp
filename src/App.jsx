import React,{ useState,useEffect} from 'react'
import './App.css'

function App() {
  const [todo,setTodo] = useState("")
  const [todos,setTodos] = useState(() => {
    try {
      const data = localStorage.getItem("todos");
      return data? JSON.parse(data) : [];
    } catch (error) {
      console.error("failed to parse todos from localStorage",error);
      return[];
    }
  })
  const [filter,setFilter] = useState("all");
  const [editId,setEditId] = useState(null);
  const [editMsg,setEditMsg] = useState("");

  const handleSubmit = () => {
    
    if(todo.trim() === "")return;

    const todoList  = {
    id:Date.now(),
    text: todo,
    completed:false
    }
   
    setTodos(prev => [...prev,todoList])
    setTodo("")
  }

  const deleteTodo = (todos,id) => 
    todos.filter((todo) => todo.id !== id)

  const saveEdit = (msg,id) => 
    todos.map(todo => todo.id === id? todo.text=msg : todo )
  
  
  const handleSave = (msg,id) => {
    setTodos(saveEdit(msg,id));
    setEditId(null);
    setEditMsg("");
  }
  const handleDelete = (id) => {
    setTodos(deleteTodo(todos,id))
  }
  const handleEdit = (id,text) => {
    setEditId(id);
    setEditMsg(text);
  }

  const handleToggle = (id) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id===id
        ? {...todo,completed:!todo.completed}:todo
      )
    )
  }

  const filterTodo = todos.filter((todo) => {
    if(filter === "active") return !todo.completed;
    if(filter === "completed") return todo.completed;
    return true;
  });
  

  // useEffect(()=>{
  //  try {
  //    const data = JSON.parse(localStorage.getItem('todos'))
 
  //    if(Array.isArray(data)){
  //    setTodos(data);
  //   }
  //  } catch (error) {
  //   console.error("Error parsing todos from local Storage",error)
  //  }
  // },[])

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos])

  return (
    <>

    <div className='w-full h-screen bg-gray-500 text-white text-2xl p-11'>

        <div className='flex'>
          <div className='flex flex-col'>
            <label htmlFor="addTodo">add Todo</label>
            <input type="text" id='addTodo'
            value={todo}
            onChange={(e)=>setTodo(e.target.value)}
            className='border'/>
          </div>

          <div>
              <button 
              onClick={handleSubmit}
              className='mt-7 border-2 bg-red-400 p-1 '>Add</button>
          </div>

          <div>
            <button 
            onClick={() => setFilter("all")}
            className='mt-7 ml-5 mr-3 border bg-amber-600 p-1'>all</button>

            <button
            onClick={() => setFilter("active")}
            className='mt-7 ml-5 mr-3 border bg-amber-600 p-1'>active</button>

            <button
             onClick={() => setFilter("completed")}
            className='mt-7 ml-5 mr-3 border bg-amber-600 p-1'>completed</button>
          </div>

        </div>

    <div className='mt-4 w-lg '>
      {
        filterTodo.map((todo) => (
          <div className='flex' key={todo.id}>
            <input type="checkbox"
             checked={todo.completed}
             onChange={() => handleToggle(todo.id)}
            />
            {editId === todo.id ? (
              <div className='flex'>
                <input 
                value={editMsg}
                onChange={(e) => setEditMsg(e.target.value)}
                type="text"className='border mt-1 p-2 w-full'/>
                <button
                onClick={ () => handleSave(editMsg,editId)}
                className='border p-2 mt-1 bg-green-600'>save</button>
              </div>
            ):
            (
              <div className='flex'>
              <p
                className = {`border mt-1 p-2  w-full ${todo.completed? "line-through text-yellow-500": "text-white"}`}
                >
                {todo.text}
              </p> 
              <button
                onClick={() => handleEdit(todo.id,todo.text)}
                className='border p-2 bg-green-700 mt-1'>
                edit
              </button>
              <button 
                onClick={() => (handleDelete(todo.id))}
                className='border p-2 bg-blue-700 mt-1'>Del
              </button>
              </div>
          
          )}
            

        
          </div>
           
          
        ))
      }

     
      
    </div>
     
    </div>

    </>
  )
}

export default App
