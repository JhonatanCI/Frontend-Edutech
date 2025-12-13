import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import SearchResultsGrid from "../SearchResultsGrid";
import { SearchResult } from "../../../types/search.types";
import authReducer, { type AuthState } from "../../../redux/authSlice";
import type { ReactElement } from "react";

vi.mock("../../../services/favorites");

const createMockStore = (override: Partial<AuthState> = {}) => {
  const baseState = authReducer(undefined, { type: "@@INIT" } as any);
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        ...baseState,
        user: { id: "1", username: "testuser", email: "test@test.com" },
        token: "fake-token",
        isAuthenticated: true,
        loading: false,
        ...override,
      },
    },
  });
};

const renderWithProviders = (component: ReactElement, override?: Partial<AuthState>) => {
  const store = createMockStore(override);
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

const mockResults: SearchResult[] = [
  {
    id: "1",
    name: "Test Course 1",
    description: "This is a test course description",
    itemType: "COURSE",
    programType: null,
    credits: 3,
    tags: "React,JavaScript",
    modality: "VIRTUAL",
    degreeTitle: null,
    imageUrl: "test-image.jpg",
    price: 100000,
    duration: 40,
    durationUnit: "HOURS",
  },
  {
    id: "2",
    name: "Test Program 1",
    description: "This is a test program description",
    itemType: "PROGRAM",
    programType: "ESPECIALIZACION",
    credits: 12,
    tags: "Python,Data Science",
    modality: "PRESENCIAL",
    degreeTitle: "Especialista en Data Science",
    imageUrl: "test-program.jpg",
    price: 5000000,
    duration: 2,
    durationUnit: "SEMESTERS",
  },
];

describe("SearchResultsGrid", () => {
  const mockOnLearnMore = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading skeletons when isLoading is true", () => {
    renderWithProviders(
      <SearchResultsGrid results={[]} isLoading={true} onLearnMore={mockOnLearnMore} />
    );

    const skeletons = screen
      .getAllByRole("generic")
      .filter((element) => element.classList.contains("animate-pulse"));
    expect(skeletons).toHaveLength(6);
  });

  it("renders nothing when results array is empty and not loading", () => {
    const { container } = renderWithProviders(
      <SearchResultsGrid results={[]} isLoading={false} onLearnMore={mockOnLearnMore} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders results when provided", () => {
    renderWithProviders(
      <SearchResultsGrid
        results={mockResults}
        isLoading={false}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("Test Course 1")).toBeInTheDocument();
    expect(screen.getByText("Test Program 1")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test course description"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("This is a test program description"),
    ).toBeInTheDocument();
  });

  it("renders correct number of results", () => {
    renderWithProviders(
      <SearchResultsGrid
        results={mockResults}
        isLoading={false}
        onLearnMore={mockOnLearnMore}
      />
    );

    const courseCards = screen.getAllByText(/Test (Course|Program) \d/);
    expect(courseCards).toHaveLength(2);
  });

  it("passes correct props to ProgramCard components", () => {
    renderWithProviders(
      <SearchResultsGrid
        results={mockResults}
        isLoading={false}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("Test Course 1")).toBeInTheDocument();
    expect(screen.getByText("Test Program 1")).toBeInTheDocument();

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("Data Science")).toBeInTheDocument();
  });

  it("works without optional callback props", () => {
    renderWithProviders(<SearchResultsGrid results={mockResults} isLoading={false} />);

    expect(screen.getByText("Test Course 1")).toBeInTheDocument();
    expect(screen.getByText("Test Program 1")).toBeInTheDocument();
  });

  it("renders loading state with correct grid layout", () => {
    const { container } = renderWithProviders(
      <SearchResultsGrid results={[]} isLoading={true} onLearnMore={mockOnLearnMore} />
    );

    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "gap-6",
    );
  });

  it("renders results with correct grid layout", () => {
    const { container } = renderWithProviders(
      <SearchResultsGrid
        results={mockResults}
        isLoading={false}
        onLearnMore={mockOnLearnMore}
      />
    );

    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "gap-6",
    );
  });

  it("handles single result correctly", () => {
    const singleResult = [mockResults[0]];

    renderWithProviders(
      <SearchResultsGrid
        results={singleResult}
        isLoading={false}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("Test Course 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Program 1")).not.toBeInTheDocument();
  });

  it("handles large number of results", () => {
    const manyResults = Array.from({ length: 10 }, (_, index) => ({
      ...mockResults[0],
      id: `test-${index}`,
      name: `Test Course ${index + 1}`,
    }));

    renderWithProviders(
      <SearchResultsGrid
        results={manyResults}
        isLoading={false}
        onLearnMore={mockOnLearnMore}
      />
    );

    // Should render all 10 results
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(`Test Course ${i}`)).toBeInTheDocument();
    }
  });
});
