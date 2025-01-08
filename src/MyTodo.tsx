import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  text: string;
  complete: boolean;
  note?: string;
}

export const MyTodo: React.FC = () => {
  const [newTodo, setNewTodo] = useState<boolean>(false);
  const [createTodo, setCreateTodo] = useState<boolean>(false);
  const [task, setTask] = useState<string[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoItem, setTodoItem] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [showNoteInput, setShowNoteInput] = useState<number | null>(null);
  const [noteText, setNoteText] = useState<string>("");

  useEffect(() => {
    if (todos.length === 0) {
      // alert()
      setNewTodo(false);
      setCreateTodo(false);
    }
  }, [todos]);

  const addNewTask = () => {
    // alert();
    setNewTodo(true);
    setCreateTodo(false);
    setTask([""]);
    console.log(newTodo, task);
  };

  const createTodoItem = () => {
    const newTodoItem: Todo = {
      id: Date.now(),
      text: todoItem,
      complete: false,
    };
    setTodos([...todos, newTodoItem]);
    setTodoItem("");
    setCreateTodo(true);
    console.log(todoItem, todos, task);
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        console.log(task, todos)
        return todo;
      })
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
    console.log(todos,todos.length)
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id: number) => {
    if (editText.trim() === "") return;
    
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditingId(null);
    setEditText("");
  };

  const toggleNoteInput = (id: number) => {
    setShowNoteInput(showNoteInput === id ? null : id);
    setNoteText("");
  };

  const addNote = (id: number) => {
    if (noteText.trim() === "") return;
    
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, note: noteText } : todo
    ));
    setShowNoteInput(null);
    setNoteText("");
  };

  return (
    <div>
      {!newTodo && (
        <div>
          <div>Click the button to add a new task</div>
        </div>
      )}{" "}
      {todos.map((todo) => (
            <>
            <div
              className="item"
              key={todo.id}
              onClick={() => toggleComplete(todo.id)}
            >
              {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        style={{ padding: '4px' }}
                      />
                    ) : (
                      <p style={{
                        textDecoration: todo.complete ? "line-through" : "none",
                        margin: 0
                      }} 
                      >
                        {todo.text}
                      </p>
                    )}
            </div>
            {editingId === todo.id ? (
                      <button
                        onClick={() => saveEdit(todo.id)}
                        style={{
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => startEditing(todo)}
                        style={{
                          backgroundColor: '#2196F3',
                          color: 'white',
                          border: 'none',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                    )}
              <button type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button
                      onClick={() => toggleNoteInput(todo.id)}
                      style={{
                        backgroundColor: '#FFC107',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Add Note
                    </button>
                    {showNoteInput === todo.id && (
                  <div style={{ marginTop: '10px' }}>
                    <input
                      type="text"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Add a note"
                      style={{ 
                        width: '100%',
                        padding: '8px',
                        marginBottom: '5px',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                      }}
                    />
                    <button
                      onClick={() => addNote(todo.id)}
                      style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Save Note
                    </button>
                  </div>
                )}
                {todo.note && (
                  <div style={{ 
                    marginTop: '10px',
                    padding: '8px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px'
                  }}>
                    <strong>Note:</strong> {todo.note}
                  </div>
                )}
            </>
          ))}
      {newTodo === true && (
        <div>
          {createTodo === false &&
            task.map((index) => (
              <div key={index}>
                <input
                  type="text"
                  value={todoItem}
                  placeholder="Add new task"
                  onChange={(e) => setTodoItem(e.currentTarget.value)}
                />
                <button type="button" onClick={createTodoItem}>
                  Done
                </button>
              </div>
            ))}
          
        </div>
      )}
      <button onClick={addNewTask} type="button">
        Add new task
      </button>
    </div>
  );
};
