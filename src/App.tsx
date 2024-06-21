import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import "./App.css";

interface Task {
  value: string;
  isChecked: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const tasksList = localStorage.getItem("tasksList");

    tasksList && setTasks(JSON.parse(tasksList));
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

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasksList", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <TodoForm addTask={addTask} />
      <ul>
        {tasks.map((task, index) => (
          <li
            className="task"
            key={index}
            onClick={() => toggleTask(index)}
            style={{
              textDecoration: task.isChecked ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {task.value}
            <span
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(index);
              }}
              style={{ marginLeft: "20px", color: "red", cursor: "pointer" }}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
