import Todo from './Todo'

export default function TodoList({todos, toggleTodo, deleteTask, editMyTodoName}){
    return(
        todos.map((todo)=>{
            return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTask={deleteTask} editMyTodoName={editMyTodoName}/>
        })
    )
}