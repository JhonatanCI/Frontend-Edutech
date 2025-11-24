import { useState, useEffect, useCallback } from "react";
import {
  UUID,
  CourseSelectionPreset,
  PresetSummary,
} from "../model/types";
import { getPresetsByProgram, loadPreset } from "../services/presets";

interface UsePresetsResult {
  presets: PresetSummary[];
  selectedPreset: CourseSelectionPreset | null;
  isLoading: boolean;
  error: string | null;
  selectPreset: (presetId: UUID | null) => Promise<void>;
  refreshPresets: () => Promise<void>;
}

/**
 * Hook para manejar la selección y carga de presets de un programa
 * @param programId - ID del programa para el cual cargar presets
 */
export const usePresets = (programId: UUID | null): UsePresetsResult => {
  const [presets, setPresets] = useState<PresetSummary[]>([]);
  const [selectedPreset, setSelectedPreset] =
    useState<CourseSelectionPreset | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carga todos los presets disponibles para el programa
   */
  const loadPresets = useCallback(async () => {
    if (!programId) {
      console.log("⚠️ usePresets: No programId provided");
      setPresets([]);
      return;
    }

    console.log("🔄 usePresets: Loading presets for program:", programId);
    setIsLoading(true);
    setError(null);

    try {
      const fetchedPresets = await getPresetsByProgram(programId, false);
      console.log("✅ usePresets: Presets loaded:", fetchedPresets);
      setPresets(fetchedPresets);
    } catch (err: any) {
      console.error("❌ usePresets: Error loading presets:", err);
      
      // Manejar error 500 del backend
      if (err.response?.status === 500) {
        setError("El servidor está experimentando problemas. Por favor, intenta más tarde.");
        console.warn("⚠️ Backend retornó error 500 - endpoint existe pero está fallando");
      } else if (err.response?.status === 404) {
        setError("No se encontraron configuraciones para este programa");
      } else {
        setError("No se pudieron cargar las configuraciones predeterminadas");
      }
      
      setPresets([]);
    } finally {
      setIsLoading(false);
    }
  }, [programId]);

  /**
   * Selecciona y carga un preset específico
   * @param presetId - ID del preset a cargar (null para deseleccionar)
   */
  const selectPreset = useCallback(async (presetId: UUID | null) => {
    if (!presetId) {
      setSelectedPreset(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const preset = await loadPreset(presetId);
      
      // Validar y normalizar los datos del preset
      const normalizedPreset = {
        ...preset,
        courseSelections: preset.courseSelections || [],
      };
      
      console.log("📦 Preset loaded:", normalizedPreset);
      console.log("📊 Course selections:", normalizedPreset.courseSelections);
      
      setSelectedPreset(normalizedPreset);
    } catch (err) {
      console.error("Error loading preset details:", err);
      setError("No se pudo cargar la configuración seleccionada");
      setSelectedPreset(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresca la lista de presets
   */
  const refreshPresets = useCallback(async () => {
    await loadPresets();
  }, [loadPresets]);

  // Cargar presets al montar o cuando cambia el programId
  useEffect(() => {
    loadPresets();
  }, [loadPresets]);

  // Buscar y seleccionar preset default automáticamente
  useEffect(() => {
    if (presets.length > 0 && !selectedPreset) {
      const defaultPreset = presets.find((p) => p.isDefault);
      if (defaultPreset) {
        selectPreset(defaultPreset.id);
      }
    }
  }, [presets, selectedPreset, selectPreset]);

  return {
    presets,
    selectedPreset,
    isLoading,
    error,
    selectPreset,
    refreshPresets,
  };
};
