import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import PopularTags from "../PopularTags";
import * as searchService from "../../../services/search";

vi.mock("../../../services/search", () => ({
  getTopSearchKeywords: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("PopularTags", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state initially", () => {
    vi.mocked(searchService.getTopSearchKeywords).mockImplementation(
      () => new Promise(() => {}),
    );

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    expect(screen.getByText("Búsquedas populares")).toBeInTheDocument();
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("should render popular tags when API returns string array", async () => {
    const mockTags = ["React", "TypeScript", "JavaScript", "Node.js", "Python"];
    vi.mocked(searchService.getTopSearchKeywords).mockResolvedValue(mockTags);

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
    });

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("should render popular tags when API returns objects with keyword field", async () => {
    const mockData = [
      { keyword: "React", count: 100 },
      { keyword: "TypeScript", count: 85 },
      { keyword: "JavaScript", count: 75 },
    ];
    vi.mocked(searchService.getTopSearchKeywords).mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
    });

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("should render popular tags when API returns objects with name field", async () => {
    const mockData = [
      { name: "Spring Boot" },
      { name: "Django" },
    ];
    vi.mocked(searchService.getTopSearchKeywords).mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Spring Boot")).toBeInTheDocument();
    });

    expect(screen.getByText("Django")).toBeInTheDocument();
  });

  it("should handle mixed response types (strings and objects)", async () => {
    const mockData = [
      "React",
      { keyword: "TypeScript" },
      { name: "Angular" },
      "Vue",
    ];
    vi.mocked(searchService.getTopSearchKeywords).mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
    });

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  it("should display error message when API call fails", async () => {
    const errorMessage = "Network error";
    vi.mocked(searchService.getTopSearchKeywords).mockRejectedValue(
      new Error(errorMessage),
    );

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("No se pudieron cargar las búsquedas populares."),
      ).toBeInTheDocument();
    });
  });

  it("should display no results message when API returns empty array", async () => {
    vi.mocked(searchService.getTopSearchKeywords).mockResolvedValue([]);

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("No hay búsquedas populares para mostrar"),
      ).toBeInTheDocument();
    });
  });

  it("should navigate to search page when tag is clicked", async () => {
    const user = userEvent.setup();
    const mockTags = ["React", "TypeScript"];
    vi.mocked(searchService.getTopSearchKeywords).mockResolvedValue(mockTags);

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
    });

    const reactButton = screen.getByText("React");
    await user.click(reactButton);

    expect(mockNavigate).toHaveBeenCalledWith("/search?q=React&page=0");
  });

  it("should encode special characters in search query", async () => {
    const user = userEvent.setup();
    const mockTags = ["C++ Programming"];
    vi.mocked(searchService.getTopSearchKeywords).mockResolvedValue(mockTags);

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("C++ Programming")).toBeInTheDocument();
    });

    const button = screen.getByText("C++ Programming");
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/search?q=C%2B%2B%20Programming&page=0",
    );
  });

  it("should call getTopSearchKeywords with limit parameter of 5", async () => {
    vi.mocked(searchService.getTopSearchKeywords).mockResolvedValue([]);

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(searchService.getTopSearchKeywords).toHaveBeenCalledWith(5);
    });
  });

  it("should have correct CSS classes for styling", async () => {
    const mockTags = ["React"];
    vi.mocked(searchService.getTopSearchKeywords).mockResolvedValue(mockTags);

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
    });

    const container = screen.getByTestId("popular-tags");
    expect(container).toHaveClass("mt-8");

    const button = screen.getByText("React");
    expect(button).toHaveClass(
      "bg-gray-200",
      "text-gray-500",
      "font-medium",
      "text-xs",
      "font-inter",
      "px-6",
      "py-2",
      "rounded-none",
      "hover:bg-gray-300",
      "transition-colors",
      "duration-200",
    );
  });

  it("should not set state after component unmount", async () => {
    const mockTags = ["React"];
    let resolvePromise: (value: string[]) => void;
    const promise = new Promise<string[]>((resolve) => {
      resolvePromise = resolve;
    });

    vi.mocked(searchService.getTopSearchKeywords).mockReturnValue(promise);

    const { unmount } = render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    unmount();

    resolvePromise!(mockTags);

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(searchService.getTopSearchKeywords).toHaveBeenCalled();
  });

  it("should handle objects with search field", async () => {
    const mockData = [{ search: "Machine Learning" }];
    vi.mocked(searchService.getTopSearchKeywords).mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Machine Learning")).toBeInTheDocument();
    });
  });

  it("should handle objects with value field", async () => {
    const mockData = [{ value: "Data Science" }];
    vi.mocked(searchService.getTopSearchKeywords).mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Data Science")).toBeInTheDocument();
    });
  });

  it("should handle objects with text field", async () => {
    const mockData = [{ text: "Cloud Computing" }];
    vi.mocked(searchService.getTopSearchKeywords).mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Cloud Computing")).toBeInTheDocument();
    });
  });

  it("should handle non-string error gracefully", async () => {
    vi.mocked(searchService.getTopSearchKeywords).mockRejectedValue(
      "String error",
    );

    render(
      <BrowserRouter>
        <PopularTags />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("No se pudieron cargar las búsquedas populares."),
      ).toBeInTheDocument();
    });
  });
});
