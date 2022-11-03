import {useState,useRef} from 'react'
import './Todo.css'


export default function Todo({todo, toggleTodo, deleteTask, editMyTodoName}){

    const editTodo=useRef()
    const [todoValue, setTodoValue]=useState(todo.name)
    const [todoButtonValue, setTodoButtonValue]=useState("Edit")

    function onComplete(){
        toggleTodo(todo.id)
    }

    function onDeleteClick(){
        deleteTask(todo.id)
    }

   function onChangeValue(e){
    setTodoValue(e.target.value)
   }

    function editMyTodo(){
       if(todoValue!==""){ editTodo.current.disabled=!editTodo.current.disabled;
         editTodo.current.disabled===true ? setTodoButtonValue("Edit") : setTodoButtonValue("Save")
         if(todo.name!==todoValue) editMyTodoName(todo.name,todoValue)
         console.log(todo.name,todoValue)
        }
    }

    return(
        <div className="todo">
        <input type="checkbox" onChange={onComplete} checked={todo.complete} />
        <input ref={editTodo} type="text" onChange={onChangeValue} value={todoValue} disabled={true} />
        <div>{todo.time}</div>
        <input className={todoButtonValue} type="button" onClick={editMyTodo} value={todoButtonValue}/>
        <button onClick={onDeleteClick}>Delete Task</button>
        </div>   
    )
}