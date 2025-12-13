import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import FavoritesSection from "../FavoritesSection";
import * as favoritesService from "../../../services/favorites";
import authReducer, { type AuthState } from "../../../redux/authSlice";
import type { ReactElement } from "react";

vi.mock("../../../services/favorites");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const createMockStore = (override: Partial<AuthState> = {}) => {
  const baseState = authReducer(undefined, { type: "@@INIT" } as any);
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        ...baseState,
        user: { id: "1", username: "testuser", email: "test@test.com" },
        token: "fake-token",
        isAuthenticated: true,
        loading: false,
        ...override,
      },
    },
  });
};

const renderWithProviders = (component: ReactElement, override?: Partial<AuthState>) => {
  const store = createMockStore(override);
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

const mockFavorites = [
  {
    id: "program-1",
    name: "Maestría en Ingeniería",
    description: "Programa de maestría en ingeniería",
    itemType: "PROGRAM" as const,
    programType: "MAESTRIA" as const,
    credits: 48,
    tags: "ingeniería,tecnología",
    modality: "VIRTUAL" as const,
    degreeTitle: "Magíster en Ingeniería",
    imageUrl: "maestria.jpg",
    price: 15000000,
    duration: 4,
    durationUnit: "SEMESTERS" as const,
  },
  {
    id: "course-1",
    name: "Python Avanzado",
    description: "Curso de Python",
    itemType: "COURSE" as const,
    programType: null,
    credits: 3,
    tags: "programación,python",
    modality: "VIRTUAL" as const,
    degreeTitle: null,
    imageUrl: "python.jpg",
    price: 500000,
    duration: 40,
    durationUnit: "HOURS" as const,
  },
  {
    id: "program-2",
    name: "Especialización en Datos",
    description: "Programa de especialización",
    itemType: "PROGRAM" as const,
    programType: "ESPECIALIZACION" as const,
    credits: 24,
    tags: "datos,análisis",
    modality: "PRESENCIAL" as const,
    degreeTitle: "Especialista",
    imageUrl: "datos.jpg",
    price: 10000000,
    duration: 2,
    durationUnit: "SEMESTERS" as const,
  },
];

describe("FavoritesSection Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  describe("Loading State", () => {
    it("should show loading state initially", () => {
      (favoritesService.getUserFavorites as Mock).mockImplementation(
        () => new Promise(() => {})
      );

      renderWithProviders(<FavoritesSection />);

      expect(screen.getByText("Cargando favoritos...")).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should show empty state when no favorites", async () => {
      (favoritesService.getUserFavorites as Mock).mockResolvedValue([]);

      renderWithProviders(<FavoritesSection />);

      await waitFor(() => {
        expect(
          screen.getByText("No tienes favoritos guardados")
        ).toBeInTheDocument();
      });

      expect(
        screen.getByText("Explora nuestro catálogo y guarda tus favoritos")
      ).toBeInTheDocument();
      expect(screen.getByText("Explorar catálogo")).toBeInTheDocument();
    });

    it("should navigate to search when clicking explore button", async () => {
      const user = userEvent.setup();
      (favoritesService.getUserFavorites as Mock).mockResolvedValue([]);

      renderWithProviders(<FavoritesSection />);

      await waitFor(() => {
        expect(screen.getByText("Explorar catálogo")).toBeInTheDocument();
      });

      const exploreButton = screen.getByText("Explorar catálogo");
      await user.click(exploreButton);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  describe("Favorites Display", () => {
    it("should display favorites correctly", async () => {
      (favoritesService.getUserFavorites as Mock).mockResolvedValue(
        mockFavorites
      );

      renderWithProviders(<FavoritesSection />);

      await waitFor(() => {
        expect(screen.getByText("Maestría en Ingeniería")).toBeInTheDocument();
        expect(screen.getByText("Python Avanzado")).toBeInTheDocument();
        expect(
          screen.getByText("Especialización en Datos")
        ).toBeInTheDocument();
      });
    });

    it("should show filter buttons with correct counts", async () => {
      (favoritesService.getUserFavorites as Mock).mockResolvedValue(
        mockFavorites
      );

      renderWithProviders(<FavoritesSection />);

      await waitFor(() => {
        expect(screen.getByText("Todos (3)")).toBeInTheDocument();
        expect(screen.getByText("Programas (2)")).toBeInTheDocument();
        expect(screen.getByText("Cursos (1)")).toBeInTheDocument();
      });
    });
  });

  describe("Filtering", () => {
    it("should filter by programs when clicking Programs button", async () => {
      const user = userEvent.setup();
      (favoritesService.getUserFavorites as Mock).mockResolvedValue(
        mockFavorites
      );

      renderWithProviders(<FavoritesSection />);

      await waitFor(() => {
        expect(screen.getByText("Programas (2)")).toBeInTheDocument();
      });

      const programsButton = screen.getByText("Programas (2)");
      await user.click(programsButton);

      await waitFor(() => {
        expect(screen.getByText("Maestría en Ingeniería")).toBeInTheDocument();
        expect(
          screen.getByText("Especialización en Datos")
        ).toBeInTheDocument();
        expect(screen.queryByText("Python Avanzado")).not.toBeInTheDocument();
      });
    });

    it("should filter by courses when clicking Courses button", async () => {
      const user = userEvent.setup();
      (favoritesService.getUserFavorites as Mock).mockResolvedValue(
        mockFavorites
      );

      renderWithProviders(<FavoritesSection />);

      await waitFor(() => {
        expect(screen.getByText("Cursos (1)")).toBeInTheDocument();
      });

      const coursesButton = screen.getByText("Cursos (1)");
      await user.click(coursesButton);

      await waitFor(() => {
        expect(screen.getByText("Python Avanzado")).toBeInTheDocument();
        expect(
          screen.queryByText("Maestría en Ingeniería")
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText("Especialización en Datos")
        ).not.toBeInTheDocument();
      });
    });

    it("should show all when clicking All button after filtering", async () => {
      const user = userEvent.setup();
      (favoritesService.getUserFavorites as Mock).mockResolvedValue(
        mockFavorites
      );

      renderWithProviders(<FavoritesSection />);

      await waitFor(() => {
        expect(screen.getByText("Cursos (1)")).toBeInTheDocument();
      });

      // Filter by courses
      const coursesButton = screen.getByText("Cursos (1)");
      await user.click(coursesButton);

      await waitFor(() => {
        expect(screen.getByText("Python Avanzado")).toBeInTheDocument();
        expect(
          screen.queryByText("Maestría en Ingeniería")
        ).not.toBeInTheDocument();
      });

      // Click All button
      const allButton = screen.getByText("Todos (3)");
      await user.click(allButton);

      await waitFor(() => {
        expect(screen.getByText("Maestría en Ingeniería")).toBeInTheDocument();
        expect(screen.getByText("Python Avanzado")).toBeInTheDocument();
        expect(
          screen.getByText("Especialización en Datos")
        ).toBeInTheDocument();
      });
    });

    it("should show empty state when filter has no results", async () => {
      const user = userEvent.setup();
      const onlyPrograms = [mockFavorites[0], mockFavorites[2]];

      (favoritesService.getUserFavorites as Mock).mockResolvedValue(
        onlyPrograms
      );

      renderWithProviders(<FavoritesSection />);

      await waitFor(() => {
        expect(screen.getByText("Cursos (0)")).toBeInTheDocument();
      });

      const coursesButton = screen.getByText("Cursos (0)");
      await user.click(coursesButton);

      await waitFor(() => {
        expect(
          screen.getByText("No tienes cursos favoritos")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle service error gracefully", async () => {
      (favoritesService.getUserFavorites as Mock).mockRejectedValue(
        new Error("Network error")
      );

      renderWithProviders(<FavoritesSection />);

      // Should not crash and eventually show empty state or loading state
      await waitFor(() => {
        expect(screen.queryByText("Cargando favoritos...")).toBeInTheDocument();
      });
    });
  });

  describe("Filter Button Styling", () => {
    it("should highlight active filter button", async () => {
      const user = userEvent.setup();
      (favoritesService.getUserFavorites as Mock).mockResolvedValue(
        mockFavorites
      );

      renderWithProviders(<FavoritesSection />);

      await waitFor(() => {
        expect(screen.getByText("Todos (3)")).toBeInTheDocument();
      });

      const allButton = screen.getByText("Todos (3)");
      expect(allButton).toHaveClass("bg-[#5454E9]");

      const programsButton = screen.getByText("Programas (2)");
      await user.click(programsButton);

      await waitFor(() => {
        expect(programsButton).toHaveClass("bg-[#5454E9]");
        expect(allButton).not.toHaveClass("bg-[#5454E9]");
      });
    });
  });
});
