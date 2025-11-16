import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useFavorites } from "../useFavorites";
import * as favoritesService from "../../services/favorites";
import authReducer from "../../redux/authSlice";
import React from "react";

vi.mock("../../services/favorites");

const createMockStore = (isAuthenticated = true) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: isAuthenticated
          ? { id: "1", username: "testuser", email: "test@test.com" }
          : null,
        token: isAuthenticated ? "fake-token" : null,
        isAuthenticated,
        loading: false,
        error: null,
      },
    },
  });
};

const wrapper =
  (store: ReturnType<typeof createMockStore>) =>
    ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

describe("useFavorites Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when user is authenticated", () => {
    it("should load favorites on mount", async () => {
      const mockFavorites = [
        {
          id: "123",
          name: "Test Program",
          description: "Test",
          itemType: "PROGRAM" as const,
          programType: "MAESTRIA" as const,
          credits: 48,
          tags: "test",
          modality: "VIRTUAL" as const,
          degreeTitle: "Magíster",
          imageUrl: "test.jpg",
          price: 1000,
          duration: 4,
          durationUnit: "SEMESTERS" as const,
        },
      ];

      (favoritesService.getUserFavorites as Mock).mockResolvedValue(
        mockFavorites
      );

      const store = createMockStore(true);
      const { result } = renderHook(() => useFavorites(), {
        wrapper: wrapper(store),
      });

      await waitFor(() => {
        expect(result.current.favorites.has("123")).toBe(true);
      });

      expect(favoritesService.getUserFavorites).toHaveBeenCalledWith(1);
    });

    it("should toggle favorite successfully", async () => {
      const mockResponse = {
        success: true,
        isFavorite: true,
        message: "Favorito agregado",
      };

      (favoritesService.getUserFavorites as Mock).mockResolvedValue([]);
      (favoritesService.toggleFavorite as Mock).mockResolvedValue(
        mockResponse
      );

      const store = createMockStore(true);
      const { result } = renderHook(() => useFavorites(), {
        wrapper: wrapper(store),
      });

      await waitFor(() => {
        expect(result.current.favorites.size).toBe(0);
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

    it("should remove favorite when toggling existing favorite", async () => {
      const mockFavorites = [
        {
          id: "existing-id",
          name: "Existing Program",
          description: "Test",
          itemType: "PROGRAM" as const,
          programType: "MAESTRIA" as const,
          credits: 48,
          tags: "test",
          modality: "VIRTUAL" as const,
          degreeTitle: "Magíster",
          imageUrl: "test.jpg",
          price: 1000,
          duration: 4,
          durationUnit: "SEMESTERS" as const,
        },
      ];

      const mockResponse = {
        success: true,
        isFavorite: false,
        message: "Favorito eliminado",
      };

      (favoritesService.getUserFavorites as Mock).mockResolvedValue(
        mockFavorites
      );
      (favoritesService.toggleFavorite as Mock).mockResolvedValue(
        mockResponse
      );

      const store = createMockStore(true);
      const { result } = renderHook(() => useFavorites(), {
        wrapper: wrapper(store),
      });

      await waitFor(() => {
        expect(result.current.favorites.has("existing-id")).toBe(true);
      });

      await result.current.toggleFavorite("existing-id", "PROGRAM");

      await waitFor(() => {
        expect(result.current.favorites.has("existing-id")).toBe(false);
      });
    });

    it("should check if item is favorite", async () => {
      const mockFavorites = [
        {
          id: "fav-123",
          name: "Favorite Program",
          description: "Test",
          itemType: "PROGRAM" as const,
          programType: "MAESTRIA" as const,
          credits: 48,
          tags: "test",
          modality: "VIRTUAL" as const,
          degreeTitle: "Magíster",
          imageUrl: "test.jpg",
          price: 1000,
          duration: 4,
          durationUnit: "SEMESTERS" as const,
        },
      ];

      (favoritesService.getUserFavorites as Mock).mockResolvedValue(
        mockFavorites
      );

      const store = createMockStore(true);
      const { result } = renderHook(() => useFavorites(), {
        wrapper: wrapper(store),
      });

      await waitFor(() => {
        expect(result.current.isFavorite("fav-123")).toBe(true);
        expect(result.current.isFavorite("not-fav")).toBe(false);
      });
    });

    it("should get favorites list", async () => {
      const mockFavorites = [
        {
          id: "1",
          name: "Program 1",
          description: "Test",
          itemType: "PROGRAM" as const,
          programType: "MAESTRIA" as const,
          credits: 48,
          tags: "test",
          modality: "VIRTUAL" as const,
          degreeTitle: "Magíster",
          imageUrl: "test.jpg",
          price: 1000,
          duration: 4,
          durationUnit: "SEMESTERS" as const,
        },
        {
          id: "2",
          name: "Course 1",
          description: "Test",
          itemType: "COURSE" as const,
          programType: null,
          credits: 3,
          tags: "test",
          modality: "VIRTUAL" as const,
          degreeTitle: null,
          imageUrl: "test.jpg",
          price: 500,
          duration: 40,
          durationUnit: "HOURS" as const,
        },
      ];

      (favoritesService.getUserFavorites as Mock).mockResolvedValue(
        mockFavorites
      );

      const store = createMockStore(true);
      const { result } = renderHook(() => useFavorites(), {
        wrapper: wrapper(store),
      });

      const favoritesList = await result.current.getUserFavoritesList();

      expect(favoritesList).toEqual(mockFavorites);
      expect(favoritesList).toHaveLength(2);
    });

    it("should clear error", async () => {
      (favoritesService.getUserFavorites as Mock).mockResolvedValue([]);
      (favoritesService.toggleFavorite as Mock).mockRejectedValue(
        new Error("Network error")
      );

      const store = createMockStore(true);
      const { result } = renderHook(() => useFavorites(), {
        wrapper: wrapper(store),
      });

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

      act(() => {
        result.current.clearError();
      });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
    });
  });

  describe("when user is not authenticated", () => {
    it("should not load favorites", async () => {
      const store = createMockStore(false);
      const { result } = renderHook(() => useFavorites(), {
        wrapper: wrapper(store),
      });

      await waitFor(() => {
        expect(result.current.favorites.size).toBe(0);
      });

      expect(favoritesService.getUserFavorites).not.toHaveBeenCalled();
    });

    it("should return empty list when getting favorites", async () => {
      const store = createMockStore(false);
      const { result } = renderHook(() => useFavorites(), {
        wrapper: wrapper(store),
      });

      const favoritesList = await result.current.getUserFavoritesList();

      expect(favoritesList).toEqual([]);
      expect(favoritesService.getUserFavorites).not.toHaveBeenCalled();
    });
  });
});
