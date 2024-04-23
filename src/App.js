import './App.css';
import React, {useState, useEffect} from 'react';
import { MdDelete, MdSystemSecurityUpdateWarning } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function App() {
  const[isComplete, setIsComplete]= useState(false);
  const[allTodo, setAllTodo]= useState([]);
  const[completeToDo, setcompleteToDo]= useState([]);
  const[newTitle, setNewTitle]= useState("");
  const[newDescription, setNewDescription]= useState("");

  useEffect(()=>{
    console.log('App by Sachin')
},[])

  const handleAddTo=()=>{
    let newTodoItem={
      title: newTitle,
      description: newDescription
    }
    let updatedTodo= [...allTodo];
    updatedTodo.push(newTodoItem);
    setAllTodo(updatedTodo);
    sessionStorage.setItem('toDoList', JSON.stringify(updatedTodo));
    setNewTitle('');
    setNewDescription('');
  }

  const handleCompletedToDo=(index)=>{
    let now= new Date();
    let date= now.getDate();
    let mm= now.getMonth()+1;
    let yyyy= now.getFullYear();
    let h= now.getHours();
    let m= now.getMinutes();
    let s= now.getSeconds();
    let completedOn= date+ '-' + mm + '-' + yyyy + " " + " at " + h+ ':'+ m + ":" + s;

    let filteredTodo= {
      ...allTodo[index],
      completedOn: completedOn
    }

    let updatedCompletedArr= [...completeToDo];
    updatedCompletedArr.push(filteredTodo);
    setcompleteToDo(updatedCompletedArr);
    handleDeleteTo(index);
    sessionStorage.setItem('completedtoDoList', JSON.stringify(updatedCompletedArr));
  }

  const handleDeleteTo=(index)=>{
    let reducedToDo= [...allTodo];
    reducedToDo.splice(index,1);
    sessionStorage.setItem('toDoList', JSON.stringify(reducedToDo))
    setAllTodo(reducedToDo);
  }
  const handleCompletedDeleteTo=(index)=>{
    let reducedToDo= [...completeToDo];
    reducedToDo.splice(index,1);
    sessionStorage.setItem('completedtoDoList', JSON.stringify(reducedToDo))
    setcompleteToDo(reducedToDo);
  }

  useEffect(()=>{
      let savedTodo= JSON.parse(sessionStorage.getItem('toDoList'));
      let completedTodo= JSON.parse(sessionStorage.getItem('completedtoDoList'));
      if(savedTodo){
        setAllTodo(savedTodo);
      }
      if(completedTodo){
        setcompleteToDo(completedTodo);
      }
  },[]);

  return (
    <div className="to-do">
     <h1>To Do App</h1>
     <div className='todo-wrapper'>
      <div className='todo-input'>
        <div className='todo-items'>
      <label name='title'>Title</label>
      <input type='text' placeholder= "What's the title of your task?" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}></input>
      </div>
        <div className='todo-items'>
        <label>Description</label>
      <input type='text' placeholder= "Please write the description of your task" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}></input>
      </div>
      <div className='todo-items'>
        <button type='button' className='primarybtn' onClick={handleAddTo}>Add</button>
      </div>
      </div>
      <div className='btn-area'>
        <button className={`isComplete ${isComplete==false && 'active'}`} onClick={()=>{setIsComplete(false)}}>To Do</button>
        <button className={`isComplete ${isComplete==true && 'active'}`} onClick={()=>{setIsComplete(true)}}>Completed</button>
      </div>
      <div className='tasks'>
        {isComplete==(false) && allTodo.map((items,index)=>{
          return(
            <div className='taskNo' key={index}>
          <div className='taskCont'>
          <h1 style={{color: 'violet'}}>{items.title}</h1>
        <p>{items.description}</p>
        </div>
        <div className='taskIcon'>
        <FaCheck className='check' onClick={()=>handleCompletedToDo(index)}/>
        <MdDelete className='delete' onClick={()=>handleDeleteTo(index)}/>
        </div>
      </div>
          )
        })}

        {isComplete==(true) && completeToDo.map((items,index)=>{
          return(
            <div className='taskNo' key={index}>
          <div className='taskCont'>
          <h1 style={{color: 'violet'}}>{items.title}</h1>
          <p>{items.description}</p>
        <p> Completed on: {items.completedOn}</p>
        </div>
        <div className='taskIcon'>
        <MdDelete className='delete' onClick={()=>handleCompletedDeleteTo(index)}/>
        </div>
      </div>
          )
        })}
     </div>
    </div>
    </div>
  );
}

export default App;
