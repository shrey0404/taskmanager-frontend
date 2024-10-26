// frontend/src/services/taskService.js
import axios from "axios";

const API_URL = "http://localhost:5003/api/tasks";

// Fetch all tasks
const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new task
const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Update a task
const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

// Delete a task
const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export { getTasks, createTask, updateTask, deleteTask };
