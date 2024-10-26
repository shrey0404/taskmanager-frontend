// frontend/src/components/TaskList.js
import React from "react";
import { deleteTask, updateTask } from "../services/taskService";

const TaskList = ({ tasks, onTaskUpdate, onTaskDelete, onEditTask }) => {
  const handleDelete = async (id) => {
    await deleteTask(id);
    onTaskDelete(id);
  };

  const handleToggleComplete = async (task) => {
    const updatedTask = {
      ...task,
      status: task.status === "pending" ? "completed" : "pending",
    };
    await updateTask(task._id, updatedTask);
    onTaskUpdate(updatedTask);
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className={`task-item ${task.status}`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
          <p>
            Due Date: {task.dueDate ? task.dueDate.split("T")[0] : "Not Set"}
          </p>
          <button onClick={() => handleToggleComplete(task)}>
            Mark as {task.status === "pending" ? "Complete" : "Pending"}
          </button>
          <button onClick={() => onEditTask(task)}>Edit</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
