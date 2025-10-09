import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchResultsGrid from "../SearchResultsGrid";
import { SearchResult } from "../../../types/search.types";

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
  const mockOnFavorite = vi.fn();
  const mockOnLearnMore = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading skeletons when isLoading is true", () => {
    render(
      <SearchResultsGrid
        results={[]}
        isLoading={true}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    const skeletons = screen
      .getAllByRole("generic")
      .filter((element) => element.classList.contains("animate-pulse"));
    expect(skeletons).toHaveLength(6);
  });

  it("renders nothing when results array is empty and not loading", () => {
    const { container } = render(
      <SearchResultsGrid
        results={[]}
        isLoading={false}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders results when provided", () => {
    render(
      <SearchResultsGrid
        results={mockResults}
        isLoading={false}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
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
    render(
      <SearchResultsGrid
        results={mockResults}
        isLoading={false}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    const courseCards = screen.getAllByText(/Test (Course|Program) \d/);
    expect(courseCards).toHaveLength(2);
  });

  it("passes correct props to ProgramCard components", () => {
    render(
      <SearchResultsGrid
        results={mockResults}
        isLoading={false}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("Test Course 1")).toBeInTheDocument();
    expect(screen.getByText("Test Program 1")).toBeInTheDocument();

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("Data Science")).toBeInTheDocument();
  });

  it("works without optional callback props", () => {
    render(<SearchResultsGrid results={mockResults} isLoading={false} />);

    expect(screen.getByText("Test Course 1")).toBeInTheDocument();
    expect(screen.getByText("Test Program 1")).toBeInTheDocument();
  });

  it("renders loading state with correct grid layout", () => {
    const { container } = render(
      <SearchResultsGrid
        results={[]}
        isLoading={true}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
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
    const { container } = render(
      <SearchResultsGrid
        results={mockResults}
        isLoading={false}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
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

    render(
      <SearchResultsGrid
        results={singleResult}
        isLoading={false}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
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

    render(
      <SearchResultsGrid
        results={manyResults}
        isLoading={false}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    // Should render all 10 results
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(`Test Course ${i}`)).toBeInTheDocument();
    }
  });
});
