import React from "react";
import { FilterState } from "../../types/search.types";

interface SearchFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleContentTypeChange = (value: string) => {
    let newContentType = [...filters.contentType];
    let newAcademicLevel = [...filters.academicLevel];

    if (value === "Todo") {
      newContentType = ["Todo"];
      newAcademicLevel = [];
    } else {
      newContentType = newContentType.filter((item) => item !== "Todo");
      
      if (newContentType.includes(value)) {
        newContentType = newContentType.filter((item) => item !== value);
      } else {
        newContentType.push(value);
      }

      if (newContentType.length === 0) {
        newContentType = ["Todo"];
        newAcademicLevel = [];
      }

      if (!newContentType.includes("Programas")) {
        newAcademicLevel = [];
      }
    }

    onFilterChange({ ...filters, contentType: newContentType, academicLevel: newAcademicLevel });
  };

  const handleAcademicLevelChange = (value: string) => {
    const newAcademicLevel = filters.academicLevel.includes(value)
      ? filters.academicLevel.filter((item) => item !== value)
      : [...filters.academicLevel, value];
    onFilterChange({ ...filters, academicLevel: newAcademicLevel });
  };

  const handleModalityChange = (value: string) => {
    const newModality = filters.modality.includes(value)
      ? filters.modality.filter((item) => item !== value)
      : [...filters.modality, value];
    onFilterChange({ ...filters, modality: newModality });
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    onFilterChange({ ...filters, priceRange: value });
  };

  const handleDurationRangeChange = (value: [number, number]) => {
    onFilterChange({ ...filters, durationRange: value });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const clearFilters = () => {
    const resetFilters: FilterState = {
      contentType: ["Todo"],
      academicLevel: [],
      modality: [],
      priceRange: [0, 50000000],
      durationRange: [1, 10],
    };
    onFilterChange(resetFilters);
  };

  const showAcademicLevel = filters.contentType.includes("Programas") && !filters.contentType.includes("Todo");

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full flex flex-col shadow-lg">
      <div className="p-6 flex-1 overflow-y-auto scrollbar-blue scroll-smooth bg-white">
        <h3 className="text-lg font-semibold mb-6 text-black">Filtros</h3>

        {/* Sección: Tipo de contenido */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-black">
            Tipo de contenido
          </h4>
          <div className="space-y-2">
            {["Todo", "Programas", "Cursos"].map((type) => (
              <label key={type} className="flex items-center cursor-pointer">
                <input
                  type={type === "Todo" ? "radio" : "checkbox"}
                  name="contentType"
                  checked={filters.contentType.includes(type)}
                  onChange={() => handleContentTypeChange(type)}
                  className="mr-3 accent-primaryBlue"
                />
                <span className="text-sm text-black">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sección: Nivel académico (condicional) */}
        {showAcademicLevel && (
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3 text-black">
              Nivel académico
            </h4>
            <div className="space-y-2">
              {["Especializacion", "Maestria", "Doctorado", "Certificacion"].map((level) => (
                <label key={level} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.academicLevel.includes(level)}
                    onChange={() => handleAcademicLevelChange(level)}
                    className="mr-3 accent-primaryBlue"
                  />
                  <span className="text-sm text-black">
                    {level === "Especializacion" ? "Especialización" : 
                     level === "Maestria" ? "Maestría" : 
                     level === "Certificacion" ? "Certificación" : level}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Sección: Modalidad */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-black">Modalidad</h4>
          <div className="space-y-2">
            {["Virtual", "Presencial", "Hibrido"].map((modality) => (
              <label key={modality} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.modality.includes(modality)}
                  onChange={() => handleModalityChange(modality)}
                  className="mr-3 accent-primaryBlue"
                />
                <span className="text-sm text-black">
                  {modality === "Hibrido" ? "Híbrido" : modality}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sección: Rango de precios */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-black">
            Rango de precios
          </h4>
          <div className="px-2">
            <input
              type="range"
              min="0"
              max="50000000"
              step="1000000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handlePriceRangeChange([
                  filters.priceRange[0],
                  parseInt(e.target.value),
                ])
              }
              className="w-full mb-2 accent-primaryBlue"
            />
            <div className="flex justify-between text-xs text-[#88898C]">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Sección: Duración */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-black">
            Duración (semestres)
          </h4>
          <div className="px-2">
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={filters.durationRange[1]}
              onChange={(e) =>
                handleDurationRangeChange([
                  filters.durationRange[0],
                  parseInt(e.target.value),
                ])
              }
              className="w-full mb-2 accent-primaryBlue"
            />
            <div className="flex justify-between text-xs text-[#88898C]">
              <span>{filters.durationRange[0]}</span>
              <span>{filters.durationRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Botón para limpiar filtros */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={clearFilters}
            className="w-full bg-primaryBlue text-white py-2 px-4 hover:bg-primaryBlue-dark transition-colors duration-200 text-sm font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;