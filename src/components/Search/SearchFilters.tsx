import React, { useState, useEffect, useRef } from "react";
import { FilterState } from "../../types/search.types";

interface SearchFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);
  const [localDurationRange, setLocalDurationRange] = useState(filters.durationRange);
  const [localDurationHoursRange, setLocalDurationHoursRange] = useState(
    filters.durationHoursRange || [1, 100]
  );
  
  const priceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const durationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const durationHoursTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalPriceRange(filters.priceRange);
  }, [filters.priceRange]);

  useEffect(() => {
    setLocalDurationRange(filters.durationRange);
  }, [filters.durationRange]);

  useEffect(() => {
    setLocalDurationHoursRange(filters.durationHoursRange || [1, 100]);
  }, [filters.durationHoursRange]);

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
    const adjustedValue: [number, number] = 
      value[1] === 0 ? [0, 1000000] : value;
    
    setLocalPriceRange(adjustedValue);
    
    if (priceTimeoutRef.current) {
      clearTimeout(priceTimeoutRef.current);
    }
    
    priceTimeoutRef.current = setTimeout(() => {
      onFilterChange({ ...filters, priceRange: adjustedValue });
    }, 500);
  };

  const handleDurationRangeChange = (value: [number, number]) => {
    setLocalDurationRange(value);
    
    if (durationTimeoutRef.current) {
      clearTimeout(durationTimeoutRef.current);
    }
    
    durationTimeoutRef.current = setTimeout(() => {
      onFilterChange({ ...filters, durationRange: value });
    }, 500);
  };

  const handleDurationHoursRangeChange = (value: [number, number]) => {
    setLocalDurationHoursRange(value);
    
    if (durationHoursTimeoutRef.current) {
      clearTimeout(durationHoursTimeoutRef.current);
    }
    
    durationHoursTimeoutRef.current = setTimeout(() => {
      onFilterChange({ ...filters, durationHoursRange: value });
    }, 500);
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
      durationHoursRange: [1, 100],
    };
    onFilterChange(resetFilters);
  };

  const showAcademicLevel = filters.contentType.includes("Programas") && !filters.contentType.includes("Todo");
  
  const showSemestersDuration = 
    filters.contentType.includes("Todo") || 
    filters.contentType.includes("Programas");
  
  const showHoursDuration = 
    filters.contentType.includes("Todo") || 
    filters.contentType.includes("Cursos");

  const sectionClass = "bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow";
  const titleClass = "text-base font-semibold mb-4 text-gray-800";

  return (
    <div className="w-80 bg-gradient-to-b from-gray-50 to-white border-r border-gray-300 h-full flex flex-col shadow-xl">
      <div className="p-6 flex-1 overflow-y-auto scrollbar-blue scroll-smooth">
        <h3 className="text-2xl font-bold mb-8 text-gray-800 border-b-2 border-primaryBlue pb-3">Filtros</h3>

        {/* Sección: Tipo de contenido */}
        <div className={`${sectionClass} mb-4`}>
          <h4 className={titleClass}>
            Tipo de contenido
          </h4>
          <div className="space-y-3">
            {["Todo", "Programas", "Cursos"].map((type) => (
              <label key={type} className="flex items-center cursor-pointer">
                <input
                  type={type === "Todo" ? "radio" : "checkbox"}
                  name="contentType"
                  checked={filters.contentType.includes(type)}
                  onChange={() => handleContentTypeChange(type)}
                  className="mr-3 accent-primaryBlue"
                />
                <span className="text-base text-black">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sección: Nivel académico (condicional) */}
        {showAcademicLevel && (
          <div className={`${sectionClass} mb-4`}>
            <h4 className={titleClass}>
              Nivel académico
            </h4>
            <div className="space-y-3">
              {["Especializacion", "Maestria", "Doctorado", "Certificacion"].map((level) => (
                <label key={level} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.academicLevel.includes(level)}
                    onChange={() => handleAcademicLevelChange(level)}
                    className="mr-3 accent-primaryBlue"
                  />
                  <span className="text-base text-black">
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
        <div className={`${sectionClass} mb-4`}>
          <h4 className={titleClass}>Modalidad</h4>
          <div className="space-y-3">
            {["Virtual", "Presencial", "Hibrido"].map((modality) => (
              <label key={modality} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.modality.includes(modality)}
                  onChange={() => handleModalityChange(modality)}
                  className="mr-3 accent-primaryBlue"
                />
                <span className="text-base text-black">
                  {modality === "Hibrido" ? "Híbrido" : modality}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sección: Rango de precios */}
        <div className={`${sectionClass} mb-4`}>
          <h4 className={titleClass}>
            Rango de precios
          </h4>
          <div className="px-2">
            <input
              type="range"
              min="1000000"
              max="50000000"
              step="1000000"
              value={localPriceRange[1]}
              onChange={(e) =>
                handlePriceRangeChange([
                  localPriceRange[0],
                  parseInt(e.target.value),
                ])
              }
              className="w-full mb-3 accent-primaryBlue"
            />
            <div className="flex justify-between text-sm text-[#88898C]">
              <span>{formatPrice(localPriceRange[0])}</span>
              <span>{formatPrice(localPriceRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Sección: Duración en semestres (condicional) */}
        {showSemestersDuration && (
          <div className={`${sectionClass} mb-4`}>
            <h4 className={titleClass}>
              Duración (semestres)
            </h4>
            <div className="px-2">
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={localDurationRange[1]}
                onChange={(e) =>
                  handleDurationRangeChange([
                    localDurationRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-full mb-3 accent-primaryBlue"
              />
              <div className="flex justify-between text-sm text-[#88898C]">
                <span>{localDurationRange[0]}</span>
                <span>{localDurationRange[1]}</span>
              </div>
            </div>
          </div>
        )}

        {/* Sección: Duración en horas (condicional) */}
        {showHoursDuration && (
          <div className={`${sectionClass} mb-4`}>
            <h4 className={titleClass}>
              Duración (horas)
            </h4>
            <div className="px-2">
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={localDurationHoursRange[1]}
                onChange={(e) =>
                  handleDurationHoursRangeChange([
                    localDurationHoursRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-full mb-3 accent-primaryBlue"
              />
              <div className="flex justify-between text-sm text-[#88898C]">
                <span>{localDurationHoursRange[0]}h</span>
                <span>{localDurationHoursRange[1]}h</span>
              </div>
            </div>
          </div>
        )}

        {/* Botón para limpiar filtros */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={clearFilters}
            className="w-full bg-primaryBlue text-white py-2 px-4 hover:bg-primaryBlue-dark transition-colors duration-200 text-base font-medium rounded"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;