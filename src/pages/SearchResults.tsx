import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import NavBar from "../components/Commons/NavBar";
import SearchResultsHero from "../components/Search/SearchResultsHero";
import SearchResultsGrid from "../components/Search/SearchResultsGrid";
import PaginationControls from "../components/Search/PaginationControls";
import SearchFilters from "../components/Search/SearchFilters";
import PopularTags from "../components/Home/PopularTags";
import { useSearch } from "../hooks/useSearch";
import { FilterState } from "../types/search.types";

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { results, isLoading, error, pagination, search } =
    useSearch();

  const [filters, setFilters] = useState<FilterState>({
    contentType: ["Todo"],
    academicLevel: [],
    modality: [],
    priceRange: [0, 50000000],
    durationRange: [1, 10],
    durationHoursRange: [1, 100], 
  });

  const query = searchParams.get("q") || "";

  const pageParam = searchParams.get("page");
  const parsedPage = parseInt(pageParam || "0");
  const page = isNaN(parsedPage) ? 0 : parsedPage;

  useEffect(() => {
    if (query) {
      search(query, page, filters);
    }
  }, [query, page, search, filters]);

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

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    handlePageChange(0);
  };

  const handleLearnMore = (itemType: string, name: string) => {
    if (itemType === "COURSE") {
      navigate(`/course/${encodeURIComponent(name)}`);
    } else if (itemType === "PROGRAM") {
      navigate(`/program/${encodeURIComponent(name)}`);
    }
  };

  const clearFilters = () => {
    const resetFilters: FilterState = {
      contentType: ["Todo"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
      durationHoursRange: [1, 100],
    };
    setFilters(resetFilters);
  };

  const removeFilter = (filterType: keyof FilterState, value: string) => {
    const newFilters = { ...filters };
    if (Array.isArray(newFilters[filterType])) {
      (newFilters[filterType] as string[]) = (
        newFilters[filterType] as string[]
      ).filter((item) => item !== value);
    }
    setFilters(newFilters);
  };

  const getActiveFilters = () => {
    const active: { type: keyof FilterState; value: string }[] = [];
    if (
      filters.contentType.length > 0 &&
      !filters.contentType.includes("Todo")
    ) {
      filters.contentType.forEach((value) =>
        active.push({ type: "contentType", value }),
      );
    }
    filters.academicLevel.forEach((value) =>
      active.push({ type: "academicLevel", value }),
    );
    filters.modality.forEach((value) =>
      active.push({ type: "modality", value }),
    );
    return active;
  };

  const activeFilters = getActiveFilters();

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
          <SearchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Mobile filters button and modal */}

        <div className="flex-1 px-4 py-8">
          {activeFilters.length > 0 && (
            <div className="max-w-7xl mx-auto mb-4 flex items-center flex-wrap gap-2">
              {activeFilters.map(({ type, value }) => (
                <div
                  key={`${type}-${value}`}
                  className="flex items-center bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full"
                >
                  <span>{value}</span>
                  <button
                    onClick={() => removeFilter(type, value)}
                    className="ml-2 text-gray-500 hover:text-gray-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                onClick={clearFilters}
                className="text-sm text-primaryBlue hover:underline"
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}

          {error && (
            <div className="max-w-4xl mx-auto mb-8">{/* Error UI */}</div>
          )}

          {!error && (
            <div className="max-w-7xl mx-auto">
              <SearchResultsGrid
                results={results}
                isLoading={isLoading}
                onLearnMore={handleLearnMore}
              />
            </div>
          )}

          {!error &&
            !isLoading &&
            results.length === 0 &&
            activeFilters.length > 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron resultados con los filtros aplicados
              </h3>
              <button
                onClick={clearFilters}
                className="mt-4 bg-primaryBlue text-white px-4 py-2 rounded-md hover:bg-primaryBlue-dark transition-colors duration-200"
              >
                  Limpiar todos los filtros
              </button>
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

          {!error &&
            !isLoading &&
            results.length === 0 &&
            query &&
            activeFilters.length === 0 && (
            <div className="max-w-4xl mx-auto text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron resultados para "{query}"</h3>
              <p className="text-gray-600 mb-6">Intenta con otra palabra clave o elige una de las búsquedas populares:</p>

              <div className="flex justify-center">
                <div className="w-full sm:w-3/4 lg:w-1/2">
                  <PopularTags />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;