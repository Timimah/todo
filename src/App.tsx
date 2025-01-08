// import { useState } from 'react'

import { MyTodo } from "./MyTodo"
// import { Todo } from "./Todo"

function App() {
 
  return (
    <div className="App">
      <h1 className="font-black text-6xl">Todo</h1>
      <div className="todo-container">
        {/* <Todo /> */}
      </div>
      <div className="todo-container">
        <MyTodo />
      </div>
    </div>
  )
}

export default App
