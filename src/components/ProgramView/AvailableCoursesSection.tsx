import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { FilledLine, DottedLine } from "../../assets/Icons/linesIcons";
import {
  ProgramLearningResult,
  UUID,
  ProgramCourse,
} from "../../model/types";
import ProgramCoursesSection from "./ProgramCoursesSection";
import { HabilitiesDev } from "./HabilitiesDevSection";
import { useAvailableCoursesContext } from "../../hooks/useAvailableCoursesContext";
import PresetSelector from "./PresetSelector";
import { usePresets } from "../../hooks/usePresets";
import { createPreset } from "../../services/presets";

// -----------------------------------------------------------------------------
// GuardarPresetForm
// -----------------------------------------------------------------------------

interface GuardarPresetFormProps {
  programId: UUID;
  programCourses: ProgramCourse[];
}

const GuardarPresetForm: React.FC<GuardarPresetFormProps> = ({
  programId,
  programCourses,
}) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const courseSelections = programCourses
    .filter((pc) => pc.swapped && pc.originalCourseId)
    .map((pc) => ({
      parentCourseId: pc.originalCourseId!,
      selectedChildCourseId: pc.courseId,
    }));

  const token = useSelector((state: RootState) => state.auth.token);

  const handleGuardar = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!token) throw new Error("No se encontró el usuario autenticado");
      await createPreset({
        name: nombre,
        description: descripcion,
        programId,
        courseSelections,
        isPublic: false,
      }, token);

      setSuccess(true);
      setNombre("");
      setDescripcion("");
    } catch (e: any) {
      setError(e?.message || "Error al guardar");
    }

    setLoading(false);
  };

  return (
    <div className="mt-4 mb-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          className="px-2 py-1 border border-gray-300 rounded text-sm"
          placeholder="Nombre de la configuración"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          className="px-2 py-1 border border-gray-300 rounded text-sm"
          placeholder="Descripción (opcional)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded font-semibold text-sm disabled:opacity-50"
          onClick={handleGuardar}
          disabled={loading || !nombre || courseSelections.length === 0}
        >
          {loading ? "Guardando..." : "Guardar configuración personalizada"}
        </button>

        {success && (
          <span className="text-green-600 text-xs mt-1">
            ¡Configuración guardada!
          </span>
        )}

        {error && (
          <span className="text-red-600 text-xs mt-1">{error}</span>
        )}

        {courseSelections.length === 0 && (
          <span className="text-yellow-600 text-xs mt-1">
            No hay cursos intercambiados para guardar.
          </span>
        )}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// AvailableCoursesSection
// -----------------------------------------------------------------------------

interface AvailableCoursesSectionProps {
  semesters: number;
  programLearningResult: ProgramLearningResult[];
  programId: UUID;
}

const AvailableCoursesSection: React.FC<AvailableCoursesSectionProps> = ({
  semesters,
  programLearningResult,
  programId,
}) => {
  const { state, applyPreset, clearPreset } = useAvailableCoursesContext();
  const { programCourses, currentPreset } = state;

  const {
    presets,
    selectedPreset,
    isLoading: presetsLoading,
    selectPreset,
    error: presetsError,
  } = usePresets(programId);

  // Obtener userId autenticado
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  // Logs debug
  useEffect(() => {
    console.log("🔍 ProgramId:", programId);
    console.log("📋 Presets cargados:", presets);
    console.log("⚙️ Loading presets:", presetsLoading);
    console.log("❌ Error presets:", presetsError);
  }, [programId, presets, presetsLoading, presetsError]);

  // Aplicar presets
  useEffect(() => {
    if (selectedPreset && selectedPreset.id !== currentPreset?.id) {
      applyPreset(selectedPreset);
    } else if (!selectedPreset && currentPreset) {
      clearPreset();
    }
  }, [selectedPreset?.id, currentPreset?.id]);

  if (programCourses.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div id="courses" className="h-full w-full flex flex-col px-28 pb-14 pt-24">
      {/* Título y descripción */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h2 className="text-black text-4xl font-calsans leading-tight max-w-md">
            Cursos disponibles
          </h2>
          <p className="text-black w-4/5 mb-6 mt-4">
            Nuestra oferta de cursos se destaca por su flexibilidad y
            adaptabilidad al perfil que quieras construir. Puedes intercambiar
            cursos por otros que consideres más útiles para tu formación. Un
            intercambio <b>condicionado</b> requiere que ambos cursos desarrollen
            las mismas habilidades; un intercambio <b>flexible</b> solo exige que
            tengan los mismos créditos.
          </p>
        </div>

        {/* Presets */}
        <div className="flex-shrink-0 ml-8 w-72">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Configuraciones predeterminadas
          </p>

          {presetsLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500 bg-gray-50 border border-gray-300 rounded-lg">
              Cargando configuraciones...
            </div>
          ) : presetsError ? (
            <div className="px-4 py-3 text-sm text-red-600 bg-red-50 border border-red-300 rounded-lg">
              {presetsError}
            </div>
          ) : presets.length > 0 ? (
            <>
              <PresetSelector
                presets={presets}
                selectedPresetId={selectedPreset?.id || null}
                onSelectPreset={selectPreset}
                isLoading={presetsLoading}
              />

              {userId && (
                <GuardarPresetForm
                  programId={programId}
                  programCourses={programCourses}
                />
              )}

              {selectedPreset?.courseSelections?.length ? (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-800">
                    <span className="font-semibold">
                      {selectedPreset.courseSelections.length} cursos
                    </span>{" "}
                    configurados automáticamente.
                  </p>
                </div>
              ) : selectedPreset ? (
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xs text-yellow-800">
                    Esta configuración no tiene cursos asignados.
                  </p>
                </div>
              ) : null}
            </>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 bg-gray-50 border border-gray-300 rounded-lg">
              No hay configuraciones para este programa.
            </div>
          )}
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex w-3/6 justify-between mb-8">
        <div className="flex items-center gap-4">
          <FilledLine />
          <span className="text-sm text-black">Intercambiable Condicionado</span>
        </div>

        <div className="flex items-center gap-4">
          <DottedLine />
          <span className="text-sm text-black">Intercambiable Flexible</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex w-full justify-between gap-8 wrap">
        <ProgramCoursesSection
          programCourses={programCourses}
          semesters={semesters}
        />

        {programLearningResult && (
          <HabilitiesDev
            programLearningResults={programLearningResult}
            programCourses={programCourses}
          />
        )}
      </div>
    </div>
  );
};

export default AvailableCoursesSection;
