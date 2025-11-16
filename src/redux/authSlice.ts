import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isValidToken } from "../utils/jwt";

interface User {
  id: string;
  username: string;
  email: string;
  phone?: string; 
  city?: string;  
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
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
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    
   
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        
        state.user = { ...state.user, ...action.payload };
        
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    
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
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
          }
        } catch {
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
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  setCredentials,
  updateUser,
  logout,
  loadUserFromStorage,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;