import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { API } from "../../config/axios";
import * as favoritesService from "../favorites";

// Mock de axios
vi.mock("../../config/axios", () => ({
  API: {
    post: vi.fn(),
    delete: vi.fn(),
    get: vi.fn(),
  },
}));

describe("Favorites Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("toggleFavorite", () => {
    it("should toggle favorite successfully", async () => {
      const mockResponse = {
        data: {
          success: true,
          isFavorite: true,
          message: "Programa guardado en tus favoritos",
        },
      };

      (API.post as Mock).mockResolvedValue(mockResponse);

      const result = await favoritesService.toggleFavorite(
        1,
        "123e4567-e89b-12d3-a456-426614174000",
        "PROGRAM"
      );

      expect(API.post).toHaveBeenCalledWith("/favorites/toggle", null, {
        params: {
          userId: 1,
          itemId: "123e4567-e89b-12d3-a456-426614174000",
          itemType: "PROGRAM",
        },
      });
      expect(result).toEqual(mockResponse.data);
      expect(result.isFavorite).toBe(true);
    });

    it("should handle toggle favorite error", async () => {
      const mockError = new Error("Network error");
      (API.post as Mock).mockRejectedValue(mockError);

      await expect(
        favoritesService.toggleFavorite(
          1,
          "123e4567-e89b-12d3-a456-426614174000",
          "COURSE"
        )
      ).rejects.toThrow("Network error");
    });
  });

  describe("addFavorite", () => {
    it("should add favorite successfully", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Curso guardado en tus favoritos",
          data: {
            id: "fav-123",
            userId: 1,
            itemId: "123e4567-e89b-12d3-a456-426614174000",
            itemType: "COURSE",
            createdAt: "2025-11-13T00:00:00Z",
          },
        },
      };

      (API.post as Mock).mockResolvedValue(mockResponse);

      const result = await favoritesService.addFavorite(
        1,
        "123e4567-e89b-12d3-a456-426614174000",
        "COURSE"
      );

      expect(API.post).toHaveBeenCalledWith("/favorites", null, {
        params: {
          userId: 1,
          itemId: "123e4567-e89b-12d3-a456-426614174000",
          itemType: "COURSE",
        },
      });
      expect(result.success).toBe(true);
    });

    it("should handle add favorite error", async () => {
      const mockError = new Error("Failed to add favorite");
      (API.post as Mock).mockRejectedValue(mockError);

      await expect(
        favoritesService.addFavorite(
          1,
          "123e4567-e89b-12d3-a456-426614174000",
          "PROGRAM"
        )
      ).rejects.toThrow("Failed to add favorite");
    });
  });

  describe("removeFavorite", () => {
    it("should remove favorite successfully", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Favorito eliminado exitosamente",
        },
      };

      (API.delete as Mock).mockResolvedValue(mockResponse);

      const result = await favoritesService.removeFavorite(
        1,
        "123e4567-e89b-12d3-a456-426614174000",
        "PROGRAM"
      );

      expect(API.delete).toHaveBeenCalledWith("/favorites", {
        params: {
          userId: 1,
          itemId: "123e4567-e89b-12d3-a456-426614174000",
          itemType: "PROGRAM",
        },
      });
      expect(result.success).toBe(true);
    });

    it("should handle remove favorite error", async () => {
      const mockError = new Error("Failed to remove favorite");
      (API.delete as Mock).mockRejectedValue(mockError);

      await expect(
        favoritesService.removeFavorite(
          1,
          "123e4567-e89b-12d3-a456-426614174000",
          "COURSE"
        )
      ).rejects.toThrow("Failed to remove favorite");
    });
  });

  describe("getUserFavorites", () => {
    it("should get user favorites successfully", async () => {
      const mockFavorites = [
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Maestría en Ingeniería",
          description: "Programa de maestría",
          itemType: "PROGRAM" as const,
          programType: "MAESTRIA" as const,
          credits: 48,
          tags: "tecnología,ingeniería",
          modality: "VIRTUAL" as const,
          degreeTitle: "Magíster",
          imageUrl: "image.jpg",
          price: 15000000,
          duration: 4,
          durationUnit: "SEMESTERS" as const,
        },
      ];

      (API.get as Mock).mockResolvedValue({ data: mockFavorites });

      const result = await favoritesService.getUserFavorites(1);

      expect(API.get).toHaveBeenCalledWith("/favorites/user/1");
      expect(result).toEqual(mockFavorites);
      expect(result).toHaveLength(1);
    });

    it("should handle get user favorites error", async () => {
      const mockError = new Error("Failed to fetch favorites");
      (API.get as Mock).mockRejectedValue(mockError);

      await expect(
        favoritesService.getUserFavorites(1)
      ).rejects.toThrow("Failed to fetch favorites");
    });
  });

  describe("getUserProgramFavorites", () => {
    it("should get user program favorites", async () => {
      const mockPrograms = [
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Maestría en Datos",
          description: "Programa de datos",
          itemType: "PROGRAM" as const,
          programType: "MAESTRIA" as const,
          credits: 48,
          tags: "datos,análisis",
          modality: "HIBRIDO" as const,
          degreeTitle: "Magíster",
          imageUrl: "image.jpg",
          price: 20000000,
          duration: 4,
          durationUnit: "SEMESTERS" as const,
        },
      ];

      (API.get as Mock).mockResolvedValue({ data: mockPrograms });

      const result = await favoritesService.getUserProgramFavorites(1);

      expect(API.get).toHaveBeenCalledWith("/favorites/user/1/programs");
      expect(result).toEqual(mockPrograms);
    });

    it("should handle get program favorites error", async () => {
      const mockError = new Error("Failed to fetch program favorites");
      (API.get as Mock).mockRejectedValue(mockError);

      await expect(
        favoritesService.getUserProgramFavorites(1)
      ).rejects.toThrow("Failed to fetch program favorites");
    });
  });

  describe("getUserCourseFavorites", () => {
    it("should get user course favorites", async () => {
      const mockCourses = [
        {
          id: "456e4567-e89b-12d3-a456-426614174000",
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
      ];

      (API.get as Mock).mockResolvedValue({ data: mockCourses });

      const result = await favoritesService.getUserCourseFavorites(1);

      expect(API.get).toHaveBeenCalledWith("/favorites/user/1/courses");
      expect(result).toEqual(mockCourses);
    });

    it("should handle get course favorites error", async () => {
      const mockError = new Error("Failed to fetch course favorites");
      (API.get as Mock).mockRejectedValue(mockError);

      await expect(
        favoritesService.getUserCourseFavorites(1)
      ).rejects.toThrow("Failed to fetch course favorites");
    });
  });

  describe("checkFavorite", () => {
    it("should return true if item is favorite", async () => {
      (API.get as Mock).mockResolvedValue({ data: { isFavorite: true } });

      const result = await favoritesService.checkFavorite(
        1,
        "123e4567-e89b-12d3-a456-426614174000",
        "PROGRAM"
      );

      expect(API.get).toHaveBeenCalledWith("/favorites/check", {
        params: {
          userId: 1,
          itemId: "123e4567-e89b-12d3-a456-426614174000",
          itemType: "PROGRAM",
        },
      });
      expect(result).toBe(true);
    });

    it("should return false if item is not favorite", async () => {
      (API.get as Mock).mockResolvedValue({ data: { isFavorite: false } });

      const result = await favoritesService.checkFavorite(
        1,
        "123e4567-e89b-12d3-a456-426614174000",
        "COURSE"
      );

      expect(result).toBe(false);
    });

    it("should handle check favorite error", async () => {
      const mockError = new Error("Failed to check favorite");
      (API.get as Mock).mockRejectedValue(mockError);

      await expect(
        favoritesService.checkFavorite(
          1,
          "123e4567-e89b-12d3-a456-426614174000",
          "PROGRAM"
        )
      ).rejects.toThrow("Failed to check favorite");
    });
  });

  describe("countUserFavorites", () => {
    it("should return count of user favorites", async () => {
      (API.get as Mock).mockResolvedValue({
        data: { userId: 1, count: 5 },
      });

      const result = await favoritesService.countUserFavorites(1);

      expect(API.get).toHaveBeenCalledWith("/favorites/user/1/count");
      expect(result).toBe(5);
    });

    it("should handle count favorites error", async () => {
      const mockError = new Error("Failed to count favorites");
      (API.get as Mock).mockRejectedValue(mockError);

      await expect(
        favoritesService.countUserFavorites(1)
      ).rejects.toThrow("Failed to count favorites");
    });
  });
});
