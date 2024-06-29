import { useState } from "react";
import "./TodoForm.css";

interface TodoFormProps {
  addTask: (task: Task) => void;
}

export interface Task {
  id: number;
  value: string;
  isChecked: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTask }) => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      value: text,
      isChecked: false,
    };

    addTask(newTask);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input-field"
        type="text"
        value={text}
        onChange={handleChange}
      />
      <button className="btn">Add</button>
    </form>
  );
};

export default TodoForm;
