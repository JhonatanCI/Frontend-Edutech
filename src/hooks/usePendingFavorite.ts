import { useCallback } from "react";

interface PendingFavorite {
  itemId: string;
  itemType: "PROGRAM" | "COURSE";
  itemName: string;
  timestamp: number;
}

const PENDING_FAVORITE_KEY = "pendingFavorite";

export const usePendingFavorite = () => {
  const savePendingFavorite = useCallback((itemId: string, itemType: "PROGRAM" | "COURSE", itemName: string) => {
    const pendingFavorite: PendingFavorite = {
      itemId,
      itemType,
      itemName,
      timestamp: Date.now(),
    };
    localStorage.setItem(PENDING_FAVORITE_KEY, JSON.stringify(pendingFavorite));
  }, []);

  const getPendingFavorite = useCallback((): PendingFavorite | null => {
    try {
      const stored = localStorage.getItem(PENDING_FAVORITE_KEY);
      if (!stored) return null;

      const pendingFavorite: PendingFavorite = JSON.parse(stored);
      
      // Verificar que el favorito pendiente no sea muy antiguo (24 horas)
      const MAX_AGE = 24 * 60 * 60 * 1000;
      if (Date.now() - pendingFavorite.timestamp > MAX_AGE) {
        localStorage.removeItem(PENDING_FAVORITE_KEY);
        return null;
      }

      return pendingFavorite;
    } catch (error) {
      console.error("Error al obtener favorito pendiente:", error);
      localStorage.removeItem(PENDING_FAVORITE_KEY);
      return null;
    }
  }, []);

  const clearPendingFavorite = useCallback(() => {
    localStorage.removeItem(PENDING_FAVORITE_KEY);
  }, []);

  const hasPendingFavorite = useCallback((): boolean => {
    const stored = localStorage.getItem(PENDING_FAVORITE_KEY);
    if (!stored) return false;

    try {
      const pendingFavorite: PendingFavorite = JSON.parse(stored);
      const MAX_AGE = 24 * 60 * 60 * 1000;
      if (Date.now() - pendingFavorite.timestamp > MAX_AGE) {
        localStorage.removeItem(PENDING_FAVORITE_KEY);
        return false;
      }
      return true;
    } catch {
      localStorage.removeItem(PENDING_FAVORITE_KEY);
      return false;
    }
  }, []);

  return {
    savePendingFavorite,
    getPendingFavorite,
    clearPendingFavorite,
    hasPendingFavorite,
  };
};
