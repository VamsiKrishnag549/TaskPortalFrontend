import axios from "axios";

const API = axios.create({
  baseURL: "https://taskportalmanagement.onrender.com",
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
  API.post("/api/auth/register", data);

export const loginUser = (data) =>
  API.post("/api/auth/login", data);

// TASKS

export const getTasks = () =>
  API.get("/api/tasks");

export const createTask = (data) =>
  API.post("/api/tasks", data);


export const deleteTask = (id) =>
  API.delete(`/api/tasks/${id}`);

export const updateTaskStatus = (id, status) =>
  API.patch(`/api/tasks/${id}/status`, {
    status,
  });
export const updateTask = (id, taskData) =>
  API.put(`/api/tasks/${id}`, taskData);
// AI

export const generateTaskDetails = (title) =>
  API.post("/api/ai/generate", {
    title,
  });

export default API;
