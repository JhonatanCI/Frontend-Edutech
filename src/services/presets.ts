import { API } from "../config/axios";
import {
  UUID,
  CourseSelectionPreset,
  PresetSummary,
  CreatePresetRequest,
} from "../model/types";

/**
 * Obtiene todos los presets activos
 */
export const getAllPresets = async (): Promise<PresetSummary[]> => {
  try {
    const response = await API.get("/course-selection-presets");
    return response.data;
  } catch (error) {
    console.error("Error fetching all presets:", error);
    throw error;
  }
};

/**
 * Obtiene todos los presets de un programa específico
 * @param programId - ID del programa
 * @param includeInactive - Incluir presets inactivos (default: false)
 */
export const getPresetsByProgram = async (
  programId: UUID,
  includeInactive: boolean = false,
): Promise<PresetSummary[]> => {
  try {
    const response = await API.get(
      `/course-selection-presets/program/${programId}`,
      {
        params: { includeInactive },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching presets by program:", error);
    
    if (error.response) {
      console.error("Response error:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    }
    
    throw error;
  }
};

/**
 * Obtiene los detalles completos de un preset
 * @param presetId - ID del preset
 */
export const getPresetById = async (
  presetId: UUID,
): Promise<CourseSelectionPreset> => {
  try {
    const response = await API.get(`/course-selection-presets/${presetId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching preset by id:", error);
    throw error;
  }
};

/**
 * Carga un preset (obtiene los detalles completos para aplicar)
 * @param presetId - ID del preset a cargar
 */
export const loadPreset = async (
  presetId: UUID,
): Promise<CourseSelectionPreset> => {
  try {
    const response = await API.get(
      `/course-selection-presets/${presetId}/load`,
    );
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error loading preset:", error);
    throw error;
  }
};

/**
 * Crea un nuevo preset
 * @param preset - Datos del preset a crear
 * @param userId - ID del usuario que crea el preset
 */
export const createPreset = async (
  preset: CreatePresetRequest,
  token: string,
): Promise<CourseSelectionPreset> => {
  try {
    const response = await API.post(
      "/course-selection-presets",
      preset,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error creating preset:", error);
    throw error;
  }
};

/**
 * Actualiza un preset existente (solo admin)
 * @param presetId - ID del preset a actualizar
 * @param preset - Datos actualizados
 * @param userId - ID del usuario admin
 */
export const updatePreset = async (
  presetId: UUID,
  preset: CreatePresetRequest,
  userId: number,
): Promise<CourseSelectionPreset> => {
  try {
    const response = await API.put(
      `/course-selection-presets/${presetId}?userId=${userId}`,
      preset,
    );
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error updating preset:", error);
    throw error;
  }
};

/**
 * Elimina un preset (solo admin)
 * @param presetId - ID del preset a eliminar
 * @param userId - ID del usuario admin
 */
export const deletePreset = async (
  presetId: UUID,
  userId: number,
): Promise<void> => {
  try {
    await API.delete(
      `/course-selection-presets/${presetId}?userId=${userId}`,
    );
  } catch (error) {
    console.error("Error deleting preset:", error);
    throw error;
  }
};

/**
 * Desactiva un preset (soft delete, solo admin)
 * @param presetId - ID del preset a desactivar
 * @param userId - ID del usuario admin
 */
export const deactivatePreset = async (
  presetId: UUID,
  userId: number,
): Promise<void> => {
  try {
    await API.patch(
      `/course-selection-presets/${presetId}/deactivate?userId=${userId}`,
    );
  } catch (error) {
    console.error("Error deactivating preset:", error);
    throw error;
  }
};

/**
 * Activa un preset previamente desactivado (solo admin)
 * @param presetId - ID del preset a activar
 * @param userId - ID del usuario admin
 */
export const activatePreset = async (
  presetId: UUID,
  userId: number,
): Promise<void> => {
  try {
    await API.patch(
      `/course-selection-presets/${presetId}/activate?userId=${userId}`,
    );
  } catch (error) {
    console.error("Error activating preset:", error);
    throw error;
  }
};

/**
 * Obtiene los presets creados por un usuario específico (solo admin)
 * @param userId - ID del usuario creador
 */
export const getPresetsByCreator = async (
  userId: number,
): Promise<PresetSummary[]> => {
  try {
    const response = await API.get(
      `/course-selection-presets/creator/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching presets by creator:", error);
    throw error;
  }
};
