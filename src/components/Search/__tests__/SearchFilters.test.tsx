import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SearchFilters from "../SearchFilters";

describe("SearchFilters", () => {
  let mockOnFilterChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnFilterChange = vi.fn();
  });

  it("renders all filter sections", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("Tipo de contenido")).toBeInTheDocument();
    expect(screen.getByText("Nivel académico")).toBeInTheDocument();
    expect(screen.getByText("Modalidad")).toBeInTheDocument();
    expect(screen.getByText("Rango de precios")).toBeInTheDocument();
    expect(screen.getByText("Duración")).toBeInTheDocument();
    expect(screen.getByText("Resultados de aprendizaje")).toBeInTheDocument();
  });

  it("renders content type options", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    expect(screen.getByLabelText("Todo")).toBeInTheDocument();
    expect(screen.getByLabelText("Programas")).toBeInTheDocument();
    expect(screen.getByLabelText("Cursos")).toBeInTheDocument();
  });

  it("renders academic level options", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    expect(screen.getByLabelText("Especialización")).toBeInTheDocument();
    expect(screen.getByLabelText("Maestría")).toBeInTheDocument();
    expect(screen.getByLabelText("Doctorado")).toBeInTheDocument();
  });

  it("renders modality options", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    expect(screen.getByLabelText("Virtual")).toBeInTheDocument();
    expect(screen.getByLabelText("Presencial")).toBeInTheDocument();
    expect(screen.getByLabelText("Híbrido")).toBeInTheDocument();
  });

  it("handles content type changes correctly", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    const programasCheckbox = screen.getByLabelText("Programas");
    fireEvent.click(programasCheckbox);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Programas"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
      learningOutcomes: [],
    });

    mockOnFilterChange.mockClear();

    const cursosCheckbox = screen.getByLabelText("Cursos");
    fireEvent.click(cursosCheckbox);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Programas", "Cursos"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
      learningOutcomes: [],
    });
  });

  it("handles academic level changes correctly", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    const especializacionCheckbox = screen.getByLabelText("Especialización");
    fireEvent.click(especializacionCheckbox);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Todo"],
      academicLevel: ["Especialización"],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
      learningOutcomes: [],
    });

    fireEvent.click(especializacionCheckbox);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Todo"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
      learningOutcomes: [],
    });
  });

  it("handles modality changes correctly", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    const virtualCheckbox = screen.getByLabelText("Virtual");
    fireEvent.click(virtualCheckbox);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Todo"],
      academicLevel: [],
      modality: ["Virtual"],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
      learningOutcomes: [],
    });
  });

  it("handles price range changes correctly", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    const priceRangeSlider = screen.getAllByRole("slider")[0];
    fireEvent.change(priceRangeSlider, { target: { value: "10000000" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Todo"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 10000000],
      durationRange: [1, 10],
      learningOutcomes: [],
    });
  });

  it("handles duration range changes correctly", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    const durationRangeSlider = screen.getAllByRole("slider")[1];
    fireEvent.change(durationRangeSlider, { target: { value: "5" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Todo"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 5],
      learningOutcomes: [],
    });
  });

  it("handles learning outcome toggles correctly", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    const liderazgoButton = screen.getByText("Liderazgo");
    fireEvent.click(liderazgoButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Todo"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
      learningOutcomes: ["Liderazgo"],
    });

    fireEvent.click(liderazgoButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Todo"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
      learningOutcomes: [],
    });
  });

  it("renders all learning outcome buttons", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    const expectedOutcomes = [
      "Liderazgo",
      "Diseño de proyectos",
      "Marketing Digital",
      "Análisis de datos",
      "Machine Learning",
      "Python",
      "Java",
      "Scrum",
      "Agilidad",
      "Innovación",
      "Metodologías ágiles",
      "Gestión financiera",
      "DevOps",
      "SEO",
      "Social Media",
      "Analítica",
    ];

    expectedOutcomes.forEach((outcome) => {
      expect(screen.getByText(outcome)).toBeInTheDocument();
    });
  });

  it("handles clear filters button", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    const clearButton = screen.getByText("Limpiar filtros");
    fireEvent.click(clearButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Todo"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
      learningOutcomes: [],
    });
  });

  it("formats price correctly", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    const priceDisplay = screen.getByText("$ 0");
    expect(priceDisplay).toBeInTheDocument();
  });

  it("works without onFilterChange callback", () => {
    render(<SearchFilters />);

    const todoRadio = screen.getByLabelText("Todo");
    expect(() => fireEvent.click(todoRadio)).not.toThrow();
  });

  it("handles multiple content type selections correctly", () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    const programasCheckbox = screen.getByLabelText("Programas");
    fireEvent.click(programasCheckbox);

    mockOnFilterChange.mockClear();

    const cursosCheckbox = screen.getByLabelText("Cursos");
    fireEvent.click(cursosCheckbox);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Programas", "Cursos"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
      learningOutcomes: [],
    });
  });

  it('resets to "Todo" when all content types are deselected', () => {
    render(<SearchFilters onFilterChange={mockOnFilterChange} />);

    const programasCheckbox = screen.getByLabelText("Programas");
    fireEvent.click(programasCheckbox);

    fireEvent.click(programasCheckbox);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Todo"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
      learningOutcomes: [],
    });
  });
});
