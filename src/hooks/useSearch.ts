import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setSearchTerm,
  setResults,
  setPagination,
  setLoading,
  setError,
  clearError,
  addRecentSearch,
} from "../redux/searchSlice";
import { API } from "../config/axios";
import { SearchResponse, UseSearchReturn } from "../types/search.types";

export const useSearch = (): UseSearchReturn => {
  const dispatch = useDispatch();
  const { results, isLoading, error, pagination, currentSearch } = useSelector(
    (state: RootState) => state.search,
  );

  const search = useCallback(
    async (term: string, page: number = 0) => {
      if (!term.trim()) return;

      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        dispatch(setSearchTerm(term));

        const response = await API.get<SearchResponse>("/SearchAll", {
          params: {
            term: term.trim(),
            page,
            size: 6,
          },
        });

        const data = response.data;

        const paginationInfo = {
          currentPage: data.pagination.currentPage,
          pageSize: 6,
          totalPages: data.pagination.totalPages,
          totalElements: data.pagination.totalElements,
          hasNext: data.pagination.hasNext,
          hasPrevious: data.pagination.hasPrevious,
        };

        dispatch(setResults(data.results));
        dispatch(setPagination(paginationInfo));
        dispatch(addRecentSearch(term));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al realizar la búsqueda";
        dispatch(setError(errorMessage));
        console.error("Search error:", err);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch],
  );

  const clearErrorHandler = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    results,
    isLoading,
    error,
    pagination,
    searchTerm: currentSearch,
    search,
    clearError: clearErrorHandler,
  };
};
