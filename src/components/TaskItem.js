// frontend/src/components/TaskItem.js
import React from "react";
import "./TaskList.css"; // Import CSS
import { useTheme } from "../ThemeContext";

const TaskItem = ({ task, onEdit, onDelete }) => {
  const { isDark } = useTheme(); // Use the theme context

  return (
    <div
      className={`task-item ${isDark ? "dark" : ""} ${
        task.completed ? "completed" : "pending"
      }`}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
