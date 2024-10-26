// frontend/src/App.js
import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { getTasks } from "./services/taskService";
import "./styles.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    const fetchTasks = async () => {
      const initialTasks = await getTasks();
      setTasks(initialTasks);
    };
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
    setTaskToEdit(null);
  };

  const handleTaskDelete = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
      <h1>Task Management App</h1>
      <button onClick={toggleDarkMode} className="toggle-theme">
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </button>
      <TaskForm
        onTaskAdded={handleTaskAdded}
        taskToEdit={taskToEdit}
        onTaskUpdated={handleTaskUpdated}
      />
      <TaskList
        tasks={tasks}
        onTaskUpdate={handleTaskUpdated}
        onTaskDelete={handleTaskDelete}
        onEditTask={handleEditTask}
      />
    </div>
  );
};

export default App;
