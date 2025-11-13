import React, { createContext, useContext, ReactNode } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { SearchResult } from "../types/search.types";

interface FavoritesContextType {
  favorites: Set<string>;
  isLoading: boolean;
  error: string | null;
  toggleFavorite: (itemId: string, itemType: "PROGRAM" | "COURSE") => Promise<void>;
  isFavorite: (itemId: string) => boolean;
  getFavorites: () => Promise<void>;
  getUserFavoritesList: () => Promise<SearchResult[]>;
  clearError: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const favoritesData = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesData}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider"
    );
  }
  return context;
};
