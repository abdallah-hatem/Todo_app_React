import './App.css';
import React from 'react';
import { nanoid } from 'nanoid';

function App() {

  const [input, setInput] = React.useState("")
  const [todos, setTodos] = React.useState([])



  React.useEffect(() => {
    const temp = localStorage.getItem("savedTodos")
    const loadedTodos = JSON.parse(temp)

    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  React.useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("savedTodos", temp)

  }, [todos])



  function handleChange(e) {
    setInput(e.target.value)
  }

  function hnadleSubmit(e) {
    e.preventDefault()

    const newTodo = {
      id: nanoid(),
      text: input
    }
    if (newTodo.text.trim()) {

      setTodos([...todos, newTodo])
    }

    setInput("")
  }


  function deleteTodo(id) {
    const updateTodos = todos.filter(todo => todo.id !== id)
    setTodos(updateTodos)
  }



  const elements = todos.map(todo =>

    <div key={todo.id} className="todos">
      <p>{todo.text}</p>
      <div className='btns'>
        <i onClick={() => deleteTodo(todo.id)} className="fa-solid fa-trash"></i>
      </div>
    </div>
  )

  return (
    <div className="container">
      <form onSubmit={hnadleSubmit}>
        <p id='title'>TODO</p>
        <div className='inputs'>
          <input onChange={handleChange} value={input} placeholder='type...'></input>
          <button id='delete'>
            <i id="del" className="fa-solid fa-plus"></i>
          </button>
        </div>
      </form>

      {elements}

    </div>
  );
}

export default App;
