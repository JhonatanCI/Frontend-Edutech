import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import NavBar from "../components/Commons/NavBar";
import SearchResultsHero from "../components/Search/SearchResultsHero";
import SearchResultsGrid from "../components/Search/SearchResultsGrid";
import PaginationControls from "../components/Search/PaginationControls";
import SearchFilters from "../components/Search/SearchFilters";
import { useSearch } from "../hooks/useSearch";

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const { results, isLoading, error, pagination, search, clearError } =
    useSearch();

  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "0");

  useEffect(() => {
    if (query) {
      search(query, page);
    }
  }, [query, page, search]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}&page=0`);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
    }
  };

  const handleFavorite = (id: string) => {
    // TODO: Implement favorite functionality
    console.log("Toggle favorite for:", id);
  };

  const handleLearnMore = (id: string) => {
    // TODO: Navigate to program/course detail page
    console.log("Learn more about:", id);
  };

  const handleRetry = () => {
    clearError();
    if (query) {
      search(query, page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="pt-20">
        <SearchResultsHero
          searchTerm={query}
          totalResults={pagination.totalElements}
          onSearch={handleSearch}
        />
      </div>

      <div className="flex min-h-screen">
        <div className="hidden lg:block w-80 sticky top-20 h-[calc(100vh-80px)] z-30">
          <SearchFilters />
        </div>

        <div className="lg:hidden fixed top-20 right-4 z-50">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-primaryBlue text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
              />
            </svg>
            Filtros
          </button>
        </div>

        {showFilters && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowFilters(false)}
            />
            <div className="absolute left-0 top-0 h-full w-80">
              <SearchFilters />
            </div>
          </div>
        )}

        <div className="flex-1 px-4 py-8">
          {error && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Error al cargar los resultados
                </h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={handleRetry}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                >
                  Intentar de nuevo
                </button>
              </div>
            </div>
          )}

          {!error && (
            <div className="max-w-7xl mx-auto">
              <SearchResultsGrid
                results={results}
                isLoading={isLoading}
                onFavorite={handleFavorite}
                onLearnMore={handleLearnMore}
              />
            </div>
          )}

          {!error && !isLoading && results.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <PaginationControls
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          )}
                
          {!error && !isLoading && results.length === 0 && query && (
            <div className="max-w-4xl mx-auto text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron resultados para "{query}"
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Intenta con otros términos de búsqueda o explora nuestras
                categorías populares.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {[
                  "Liderazgo",
                  "Marketing Digital",
                  "Análisis de Datos",
                  "Metodologías Ágiles",
                  "Python",
                  "Scrum",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSearch(tag)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primaryBlue hover:text-white transition-colors duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
