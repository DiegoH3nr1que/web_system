import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Ou outro método de armazenamento do token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

