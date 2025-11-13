import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SearchResults from "../SearchResults";

const mockSearchParams = new URLSearchParams();
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: () => [mockSearchParams, vi.fn()],
    useNavigate: () => mockNavigate,
  };
});

const mockSearch = vi.fn();
const mockClearError = vi.fn();

interface MockResult {
  id: string;
  name: string;
  itemType: string;
}

const mockUseSearch: {
  results: MockResult[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  search: typeof mockSearch;
  clearError: typeof mockClearError;
} = {
  results: [],
  isLoading: false,
  error: null,
  pagination: {
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10,
  },
  search: mockSearch,
  clearError: mockClearError,
};

vi.mock("../../hooks/useSearch", () => ({
  useSearch: () => mockUseSearch,
}));

vi.mock("../../components/Commons/NavBar", () => ({
  default: () => <div data-testid="navbar">NavBar</div>,
}));

vi.mock("../../components/Search/SearchResultsHero", () => ({
  default: ({
    searchTerm,
    totalResults,
    onSearch,
  }: {
    searchTerm: string;
    totalResults: number;
    onSearch: (term: string) => void;
  }) => (
    <div data-testid="search-results-hero">
      <div data-testid="search-term">{searchTerm}</div>
      <div data-testid="total-results">{totalResults}</div>
      <button data-testid="hero-search-button" onClick={() => onSearch("test")}>
        Search
      </button>
    </div>
  ),
}));

vi.mock("../../components/Search/SearchResultsGrid", () => ({
  default: ({
    results,
    isLoading,
    onFavorite,
    onLearnMore,
  }: {
    results: MockResult[];
    isLoading: boolean;
    onFavorite: (id: string) => void;
    onLearnMore: (itemType: string, name: string) => void;
  }) => (
    <div data-testid="search-results-grid">
      {isLoading && <div data-testid="loading">Loading...</div>}
      {results.map((result: MockResult) => (
        <div key={result.id} data-testid={`result-${result.id}`}>
          {result.name}
          <button
            data-testid={`favorite-${result.id}`}
            onClick={() => onFavorite(result.id)}
          >
            Favorite
          </button>
          <button
            data-testid={`learn-more-${result.id}`}
            onClick={() => onLearnMore(result.itemType, result.name)}
          >
            Learn More
          </button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../components/Search/PaginationControls", () => ({
  default: ({
    pagination,
    onPageChange,
  }: {
    pagination: { currentPage: number };
    onPageChange: (page: number) => void;
  }) => (
    <div data-testid="pagination-controls">
      <button
        data-testid="page-button"
        onClick={() => onPageChange(pagination.currentPage + 1)}
      >
        Next Page
      </button>
    </div>
  ),
}));

vi.mock("../../components/Search/SearchFilters", () => ({
  default: ({
    filters,
    onFilterChange,
  }: {
    filters: Record<string, unknown>;
    onFilterChange: (newFilters: Record<string, unknown>) => void;
  }) => (
    <div data-testid="search-filters">
      <button
        data-testid="filter-change-button"
        onClick={() =>
          onFilterChange({ ...filters, contentType: ["COURSE"] })
        }
      >
        Apply Filter
      </button>
    </div>
  ),
}));

vi.mock("../../components/Home/PopularTags", () => ({
  default: () => <div data-testid="popular-tags">Popular Tags Component</div>,
}));

describe("SearchResults", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams.set("q", "React");
    mockSearchParams.set("page", "0");
    mockUseSearch.results = [];
    mockUseSearch.isLoading = false;
    mockUseSearch.error = null;
    mockUseSearch.pagination = {
      totalElements: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: 10,
    };
  });

  describe("Basic Rendering", () => {
    it("should render all main components", () => {
      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(screen.getByTestId("navbar")).toBeInTheDocument();
      expect(screen.getByTestId("search-results-hero")).toBeInTheDocument();
      expect(screen.getByTestId("search-filters")).toBeInTheDocument();
      expect(screen.getByTestId("search-results-grid")).toBeInTheDocument();
    });

    it("should display search term from URL params", () => {
      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(screen.getByTestId("search-term")).toHaveTextContent("React");
    });

    it("should call search hook on mount", () => {
      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(mockSearch).toHaveBeenCalledWith("React", 0, expect.any(Object));
    });
  });

  describe("Search Results Display", () => {
    it("should display results when available", () => {
      mockUseSearch.results = [
        { id: "1", name: "React Course", itemType: "COURSE" },
        { id: "2", name: "TypeScript Program", itemType: "PROGRAM" },
      ];
      mockUseSearch.pagination.totalElements = 2;

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(screen.getByTestId("result-1")).toBeInTheDocument();
      expect(screen.getByTestId("result-2")).toBeInTheDocument();
      expect(screen.getByTestId("total-results")).toHaveTextContent("2");
    });

    it("should show pagination when results exist", () => {
      mockUseSearch.results = [
        { id: "1", name: "React Course", itemType: "COURSE" },
      ];

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(screen.getByTestId("pagination-controls")).toBeInTheDocument();
    });

    it("should not show pagination when no results", () => {
      mockUseSearch.results = [];

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(
        screen.queryByTestId("pagination-controls"),
      ).not.toBeInTheDocument();
    });
  });

  describe("No Results with Query - PopularTags Integration", () => {
    it("should show PopularTags when no results and no active filters", () => {
      mockUseSearch.results = [];
      mockUseSearch.isLoading = false;

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(screen.getByTestId("popular-tags")).toBeInTheDocument();
      expect(
        screen.getByText('No se encontraron resultados para "React"'),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Intenta con otra palabra clave o elige una de las búsquedas populares:",
        ),
      ).toBeInTheDocument();
    });

    it("should not show PopularTags when there are results", () => {
      mockUseSearch.results = [
        { id: "1", name: "React Course", itemType: "COURSE" },
      ];

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(screen.queryByTestId("popular-tags")).not.toBeInTheDocument();
    });

    it("should not show PopularTags when loading", () => {
      mockUseSearch.results = [];
      mockUseSearch.isLoading = true;

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(screen.queryByTestId("popular-tags")).not.toBeInTheDocument();
    });

    it("should not show PopularTags when there is an error", () => {
      mockUseSearch.results = [];
      mockUseSearch.error = "Network error";

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(screen.queryByTestId("popular-tags")).not.toBeInTheDocument();
    });
  });

  describe("No Results with Filters", () => {
    it("should show clear filters message when no results with active filters", async () => {
      const user = userEvent.setup();
      mockUseSearch.results = [];

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      // Apply a filter
      const filterButton = screen.getByTestId("filter-change-button");
      await user.click(filterButton);

      await waitFor(() => {
        expect(
          screen.getByText(
            "No se encontraron resultados con los filtros aplicados",
          ),
        ).toBeInTheDocument();
      });

      expect(screen.queryByTestId("popular-tags")).not.toBeInTheDocument();
    });
  });

  describe("Navigation and Interaction", () => {
    it("should navigate when search is triggered", async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      const searchButton = screen.getByTestId("hero-search-button");
      await user.click(searchButton);

      expect(mockNavigate).toHaveBeenCalledWith("/search?q=test&page=0");
    });

    it("should navigate to course page when learn more is clicked", async () => {
      const user = userEvent.setup();
      mockUseSearch.results = [
        { id: "1", name: "React-Course", itemType: "COURSE" },
      ];

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      const learnMoreButton = screen.getByTestId("learn-more-1");
      await user.click(learnMoreButton);

      expect(mockNavigate).toHaveBeenCalledWith("/course/React-Course");
    });

    it("should navigate to program page when learn more is clicked", async () => {
      const user = userEvent.setup();
      mockUseSearch.results = [
        { id: "1", name: "TS-Program", itemType: "PROGRAM" },
      ];

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      const learnMoreButton = screen.getByTestId("learn-more-1");
      await user.click(learnMoreButton);

      expect(mockNavigate).toHaveBeenCalledWith("/program/TS-Program");
    });

    it("should handle page change", async () => {
      const user = userEvent.setup();
      mockUseSearch.results = [
        { id: "1", name: "Course 1", itemType: "COURSE" },
      ];
      mockUseSearch.pagination.currentPage = 0;

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      const pageButton = screen.getByTestId("page-button");
      await user.click(pageButton);

      expect(mockNavigate).toHaveBeenCalledWith("/search?q=React&page=1");
    });
  });

  describe("Filter Management", () => {
    it("should display active filters", async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      const filterButton = screen.getByTestId("filter-change-button");
      await user.click(filterButton);

      await waitFor(() => {
        expect(screen.getByText("COURSE")).toBeInTheDocument();
      });
    });

    it("should remove individual filter when close button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      const filterButton = screen.getByTestId("filter-change-button");
      await user.click(filterButton);

      await waitFor(() => {
        expect(screen.getByText("COURSE")).toBeInTheDocument();
      });

      const removeButton = screen.getByText("×");
      await user.click(removeButton);

      await waitFor(() => {
        expect(screen.queryByText("COURSE")).not.toBeInTheDocument();
      });
    });

    it("should clear all filters when clear button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      const filterButton = screen.getByTestId("filter-change-button");
      await user.click(filterButton);

      await waitFor(() => {
        expect(screen.getByText("COURSE")).toBeInTheDocument();
      });

      const clearButtons = screen.getAllByText("Limpiar todos los filtros");
      await user.click(clearButtons[0]);

      await waitFor(() => {
        expect(screen.queryByText("COURSE")).not.toBeInTheDocument();
      });
    });
  });

  describe("Loading State", () => {
    it("should show loading state in grid", () => {
      mockUseSearch.isLoading = true;

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(screen.getByTestId("loading")).toBeInTheDocument();
    });
  });

  describe("URL Parameters", () => {
    it("should handle missing query parameter", () => {
      mockSearchParams.delete("q");

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(screen.getByTestId("search-term")).toHaveTextContent("");
    });

    it("should handle missing page parameter", () => {
      mockSearchParams.delete("page");

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(mockSearch).toHaveBeenCalledWith("React", 0, expect.any(Object));
    });

    it("should handle invalid page parameter", () => {
      mockSearchParams.set("page", "invalid");

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      expect(mockSearch).toHaveBeenCalledWith("React", 0, expect.any(Object));
    });
  });

  describe("Filter State Management", () => {
    it("should reset to page 0 when filters change", async () => {
      const user = userEvent.setup();
      mockSearchParams.set("page", "5");

      render(
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>,
      );

      const filterButton = screen.getByTestId("filter-change-button");
      await user.click(filterButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/search?q=React&page=0");
      });
    });
  });
});
