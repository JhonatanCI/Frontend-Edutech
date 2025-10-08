import React, { useState } from "react";

interface SearchFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  contentType: string[];
  academicLevel: string[];
  modality: string[];
  priceRange: [number, number];
  durationRange: [number, number];
  learningOutcomes: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    contentType: ["Todo"],
    academicLevel: [],
    modality: [],
    priceRange: [0, 50000000],
    durationRange: [1, 10],
    learningOutcomes: [],
  });

  const handleContentTypeChange = (value: string) => {
    let newContentType = [...filters.contentType];

    if (value === "Todo") {
      newContentType = ["Todo"];
    } else {
      newContentType = newContentType.filter((item) => item !== "Todo");
      if (newContentType.includes(value)) {
        newContentType = newContentType.filter((item) => item !== value);
      } else {
        newContentType.push(value);
      }

      if (newContentType.length === 0) {
        newContentType = ["Todo"];
      }
    }

    const newFilters = { ...filters, contentType: newContentType };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleAcademicLevelChange = (value: string) => {
    const newAcademicLevel = filters.academicLevel.includes(value)
      ? filters.academicLevel.filter((item) => item !== value)
      : [...filters.academicLevel, value];

    const newFilters = { ...filters, academicLevel: newAcademicLevel };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleModalityChange = (value: string) => {
    const newModality = filters.modality.includes(value)
      ? filters.modality.filter((item) => item !== value)
      : [...filters.modality, value];

    const newFilters = { ...filters, modality: newModality };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    const newFilters = { ...filters, priceRange: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleDurationRangeChange = (value: [number, number]) => {
    const newFilters = { ...filters, durationRange: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleLearningOutcomeToggle = (value: string) => {
    const newLearningOutcomes = filters.learningOutcomes.includes(value)
      ? filters.learningOutcomes.filter((item) => item !== value)
      : [...filters.learningOutcomes, value];

    const newFilters = { ...filters, learningOutcomes: newLearningOutcomes };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const learningOutcomes = [
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

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full flex flex-col shadow-lg">
      <div className="p-6 flex-1 overflow-y-auto scrollbar-blue scroll-smooth bg-white">
        <h3 className="text-lg font-semibold mb-6 text-black">Filtros</h3>

        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-black">
            Tipo de contenido
          </h4>
          <div className="space-y-2">
            {["Todo", "Programas", "Cursos"].map((type) => (
              <label key={type} className="flex items-center">
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

        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-black">
            Nivel académico
          </h4>
          <div className="space-y-2">
            {["Especialización", "Maestría", "Doctorado"].map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.academicLevel.includes(level)}
                  onChange={() => handleAcademicLevelChange(level)}
                  className="mr-3 accent-primaryBlue"
                />
                <span className="text-sm text-black">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-black">Modalidad</h4>
          <div className="space-y-2">
            {["Virtual", "Presencial", "Híbrido"].map((modality) => (
              <label key={modality} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.modality.includes(modality)}
                  onChange={() => handleModalityChange(modality)}
                  className="mr-3 accent-primaryBlue"
                />
                <span className="text-sm text-black">{modality}</span>
              </label>
            ))}
          </div>
        </div>

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

        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-black">Duración</h4>
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

        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-black">
            Resultados de aprendizaje
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {learningOutcomes.map((outcome) => (
              <button
                key={outcome}
                onClick={() => handleLearningOutcomeToggle(outcome)}
                className={`px-2 py-1 rounded text-xs transition-colors duration-200 ${
                  filters.learningOutcomes.includes(outcome)
                    ? "bg-primaryBlue text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {outcome}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              const resetFilters: FilterState = {
                contentType: ["Todo"],
                academicLevel: [],
                modality: [],
                priceRange: [0, 50000000] as [number, number],
                durationRange: [1, 10] as [number, number],
                learningOutcomes: [],
              };
              setFilters(resetFilters);
              onFilterChange?.(resetFilters);
            }}
            className="w-full bg-primaryBlue text-white py-2 px-4 rounded-md hover:bg-primaryBlue-dark transition-colors duration-200 text-sm font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
