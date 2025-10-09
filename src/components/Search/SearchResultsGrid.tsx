import React from "react";
import ProgramCard from "./ProgramCard";
import { SearchResultsGridProps } from "../../types/search.types";

const SearchResultsGrid: React.FC<SearchResultsGridProps> = ({
  results,
  isLoading,
  onFavorite,
  onLearnMore,
}) => {
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="h-3 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-20"></div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((result) => (
        <ProgramCard
          key={result.id}
          result={result}
          onFavorite={onFavorite}
          onLearnMore={onLearnMore}
        />
      ))}
    </div>
  );
};

export default SearchResultsGrid;
