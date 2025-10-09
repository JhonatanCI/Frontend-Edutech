import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SearchResultsHero from "../SearchResultsHero";

vi.mock("../../assets/Icesi.jpg", () => ({
  default: "mocked-image.jpg",
}));

describe("SearchResultsHero", () => {
  let mockOnSearch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnSearch = vi.fn();
  });

  it("renders with correct title and structure", () => {
    render(
      <SearchResultsHero
        searchTerm="test search"
        totalResults={5}
        onSearch={mockOnSearch}
      />,
    );

    expect(screen.getByText("Resultados de búsqueda")).toBeInTheDocument();
  });

  it("displays correct results count when results exist", () => {
    render(
      <SearchResultsHero
        searchTerm="test search"
        totalResults={5}
        onSearch={mockOnSearch}
      />,
    );

    expect(screen.getByText(/Encontramos/)).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("test search")).toBeInTheDocument();
  });

  it("displays no results message when totalResults is 0", () => {
    render(
      <SearchResultsHero
        searchTerm="test search"
        totalResults={0}
        onSearch={mockOnSearch}
      />,
    );

    expect(
      screen.getByText('No se encontraron resultados para "test search"'),
    ).toBeInTheDocument();
  });

  it("renders search input with correct placeholder", () => {
    render(
      <SearchResultsHero
        searchTerm="test search"
        totalResults={5}
        onSearch={mockOnSearch}
      />,
    );

    const searchInput = screen.getByPlaceholderText(
      "Buscar cursos o programas",
    );
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("test search");
  });

  it("updates input value when typing", () => {
    render(
      <SearchResultsHero
        searchTerm="test search"
        totalResults={5}
        onSearch={mockOnSearch}
      />,
    );

    const searchInput = screen.getByPlaceholderText(
      "Buscar cursos o programas",
    );
    fireEvent.change(searchInput, { target: { value: "new search term" } });

    expect(searchInput).toHaveValue("new search term");
  });

  it("calls onSearch when search button is clicked", () => {
    render(
      <SearchResultsHero
        searchTerm="test search"
        totalResults={5}
        onSearch={mockOnSearch}
      />,
    );

    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith("test search");
  });

  it("calls onSearch when Enter key is pressed", () => {
    render(
      <SearchResultsHero
        searchTerm="test search"
        totalResults={5}
        onSearch={mockOnSearch}
      />,
    );

    const searchInput = screen.getByPlaceholderText(
      "Buscar cursos o programas",
    );
    fireEvent.change(searchInput, { target: { value: "new search" } });
    fireEvent.keyDown(searchInput, { key: "Enter" });

    expect(mockOnSearch).toHaveBeenCalledWith("new search");
  });

  it("does not call onSearch for empty search term", () => {
    render(
      <SearchResultsHero
        searchTerm=""
        totalResults={0}
        onSearch={mockOnSearch}
      />,
    );

    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it("does not call onSearch for whitespace-only search term", () => {
    render(
      <SearchResultsHero
        searchTerm="   "
        totalResults={0}
        onSearch={mockOnSearch}
      />,
    );

    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it("trims search term before calling onSearch", () => {
    render(
      <SearchResultsHero
        searchTerm="test search"
        totalResults={5}
        onSearch={mockOnSearch}
      />,
    );

    const searchInput = screen.getByPlaceholderText(
      "Buscar cursos o programas",
    );
    fireEvent.change(searchInput, { target: { value: "  trimmed search  " } });
    fireEvent.keyDown(searchInput, { key: "Enter" });

    expect(mockOnSearch).toHaveBeenCalledWith("trimmed search");
  });

  it("applies correct background image styles", () => {
    const { container } = render(
      <SearchResultsHero
        searchTerm="test search"
        totalResults={5}
        onSearch={mockOnSearch}
      />,
    );

    const heroSection = container.firstChild as HTMLElement;
    // Check if the element has the background image style applied
    expect(heroSection).toHaveStyle({
      backgroundImage: expect.stringContaining(
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))",
      ),
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    });
  });

  it("has correct CSS classes", () => {
    const { container } = render(
      <SearchResultsHero
        searchTerm="test search"
        totalResults={5}
        onSearch={mockOnSearch}
      />,
    );

    const heroSection = container.firstChild as HTMLElement;
    expect(heroSection).toHaveClass(
      "relative",
      "text-white",
      "py-8",
      "overflow-hidden",
      "z-0",
    );
  });

  it("renders search icon in button", () => {
    render(
      <SearchResultsHero
        searchTerm="test search"
        totalResults={5}
        onSearch={mockOnSearch}
      />,
    );

    const searchButton = screen.getByRole("button");
    const svgIcon = searchButton.querySelector("svg");
    expect(svgIcon).toBeInTheDocument();
  });

  it("handles special characters in search term", () => {
    render(
      <SearchResultsHero
        searchTerm="test@#$%search"
        totalResults={3}
        onSearch={mockOnSearch}
      />,
    );

    expect(screen.getByText("test@#$%search")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("handles very long search terms", () => {
    const longSearchTerm = "a".repeat(100);

    render(
      <SearchResultsHero
        searchTerm={longSearchTerm}
        totalResults={1}
        onSearch={mockOnSearch}
      />,
    );

    expect(screen.getByText(longSearchTerm)).toBeInTheDocument();
  });

  it("handles zero results correctly", () => {
    render(
      <SearchResultsHero
        searchTerm="nonexistent"
        totalResults={0}
        onSearch={mockOnSearch}
      />,
    );

    expect(
      screen.getByText('No se encontraron resultados para "nonexistent"'),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Encontramos/)).not.toBeInTheDocument();
  });

  it("handles large result counts", () => {
    render(
      <SearchResultsHero
        searchTerm="popular search"
        totalResults={9999}
        onSearch={mockOnSearch}
      />,
    );

    expect(screen.getByText("9999")).toBeInTheDocument();
    expect(screen.getByText(/Encontramos/)).toBeInTheDocument();
  });
});
