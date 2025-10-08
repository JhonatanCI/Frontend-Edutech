import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SearchState,
  SearchResult,
  PaginationInfo,
} from "../types/search.types";

const initialState: SearchState = {
  currentSearch: "",
  results: [],
  pagination: {
    currentPage: 0,
    pageSize: 6,
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
    hasPrevious: false,
  },
  isLoading: false,
  error: null,
  recentSearches: JSON.parse(localStorage.getItem("recentSearches") || "[]"),
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.currentSearch = action.payload;
    },
    setResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
    },
    setPagination: (state, action: PayloadAction<PaginationInfo>) => {
      state.pagination = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.trim();
      if (searchTerm && !state.recentSearches.includes(searchTerm)) {
        state.recentSearches.unshift(searchTerm);
        // Keep only the last 5 searches
        state.recentSearches = state.recentSearches.slice(0, 5);
        localStorage.setItem(
          "recentSearches",
          JSON.stringify(state.recentSearches),
        );
      }
    },
    clearResults: (state) => {
      state.results = [];
      state.pagination = initialState.pagination;
      state.currentSearch = "";
    },
    initializeRecentSearches: (state) => {
      state.recentSearches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]",
      );
    },
  },
});

export const {
  setSearchTerm,
  setResults,
  setPagination,
  setLoading,
  setError,
  clearError,
  addRecentSearch,
  clearResults,
  initializeRecentSearches,
} = searchSlice.actions;

export default searchSlice.reducer;
