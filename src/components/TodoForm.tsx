import { useState } from "react";

const TodoForm = () => {
  const [text, setText] = useState<string | number>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
