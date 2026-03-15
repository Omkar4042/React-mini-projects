import { useState, useEffect } from "react";

export default function TodoApp() {


  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const [filter, setFilter] = useState("all");



  useEffect(() => {

    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);



  const addTodo = () => {

    if (task.trim() === "") return;

    setTodos([
      ...todos,
      { text: task, completed: false }
    ]);

    setTask("");
  };



  const deleteTodo = (index) => {

    const updatedList = todos.filter((_, i) => i !== index);

    setTodos(updatedList);
  };



  const toggleComplete = (index) => {

    const updated = todos.map((todo, i) => {

      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updated);
  };



  const startEdit = (index) => {

    setEditIndex(index);
    setEditText(todos[index].text);
  };


  const saveEdit = (index) => {

    const updated = todos.map((todo, i) => {

      if (i === index) {
        return { ...todo, text: editText };
      }

      return todo;
    });

    setTodos(updated);
    setEditIndex(null);
    setEditText("");
  };


  const cancelEdit = () => {

    setEditIndex(null);
    setEditText("");
  };



  const filteredTodos = todos.filter((todo) => {

    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;

    return true;
  });



  const remainingTasks = todos.filter(todo => !todo.completed).length;



  return (

    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>

      <h2>Todo App</h2>


      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>


      <div style={{ marginTop: 20 }}>

        <button
          onClick={() => setFilter("all")}
          style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
        >
          All
        </button>

        <button
          onClick={() => setFilter("completed")}
          style={{
            marginLeft: 10,
            fontWeight: filter === "completed" ? "bold" : "normal"
          }}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("pending")}
          style={{
            marginLeft: 10,
            fontWeight: filter === "pending" ? "bold" : "normal"
          }}
        >
          Pending
        </button>

      </div>


      <h3>Remaining Tasks: {remainingTasks}</h3>


      <ul>

        {filteredTodos.map((todo, index) => (

          <li
            key={index}
            style={{
              marginTop: 10,
              textDecoration: todo.completed ? "line-through" : "none"
            }}
          >

            {editIndex === index ? (

              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <button onClick={() => saveEdit(index)}>Save</button>

                <button onClick={cancelEdit}>Cancel</button>
              </>

            ) : (

              <>
                {todo.text}

                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => toggleComplete(index)}
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>

                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => startEdit(index)}
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: 10, color: "red" }}
                  onClick={() => deleteTodo(index)}
                >
                  Delete
                </button>
              </>

            )}

          </li>

        ))}

      </ul>

    </div>
  );
}