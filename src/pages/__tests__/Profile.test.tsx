import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import Profile from "../Profile";
import axios from "axios";
import { MockedFunction } from "vitest";


vi.mock("axios");
const mockedAxios = axios as unknown as {
  get: MockedFunction<any>;
  put: MockedFunction<any>;
};


const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});


const mockGetUserFavoritesList = vi.fn();
vi.mock("../../hooks/useFavorites", () => ({
  useFavorites: () => ({
    getUserFavoritesList: mockGetUserFavoritesList,
  }),
}));


vi.mock("../../components/Commons/NavBar", () => ({
  default: () => <div data-testid="navbar">NavBar</div>,
}));


vi.mock("../../components/Profile/FavoritesSection", () => ({
  default: () => <div data-testid="favorites-section">Favorites Section</div>,
}));


const createMockStore = (isAuthenticated = true, user = { id: "1", username: "testuser", email: "test@test.com" }) => {
  return configureStore({
    reducer: {
      auth: () => ({
        isAuthenticated,
        user,
      }),
    },
  });
};

const mockUserInfo = {
  id: "1",
  username: "testuser",
  email: "test@test.com",
  phone: "3001234567",
  city: "Cali",
};

describe("Profile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("token", "mock-token");
    
  
    mockedAxios.get.mockResolvedValue({
      data: mockUserInfo,
    });

   
    mockGetUserFavoritesList.mockResolvedValue([
      { id: "1", name: "Favorite 1" },
      { id: "2", name: "Favorite 2" },
    ]);
  });

  describe("Authentication and Navigation", () => {
    it("should redirect to login if not authenticated", () => {
      const store = createMockStore(false);
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it("should not redirect if authenticated", async () => {
      const store = createMockStore(true);
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });
  });

  describe("Component Rendering", () => {
    it("should render all main components", async () => {
      const store = createMockStore();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
      });
    });

    it("should display user information", async () => {
      const store = createMockStore();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
        expect(screen.getByText("test@test.com")).toBeInTheDocument();
        expect(screen.getByText("3001234567")).toBeInTheDocument();
        expect(screen.getByText("Cali")).toBeInTheDocument();
      });
    });

    it("should display favorites count", async () => {
      const store = createMockStore();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("2")).toBeInTheDocument();
      });
    });
  });

  describe("Tabs Functionality", () => {
    it("should display favorites tab by default", async () => {
      const store = createMockStore();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("favorites-section")).toBeInTheDocument();
      });
    });

    it("should switch to achievements tab when clicked", async () => {
      const store = createMockStore();
      const user = userEvent.setup();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("favorites-section")).toBeInTheDocument();
      });

      const achievementsTab = screen.getByRole("button", { name: /tus logros/i });
      await user.click(achievementsTab);

      await waitFor(() => {
        expect(screen.getByText(/Aquí podrás ver tus certificados/i)).toBeInTheDocument();
      });
    });
  });

  describe("Edit Modal", () => {
    it("should open edit modal when clicking edit button", async () => {
      const store = createMockStore();
      const user = userEvent.setup();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      expect(screen.getByText("Editar Perfil")).toBeInTheDocument();
    });

    it("should close modal when clicking cancel", async () => {
      const store = createMockStore();
      const user = userEvent.setup();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      const cancelButton = screen.getByText("Cancelar");
      await user.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByText("Editar Perfil")).not.toBeInTheDocument();
      });
    });

    it("should close modal when clicking X button", async () => {
      const store = createMockStore();
      const user = userEvent.setup();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      
      const closeButtons = screen.getAllByRole("button");
      const xButton = closeButtons.find(button => 
        button.querySelector('path[d*="M6 18L18 6M6 6l12 12"]')
      );
      
      if (xButton) {
        await user.click(xButton);
      }

      await waitFor(() => {
        expect(screen.queryByText("Editar Perfil")).not.toBeInTheDocument();
      });
    });

    it("should populate form with current user data", async () => {
      const store = createMockStore();
      const user = userEvent.setup();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      const usernameInput = screen.getByPlaceholderText("Tu nombre de usuario") as HTMLInputElement;
      const emailInput = screen.getByPlaceholderText("tu@email.com") as HTMLInputElement;
      const phoneInput = screen.getByPlaceholderText("Agrega tu teléfono") as HTMLInputElement;

      expect(usernameInput.value).toBe("testuser");
      expect(emailInput.value).toBe("test@test.com");
      expect(phoneInput.value).toBe("3001234567");
    });
  });

  describe("Form Validation", () => {
    it("should show error if username is empty", async () => {
      const store = createMockStore();
      const user = userEvent.setup();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      const usernameInput = screen.getByPlaceholderText("Tu nombre de usuario");
      await user.clear(usernameInput);

      const saveButton = screen.getByText("Guardar cambios");
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText("El nombre de usuario es obligatorio")).toBeInTheDocument();
      });
    });

    it("should show error if email is empty", async () => {
      const store = createMockStore();
      const user = userEvent.setup();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      const emailInput = screen.getByPlaceholderText("tu@email.com");
      await user.clear(emailInput);

      const saveButton = screen.getByText("Guardar cambios");
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText("El correo electrónico es obligatorio")).toBeInTheDocument();
      });
    });

    it("should show error for invalid email format", async () => {
      const store = createMockStore();
      const user = userEvent.setup();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      const emailInput = screen.getByPlaceholderText("tu@email.com");
      await user.clear(emailInput);
      await user.type(emailInput, "invalid-email");

      const saveButton = screen.getByText("Guardar cambios");
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText(/Por favor ingresa un correo electrónico válido/i)).toBeInTheDocument();
      });
    });

    it("should show error for non-numeric phone", async () => {
      const store = createMockStore();
      const user = userEvent.setup();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      const phoneInput = screen.getByPlaceholderText("Agrega tu teléfono");
      await user.clear(phoneInput);
      await user.type(phoneInput, "abc123");

      const saveButton = screen.getByText("Guardar cambios");
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText("El teléfono debe contener solo números")).toBeInTheDocument();
      });
    });

    it("should show error for phone with less than 7 digits", async () => {
      const store = createMockStore();
      const user = userEvent.setup();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      const phoneInput = screen.getByPlaceholderText("Agrega tu teléfono");
      await user.clear(phoneInput);
      await user.type(phoneInput, "12345");

      const saveButton = screen.getByText("Guardar cambios");
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText("El teléfono debe tener entre 7 y 10 dígitos")).toBeInTheDocument();
      });
    });

    it("should show error for phone with more than 10 digits", async () => {
      const store = createMockStore();
      const user = userEvent.setup();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      const phoneInput = screen.getByPlaceholderText("Agrega tu teléfono");
      await user.clear(phoneInput);
      await user.type(phoneInput, "12345678901");

      const saveButton = screen.getByText("Guardar cambios");
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText("El teléfono debe tener entre 7 y 10 dígitos")).toBeInTheDocument();
      });
    });
  });

  describe("Update User Information", () => {
    it("should successfully update user information", async () => {
      const store = createMockStore();
      const user = userEvent.setup();

      const updatedUserInfo = {
        ...mockUserInfo,
        username: "newusername",
      };

      mockedAxios.put.mockResolvedValue({
        data: updatedUserInfo,
      });
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      const usernameInput = screen.getByPlaceholderText("Tu nombre de usuario");
      await user.clear(usernameInput);
      await user.type(usernameInput, "newusername");

      const saveButton = screen.getByText("Guardar cambios");
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText("¡Información actualizada exitosamente!")).toBeInTheDocument();
      });

      expect(mockedAxios.put).toHaveBeenCalledWith(
        "http://localhost:8080/api/v1/user/me",
        expect.objectContaining({
          username: "newusername",
        }),
        expect.any(Object)
      );
    });

    it("should handle 404 error when user not found", async () => {
      const store = createMockStore();
      const user = userEvent.setup();

      mockedAxios.put.mockRejectedValue({
        response: {
          status: 404,
        },
      });
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      const saveButton = screen.getByText("Guardar cambios");
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText(/No se pudo encontrar tu usuario/i)).toBeInTheDocument();
      });
    });

    it("should handle 400 error with validation message", async () => {
      const store = createMockStore();
      const user = userEvent.setup();

      mockedAxios.put.mockRejectedValue({
        response: {
          status: 400,
          data: {
            message: "Datos inválidos",
          },
        },
      });
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      const saveButton = screen.getByText("Guardar cambios");
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText("Datos inválidos")).toBeInTheDocument();
      });
    });

    it("should show loading state during update", async () => {
      const store = createMockStore();
      const user = userEvent.setup();

      mockedAxios.put.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ data: mockUserInfo }), 1000))
      );
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText("testuser")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Editar perfil");
      await user.click(editButton);

      const saveButton = screen.getByText("Guardar cambios");
      await user.click(saveButton);

      expect(screen.getByText("Guardando...")).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("should handle error when loading user data fails", async () => {
      const store = createMockStore();
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      mockedAxios.get.mockRejectedValue(new Error("Network error"));
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled();
      });

      consoleSpy.mockRestore();
    });
  });

  describe("User Avatar", () => {
    it("should display user initial in avatar", async () => {
      const store = createMockStore();
      
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        const avatar = screen.getByText("T"); 
        expect(avatar).toBeInTheDocument();
      });
    });
  });
});