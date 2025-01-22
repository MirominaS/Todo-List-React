import React, { useState } from "react";
import './TodoList.css'

function TodoList(){

    const [todos, setTodos] = useState([]);
    const [inputVlaue,setInputValue] = useState('');
    const [isEditing,setIsEditing] = useState(false);
    const [currentTodo,setCurrentTodo] = useState(null);

    function handleChange(e){
        setInputValue(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        // setTodos([...todos,inputVlaue])
        // setInputValue('')
        if(isEditing){
            const updatedTodos = todos.map((todo,index)=>
                index===currentTodo?inputVlaue:todo);
            setTodos(updatedTodos);
            setIsEditing(false);
        } else if(inputVlaue.trim()){
            setTodos([...todos,inputVlaue])
        }
        setInputValue("");
    }

    const handleEdit = (index)=>{
        setIsEditing(true);
        setCurrentTodo(index);
        setInputValue(todos[index]);
    }

    const handleDelete = (index)=>{
        const newTodos = todos.filter((todo,todoIndex)=>todoIndex !==index);
        setTodos(newTodos);
        if(isEditing && index === currentTodo){
            setIsEditing(false);
            setInputValue("");
        }
    }

    return(
        <div className="todo-list">
             <h1>Todo List</h1>
             <div className="form">
             <form onSubmit={handleSubmit}>
                <input className="input" type="text" value={inputVlaue} onChange={handleChange}/>
                <button className="btn-add" type="submit">{isEditing ? "Update": "Add Task"}</button>
            </form>
             </div>
           <div >

           <ul>
                {todos.map((todo,index)=>(
                    <li key = {index}>
                    <div className="list"> 
                        <div className="todo">{todo} </div> 
                        <div className="btns">
                            <button className="btn-edit" onClick={()=>handleEdit(index)}>Edit</button>
                            <button className="btn-delete" onClick={()=>handleDelete(index)}>Delete</button>                    
                        </div>                      
                       
                    </div>
                        </li>
                ))}
            </ul>
           </div>
           
        
        </div>
    )
}

export default TodoList;