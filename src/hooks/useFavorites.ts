// src/hooks/useFavorites.ts
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  toggleFavorite as toggleFavoriteAPI,
  getUserFavorites,
} from "../services/favorites";
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
  showFirstFavoriteNotification: boolean;
  clearNotification: () => void;
}

export const useFavorites = (): UseFavoritesReturn => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFirstFavoriteNotification, setShowFirstFavoriteNotification] = useState(false);

  const getFavorites = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const favoritesList = await getUserFavorites(Number(user.id));
      const favoriteIds = new Set(favoritesList.map((fav) => fav.id));
      setFavorites(favoriteIds);
    } catch (err) {
      setError("Error al cargar favoritos");
      console.error("Error fetching favorites:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const getUserFavoritesList = useCallback(async (): Promise<SearchResult[]> => {
    if (!user?.id) return [];

    try {
      const favoritesList = await getUserFavorites(Number(user.id));
      return favoritesList;
    } catch (err) {
      console.error("Error fetching favorites list:", err);
      return [];
    }
  }, [user?.id]);

  const toggleFavorite = useCallback(
    async (itemId: string, itemType: "PROGRAM" | "COURSE") => {
      if (!user?.id) {
        setError("Debes iniciar sesión para agregar favoritos");
        return;
      }

      setError(null);
      const wasEmpty = favorites.size === 0;
      const wasFavorite = favorites.has(itemId);

      // Optimistic update
      const newFavorites = new Set(favorites);
      if (wasFavorite) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      setFavorites(newFavorites);

      try {
        const response = await toggleFavoriteAPI(
          Number(user.id),
          itemId,
          itemType
        );

        // Si es el primer favorito que se agrega, mostrar notificación
        if (wasEmpty && response.isFavorite) {
          setShowFirstFavoriteNotification(true);
        }

        // Sync with server response
        if (response.isFavorite) {
          newFavorites.add(itemId);
        } else {
          newFavorites.delete(itemId);
        }
        setFavorites(new Set(newFavorites));
      } catch (err) {
        // Rollback on error
        setFavorites(favorites);
        setError("Error al actualizar favorito");
        console.error("Error toggling favorite:", err);
      }
    },
    [user?.id, favorites]
  );

  const isFavorite = useCallback(
    (itemId: string): boolean => {
      return favorites.has(itemId);
    },
    [favorites]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearNotification = useCallback(() => {
    setShowFirstFavoriteNotification(false);
  }, []);

  useEffect(() => {
    if (user?.id) {
      getFavorites();
    }
  }, [user?.id, getFavorites]);

  return {
    favorites,
    isLoading,
    error,
    toggleFavorite,
    isFavorite,
    getFavorites,
    getUserFavoritesList,
    clearError,
    showFirstFavoriteNotification,
    clearNotification,
  };
};