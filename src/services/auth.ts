// src/services/auth.ts
import { API } from "../config/axios";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await API.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    console.error("Error en el registro:", error.response?.data || error);
    throw error;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await API.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    console.error("Error en el login:", error.response?.data || error);
    throw error;
  }
};

// Forgot/Reset Password
export const requestPasswordReset = async (email: string) => {
  try {
    const response = await API.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error: any) {
    console.error("Error solicitando restablecimiento:", error.response?.data || error);
    throw error;
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await API.post("/auth/reset-password", { token, newPassword });
    return response.data;
  } catch (error: any) {
    console.error("Error restableciendo contraseña:", error.response?.data || error);
    throw error;
  }
};
