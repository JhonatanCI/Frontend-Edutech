import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HeroSection from "../HeroSection";
import type { ReactNode } from "react";

vi.mock("../../../components/Commons/SearchBar", () => {
  type SearchBarProps = {
    search: string;
    by: string;
    handleClick: (value: string) => void;
    navigateToSearch: boolean;
  };

  return {
    default: ({ search, by, handleClick, navigateToSearch }: SearchBarProps) => (
      <div data-testid="search-bar">
        <span data-testid="search-text">{search}</span>
        <span data-testid="search-by">{by}</span>
        <button
          data-testid="search-button"
          onClick={() => handleClick("test search")}
        >
          Search
        </button>
        <span data-testid="navigate-to-search">
          {navigateToSearch.toString()}
        </span>
      </div>
    ),
  };
});

vi.mock("../../../components/Home/PopularTags", () => ({
  default: () => (
    <div data-testid="popular-tags">
      Mock PopularTags Component
    </div>
  ),
}));
vi.mock("../../../components/Home/HeroTitle", () => ({
  default: ({ heading, subheading }: { heading: ReactNode; subheading: string }) => (
    <div data-testid="hero-title">
      <div data-testid="heading">{heading}</div>
      <div data-testid="subheading">{subheading}</div>
    </div>
  ),
}));

vi.mock("../../../assets/Icesi.jpg", () => ({
  default: "mocked-image.jpg",
}));

describe("HeroSection", () => {
  it("renders the hero section with correct structure", () => {
    render(<HeroSection />);

    const heroContainer = screen
      .getByTestId("hero-title")
      .closest(".relative.w-full.h-screen");
    expect(heroContainer).toHaveClass("relative", "w-full", "h-screen");

    // Check if HeroTitle is rendered
    expect(screen.getByTestId("hero-title")).toBeInTheDocument();
    expect(screen.getByTestId("heading")).toBeInTheDocument();
    expect(screen.getByTestId("subheading")).toBeInTheDocument();
  });

  it("displays the correct heading and subheading", () => {
    render(<HeroSection />);

    const heading = screen.getByTestId("heading");
    const subheading = screen.getByTestId("subheading");

    expect(heading).toHaveTextContent("¿Qué mundo quieres explorar?");
    expect(subheading).toHaveTextContent(
      "Adéntrate en nuestros mundos de conocimiento, con más de 200 cursos, certificaciones, especializaciones y maestrías.",
    );
  });

  it("renders SearchBar with correct props", () => {
    render(<HeroSection />);

    const searchBar = screen.getByTestId("search-bar");
    expect(searchBar).toBeInTheDocument();

    expect(screen.getByTestId("search-text")).toHaveTextContent("mundos");
    expect(screen.getByTestId("search-by")).toHaveTextContent(
      "Negocios, Liderazgo",
    );
    expect(screen.getByTestId("navigate-to-search")).toHaveTextContent("true");
  });

  it("renders PopularTags component", () => {
    render(<HeroSection />);

    const popularTags = screen.getByTestId("popular-tags");
    expect(popularTags).toBeInTheDocument();
    expect(popularTags).toHaveTextContent("Mock PopularTags Component");
  });

  it("applies correct background image styles", () => {
    render(<HeroSection />);

    const heroContainer = screen
      .getByTestId("hero-title")
      .closest(".relative.w-full.h-screen");
    expect(heroContainer).toHaveStyle({
      backgroundImage: expect.stringContaining(
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))",
      ),
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    });
  });

  it("has correct CSS classes for layout", () => {
    render(<HeroSection />);

    const heroContainer = screen
      .getByTestId("hero-title")
      .closest(".relative.w-full.h-screen");
    expect(heroContainer).toHaveClass(
      "relative",
      "w-full",
      "h-screen",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "text-white",
      "overflow-hidden",
    );
  });

  it("renders overlay div", () => {
    render(<HeroSection />);

    const heroContainer = screen
      .getByTestId("hero-title")
      .closest(".relative.w-full.h-screen");
    const overlay = heroContainer?.querySelector(
      ".absolute.inset-0.bg-black.bg-opacity-40",
    );
    expect(overlay).toBeInTheDocument();
  });

  it("renders content with correct z-index", () => {
    render(<HeroSection />);

    const contentDiv = screen
      .getByTestId("hero-title")
      .closest(".relative.z-10");
    expect(contentDiv).toBeInTheDocument();
    expect(contentDiv).toHaveClass(
      "relative",
      "z-10",
      "flex",
      "flex-col",
      "pt-20",
    );
  });
});
