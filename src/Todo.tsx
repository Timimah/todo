import React, { useState } from "react";

interface Todoitem {
  id: number;
  text: string;
  complete: boolean;
}

export const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todoitem[]>([
    // { id: 1, text: "Learn typescript with React", complete: false },
    // {
    //   id: 2,
    //   text: "Create a todo app with React and Typescript",
    //   complete: false,
    // },
  ]);
  const [newTodo, setNewTodo] = useState<string>("");

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      })
    );
  };

  const addNewItem = () => {
    const newItem: Todoitem = {
      id: Date.now(),
      text: newTodo,
      complete: false
    }
    setTodos([...todos, newItem])
    setNewTodo('')
  }

  return (
    <>
     {todos.length <= 0 && (
       <div>Todo is empty</div>
     ) }
    <div className="add-todo">
      <div className="todo-item">
        {todos.map((todo) => (
          <div className="item" key={todo.id} onClick={() => toggleComplete(todo.id)}>
            <div className="checkbox"  style={{backgroundColor: todo.complete ? 'aqua' : 'transparent', border: todo.complete ? '1px solid aqua': '1px solid black', }}/>
            <p style={{textDecoration: todo.complete ? "line-through": 'none'}}>{todo.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add a new todo item"
        value={newTodo}
        onChange={(e) => setNewTodo(e.currentTarget.value)}
      />
      <button onClick={addNewItem}>Add Todo</button>
    </div>
    </>
  );
};
