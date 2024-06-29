import { useEffect, useState } from "react";
import { Task } from "./components/TodoForm";
import TodoForm from "./components/TodoForm";
import "./App.css";
import TopHeader from "./components/TopHeader";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  useEffect(() => {
    const tasksList = localStorage.getItem("tasksList");
    if (tasksList) {
      setTasks(JSON.parse(tasksList));
    }
  }, []);

  const addTask = (task: Task) => {
    const updatedTasks = [task, ...tasks];
    setTasks(updatedTasks);
    localStorage.setItem("tasksList", JSON.stringify(updatedTasks));
  };

  const toggleTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isChecked: !task.isChecked } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasksList", JSON.stringify(updatedTasks));
  };

  const deleteTask = (
    index: number,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasksList", JSON.stringify(updatedTasks));
  };

  const startEdit = (index: number) => {
    setEditIndex(index);
    setEditText(tasks[index].value);
  };

  const saveEdit = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].value = editText;
    setTasks(updatedTasks);
    localStorage.setItem("tasksList", JSON.stringify(updatedTasks));
    setEditIndex(null);
  };

  return (
    <div className="App">
      <TopHeader />
      <TodoForm addTask={addTask} />
      <ul>
        {tasks.map((task, index) => (
          <li
            key={task.id}
            onClick={() => toggleTask(index)}
            style={{
              textDecoration: task.isChecked ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {editIndex === index ? (
              <div>
                <input
                  className="edit-field"
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </div>
            ) : (
              <div className="task">
                {task.value}
                <div className="buttons">
                  <span className="edit-icon" onClick={() => startEdit(index)}>
                    ✏️
                  </span>
                  <span
                    className="delete-icon"
                    onClick={(e) => deleteTask(index, e)}
                  >
                    ❌
                  </span>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
