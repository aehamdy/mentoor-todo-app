import React, { useState } from "react";
import { Task as ImportedTask } from "./TodoForm";

interface ListingProps {
  tasks: ImportedTask[];
  updateTasks: (tasks: ImportedTask[]) => void;
}

const Listing: React.FC<ListingProps> = ({ tasks, updateTasks }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const toggleTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isChecked: !task.isChecked } : task
    );
    updateTasks(updatedTasks);
  };

  const deleteTask = (
    index: number,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const updatedTasks = tasks.filter((_, i) => i !== index);
    updateTasks(updatedTasks);
  };

  const startEdit = (index: number) => {
    setEditIndex(index);
    setEditText(tasks[index].value);
  };

  const saveEdit = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].value = editText;
    updateTasks(updatedTasks);
    setEditIndex(null);
  };

  const listingItems = tasks.map((task, index) => (
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
            <span className="delete-icon" onClick={(e) => deleteTask(index, e)}>
              ❌
            </span>
          </div>
        </div>
      )}
    </li>
  ));

  return <ul>{listingItems}</ul>;
};

export default Listing;
