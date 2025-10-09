import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HeroSection from "../HeroSection";
import tagsReducer from "../../../redux/tagsSlice";

vi.mock("../../../components/Commons/SearchBar", () => ({
  default: ({ search, by, handleClick, navigateToSearch }: any) => (
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
}));

vi.mock("../../../components/Home/PopularTags", () => ({
  default: ({ tags }: { tags: string[] }) => (
    <div data-testid="popular-tags">
      {tags.map((tag, index) => (
        <span key={index} data-testid={`tag-${index}`}>
          {tag}
        </span>
      ))}
    </div>
  ),
}));

vi.mock("../../../components/Home/HeroTitle", () => ({
  default: ({ heading, subheading }: { heading: any; subheading: string }) => (
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
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        tags: tagsReducer,
      },
      preloadedState: {
        tags: {
          tags: ["React", "JavaScript", "TypeScript", "Node.js", "Python"],
        },
      },
    });
  });

  it("renders the hero section with correct structure", () => {
    render(
      <Provider store={store}>
        <HeroSection />
      </Provider>,
    );

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
    render(
      <Provider store={store}>
        <HeroSection />
      </Provider>,
    );

    const heading = screen.getByTestId("heading");
    const subheading = screen.getByTestId("subheading");

    expect(heading).toHaveTextContent("¿Qué mundo quieres explorar?");
    expect(subheading).toHaveTextContent(
      "Adéntrate en nuestros mundos de conocimiento, con más de 200 cursos, certificaciones, especializaciones y maestrías.",
    );
  });

  it("renders SearchBar with correct props", () => {
    render(
      <Provider store={store}>
        <HeroSection />
      </Provider>,
    );

    const searchBar = screen.getByTestId("search-bar");
    expect(searchBar).toBeInTheDocument();

    expect(screen.getByTestId("search-text")).toHaveTextContent("mundos");
    expect(screen.getByTestId("search-by")).toHaveTextContent(
      "Negocios, Liderazgo",
    );
    expect(screen.getByTestId("navigate-to-search")).toHaveTextContent("true");
  });

  it("renders PopularTags with recent searches", () => {
    render(
      <Provider store={store}>
        <HeroSection />
      </Provider>,
    );

    const popularTags = screen.getByTestId("popular-tags");
    expect(popularTags).toBeInTheDocument();

    expect(screen.getByTestId("tag-0")).toHaveTextContent("React");
    expect(screen.getByTestId("tag-1")).toHaveTextContent("JavaScript");
    expect(screen.getByTestId("tag-2")).toHaveTextContent("TypeScript");
    expect(screen.getByTestId("tag-3")).toHaveTextContent("Node.js");
    expect(screen.getByTestId("tag-4")).toHaveTextContent("Python");
  });

  it("handles empty tags array", () => {
    const emptyStore = configureStore({
      reducer: {
        tags: tagsReducer,
      },
      preloadedState: {
        tags: {
          tags: [],
        },
      },
    });

    render(
      <Provider store={emptyStore}>
        <HeroSection />
      </Provider>,
    );

    const popularTags = screen.getByTestId("popular-tags");
    expect(popularTags).toBeInTheDocument();
    expect(popularTags.children).toHaveLength(0);
  });

  it("applies correct background image styles", () => {
    render(
      <Provider store={store}>
        <HeroSection />
      </Provider>,
    );

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
    render(
      <Provider store={store}>
        <HeroSection />
      </Provider>,
    );

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
    render(
      <Provider store={store}>
        <HeroSection />
      </Provider>,
    );

    const heroContainer = screen
      .getByTestId("hero-title")
      .closest(".relative.w-full.h-screen");
    const overlay = heroContainer?.querySelector(
      ".absolute.inset-0.bg-black.bg-opacity-40",
    );
    expect(overlay).toBeInTheDocument();
  });

  it("renders content with correct z-index", () => {
    render(
      <Provider store={store}>
        <HeroSection />
      </Provider>,
    );

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
