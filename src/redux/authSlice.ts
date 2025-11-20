import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isValidToken } from "../utils/jwt";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  redirectPath: string | null;
  successMessage: string | null;
  favoriteMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  redirectPath: null,
  successMessage: null,
  favoriteMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      
      // Guardar en localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.redirectPath = null;
      state.successMessage = null;
      
      // Limpiar localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");
      
      if (token && userString) {
        try {          
          if (isValidToken(token)) {
            const user = JSON.parse(userString);
            state.token = token;
            state.user = user;
            state.isAuthenticated = true;
          } else {
            // Token expirado, limpiar todo
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
          }
        } catch {
          // Si hay error al parsear o validar, limpiar localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          state.token = null;
          state.user = null;
          state.isAuthenticated = false;
        }
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    setRedirectPath: (state, action: PayloadAction<string | null>) => {
      state.redirectPath = action.payload;
    },
    setSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.successMessage = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    setFavoriteMessage: (state, action: PayloadAction<string | null>) => {
      state.favoriteMessage = action.payload;
    },
    clearFavoriteMessage: (state) => {
      state.favoriteMessage = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  loadUserFromStorage,
  clearError,
  setRedirectPath,
  setSuccessMessage,
  clearSuccessMessage,
  setFavoriteMessage,
  clearFavoriteMessage,
} = authSlice.actions;

export default authSlice.reducer;