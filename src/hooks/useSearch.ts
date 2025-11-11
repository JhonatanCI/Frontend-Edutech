import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setSearchTerm,
  setResults,
  setAllResults,
  setPagination,
  setLoading,
  setError,
  clearError,
  addRecentSearch,
} from "../redux/searchSlice";
import { API } from "../config/axios";
import {
  SearchResponse,
  UseSearchReturn,
  FilterState,
  SearchResult,
} from "../types/search.types";

export const useSearch = (): UseSearchReturn => {
  const dispatch = useDispatch();
  const {
    results,
    allResults,
    isLoading,
    error,
    pagination,
    currentSearch,
  } = useSelector((state: RootState) => state.search);

  const applyFiltersAndPaginate = useCallback(
    (
      resultsToFilter: SearchResult[],
      filters: FilterState,
      page: number = 0,
    ) => {
      const filtered = resultsToFilter.filter((result) => {
        const {
          contentType,
          academicLevel,
          modality,
          priceRange,
          durationRange,
          durationHoursRange,
        } = filters;

      
        if (
          contentType.length > 0 &&
          !contentType.includes("Todo") &&
          !contentType.some(
            (ct) =>
              (ct === "Programas" && result.itemType === "PROGRAM") ||
              (ct === "Cursos" && result.itemType === "COURSE"),
          )
        ) {
          return false;
        }

       
        if (
          academicLevel.length > 0 &&
          !academicLevel.some(
            (al) =>
              result.programType?.toLowerCase().replace("í", "i") ===
              al.toLowerCase().replace("í", "i"),
          )
        ) {
          return false;
        }

       
        if (
          modality.length > 0 &&
          !modality.some(
            (m) =>
              result.modality.toLowerCase().replace("í", "i") ===
              m.toLowerCase().replace("í", "i"),
          )
        ) {
          return false;
        }

      
        if (
          priceRange[0] !== priceRange[1] &&
          (result.price < priceRange[0] || result.price > priceRange[1])
        ) {
          return false;
        }


        if (result.durationUnit === "SEMESTERS") {
        
          if (
            (contentType.includes("Todo") || contentType.includes("Programas")) &&
            result.itemType === "PROGRAM"
          ) {
            if (
              result.duration < durationRange[0] ||
              result.duration > durationRange[1]
            ) {
              return false;
            }
          }
        }

      
        if (result.durationUnit === "HOURS") {
      
          if (
            (contentType.includes("Todo") || contentType.includes("Cursos")) &&
            result.itemType === "COURSE"
          ) {
            if (
              result.duration < durationHoursRange[0] ||
              result.duration > durationHoursRange[1]
            ) {
              return false;
            }
          }
        }

        return true;
      });

      const pageSize = 6;
      const totalElements = filtered.length;
      const totalPages = Math.ceil(totalElements / pageSize);
      const paginatedResults = filtered.slice(
        page * pageSize,
        (page + 1) * pageSize,
      );

      dispatch(setResults(paginatedResults));
      dispatch(
        setPagination({
          currentPage: page,
          pageSize,
          totalPages,
          totalElements,
          hasNext: page < totalPages - 1,
          hasPrevious: page > 0,
        }),
      );
    },
    [dispatch],
  );

  const search = useCallback(
    async (term: string, page: number = 0, filters?: FilterState) => {
      if (!term.trim()) return;

      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        dispatch(setSearchTerm(term));

        const response = await API.get<SearchResponse>("/SearchAll", {
          params: {
            term: term.trim(),
            page: 0,
            size: 1000,
          },
        });

        const data = response.data;
        dispatch(setAllResults(data.results));

        if (filters) {
          applyFiltersAndPaginate(data.results, filters, page);
        } else {
          const pageSize = 6;
          const totalElements = data.results.length;
          const totalPages = Math.ceil(totalElements / pageSize);
          const paginatedResults = data.results.slice(
            page * pageSize,
            (page + 1) * pageSize,
          );
          dispatch(setResults(paginatedResults));
          dispatch(
            setPagination({
              currentPage: page,
              pageSize,
              totalPages,
              totalElements,
              hasNext: page < totalPages - 1,
              hasPrevious: page > 0,
            }),
          );
        }

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
    [dispatch, applyFiltersAndPaginate],
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