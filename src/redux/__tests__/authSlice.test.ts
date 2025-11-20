import { describe, it, expect, beforeEach, vi } from "vitest";
import authReducer, {
  loginStart,
  loginSuccess,
  loginFailure,
  setCredentials,
  updateUser,
  logout,
  loadUserFromStorage,
  clearError,
} from "../authSlice";

// Mock de jwt utility
vi.mock("../../utils/jwt", () => ({
  isValidToken: vi.fn(),
}));

import { isValidToken } from "../../utils/jwt";

const mockedIsValidToken = isValidToken as unknown as ReturnType<typeof vi.fn>;

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

const mockUser: User = {
  id: "1",
  username: "testuser",
  email: "test@test.com",
  phone: "3001234567",
  city: "Cali",
};

const mockToken = "mock-jwt-token";

describe("authSlice", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("Initial State", () => {
    it("should return the initial state", () => {
      expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
    });
  });

  describe("loginStart", () => {
    it("should set loading to true and clear error", () => {
      const state = authReducer(initialState, loginStart());

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it("should set loading to true even when there was an error", () => {
      const stateWithError: AuthState = {
        ...initialState,
        error: "Previous error",
      };

      const state = authReducer(stateWithError, loginStart());

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });
  });

  describe("loginSuccess", () => {
    it("should set user, token, and isAuthenticated to true", () => {
      const state = authReducer(
        initialState,
        loginSuccess({ user: mockUser, token: mockToken })
      );

      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.error).toBe(null);
    });

    it("should clear previous error on success", () => {
      const stateWithError: AuthState = {
        ...initialState,
        error: "Login failed",
      };

      const state = authReducer(
        stateWithError,
        loginSuccess({ user: mockUser, token: mockToken })
      );

      expect(state.error).toBe(null);
    });
  });

  describe("loginFailure", () => {
    it("should set error and reset authentication state", () => {
      const errorMessage = "Invalid credentials";
      const state = authReducer(initialState, loginFailure(errorMessage));

      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
      expect(state.token).toBe(null);
      expect(state.error).toBe(errorMessage);
    });

    it("should clear user data when login fails", () => {
      const authenticatedState: AuthState = {
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

      const state = authReducer(
        authenticatedState,
        loginFailure("Session expired")
      );

      expect(state.user).toBe(null);
      expect(state.token).toBe(null);
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe("setCredentials", () => {
    it("should set user and token", () => {
      const state = authReducer(
        initialState,
        setCredentials({ user: mockUser, token: mockToken })
      );

      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });

    it("should override existing credentials", () => {
      const oldUser: User = {
        id: "2",
        username: "olduser",
        email: "old@test.com",
      };
      const oldToken = "old-token";

      const stateWithOldCredentials: AuthState = {
        user: oldUser,
        token: oldToken,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

      const state = authReducer(
        stateWithOldCredentials,
        setCredentials({ user: mockUser, token: mockToken })
      );

      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
    });
  });

  describe("updateUser", () => {
    it("should update user partially", () => {
      const authenticatedState: AuthState = {
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

      const updates = {
        username: "newusername",
        city: "Bogotá",
      };

      const state = authReducer(authenticatedState, updateUser(updates));

      expect(state.user).toEqual({
        ...mockUser,
        username: "newusername",
        city: "Bogotá",
      });
    });

    it("should not update if user is null", () => {
      const state = authReducer(initialState, updateUser({ username: "test" }));

      expect(state.user).toBe(null);
    });

    it("should update only provided fields", () => {
      const authenticatedState: AuthState = {
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

      const state = authReducer(
        authenticatedState,
        updateUser({ email: "newemail@test.com" })
      );

      expect(state.user).toEqual({
        ...mockUser,
        email: "newemail@test.com",
      });
      expect(state.user?.username).toBe(mockUser.username);
      expect(state.user?.phone).toBe(mockUser.phone);
    });

    it("should handle multiple fields update", () => {
      const authenticatedState: AuthState = {
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

      const updates = {
        username: "updateduser",
        email: "updated@test.com",
        phone: "3111111111",
        city: "Medellín",
      };

      const state = authReducer(authenticatedState, updateUser(updates));

      expect(state.user).toEqual({
        id: mockUser.id,
        ...updates,
      });
    });
  });

  describe("logout", () => {
    it("should reset state to initial state", () => {
      const authenticatedState: AuthState = {
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

      const state = authReducer(authenticatedState, logout());

      expect(state).toEqual(initialState);
    });

    it("should clear error on logout", () => {
      const stateWithError: AuthState = {
        ...initialState,
        error: "Some error",
      };

      const state = authReducer(stateWithError, logout());

      expect(state.error).toBe(null);
    });
  });

  describe("loadUserFromStorage", () => {

    it("should not load user if token is invalid", () => {
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      mockedIsValidToken.mockReturnValue(false);

      const state = authReducer(initialState, loadUserFromStorage());

      expect(state.token).toBe(null);
      expect(state.user).toBe(null);
      expect(state.isAuthenticated).toBe(false);
    });

    it("should not load user if no token in localStorage", () => {
      const state = authReducer(initialState, loadUserFromStorage());

      expect(state.token).toBe(null);
      expect(state.user).toBe(null);
      expect(state.isAuthenticated).toBe(false);
    });

    it("should not load user if no user data in localStorage", () => {
      localStorage.setItem("token", mockToken);

      const state = authReducer(initialState, loadUserFromStorage());

      expect(state.token).toBe(null);
      expect(state.user).toBe(null);
      expect(state.isAuthenticated).toBe(false);
    });

    it("should handle invalid JSON in localStorage", () => {
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", "invalid-json");
      mockedIsValidToken.mockReturnValue(true);

      const state = authReducer(initialState, loadUserFromStorage());

      expect(state.token).toBe(null);
      expect(state.user).toBe(null);
      expect(state.isAuthenticated).toBe(false);
    });

  });

  describe("clearError", () => {
    it("should clear error message", () => {
      const stateWithError: AuthState = {
        ...initialState,
        error: "Some error message",
      };

      const state = authReducer(stateWithError, clearError());

      expect(state.error).toBe(null);
    });

    it("should not affect other state properties", () => {
      const authenticatedStateWithError: AuthState = {
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        loading: false,
        error: "Error message",
      };

      const state = authReducer(authenticatedStateWithError, clearError());

      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });
  });

  describe("Complex Scenarios", () => {
    it("should handle login flow: start -> success", () => {
      let state = authReducer(initialState, loginStart());
      expect(state.loading).toBe(true);

      state = authReducer(
        state,
        loginSuccess({ user: mockUser, token: mockToken })
      );
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
    });

    it("should handle login flow: start -> failure", () => {
      let state = authReducer(initialState, loginStart());
      expect(state.loading).toBe(true);

      state = authReducer(state, loginFailure("Login failed"));
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe("Login failed");
    });

    it("should handle user update after login", () => {
      let state = authReducer(
        initialState,
        loginSuccess({ user: mockUser, token: mockToken })
      );

      state = authReducer(state, updateUser({ city: "Medellín" }));

      expect(state.user?.city).toBe("Medellín");
      expect(state.isAuthenticated).toBe(true);
    });

  });
});