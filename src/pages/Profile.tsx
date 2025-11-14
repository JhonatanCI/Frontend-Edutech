import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../components/Commons/NavBar";
import FavoritesSection from "../components/Profile/FavoritesSection";
import { useFavorites } from "../hooks/useFavorites";
import { RootState } from "../redux/store";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { getUserFavoritesList } = useFavorites();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"favorites" | "achievements">("favorites");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const loadFavoritesCount = async () => {
      const favoritesList = await getUserFavoritesList();
      setFavoritesCount(favoritesList.length);
    };
    
    loadFavoritesCount();
  }, [isAuthenticated, navigate, getUserFavoritesList]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="pt-20">
        {/* Header Section con gradiente */}
        <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-6">
              {/* Avatar grande */}
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-[#5454E9] to-[#3d3db5] rounded-full flex items-center justify-center text-4xl font-bold ring-4 ring-white/20 shadow-xl">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-[#1a1a2e]"></div>
              </div>

              {/* Información del usuario */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-1">{user.username}</h1>
                <p className="text-gray-300 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {user.email}
                </p>
              </div>

              {/* Estadísticas */}
              <div className="hidden md:flex gap-8">
                <div className="text-center px-6 border-l border-white/20">
                  <div className="text-3xl font-bold text-[#5454E9]">
                    {favoritesCount}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Programas favoritos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="border-b border-gray-200 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("favorites")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "favorites"
                    ? "border-[#5454E9] text-[#5454E9]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={activeTab === "favorites" ? "currentColor" : "none"}
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
                Favoritos
              </button>
              <button
                onClick={() => setActiveTab("achievements")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "achievements"
                    ? "border-[#5454E9] text-[#5454E9]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                Tus logros
              </button>
            </div>
          </div>
        </div>

        {/* Contenido según tab activo */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === "favorites" ? (
            <FavoritesSection />
          ) : (
            /* Tus logros - Por implementar */
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-[#5454E9]/10 to-[#3d3db5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-[#5454E9]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Tus logros
                </h3>
                <p className="text-gray-600">
                  Aquí podrás ver tus certificados, cursos completados y logros.
                  <br />
                  Esta funcionalidad estará disponible próximamente.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;