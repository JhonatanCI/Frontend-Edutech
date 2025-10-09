import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchResults from "../../pages/SearchResults";
import searchReducer from "../../redux/searchSlice";

// Crear mocks de funciones
const mockSearch = vi.fn();
const mockClearError = vi.fn();
const mockNavigate = vi.fn();

// Mock de react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock del hook useSearch - Importante: definir antes de los imports
let mockSearchState = {
  results: [],
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 0,
    pageSize: 6,
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
    hasPrevious: false,
  },
  search: mockSearch,
  clearError: mockClearError,
  searchTerm: "",
};

vi.mock("../../hooks/useSearch", () => ({
  useSearch: () => mockSearchState,
}));

// Mock de componentes
vi.mock("../../components/Commons/NavBar", () => ({
  default: () => <div data-testid="navbar">NavBar</div>,
}));

vi.mock("../../components/Search/SearchResultsHero", () => ({
  default: ({ searchTerm, totalResults, onSearch }: any) => (
    <div data-testid="search-results-hero">
      <span data-testid="search-term">{searchTerm}</span>
      <span data-testid="total-results">{totalResults}</span>
      <button data-testid="hero-search-button" onClick={() => onSearch("test")}>
        Search
      </button>
    </div>
  ),
}));

vi.mock("../../components/Search/SearchResultsGrid", () => ({
  default: ({ results, isLoading, onFavorite, onLearnMore }: any) => (
    <div data-testid="search-results-grid">
      <span data-testid="results-count">{results.length}</span>
      <span data-testid="loading-state">{isLoading.toString()}</span>
      {results.map((result: any) => (
        <div key={result.id} data-testid={`result-${result.id}`}>
          <button
            data-testid="favorite-button"
            onClick={() => onFavorite(result.id)}
          >
            Favorite
          </button>
          <button
            data-testid="learn-more-button"
            onClick={() => onLearnMore(result.id, result.itemType, result.name)}
          >
            Learn More
          </button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../components/Search/PaginationControls", () => ({
  default: ({ pagination, onPageChange }: any) => (
    <div data-testid="pagination-controls">
      {pagination.totalPages > 0 && (
        <>
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i}
              data-testid={`page-${i}`}
              onClick={() => onPageChange(i)}
            >
              {i + 1}
            </button>
          ))}
        </>
      )}
    </div>
  ),
}));

vi.mock("../../components/Search/SearchFilters", () => ({
  default: () => <div data-testid="search-filters">Filters</div>,
}));

// Helper para renderizar con router y store
const renderWithProviders = (initialRoute = "/search?q=&page=0") => {
  const store = configureStore({
    reducer: {
      search: searchReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe("SearchResults", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Reset mock state to default
    mockSearchState.results = [];
    mockSearchState.isLoading = false;
    mockSearchState.error = null;
    mockSearchState.pagination = {
      currentPage: 0,
      pageSize: 6,
      totalPages: 0,
      totalElements: 0,
      hasNext: false,
      hasPrevious: false,
    };
    mockSearchState.search = mockSearch;
    mockSearchState.clearError = mockClearError;
    mockSearchState.searchTerm = "";
  });

  it("renders search results page correctly", () => {
    renderWithProviders();

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("search-results-hero")).toBeInTheDocument();
    expect(screen.getByTestId("search-results-grid")).toBeInTheDocument();
    expect(screen.getByTestId("search-filters")).toBeInTheDocument();
  });

  it("handles search from hero section", () => {
    renderWithProviders();

    const searchButton = screen.getByTestId("hero-search-button");
    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith("/search?q=test&page=0");
  });

  it("handles favorite action", async () => {
    mockSearchState.results = [
      {
        id: "1",
        name: "Test Course",
        itemType: "COURSE",
      },
    ];

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByTestId("favorite-button")).toBeInTheDocument();
    });

    const favoriteButton = screen.getByTestId("favorite-button");
    fireEvent.click(favoriteButton);
    // Console.log is expected, no assertion needed
  });

  it("handles learn more action for course", async () => {
    mockSearchState.results = [
      {
        id: "1",
        name: "Test Course",
        itemType: "COURSE",
      },
    ];

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByTestId("learn-more-button")).toBeInTheDocument();
    });

    const learnMoreButton = screen.getByTestId("learn-more-button");
    fireEvent.click(learnMoreButton);

    expect(mockNavigate).toHaveBeenCalledWith("/course/Test Course");
  });




  it("renders pagination controls when there are results", () => {
    mockSearchState.results = [
      {
        id: "1",
        name: "Test Course",
        itemType: "COURSE",
      },
    ];
    mockSearchState.pagination = {
      currentPage: 0,
      pageSize: 6,
      totalPages: 2,
      totalElements: 10,
      hasNext: true,
      hasPrevious: false,
    };

    renderWithProviders();

    expect(screen.getByTestId("pagination-controls")).toBeInTheDocument();
  });

  it("does not render pagination controls when no results", () => {
    mockSearchState.results = [];
    mockSearchState.pagination = {
      currentPage: 0,
      pageSize: 6,
      totalPages: 0,
      totalElements: 0,
      hasNext: false,
      hasPrevious: false,
    };

    renderWithProviders();

    expect(screen.queryByTestId("pagination-controls")).not.toBeInTheDocument();
  });

  it("handles empty query parameter", async () => {
    renderWithProviders("/search?q=&page=0");

    // Should not call search with empty query
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockSearch).not.toHaveBeenCalled();
  });


  it("renders desktop filters sidebar", () => {
    renderWithProviders();

    const desktopFilters = document.querySelector(".hidden.lg\\:block");
    expect(desktopFilters).toBeInTheDocument();
  });


  
});

