import { useState } from "react";

interface TodoFormProps {
  addTask: (task: Task) => void;
}

interface Task {
  value: string;
  isChecked: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTask }) => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask: Task = {
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
        onChange={handleChange}
        value={text}
      ></input>

      <button className="btn" type="submit">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
