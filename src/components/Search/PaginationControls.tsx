import React from "react";
import { PaginationControlsProps } from "../../types/search.types";

const PaginationControls: React.FC<PaginationControlsProps> = ({
  pagination,
  onPageChange,
}) => {
  const { currentPage, totalPages, hasNext, hasPrevious, totalElements } =
    pagination;

  if (totalPages <= 1 || totalElements === 0) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(0, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);

      if (start > 0) {
        pages.push(0);
        if (start > 1) {
          pages.push(-1);
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        if (end < totalPages - 2) {
          pages.push(-1);
        }
        pages.push(totalPages - 1);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <div className="text-sm text-gray-600">
        Mostrando página {currentPage + 1} de {totalPages}
        {totalElements > 0 && (
          <span> ({totalElements} resultados en total)</span>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevious}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            hasPrevious
              ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
          }`}
          aria-label="Página anterior"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex items-center space-x-1">
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === -1 ? (
                <span className="px-3 py-2 text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    page === currentPage
                      ? "bg-primaryBlue text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                  aria-label={`Página ${page + 1}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page + 1}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            hasNext
              ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
          }`}
          aria-label="Página siguiente"
        >
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {totalPages > 5 && (
        <div className="flex items-center space-x-2 text-sm">
          <button
            onClick={() => onPageChange(0)}
            disabled={currentPage === 0}
            className={`px-2 py-1 rounded text-xs ${
              currentPage === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-primaryBlue"
            }`}
          >
            Primera
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => onPageChange(totalPages - 1)}
            disabled={currentPage === totalPages - 1}
            className={`px-2 py-1 rounded text-xs ${
              currentPage === totalPages - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-primaryBlue"
            }`}
          >
            Última
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginationControls;
