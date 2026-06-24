import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// AUTH

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

// TASKS

export const getTasks = () =>
  API.get("/tasks");

export const createTask = (data) =>
  API.post("/tasks", data);


export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

export const updateTaskStatus = (id, status) =>
  API.patch(`/tasks/${id}/status`, {
    status,
  });
export const updateTask = (id, taskData) =>
  API.put(`/tasks/${id}`, taskData);
// AI

export const generateTaskDetails = (title) =>
  API.post("/ai/generate", {
    title,
  });

export default API;