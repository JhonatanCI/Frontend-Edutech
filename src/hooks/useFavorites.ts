// src/hooks/useFavorites.ts
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import * as favoritesService from "../services/favorites";
import { SearchResult } from "../types/search.types";

interface UseFavoritesReturn {
  favorites: Set<string>;
  isLoading: boolean;
  error: string | null;
  toggleFavorite: (itemId: string, itemType: "PROGRAM" | "COURSE") => Promise<void>;
  isFavorite: (itemId: string) => boolean;
  getFavorites: () => Promise<void>;
  getUserFavoritesList: () => Promise<SearchResult[]>;
  clearError: () => void;
}

export const useFavorites = (): UseFavoritesReturn => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUserFavorites = useCallback(async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const userFavorites = await favoritesService.getUserFavorites(Number(user.id));
      const favoriteIds = new Set(userFavorites.map((item) => item.id));
      setFavorites(favoriteIds);
      setError(null);
    } catch (err) {
      console.error("Error loading favorites:", err);
      setError("Error al cargar favoritos");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      loadUserFavorites();
    } else {
      setFavorites(new Set());
    }
  }, [isAuthenticated, user?.id, loadUserFavorites]);

  const toggleFavorite = useCallback(
    async (itemId: string, itemType: "PROGRAM" | "COURSE") => {
      if (!isAuthenticated || !user?.id) {
        setError("Debes iniciar sesión para guardar favoritos");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await favoritesService.toggleFavorite(
          Number(user.id),
          itemId,
          itemType
        );

        setFavorites((prev) => {
          const newFavorites = new Set(prev);
          if (response.isFavorite) {
            newFavorites.add(itemId);
          } else {
            newFavorites.delete(itemId);
          }
          return newFavorites;
        });

        console.log(response.message);
      } catch (err) {
        console.error("Error toggling favorite:", err);
        setError("Error al actualizar favorito");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, user?.id]
  );

  const isFavorite = useCallback(
    (itemId: string): boolean => {
      return favorites.has(itemId);
    },
    [favorites]
  );

  const getFavorites = useCallback(async () => {
    await loadUserFavorites();
  }, [loadUserFavorites]);

  const getUserFavoritesList = useCallback(async (): Promise<SearchResult[]> => {
    if (!user?.id) return [];

    try {
      setIsLoading(true);
      const userFavorites = await favoritesService.getUserFavorites(Number(user.id));
      setError(null);
      return userFavorites;
    } catch (err) {
      console.error("Error getting favorites list:", err);
      setError("Error al obtener lista de favoritos");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    favorites,
    isLoading,
    error,
    toggleFavorite,
    isFavorite,
    getFavorites,
    getUserFavoritesList,
    clearError,
  };
};
