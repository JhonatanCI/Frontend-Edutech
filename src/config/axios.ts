import axios from "axios";
import { isValidToken } from "../utils/jwt";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor para agregar el token automáticamente
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    if (token && isValidToken(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor para manejar tokens expirados
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Opcional: redirigir al login si no está en página de auth
      if (!window.location.pathname.includes("/login") && !window.location.pathname.includes("/register")) {
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export { apiInstance as API };
