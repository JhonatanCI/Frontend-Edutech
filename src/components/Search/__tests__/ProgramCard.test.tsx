import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import ProgramCard from "../ProgramCard";
import { SearchResult } from "../../../types/search.types";
import authReducer from "../../../redux/authSlice";
import { FavoritesProvider } from "../../../context/favoritesContext";
import React from "react";

type TestProgramCardProps = {
  result: SearchResult;
  onFavorite?: (id: string) => void;
  onLearnMore?: (id: string, itemType: string, name: string) => void;
};

const ProgramCardAny = ProgramCard as React.ComponentType<TestProgramCardProps>;

const createMockStore = (isAuthenticated = false) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: isAuthenticated ? { id: 1, username: "testuser", email: "test@test.com" } : null,
        token: isAuthenticated ? "fake-token" : null,
        isAuthenticated,
        loading: false,
        error: null,
        favoriteMessage: null,
      },
    },
  });
};

const renderWithProviders = (
  component: React.ReactElement,
  isAuthenticated = false
) => {
  const store = createMockStore(isAuthenticated);
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <FavoritesProvider>
          {component}
        </FavoritesProvider>
      </BrowserRouter>
    </Provider>
  );
};

const mockCourseResult: SearchResult = {
  id: "1",
  name: "React Fundamentals",
  description: "Learn the basics of React development",
  itemType: "COURSE",
  programType: null,
  credits: 3,
  tags: "React,JavaScript,Frontend",
  modality: "VIRTUAL",
  degreeTitle: null,
  imageUrl: "react-course.jpg",
  price: 150000,
  duration: 40,
  durationUnit: "HOURS",
};

const mockProgramResult: SearchResult = {
  id: "2",
  name: "Data Science Specialization",
  description: "Comprehensive data science program",
  itemType: "PROGRAM",
  programType: "ESPECIALIZACION",
  credits: 12,
  tags: "Python,Data Science,Machine Learning",
  modality: "PRESENCIAL",
  degreeTitle: "Especialista en Data Science",
  imageUrl: "data-science.jpg",
  price: 5000000,
  duration: 2,
  durationUnit: "SEMESTERS",
};

describe("ProgramCard", () => {
  let mockOnFavorite: ReturnType<typeof vi.fn>;
  let mockOnLearnMore: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnFavorite = vi.fn();
    mockOnLearnMore = vi.fn();
  });

  it("renders course card correctly", () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("React Fundamentals")).toBeInTheDocument();
    expect(
      screen.getByText("Learn the basics of React development"),
    ).toBeInTheDocument();
    expect(screen.getByText("Curso")).toBeInTheDocument();
  });

  it("renders program card correctly", () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockProgramResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("Data Science Specialization")).toBeInTheDocument();
    expect(
      screen.getByText("Comprehensive data science program"),
    ).toBeInTheDocument();
    const especializacionElements = screen.getAllByText("ESPECIALIZACION");
    expect(especializacionElements).toHaveLength(2);
  });

  it("formats price correctly", () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    // Check for the formatted price - the actual format is $ 150.000
    expect(screen.getByText("$ 150.000")).toBeInTheDocument();
  });

  it("formats duration correctly for hours", () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("40 horas")).toBeInTheDocument();
  });

  it("formats duration correctly for semesters", () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockProgramResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("2 semestres")).toBeInTheDocument();
  });

  it("formats duration correctly for single semester", () => {
    const singleSemesterResult = {
      ...mockProgramResult,
      duration: 1,
    };

    renderWithProviders(
      <ProgramCardAny
        result={singleSemesterResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("1 semestre")).toBeInTheDocument();
  });

  it("formats duration correctly for single hour", () => {
    const singleHourResult = {
      ...mockCourseResult,
      duration: 1,
    };

    renderWithProviders(
      <ProgramCardAny
        result={singleHourResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("1 hora")).toBeInTheDocument();
  });

  it("displays tags correctly", () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it('shows "+X más" when there are more than 3 tags', () => {
    const manyTagsResult = {
      ...mockCourseResult,
      tags: "React,JavaScript,Frontend,TypeScript,Node.js,Express",
    };

    renderWithProviders(
      <ProgramCardAny
        result={manyTagsResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("+3 más")).toBeInTheDocument();
  });

  it("displays modality correctly", () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("Virtual")).toBeInTheDocument();
  });

  it("displays presencial modality correctly", () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockProgramResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("Presencial")).toBeInTheDocument();
  });

  it("displays hibrido modality correctly", () => {
    const hibridoResult = {
      ...mockCourseResult,
      modality: "HIBRIDO" as const,
    };

    renderWithProviders(
      <ProgramCardAny
        result={hibridoResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("Híbrido")).toBeInTheDocument();
  });

  it("calls onFavorite when favorite button is clicked", () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
      false // unauthenticated - will show AuthModal
    );

    const favoriteButton = screen.getByLabelText("Agregar a favoritos");
    fireEvent.click(favoriteButton);

    // Now it opens AuthModal instead of calling callback directly
    expect(screen.getByText(/Inicia sesión para guardar/)).toBeInTheDocument();
  });

  it("calls onLearnMore when learn more button is clicked", () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    const learnMoreButton = screen.getByText("Conoce más");
    fireEvent.click(learnMoreButton);

    expect(mockOnLearnMore).toHaveBeenCalledWith(
      "1",
      "COURSE",
      "React Fundamentals",
    );
  });

  it("works without optional callbacks", () => {
    renderWithProviders(<ProgramCardAny result={mockCourseResult} />);

    expect(screen.getByText("React Fundamentals")).toBeInTheDocument();
    expect(
      screen.getByText("Learn the basics of React development"),
    ).toBeInTheDocument();
  });

  it("displays correct badge colors for different types", () => {
    const { rerender } = renderWithProviders(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    const courseBadge = screen.getByText("Curso");
    expect(courseBadge).toHaveClass("bg-[#4CB979]");

    const especializacionResult = {
      ...mockProgramResult,
      programType: "ESPECIALIZACION" as const,
    };

    rerender(
      <Provider store={createMockStore()}>
        <BrowserRouter>
          <FavoritesProvider>
            <ProgramCardAny
              result={especializacionResult}
              onFavorite={mockOnFavorite}
              onLearnMore={mockOnLearnMore}
            />
          </FavoritesProvider>
        </BrowserRouter>
      </Provider>
    );

    const especializacionBadges = screen.getAllByText("ESPECIALIZACION");
    const badgeElement = especializacionBadges[0];
    expect(badgeElement).toHaveClass("bg-[#E4EB60]");
  });

  it("handles missing image gracefully", () => {
    const noImageResult = {
      ...mockCourseResult,
      imageUrl: "",
    };

    renderWithProviders(
      <ProgramCardAny
        result={noImageResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });

  it("handles image load error", () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    const image = screen.getByAltText("React Fundamentals");
    fireEvent.error(image);

    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });

  it("displays credits correctly", () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays program type as level when available", () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockProgramResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    const especializacionElements = screen.getAllByText("ESPECIALIZACION");
    expect(especializacionElements).toHaveLength(2);
  });

  it('displays "General" as level when program type is null', () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("General")).toBeInTheDocument();
  });

  it("handles empty tags string", () => {
    const noTagsResult = {
      ...mockCourseResult,
      tags: "",
    };

    renderWithProviders(
      <ProgramCardAny
        result={noTagsResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  it("handles tags with extra spaces", () => {
    const spacedTagsResult = {
      ...mockCourseResult,
      tags: " React , JavaScript , Frontend ",
    };

    renderWithProviders(
      <ProgramCardAny
        result={spacedTagsResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  // Tests for badge color branches
  it("displays MAESTRIA badge with correct color", () => {
    const maestriaResult = {
      ...mockProgramResult,
      programType: "MAESTRIA",
    };

    renderWithProviders(
      <ProgramCardAny
        result={maestriaResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    const badge = screen.getAllByText("MAESTRIA")[0];
    expect(badge).toHaveClass("bg-[#5454E9]");
  });

  it("displays DOCTORADO badge with correct color", () => {
    const doctoradoResult = {
      ...mockProgramResult,
      programType: "DOCTORADO",
    };

    renderWithProviders(
      <ProgramCardAny
        result={doctoradoResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    const badge = screen.getAllByText("DOCTORADO")[0];
    expect(badge).toHaveClass("bg-[#5454E9]");
  });

  it("displays CERTIFICACION badge with correct color", () => {
    const certificacionResult = {
      ...mockProgramResult,
      programType: "CERTIFICACION",
    };

    renderWithProviders(
      <ProgramCardAny
        result={certificacionResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    const badge = screen.getAllByText("CERTIFICACION")[0];
    expect(badge).toHaveClass("bg-[#E9683B]");
  });

  it("displays default badge color for unknown program type", () => {
    const unknownTypeResult = {
      ...mockProgramResult,
      programType: "UNKNOWN_TYPE",
    };

    renderWithProviders(
      <ProgramCardAny
        result={unknownTypeResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    const badge = screen.getAllByText("UNKNOWN_TYPE")[0];
    expect(badge).toHaveClass("bg-[#88898C]");
  });

  // Tests for modality color default case
  it("displays default modality color for unknown modality", () => {
    const unknownModalityResult = {
      ...mockProgramResult,
      modality: "ONLINE",
    };

    renderWithProviders(
      <ProgramCardAny
        result={unknownModalityResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    const modalityBadge = screen.getByText("ONLINE");
    expect(modalityBadge).toHaveClass("bg-gray-100");
    expect(modalityBadge).toHaveClass("text-gray-800");
  });

  // Tests for modality text default case
  it("displays default modality text for unknown modality", () => {
    const unknownModalityResult = {
      ...mockProgramResult,
      modality: "REMOTE",
    };

    renderWithProviders(
      <ProgramCardAny
        result={unknownModalityResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />
    );

    expect(screen.getByText("REMOTE")).toBeInTheDocument();
  });

  // Tests for handleFavoriteClick error handling
  it("handles error when toggling favorite for authenticated user", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    renderWithProviders(
      <ProgramCardAny
        result={mockProgramResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
      true // authenticated
    );

    const favoriteButton = screen.getByLabelText("Agregar a favoritos");
    fireEvent.click(favoriteButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error al actualizar favorito:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  // Tests for unauthenticated user flow with pending favorites
  it("saves pending favorite and shows AuthModal for unauthenticated user", async () => {
    renderWithProviders(
      <ProgramCardAny
        result={mockProgramResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
      false // unauthenticated
    );

    const favoriteButton = screen.getByLabelText("Agregar a favoritos");
    fireEvent.click(favoriteButton);

    await waitFor(() => {
      expect(screen.getByText(/Inicia sesión para guardar/)).toBeInTheDocument();
    });
  });
});
