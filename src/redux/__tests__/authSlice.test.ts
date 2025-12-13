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
  authInitialState,
  type AuthState,
} from "../authSlice";

// Mock de jwt utility
vi.mock("../../utils/jwt", () => ({
  isValidToken: vi.fn(),
}));

import { isValidToken } from "../../utils/jwt";

const mockedIsValidToken = isValidToken as unknown as ReturnType<typeof vi.fn>;

type User = NonNullable<AuthState["user"]>;

const getInitialState = (override: Partial<AuthState> = {}): AuthState => ({
  ...authInitialState,
  ...override,
});

const getAuthenticatedState = (
  override: Partial<AuthState> = {},
): AuthState =>
  getInitialState({
    user: mockUser,
    token: mockToken,
    isAuthenticated: true,
    ...override,
  });

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
      expect(authReducer(undefined, { type: "unknown" })).toEqual(
        authInitialState,
      );
    });
  });

  describe("loginStart", () => {
    it("should set loading to true and clear error", () => {
      const state = authReducer(getInitialState(), loginStart());

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it("should set loading to true even when there was an error", () => {
      const stateWithError = getInitialState({ error: "Previous error" });

      const state = authReducer(stateWithError, loginStart());

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });
  });

  describe("loginSuccess", () => {
    it("should set user, token, and isAuthenticated to true", () => {
      const state = authReducer(
        getInitialState(),
        loginSuccess({ user: mockUser, token: mockToken })
      );

      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.error).toBe(null);
    });

    it("should clear previous error on success", () => {
      const stateWithError = getInitialState({ error: "Login failed" });

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
      const state = authReducer(getInitialState(), loginFailure(errorMessage));

      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
      expect(state.token).toBe(null);
      expect(state.error).toBe(errorMessage);
    });

    it("should clear user data when login fails", () => {
      const state = authReducer(
        getAuthenticatedState(),
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
        getInitialState(),
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

      const state = authReducer(
        getAuthenticatedState({
          user: oldUser,
          token: oldToken,
        }),
        setCredentials({ user: mockUser, token: mockToken })
      );

      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
    });
  });

  describe("updateUser", () => {
    it("should update user partially", () => {
      const updates = {
        username: "newusername",
        city: "Bogotá",
      };

      const state = authReducer(
        getAuthenticatedState(),
        updateUser(updates),
      );

      expect(state.user).toEqual({
        ...mockUser,
        username: "newusername",
        city: "Bogotá",
      });
    });

    it("should not update if user is null", () => {
      const state = authReducer(
        getInitialState(),
        updateUser({ username: "test" }),
      );

      expect(state.user).toBe(null);
    });

    it("should update only provided fields", () => {
      const state = authReducer(
        getAuthenticatedState(),
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
      const updates = {
        username: "updateduser",
        email: "updated@test.com",
        phone: "3111111111",
        city: "Medellín",
      };

      const state = authReducer(
        getAuthenticatedState(),
        updateUser(updates),
      );

      expect(state.user).toEqual({
        id: mockUser.id,
        ...updates,
      });
    });
  });

  describe("logout", () => {
    it("should reset state to initial state", () => {
      const state = authReducer(getAuthenticatedState(), logout());

      expect(state).toEqual(authInitialState);
    });

    it("should clear error on logout", () => {
      const state = authReducer(
        getInitialState({ error: "Some error" }),
        logout(),
      );

      expect(state.error).toBe(null);
    });
  });

  describe("loadUserFromStorage", () => {

    it("should not load user if token is invalid", () => {
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      mockedIsValidToken.mockReturnValue(false);

      const state = authReducer(getInitialState(), loadUserFromStorage());

      expect(state.token).toBe(null);
      expect(state.user).toBe(null);
      expect(state.isAuthenticated).toBe(false);
    });

    it("should not load user if no token in localStorage", () => {
      const state = authReducer(getInitialState(), loadUserFromStorage());

      expect(state.token).toBe(null);
      expect(state.user).toBe(null);
      expect(state.isAuthenticated).toBe(false);
    });

    it("should not load user if no user data in localStorage", () => {
      localStorage.setItem("token", mockToken);

      const state = authReducer(getInitialState(), loadUserFromStorage());

      expect(state.token).toBe(null);
      expect(state.user).toBe(null);
      expect(state.isAuthenticated).toBe(false);
    });

    it("should handle invalid JSON in localStorage", () => {
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", "invalid-json");
      mockedIsValidToken.mockReturnValue(true);

      const state = authReducer(getInitialState(), loadUserFromStorage());

      expect(state.token).toBe(null);
      expect(state.user).toBe(null);
      expect(state.isAuthenticated).toBe(false);
    });

  });

  describe("clearError", () => {
    it("should clear error message", () => {
      const state = authReducer(
        getInitialState({ error: "Some error message" }),
        clearError(),
      );

      expect(state.error).toBe(null);
    });

    it("should not affect other state properties", () => {
      const state = authReducer(
        getAuthenticatedState({ error: "Error message" }),
        clearError(),
      );

      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });
  });

  describe("Complex Scenarios", () => {
    it("should handle login flow: start -> success", () => {
      let state = authReducer(getInitialState(), loginStart());
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
      let state = authReducer(getInitialState(), loginStart());
      expect(state.loading).toBe(true);

      state = authReducer(state, loginFailure("Login failed"));
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe("Login failed");
    });

    it("should handle user update after login", () => {
      let state = authReducer(
        getInitialState(),
        loginSuccess({ user: mockUser, token: mockToken })
      );

      state = authReducer(state, updateUser({ city: "Medellín" }));

      expect(state.user?.city).toBe("Medellín");
      expect(state.isAuthenticated).toBe(true);
    });

  });
});