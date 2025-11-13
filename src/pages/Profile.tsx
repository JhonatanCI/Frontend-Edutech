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
  const [activeTab, setActiveTab] = useState<"favorites" | "history">("favorites");

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
        <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[#5454E9] to-[#3d3db5] rounded-full flex items-center justify-center text-3xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-1">{user.username}</h1>
              </div>

              <div className="hidden md:flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{favoritesCount}</div>
                  <div className="text-xs text-gray-400">Favoritos</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("favorites")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "favorites"
                    ? "border-[#5454E9] text-[#5454E9]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Favoritos
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "history"
                    ? "border-[#5454E9] text-[#5454E9]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Historial de búsqueda
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === "favorites" ? (
            <FavoritesSection />
          ) : (
            /* Historial de búsqueda - Por implementar */
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Historial de búsqueda
              </h3>
              <p className="text-gray-600">
                Esta funcionalidad estará disponible próximamente
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
