import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProgramCard from "../Search/ProgramCard";
import { useFavorites } from "../../hooks/useFavorites";
import { SearchResult } from "../../types/search.types";
import { RootState } from "../../redux/store";
import { getUserFavorites } from "../../services/favorites";

const FavoritesSection: React.FC = () => {
  const navigate = useNavigate();
  const { favorites: favoritesSet, isLoading } = useFavorites();
  const [favorites, setFavorites] = useState<SearchResult[]>([]);
  const [filter, setFilter] = useState<"ALL" | "PROGRAM" | "COURSE">("ALL");
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const loadFavorites = async () => {
      if (user?.id) {
        try {
          const favoritesList = await getUserFavorites(Number(user.id));
          setFavorites(favoritesList);
        } catch (error) {
          console.error("Error loading favorites:", error);
          setFavorites([]);
        }
      }
    };

    loadFavorites();
  }, [favoritesSet, user?.id]);

  const handleLearnMore = (itemType: string, name: string) => {
    if (itemType === "COURSE") {
      navigate(`/course/${encodeURIComponent(name)}`);
    } else if (itemType === "PROGRAM") {
      navigate(`/program/${encodeURIComponent(name)}`);
    }
  };

  const filteredFavorites = favorites.filter((item) => {
    if (filter === "ALL") return true;
    return item.itemType === filter;
  });

  const programCount = favorites.filter(
    (item) => item.itemType === "PROGRAM"
  ).length;
  const courseCount = favorites.filter(
    (item) => item.itemType === "COURSE"
  ).length;

  return (
    <>
      {/* Filters */}
      {favorites.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("ALL")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                filter === "ALL"
                  ? "bg-[#5454E9] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Todos ({favorites.length})
            </button>
            <button
              onClick={() => setFilter("PROGRAM")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                filter === "PROGRAM"
                  ? "bg-[#5454E9] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Programas ({programCount})
            </button>
            <button
              onClick={() => setFilter("COURSE")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                filter === "COURSE"
                  ? "bg-[#5454E9] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Cursos ({courseCount})
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5454E9] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando favoritos...</p>
        </div>
      ) : filteredFavorites.length === 0 ? (
        /* Empty State */
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {filter === "ALL"
              ? "No tienes favoritos guardados"
              : filter === "PROGRAM"
                ? "No tienes programas favoritos"
                : "No tienes cursos favoritos"}
          </h3>
          <p className="text-gray-600 mb-6">
            Explora nuestro catálogo y guarda tus favoritos
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#5454E9] text-white px-6 py-3 rounded-lg hover:bg-[#3d3db5] transition-colors duration-200 font-medium"
          >
            Explorar catálogo
          </button>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((result) => (
            <ProgramCard
              key={result.id}
              result={result}
              onLearnMore={handleLearnMore}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FavoritesSection;
