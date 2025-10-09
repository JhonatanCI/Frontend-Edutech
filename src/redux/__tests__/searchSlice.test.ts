import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import searchReducer, {
  setSearchTerm,
  setResults,
  setPagination,
  setLoading,
  setError,
  clearError,
  addRecentSearch,
  clearResults,
  initializeRecentSearches,
} from "../../redux/searchSlice";
import { SearchResult, PaginationInfo } from "../../types/search.types";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const mockSearchResult: SearchResult = {
  id: "1",
  name: "Test Course",
  description: "Test Description",
  itemType: "COURSE",
  programType: null,
  credits: 3,
  tags: "React,JavaScript",
  modality: "VIRTUAL",
  degreeTitle: null,
  imageUrl: "test.jpg",
  price: 100000,
  duration: 40,
  durationUnit: "HOURS",
};

const mockPagination: PaginationInfo = {
  currentPage: 0,
  pageSize: 6,
  totalPages: 2,
  totalElements: 10,
  hasNext: true,
  hasPrevious: false,
};

describe("searchSlice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue("[]");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should handle setSearchTerm", () => {
    const initialState = searchReducer(undefined, { type: "unknown" });
    const action = setSearchTerm("test search");
    const newState = searchReducer(initialState, action);

    expect(newState.currentSearch).toBe("test search");
  });

  it("should handle setResults", () => {
    const initialState = searchReducer(undefined, { type: "unknown" });
    const action = setResults([mockSearchResult]);
    const newState = searchReducer(initialState, action);

    expect(newState.results).toEqual([mockSearchResult]);
  });

  it("should handle setPagination", () => {
    const initialState = searchReducer(undefined, { type: "unknown" });
    const action = setPagination(mockPagination);
    const newState = searchReducer(initialState, action);

    expect(newState.pagination).toEqual(mockPagination);
  });

  it("should handle setLoading", () => {
    const initialState = searchReducer(undefined, { type: "unknown" });
    const action = setLoading(true);
    const newState = searchReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
  });

  it("should handle setError", () => {
    const initialState = searchReducer(undefined, { type: "unknown" });
    const action = setError("Test error");
    const newState = searchReducer(initialState, action);

    expect(newState.error).toBe("Test error");
  });

  it("should handle setError with null", () => {
    const initialState = searchReducer(undefined, { type: "unknown" });
    const action = setError(null);
    const newState = searchReducer(initialState, action);

    expect(newState.error).toBeNull();
  });

  it("should handle clearError", () => {
    const initialState = {
      ...searchReducer(undefined, { type: "unknown" }),
      error: "Previous error",
    };
    const action = clearError();
    const newState = searchReducer(initialState, action);

    expect(newState.error).toBeNull();
  });

  it("should handle addRecentSearch", () => {
    const initialState = searchReducer(undefined, { type: "unknown" });
    const action = addRecentSearch("new search");
    const newState = searchReducer(initialState, action);

    expect(newState.recentSearches).toEqual(["new search"]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "recentSearches",
      JSON.stringify(["new search"]),
    );
  });

  it("should not add duplicate recent searches", () => {
    const initialState = {
      ...searchReducer(undefined, { type: "unknown" }),
      recentSearches: ["existing search"],
    };
    const action = addRecentSearch("existing search");
    const newState = searchReducer(initialState, action);

    expect(newState.recentSearches).toEqual(["existing search"]);
  });

  it("should not add empty recent searches", () => {
    const initialState = searchReducer(undefined, { type: "unknown" });
    const action = addRecentSearch("");
    const newState = searchReducer(initialState, action);

    expect(newState.recentSearches).toEqual([]);
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it("should not add whitespace-only recent searches", () => {
    const initialState = searchReducer(undefined, { type: "unknown" });
    const action = addRecentSearch("   ");
    const newState = searchReducer(initialState, action);

    expect(newState.recentSearches).toEqual([]);
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it("should trim recent search terms", () => {
    const initialState = searchReducer(undefined, { type: "unknown" });
    const action = addRecentSearch("  trimmed search  ");
    const newState = searchReducer(initialState, action);

    expect(newState.recentSearches).toEqual(["trimmed search"]);
  });

  it("should limit recent searches to 5 items", () => {
    const initialState = {
      ...searchReducer(undefined, { type: "unknown" }),
      recentSearches: ["search1", "search2", "search3", "search4", "search5"],
    };
    const action = addRecentSearch("new search");
    const newState = searchReducer(initialState, action);

    expect(newState.recentSearches).toEqual([
      "new search",
      "search1",
      "search2",
      "search3",
      "search4",
    ]);
    expect(newState.recentSearches).toHaveLength(5);
  });

  it("should handle clearResults", () => {
    const initialState = {
      ...searchReducer(undefined, { type: "unknown" }),
      results: [mockSearchResult],
      pagination: mockPagination,
      currentSearch: "test search",
    };
    const action = clearResults();
    const newState = searchReducer(initialState, action);

    expect(newState.results).toEqual([]);
    expect(newState.currentSearch).toBe("");
    expect(newState.pagination).toEqual({
      currentPage: 0,
      pageSize: 6,
      totalPages: 0,
      totalElements: 0,
      hasNext: false,
      hasPrevious: false,
    });
  });

  it("should handle initializeRecentSearches", () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify(["search1", "search2"]),
    );

    const initialState = searchReducer(undefined, { type: "unknown" });
    const action = initializeRecentSearches();
    const newState = searchReducer(initialState, action);

    expect(newState.recentSearches).toEqual(["search1", "search2"]);
  });

  it("should handle initializeRecentSearches with empty localStorage", () => {
    localStorageMock.getItem.mockReturnValue(null);

    const initialState = searchReducer(undefined, { type: "unknown" });
    const action = initializeRecentSearches();
    const newState = searchReducer(initialState, action);

    expect(newState.recentSearches).toEqual([]);
  });

  it("should maintain immutability", () => {
    const initialState = searchReducer(undefined, { type: "unknown" });
    const action = setSearchTerm("test search");
    const newState = searchReducer(initialState, action);

    expect(initialState).not.toBe(newState);
    expect(initialState.currentSearch).toBe("");
    expect(newState.currentSearch).toBe("test search");
  });

  it("should handle multiple actions in sequence", () => {
    let state = searchReducer(undefined, { type: "unknown" });

    state = searchReducer(state, setSearchTerm("test search"));
    state = searchReducer(state, setLoading(true));
    state = searchReducer(state, setResults([mockSearchResult]));
    state = searchReducer(state, setPagination(mockPagination));
    state = searchReducer(state, setLoading(false));
    state = searchReducer(state, addRecentSearch("test search"));

    expect(state.currentSearch).toBe("test search");
    expect(state.isLoading).toBe(false);
    expect(state.results).toEqual([mockSearchResult]);
    expect(state.pagination).toEqual(mockPagination);
    expect(state.recentSearches).toEqual(["test search"]);
  });

  it("should handle error state correctly", () => {
    let state = searchReducer(undefined, { type: "unknown" });

    state = searchReducer(state, setError("Network error"));
    expect(state.error).toBe("Network error");

    state = searchReducer(state, clearError());
    expect(state.error).toBeNull();

    state = searchReducer(state, setError("Another error"));
    expect(state.error).toBe("Another error");
  });
});
