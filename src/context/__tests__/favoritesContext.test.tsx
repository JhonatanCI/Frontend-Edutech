import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  FavoritesProvider,
  useFavoritesContext,
} from "../favoritesContext";
import * as favoritesService from "../../services/favorites";
import authReducer, { type AuthState } from "../../redux/authSlice";
import type { ReactNode } from "react";

vi.mock("../../services/favorites");

const createMockStore = (isAuthenticated = true, override: Partial<AuthState> = {}) => {
  const baseState = authReducer(undefined, { type: "@@INIT" } as any);
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        ...baseState,
        user: isAuthenticated
          ? { id: "1", username: "testuser", email: "test@test.com" }
          : null,
        token: isAuthenticated ? "fake-token" : null,
        isAuthenticated,
        loading: false,
        ...override,
      },
    },
  });
};

const createWrapper = (isAuthenticated = true, override?: Partial<AuthState>) => {
  const store = createMockStore(isAuthenticated, override ?? {});
  return ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <FavoritesProvider>{children}</FavoritesProvider>
    </Provider>
  );
};

describe("FavoritesContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("FavoritesProvider", () => {
    it("should provide favorites context to children", () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.favorites).toBeDefined();
      expect(result.current.isLoading).toBeDefined();
      expect(result.current.error).toBeDefined();
      expect(result.current.toggleFavorite).toBeDefined();
      expect(result.current.isFavorite).toBeDefined();
      expect(result.current.getFavorites).toBeDefined();
      expect(result.current.getUserFavoritesList).toBeDefined();
      expect(result.current.clearError).toBeDefined();
    });

    it("should have correct initial state", async () => {
      vi.mocked(favoritesService.getUserFavorites).mockResolvedValue([]);
      
      const wrapper = createWrapper();
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.favorites).toBeInstanceOf(Set);
      expect(result.current.favorites.size).toBe(0);
      expect(result.current.error).toBeNull();
    });

    it("should provide all context methods", () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      expect(typeof result.current.toggleFavorite).toBe("function");
      expect(typeof result.current.isFavorite).toBe("function");
      expect(typeof result.current.getFavorites).toBe("function");
      expect(typeof result.current.getUserFavoritesList).toBe("function");
      expect(typeof result.current.clearError).toBe("function");
    });
  });

  describe("useFavoritesContext", () => {
    it("should throw error when used outside FavoritesProvider", () => {
      expect(() => {
        renderHook(() => useFavoritesContext());
      }).toThrow("useFavoritesContext must be used within a FavoritesProvider");
    });

    it("should not throw error when used inside FavoritesProvider", () => {
      const wrapper = createWrapper();

      expect(() => {
        renderHook(() => useFavoritesContext(), { wrapper });
      }).not.toThrow();
    });

    it("should return context value when inside provider", () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      expect(result.current).not.toBeUndefined();
      expect(result.current.favorites).toBeInstanceOf(Set);
    });
  });

  describe("Context integration with useFavorites hook", () => {
    it("should load favorites on mount when authenticated", async () => {
      const mockFavorites = [
        {
          id: "1",
          name: "Test Course",
          itemType: "COURSE" as const,
          description: "Test",
          programType: null,
          credits: 3,
          tags: "test",
          modality: "VIRTUAL" as const,
          degreeTitle: null,
          imageUrl: "test.jpg",
          price: 100,
          duration: 40,
          durationUnit: "HOURS" as const,
        },
      ];

      vi.mocked(favoritesService.getUserFavorites).mockResolvedValue(
        mockFavorites
      );

      const wrapper = createWrapper(true);
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(favoritesService.getUserFavorites).toHaveBeenCalledWith(1);
      expect(result.current.favorites.has("1")).toBe(true);
    });

    it("should toggle favorite successfully", async () => {
      vi.mocked(favoritesService.getUserFavorites).mockResolvedValue([]);
      vi.mocked(favoritesService.toggleFavorite).mockResolvedValue({
        success: true,
        isFavorite: true,
        message: "Added to favorites",
      });

      const wrapper = createWrapper(true);
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await result.current.toggleFavorite("test-id", "PROGRAM");

      await waitFor(() => {
        expect(result.current.favorites.has("test-id")).toBe(true);
      });

      expect(favoritesService.toggleFavorite).toHaveBeenCalledWith(
        1,
        "test-id",
        "PROGRAM"
      );
    });

    it("should check if item is favorite", async () => {
      const mockFavorites = [
        {
          id: "favorite-1",
          name: "Test",
          itemType: "COURSE" as const,
          description: "Test",
          programType: null,
          credits: 3,
          tags: "test",
          modality: "VIRTUAL" as const,
          degreeTitle: null,
          imageUrl: "test.jpg",
          price: 100,
          duration: 40,
          durationUnit: "HOURS" as const,
        },
      ];

      vi.mocked(favoritesService.getUserFavorites).mockResolvedValue(
        mockFavorites
      );

      const wrapper = createWrapper(true);
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFavorite("favorite-1")).toBe(true);
      expect(result.current.isFavorite("non-favorite")).toBe(false);
    });

    it("should get favorites list", async () => {
      const mockFavorites = [
        {
          id: "1",
          name: "Test Course",
          itemType: "COURSE" as const,
          description: "Test",
          programType: null,
          credits: 3,
          tags: "test",
          modality: "VIRTUAL" as const,
          degreeTitle: null,
          imageUrl: "test.jpg",
          price: 100,
          duration: 40,
          durationUnit: "HOURS" as const,
        },
      ];

      vi.mocked(favoritesService.getUserFavorites).mockResolvedValue(
        mockFavorites
      );

      const wrapper = createWrapper(true);
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const favorites = await result.current.getUserFavoritesList();

      expect(favorites).toEqual(mockFavorites);
      expect(favorites).toHaveLength(1);
    });

    it("should handle errors when toggling favorite", async () => {
      vi.mocked(favoritesService.getUserFavorites).mockResolvedValue([]);
      vi.mocked(favoritesService.toggleFavorite).mockRejectedValue(
        new Error("Network error")
      );

      const wrapper = createWrapper(true);
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      try {
        await result.current.toggleFavorite("test-id", "PROGRAM");
      } catch {
        // Error esperado
      }

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });
    });

    it("should clear error", async () => {
      vi.mocked(favoritesService.getUserFavorites).mockResolvedValue([]);
      vi.mocked(favoritesService.toggleFavorite).mockRejectedValue(
        new Error("Network error")
      );

      const wrapper = createWrapper(true);
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      try {
        await result.current.toggleFavorite("test-id", "PROGRAM");
      } catch {
        // Error esperado
      }

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });

      result.current.clearError();

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
    });

    it("should not load favorites when not authenticated", async () => {
      const wrapper = createWrapper(false);
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(favoritesService.getUserFavorites).not.toHaveBeenCalled();
      expect(result.current.favorites.size).toBe(0);
    });

    it("should return empty list when getting favorites while not authenticated", async () => {
      const wrapper = createWrapper(false);
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const favorites = await result.current.getUserFavoritesList();

      expect(favorites).toEqual([]);
      expect(favoritesService.getUserFavorites).not.toHaveBeenCalled();
    });
  });

  describe("Context state management", () => {
    it("should update favorites set when toggling", async () => {
      vi.mocked(favoritesService.getUserFavorites).mockResolvedValue([]);
      vi.mocked(favoritesService.toggleFavorite)
        .mockResolvedValueOnce({
          success: true,
          isFavorite: true,
          message: "Added",
        })
        .mockResolvedValueOnce({
          success: true,
          isFavorite: false,
          message: "Removed",
        });

      const wrapper = createWrapper(true);
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await result.current.toggleFavorite("item-1", "COURSE");

      await waitFor(() => {
        expect(result.current.favorites.has("item-1")).toBe(true);
      });

      await result.current.toggleFavorite("item-1", "COURSE");

      await waitFor(() => {
        expect(result.current.favorites.has("item-1")).toBe(false);
      });
    });

    it("should handle multiple favorites", async () => {
      const mockFavorites = [
        {
          id: "1",
          name: "Course 1",
          itemType: "COURSE" as const,
          description: "Test",
          programType: null,
          credits: 3,
          tags: "test",
          modality: "VIRTUAL" as const,
          degreeTitle: null,
          imageUrl: "test.jpg",
          price: 100,
          duration: 40,
          durationUnit: "HOURS" as const,
        },
        {
          id: "2",
          name: "Program 1",
          itemType: "PROGRAM" as const,
          description: "Test",
          programType: "ESPECIALIZACION" as const,
          credits: 12,
          tags: "test",
          modality: "PRESENCIAL" as const,
          degreeTitle: "Especialista",
          imageUrl: "test.jpg",
          price: 5000000,
          duration: 2,
          durationUnit: "SEMESTERS" as const,
        },
      ];

      vi.mocked(favoritesService.getUserFavorites).mockResolvedValue(
        mockFavorites
      );

      const wrapper = createWrapper(true);
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.favorites.size).toBe(2);
      expect(result.current.isFavorite("1")).toBe(true);
      expect(result.current.isFavorite("2")).toBe(true);
    });

    it("should refresh favorites when calling getFavorites", async () => {
      const initialFavorites = [
        {
          id: "1",
          name: "Initial",
          itemType: "COURSE" as const,
          description: "Test",
          programType: null,
          credits: 3,
          tags: "test",
          modality: "VIRTUAL" as const,
          degreeTitle: null,
          imageUrl: "test.jpg",
          price: 100,
          duration: 40,
          durationUnit: "HOURS" as const,
        },
      ];

      const updatedFavorites = [
        ...initialFavorites,
        {
          id: "2",
          name: "New",
          itemType: "PROGRAM" as const,
          description: "Test",
          programType: "MAESTRIA" as const,
          credits: 12,
          tags: "test",
          modality: "VIRTUAL" as const,
          degreeTitle: "Magister",
          imageUrl: "test.jpg",
          price: 3000000,
          duration: 4,
          durationUnit: "SEMESTERS" as const,
        },
      ];

      vi.mocked(favoritesService.getUserFavorites)
        .mockResolvedValueOnce(initialFavorites)
        .mockResolvedValueOnce(updatedFavorites);

      const wrapper = createWrapper(true);
      const { result } = renderHook(() => useFavoritesContext(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.favorites.size).toBe(1);

      await result.current.getFavorites();

      await waitFor(() => {
        expect(result.current.favorites.size).toBe(2);
      });
    });
  });
});
