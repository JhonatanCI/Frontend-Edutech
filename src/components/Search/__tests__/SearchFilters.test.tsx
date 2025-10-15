import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SearchFilters from "../SearchFilters";
import React from "react";
import { FilterState } from "../../../types/search.types";

describe("SearchFilters", () => {
  let mockOnFilterChange: ReturnType<typeof vi.fn>;
  let initialFilters: FilterState;

  beforeEach(() => {
    mockOnFilterChange = vi.fn();
    initialFilters = {
      contentType: ["Todo"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
    };
  });

  it("renders all filter sections", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);

    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("Tipo de contenido")).toBeInTheDocument();
    expect(screen.getByText("Nivel académico")).toBeInTheDocument();
    expect(screen.getByText("Modalidad")).toBeInTheDocument();
    expect(screen.getByText("Rango de precios")).toBeInTheDocument();
    expect(screen.getByText("Duración (semestres)")).toBeInTheDocument();
  });

  it("renders content type options", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);

    expect(screen.getByLabelText("Todo")).toBeInTheDocument();
    expect(screen.getByLabelText("Programas")).toBeInTheDocument();
    expect(screen.getByLabelText("Cursos")).toBeInTheDocument();
  });

  it("renders modality options", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);

    expect(screen.getByLabelText("Virtual")).toBeInTheDocument();
    expect(screen.getByLabelText("Presencial")).toBeInTheDocument();
    expect(screen.getByLabelText("Híbrido")).toBeInTheDocument();
  });

  it("handles content type changes correctly", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);

    const programasCheckbox = screen.getByLabelText("Programas");
    fireEvent.click(programasCheckbox);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...initialFilters,
      contentType: ["Programas"],
    });
  });

  it("handles price range changes correctly", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);

    const priceRangeSlider = screen.getAllByRole("slider")[0];
    fireEvent.change(priceRangeSlider, { target: { value: "10000000" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...initialFilters,
      priceRange: [0, 10000000],
    });
  });

  it("handles duration range changes correctly", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);

    const durationRangeSlider = screen.getAllByRole("slider")[1];
    fireEvent.change(durationRangeSlider, { target: { value: "5" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...initialFilters,
      durationRange: [1, 5],
    });
  });

  it("handles clear filters button", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);

    const clearButton = screen.getByText("Limpiar filtros");
    fireEvent.click(clearButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Todo"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
    });
  });

  it("formats price correctly", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);

    expect(screen.getByText("$ 0")).toBeInTheDocument(); // espacio no-break del Intl
  });
  it("renders all main sections", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("Tipo de contenido")).toBeInTheDocument();
    expect(screen.getByText("Nivel académico")).toBeInTheDocument();
    expect(screen.getByText("Modalidad")).toBeInTheDocument();
    expect(screen.getByText("Rango de precios")).toBeInTheDocument();
    expect(screen.getByText("Duración (semestres)")).toBeInTheDocument();
  });

  it("toggles content type from 'Todo' to 'Programas'", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    const programas = screen.getByLabelText("Programas");
    fireEvent.click(programas);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...initialFilters,
      contentType: ["Programas"],
    });
  });

  it("removes 'Todo' when another content type is selected", () => {
    const filters = { ...initialFilters, contentType: ["Todo"] };
    render(<SearchFilters filters={filters} onFilterChange={mockOnFilterChange} />);
    const cursos = screen.getByLabelText("Cursos");
    fireEvent.click(cursos);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...filters,
      contentType: ["Cursos"],
    });
  });

  it("resets to 'Todo' when all content types are deselected", () => {
    const filters = { ...initialFilters, contentType: ["Programas"] };
    render(<SearchFilters filters={filters} onFilterChange={mockOnFilterChange} />);
    const programas = screen.getByLabelText("Programas");
    fireEvent.click(programas); // deselecciona
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...filters,
      contentType: ["Todo"],
    });
  });

  it("changes price range correctly", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    const [priceSlider] = screen.getAllByRole("slider");
    fireEvent.change(priceSlider, { target: { value: "10000000" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...initialFilters,
      priceRange: [0, 10000000],
    });
  });

  it("changes duration range correctly", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    const sliders = screen.getAllByRole("slider");
    const durationSlider = sliders[1];
    fireEvent.change(durationSlider, { target: { value: "6" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...initialFilters,
      durationRange: [1, 6],
    });
  });

  it("clears all filters on button click", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    fireEvent.click(screen.getByText("Limpiar filtros"));
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Todo"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
    });
  });

  it("displays formatted price values correctly", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText("$ 0")).toBeInTheDocument();
    expect(screen.getByText("$ 50.000.000")).toBeInTheDocument();
  });

  it("handles selecting a content type from Todo to Programas", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    const programas = screen.getByLabelText("Programas");
    fireEvent.click(programas);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...initialFilters,
      contentType: ["Programas"],
    });
  });

  it("handles deselecting a content type to reset to Todo", () => {
    const filters = { ...initialFilters, contentType: ["Programas"] };
    render(<SearchFilters filters={filters} onFilterChange={mockOnFilterChange} />);
    const programas = screen.getByLabelText("Programas");
    fireEvent.click(programas);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...filters,
      contentType: ["Todo"],
    });
  });

  it("handles multiple content type selections removing Todo", () => {
    const filters = { ...initialFilters, contentType: ["Todo"] };
    render(<SearchFilters filters={filters} onFilterChange={mockOnFilterChange} />);
    const cursos = screen.getByLabelText("Cursos");
    fireEvent.click(cursos);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...filters,
      contentType: ["Cursos"],
    });
  });

  it("handles academic level toggling on and off", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    const esp = screen.getByLabelText("Especialización");
    fireEvent.click(esp);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...initialFilters,
      academicLevel: ["Especializacion"],
    });
    fireEvent.click(esp);
    expect(mockOnFilterChange).toHaveBeenCalledTimes(2);
  });

  it("handles modality toggling on and off", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    const virtual = screen.getByLabelText("Virtual");
    fireEvent.click(virtual);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...initialFilters,
      modality: ["Virtual"],
    });
    fireEvent.click(virtual);
    expect(mockOnFilterChange).toHaveBeenCalledTimes(2);
  });

  it("changes price range and duration range correctly", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    const sliders = screen.getAllByRole("slider");
    fireEvent.change(sliders[0], { target: { value: "10000000" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...initialFilters,
      priceRange: [0, 10000000],
    });
    fireEvent.change(sliders[1], { target: { value: "6" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...initialFilters,
      durationRange: [1, 6],
    });
  });

  it("calls clearFilters when clicking 'Limpiar filtros'", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    fireEvent.click(screen.getByText("Limpiar filtros"));
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      contentType: ["Todo"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
    });
  });

  it("formats price display correctly", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText("$ 0")).toBeInTheDocument(); // Intl usa espacio no-break
    expect(screen.getByText("$ 50.000.000")).toBeInTheDocument();
  });

  it("handles edge cases for modality toggling when already selected", () => {
    const filters = { ...initialFilters, modality: ["Virtual"] };
    render(<SearchFilters filters={filters} onFilterChange={mockOnFilterChange} />);
    const virtual = screen.getByLabelText("Virtual");
    fireEvent.click(virtual);
    expect(mockOnFilterChange).toHaveBeenCalled();
  });

  it("handles selecting multiple academic levels", () => {
    const filters = { ...initialFilters, academicLevel: ["Maestria"] };
    render(<SearchFilters filters={filters} onFilterChange={mockOnFilterChange} />);
    const doc = screen.getByLabelText("Doctorado");
    fireEvent.click(doc);
    expect(mockOnFilterChange).toHaveBeenCalled();
  });


});
