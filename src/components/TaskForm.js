// frontend/src/components/TaskForm.js
import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "../services/taskService";
import "./TaskForm.css";

const TaskForm = ({ onTaskAdded, taskToEdit, onTaskUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState(""); // State for due date
  const [error, setError] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority || "Medium");
      setDueDate(
        taskToEdit.dueDate
          ? new Date(taskToEdit.dueDate).toISOString().split("T")[0]
          : ""
      ); // Set due date in YYYY-MM-DD format
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate(""); // Reset due date
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Title and Description are required.");
      return;
    }

    setError(""); // Clear previous errors

    // Prepare the task data
    const taskData = { title, description, priority, dueDate }; // Include dueDate

    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, taskData);
        onTaskUpdated({ ...taskToEdit, ...taskData });
      } else {
        const newTask = await createTask(taskData);
        onTaskAdded(newTask);
      }

      // Reset form fields
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate(""); // Reset due date
    } catch (error) {
      console.error("Error creating/updating task:", error);
      setError("An error occurred while saving the task. Please try again.");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{taskToEdit ? "Edit Task" : "Add Task"}</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)} // Update due date on change
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;
