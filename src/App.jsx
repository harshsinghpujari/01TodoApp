import React,{ useState,useEffect} from 'react'
import TodoInput from './components/TodoInput'
import FilterButtons from './components/FilterButtons'
import TodoList from './components/TodoList'
import backgroundImage1 from './assets/background1.jpg'
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

  // handler functions --------

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

  // functions----
  const deleteTodo = (todos,id) => 
    todos.filter((todo) => todo.id !== id)

  const saveEdit = (msg,id) => 
    todos.map(todo => todo.id === id? {...todo,text:msg} : todo )
  
  const filterTodo = todos.filter((todo) => {
    if(filter === "active") return !todo.completed;
    if(filter === "completed") return todo.completed;
    return true;
  });
  
  //was not working---
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


  //local Storage
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos])


  return (
    <>
      <div className='w-full min-h-screen bg-[#1d8cb7] text-white text-2xl p-11 flex justify-center items-start bg-cover bg-center'
      style={{backgroundImage:`url(${backgroundImage1})`}}>
        <div className='border-4 w-2xl bg-white/30 
        backdrop-blur-xl rounded-2xl p-11 items-center flex flex-col overflow-y-auto max-h-[90vh] '>
        
            <TodoInput 
              todo={todo}
              setTodo={setTodo}
              handleSubmit={handleSubmit}
            />

            <FilterButtons
              setFilter = {setFilter}
            />

            <TodoList
              todos={filterTodo}
              editId={editId}
              editMsg={editMsg}
              setEditMsg={setEditMsg}
              handleToggle={handleToggle}
              handleSave={handleSave}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
        </div>  
      </div>
    </>
  )
}

export default App
