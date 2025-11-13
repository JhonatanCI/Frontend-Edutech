import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProgramCard from "../ProgramCard";
import { SearchResult } from "../../../types/search.types";
import authReducer from "../../../redux/authSlice";
import React from "react";

type TestProgramCardProps = {
  result: SearchResult;
  onFavorite?: (id: string) => void;
  onLearnMore?: (id: string, itemType: string, name: string) => void;
};

const ProgramCardAny = ProgramCard as React.ComponentType<TestProgramCardProps>;

vi.mock("../../../services/favorites");

const createMockStore = (isAuthenticated = false) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: isAuthenticated ? { id: "1", username: "testuser", email: "test@test.com" } : null,
        token: isAuthenticated ? "fake-token" : null,
        isAuthenticated,
        loading: false,
        error: null,
      },
    },
  });
};

const renderWithProviders = (
  component: React.ReactElement,
  isAuthenticated = false
) => {
  const store = createMockStore(isAuthenticated);
  return render(<Provider store={store}>{component}</Provider>);
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

describe.skip("ProgramCard", () => {
  let mockOnFavorite: ReturnType<typeof vi.fn>;
  let mockOnLearnMore: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnFavorite = vi.fn();
    mockOnLearnMore = vi.fn();
  });

  it("renders course card correctly", () => {
    render(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("React Fundamentals")).toBeInTheDocument();
    expect(
      screen.getByText("Learn the basics of React development"),
    ).toBeInTheDocument();
    expect(screen.getByText("Curso")).toBeInTheDocument();
  });

  it("renders program card correctly", () => {
    render(
      <ProgramCardAny
        result={mockProgramResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("Data Science Specialization")).toBeInTheDocument();
    expect(
      screen.getByText("Comprehensive data science program"),
    ).toBeInTheDocument();
    const especializacionElements = screen.getAllByText("ESPECIALIZACION");
    expect(especializacionElements).toHaveLength(2);
  });

  it("formats price correctly", () => {
    render(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    // Check for the formatted price - the actual format is $ 150.000
    expect(screen.getByText("$ 150.000")).toBeInTheDocument();
  });

  it("formats duration correctly for hours", () => {
    render(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("40 horas")).toBeInTheDocument();
  });

  it("formats duration correctly for semesters", () => {
    render(
      <ProgramCardAny
        result={mockProgramResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("2 semestres")).toBeInTheDocument();
  });

  it("formats duration correctly for single semester", () => {
    const singleSemesterResult = {
      ...mockProgramResult,
      duration: 1,
    };

    render(
      <ProgramCardAny
        result={singleSemesterResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("1 semestre")).toBeInTheDocument();
  });

  it("formats duration correctly for single hour", () => {
    const singleHourResult = {
      ...mockCourseResult,
      duration: 1,
    };

    render(
      <ProgramCardAny
        result={singleHourResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("1 hora")).toBeInTheDocument();
  });

  it("displays tags correctly", () => {
    render(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
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

    render(
      <ProgramCardAny
        result={manyTagsResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("+3 más")).toBeInTheDocument();
  });

  it("displays modality correctly", () => {
    render(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("Virtual")).toBeInTheDocument();
  });

  it("displays presencial modality correctly", () => {
    render(
      <ProgramCardAny
        result={mockProgramResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("Presencial")).toBeInTheDocument();
  });

  it("displays hibrido modality correctly", () => {
    const hibridoResult = {
      ...mockCourseResult,
      modality: "HIBRIDO" as const,
    };

    render(
      <ProgramCardAny
        result={hibridoResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("Híbrido")).toBeInTheDocument();
  });

  it("calls onFavorite when favorite button is clicked", () => {
    render(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    const favoriteButton = screen.getByLabelText("Agregar a favoritos");
    fireEvent.click(favoriteButton);

    expect(mockOnFavorite).toHaveBeenCalledWith("1");
  });

  it("calls onLearnMore when learn more button is clicked", () => {
    render(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
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
    render(<ProgramCardAny result={mockCourseResult} />);

    expect(screen.getByText("React Fundamentals")).toBeInTheDocument();
    expect(
      screen.getByText("Learn the basics of React development"),
    ).toBeInTheDocument();
  });

  it("displays correct badge colors for different types", () => {
    const { rerender } = render(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    const courseBadge = screen.getByText("Curso");
    expect(courseBadge).toHaveClass("bg-[#4CB979]");

    const especializacionResult = {
      ...mockProgramResult,
      programType: "ESPECIALIZACION" as const,
    };

    rerender(
      <ProgramCardAny
        result={especializacionResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
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

    render(
      <ProgramCardAny
        result={noImageResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });

  it("handles image load error", () => {
    render(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    const image = screen.getByAltText("React Fundamentals");
    fireEvent.error(image);

    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });

  it("displays credits correctly", () => {
    render(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays program type as level when available", () => {
    render(
      <ProgramCardAny
        result={mockProgramResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    const especializacionElements = screen.getAllByText("ESPECIALIZACION");
    expect(especializacionElements).toHaveLength(2);
  });

  it('displays "General" as level when program type is null', () => {
    render(
      <ProgramCardAny
        result={mockCourseResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("General")).toBeInTheDocument();
  });

  it("handles empty tags string", () => {
    const noTagsResult = {
      ...mockCourseResult,
      tags: "",
    };

    render(
      <ProgramCardAny
        result={noTagsResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  it("handles tags with extra spaces", () => {
    const spacedTagsResult = {
      ...mockCourseResult,
      tags: " React , JavaScript , Frontend ",
    };

    render(
      <ProgramCardAny
        result={spacedTagsResult}
        onFavorite={mockOnFavorite}
        onLearnMore={mockOnLearnMore}
      />,
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });
});
