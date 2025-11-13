import { API } from "../config/axios";
import { SearchResult } from "../types/search.types";

export interface FavoriteDTO {
  id: string;
  userId: number;
  itemId: string;
  itemType: "PROGRAM" | "COURSE";
  createdAt: string;
}

interface FavoriteResponse {
  success: boolean;
  message: string;
  data?: FavoriteDTO;
}

interface ToggleFavoriteResponse {
  success: boolean;
  isFavorite: boolean;
  message: string;
}

interface CheckFavoriteResponse {
  isFavorite: boolean;
}

interface CountFavoritesResponse {
  userId: number;
  count: number;
}

/**
 * Add a program or course to favorites
 */
export const addFavorite = async (
  userId: number,
  itemId: string,
  itemType: "PROGRAM" | "COURSE"
): Promise<FavoriteResponse> => {
  try {
    const response = await API.post<FavoriteResponse>("/favorites", null, {
      params: { userId, itemId, itemType },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

/**
 * Remove a program or course from favorites
 */
export const removeFavorite = async (
  userId: number,
  itemId: string,
  itemType: "PROGRAM" | "COURSE"
): Promise<FavoriteResponse> => {
  try {
    const response = await API.delete<FavoriteResponse>("/favorites", {
      params: { userId, itemId, itemType },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

/**
 * Toggle favorite - adds if not existing, removes if existing
 */
export const toggleFavorite = async (
  userId: number,
  itemId: string,
  itemType: "PROGRAM" | "COURSE"
): Promise<ToggleFavoriteResponse> => {
  try {
    const response = await API.post<ToggleFavoriteResponse>(
      "/favorites/toggle",
      null,
      {
        params: { userId, itemId, itemType },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error toggling favorite:", error);
    throw error;
  }
};

/**
 * Get all favorites of a user
 */
export const getUserFavorites = async (
  userId: number
): Promise<SearchResult[]> => {
  try {
    const response = await API.get<SearchResult[]>(`/favorites/user/${userId}`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error getting user favorites:", error);
    throw error;
  }
};

/**
 * Get only favorite programs of a user
 */
export const getUserProgramFavorites = async (
  userId: number
): Promise<SearchResult[]> => {
  try {
    const response = await API.get<SearchResult[]>(
      `/favorites/user/${userId}/programs`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error getting program favorites:", error);
    throw error;
  }
};

/**
 * Get only favorite courses of a user
 */
export const getUserCourseFavorites = async (
  userId: number
): Promise<SearchResult[]> => {
  try {
    const response = await API.get<SearchResult[]>(
      `/favorites/user/${userId}/courses`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error getting course favorites:", error);
    throw error;
  }
};

/**
 * Check if an item is in favorites
 */
export const checkFavorite = async (
  userId: number,
  itemId: string,
  itemType: "PROGRAM" | "COURSE"
): Promise<boolean> => {
  try {
    const response = await API.get<CheckFavoriteResponse>("/favorites/check", {
      params: { userId, itemId, itemType },
    });
    return response.data.isFavorite;
  } catch (error: unknown) {
    console.error("Error checking favorite:", error);
    throw error;
  }
};

/**
 * Count a user's total favorites
 */
export const countUserFavorites = async (
  userId: number
): Promise<number> => {
  try {
    const response = await API.get<CountFavoritesResponse>(
      `/favorites/user/${userId}/count`
    );
    return response.data.count;
  } catch (error: unknown) {
    console.error("Error counting favorites:", error);
    throw error;
  }
};
