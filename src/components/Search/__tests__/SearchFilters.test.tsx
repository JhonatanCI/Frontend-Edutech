import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
      durationHoursRange: [1, 100],
    };
  });

  it("renders all filter sections", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);

    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("Tipo de contenido")).toBeInTheDocument();
    expect(screen.getByText("Modalidad")).toBeInTheDocument();
    expect(screen.getByText("Rango de precios")).toBeInTheDocument();
    expect(screen.getByText("Duración (semestres)")).toBeInTheDocument();
    expect(screen.getByText("Duración (horas)")).toBeInTheDocument();
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

  it("handles content type changes correctly", async () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);

    const programasCheckbox = screen.getByLabelText("Programas");
    fireEvent.click(programasCheckbox);

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...initialFilters,
        contentType: ["Programas"],
        academicLevel: [],
      });
    });
  });

  it("handles price range changes correctly", async () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);

    const priceRangeSlider = screen.getAllByRole("slider")[0];
    fireEvent.change(priceRangeSlider, { target: { value: "10000000" } });

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...initialFilters,
        priceRange: [0, 10000000],
      });
    }, { timeout: 1000 });
  });

  it("handles duration range changes correctly", async () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);

    const durationRangeSlider = screen.getAllByRole("slider")[1];
    fireEvent.change(durationRangeSlider, { target: { value: "5" } });

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...initialFilters,
        durationRange: [1, 5],
      });
    }, { timeout: 1000 });
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
      durationHoursRange: [1, 100],
    });
  });

  it("formats price correctly", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);

    expect(screen.getByText(/\$ 0/)).toBeInTheDocument();
  });

  it("toggles content type from 'Todo' to 'Programas'", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    const programas = screen.getByLabelText("Programas");
    fireEvent.click(programas);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...initialFilters,
      contentType: ["Programas"],
      academicLevel: [],
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
      academicLevel: [],
    });
  });

  it("resets to 'Todo' when all content types are deselected", () => {
    const filters = { ...initialFilters, contentType: ["Programas"] };
    render(<SearchFilters filters={filters} onFilterChange={mockOnFilterChange} />);
    const programas = screen.getByLabelText("Programas");
    fireEvent.click(programas);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...filters,
      contentType: ["Todo"],
      academicLevel: [],
    });
  });

  it("changes price range correctly", async () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    const [priceSlider] = screen.getAllByRole("slider");
    fireEvent.change(priceSlider, { target: { value: "10000000" } });
    
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...initialFilters,
        priceRange: [0, 10000000],
      });
    }, { timeout: 1000 });
  });

  it("changes duration range correctly", async () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    const sliders = screen.getAllByRole("slider");
    const durationSlider = sliders[1];
    fireEvent.change(durationSlider, { target: { value: "6" } });
    
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...initialFilters,
        durationRange: [1, 6],
      });
    }, { timeout: 1000 });
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
      durationHoursRange: [1, 100],
    });
  });

  it("displays formatted price values correctly", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText(/\$ 0/)).toBeInTheDocument();
    expect(screen.getByText(/\$ 50\.000\.000/)).toBeInTheDocument();
  });

  it("handles academic level toggling on and off", () => {
    const filters = { ...initialFilters, contentType: ["Programas"] };
    render(<SearchFilters filters={filters} onFilterChange={mockOnFilterChange} />);
    const esp = screen.getByLabelText("Especialización");
    fireEvent.click(esp);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...filters,
      academicLevel: ["Especializacion"],
    });
  });

  it("handles modality toggling on and off", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    const virtual = screen.getByLabelText("Virtual");
    fireEvent.click(virtual);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...initialFilters,
      modality: ["Virtual"],
    });
  });

  it("changes price range and duration range correctly", async () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    const sliders = screen.getAllByRole("slider");
    fireEvent.change(sliders[0], { target: { value: "10000000" } });
    
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...initialFilters,
        priceRange: [0, 10000000],
      });
    }, { timeout: 1000 });

    fireEvent.change(sliders[1], { target: { value: "6" } });
    
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...initialFilters,
        durationRange: [1, 6],
      });
    }, { timeout: 1000 });
  });

  it("handles selecting multiple academic levels", () => {
    const filters = { ...initialFilters, contentType: ["Programas"], academicLevel: ["Maestria"] };
    render(<SearchFilters filters={filters} onFilterChange={mockOnFilterChange} />);
    const doc = screen.getByLabelText("Doctorado");
    fireEvent.click(doc);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...filters,
      academicLevel: ["Maestria", "Doctorado"],
    });
  });

  it("handles edge cases for modality toggling when already selected", () => {
    const filters = { ...initialFilters, modality: ["Virtual"] };
    render(<SearchFilters filters={filters} onFilterChange={mockOnFilterChange} />);
    const virtual = screen.getByLabelText("Virtual");
    fireEvent.click(virtual);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...filters,
      modality: [],
    });
  });

  it("handles duration hours range changes correctly", async () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    const sliders = screen.getAllByRole("slider");
    const hoursSlider = sliders[2];
    fireEvent.change(hoursSlider, { target: { value: "50" } });
    
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...initialFilters,
        durationHoursRange: [1, 50],
      });
    }, { timeout: 1000 });
  });

  it("does not show academic level section when Todo is selected", () => {
    render(<SearchFilters filters={initialFilters} onFilterChange={mockOnFilterChange} />);
    expect(screen.queryByText("Nivel académico")).not.toBeInTheDocument();
  });

  it("shows academic level section when Programas is selected", () => {
    const filters = { ...initialFilters, contentType: ["Programas"] };
    render(<SearchFilters filters={filters} onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText("Nivel académico")).toBeInTheDocument();
  });
});
