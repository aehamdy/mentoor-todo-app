import { useState, useEffect } from "react";
import { Task } from "./components/TodoForm";
import TodoForm from "./components/TodoForm";
import TopHeader from "./components/TopHeader";
import Listing from "./components/Listing";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasksList");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => setTasks((prevTasks) => [task, ...prevTasks]);
  const updateTasks = (updatedTasks: Task[]) => setTasks(updatedTasks);

  return (
    <div className="App">
      <TopHeader />
      <TodoForm addTask={addTask} />
      <Listing tasks={tasks} updateTasks={updateTasks} />
    </div>
  );
}

export default App;
