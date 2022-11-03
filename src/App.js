import React, { useEffect } from 'react'
import './App.css'
import TodoList from './TodoList'
import {useState, useRef} from 'react'


const LOCAL_STORAGE_KEY= 'todoApp.todos'

function App() {

  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  const todoTimeRef = useRef()


  const date = new Date()
  const showTime=date.getHours() + ':' + date.getMinutes()

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos.length!==0) {
      setTodos(storedTodos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  function toggleTodo(id){
    const newTodos=[...todos]
    const todo = newTodos.find(todo=>todo.id===id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function deleteTask(id){
    const newTodos = todos.filter(todo=>todo.id!==id)
    setTodos(newTodos)
  }

  function handleAddTodo(){
    const name = todoNameRef.current.value
    const time = todoTimeRef.current.value
    if (name=== '' || todos.find(todo=>todo.name===name)) return alert("unavailable name")
    if (time==='' || todos.find(todo=>todo.time===time) || time<=showTime)return alert("unavailable time")
    setTodos(prevTodos=>{
      return[...prevTodos,{id:name+time, name: name, time:time, complete:false}]
    })
    todoNameRef.current.value = null
    todoTimeRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo=>!todo.complete)
    setTodos(newTodos)
  }

  function editMyTodoName(prevName,newName){
    const newTodos=todos.map(({id,name,time,complete})=>{
      console.log(name,prevName)
      if(name===prevName){
       id=newName+time
       name=newName
       complete=false
      }
      return ({id,
        name,time,complete})
    })
    setTodos(newTodos)
    }
    console.log(todos)

  return (
    <div className="App">
    <h1 className='toDoList'>TO-DO-LIST
     <div className='header'>
      <input ref={todoNameRef} type="text" placeholder='Write your task'/>
      <input className="datePicker" ref={todoTimeRef} type="time" placeholder='HH:MM'/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      </div>
      <div className='body'>
        <TodoList className="toDoList" todos={todos} toggleTodo={toggleTodo} deleteTask={deleteTask} editMyTodoName={editMyTodoName}/>
      </div>
    </h1>
    </div>
  );
}

export default App;
