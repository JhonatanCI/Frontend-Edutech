import React, { useState, useRef, useEffect } from "react";
import { UUID, PresetSummary } from "../../model/types";

interface PresetSelectorProps {
  presets: PresetSummary[];
  selectedPresetId: UUID | null;
  onSelectPreset: (presetId: UUID | null) => void;
  isLoading?: boolean;
  className?: string;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({
  presets,
  selectedPresetId,
  onSelectPreset,
  isLoading = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Obtener el preset seleccionado actual
  const selectedPreset = presets.find((p) => p.id === selectedPresetId);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (presetId: UUID | null) => {
    onSelectPreset(presetId);
    setIsOpen(false);
  };

  if (presets.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Botón selector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center justify-between w-full min-w-[300px] px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        data-testid="preset-selector"
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span className="text-left">
            {isLoading ? (
              "Cargando configuraciones..."
            ) : selectedPreset ? (
              <>
                <span className="font-semibold">{selectedPreset.name}</span>
                {selectedPreset.isDefault && (
                  <span className="ml-2 text-xs text-blue-600 font-medium">
                    (Por defecto)
                  </span>
                )}
              </>
            ) : (
              "Selecciona una configuración"
            )}
          </span>
        </div>
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto" data-testid="preset-dropdown">
          {/* Opción: Sin configuración */}
          <button
            onClick={() => handleSelect(null)}
            className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 ${
              !selectedPresetId ? "bg-blue-50 text-blue-700" : "text-gray-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Sin configuración predeterminada</span>
              {!selectedPresetId && (
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Muestra los cursos padre sin reemplazos
            </p>
          </button>

          {/* Lista de presets */}
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelect(preset.id)}
              data-testid="preset-option"
              className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 ${
                selectedPresetId === preset.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{preset.name}</span>
                    {preset.isDefault && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Por defecto
                      </span>
                    )}
                  </div>
                  {preset.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {preset.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {preset.totalCourses} curso{preset.totalCourses !== 1 ? "s" : ""}{" "}
                    configurado{preset.totalCourses !== 1 ? "s" : ""}
                  </p>
                </div>
                {selectedPresetId === preset.id && (
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PresetSelector;
