import { ACActionType, ACPayload, ACPresetPayload } from "./AvailableCoursesActions";
import {
  AvailableCoursesAction,
  AvailableCoursesState,
} from "./AvailableCoursesTypes";
import { Course, ProgramCourse, CourseSelectionPreset } from "../../model/types";

const availableCoursesReducer = (
  state: AvailableCoursesState,
  action: AvailableCoursesAction,
) => {
  const { type, payload } = action;

  switch (type) {
  case ACActionType.INIT_PROGRAMCOURSES:
    return {
      ...state,
      programCourses: payload as ProgramCourse[],
    };
  case ACActionType.INIT_COURSES:
    return {
      ...state,
      courses: payload as Course[],
    };
  case ACActionType.SWAP_COURSE: {
    const { current, newCourse } = payload as ACPayload;
    return {
      ...state,
      programCourses: state.programCourses.map((pc) => {
        if (pc.courseId === current.courseId) {
          return {
            ...pc,
            // Guardar originales solo la primera vez
            originalCourseId: pc.originalCourseId ?? pc.courseId,
            originalName: pc.originalName ?? pc.name,
            originalDescription: pc.originalDescription ?? pc.description,
            originalCredits: pc.originalCredits ?? pc.credits,
            // Actualizar visibles
            name: newCourse.name,
            description: newCourse.description,
            credits: newCourse.credits,
            courseId: newCourse.id,
            swapped: true,
            // NO tocamos learningResultsContribution para mantener asociación original
          };
        }
        return pc;
      }),
    };
  }
  case ACActionType.RESET_COURSE: {
    const currentPc = (payload as ACPayload).current; // usamos sólo current
    return {
      ...state,
      programCourses: state.programCourses.map((pc) => {
        // Puede llegarnos el objeto ya swappeado (courseId = newCourse.id) o el original
        const match =
            pc.courseId === currentPc.courseId ||
            pc.originalCourseId === currentPc.courseId;
        if (match && pc.originalCourseId) {
          return {
            ...pc,
            courseId: pc.originalCourseId,
            name: pc.originalName ?? pc.name,
            description: pc.originalDescription ?? pc.description,
            credits: pc.originalCredits ?? pc.credits,
            swapped: false,
            originalCourseId: undefined,
            originalName: undefined,
            originalDescription: undefined,
            originalCredits: undefined,
          };
        }
        return pc;
      }),
    };
  }
  case ACActionType.APPLY_PRESET: {
    const { preset, coursesMap } = payload as ACPresetPayload;
    
    console.log("🔧 APPLY_PRESET - Preset:", preset.name);
    console.log("🔧 APPLY_PRESET - Courses map size:", coursesMap.size);
    console.log("🔧 APPLY_PRESET - Selections:", preset.courseSelections);
    console.log("🔧 APPLY_PRESET - Current programCourses:", state.programCourses);
    
    // Validar que courseSelections exista y no sea null
    if (!preset.courseSelections || preset.courseSelections.length === 0) {
      console.warn("⚠️ APPLY_PRESET - El preset no tiene courseSelections");
      return {
        ...state,
        currentPreset: preset,
      };
    }
    
    return {
      ...state,
      currentPreset: preset,
      programCourses: state.programCourses.map((pc) => {
        // Buscar si este curso padre tiene una selección en el preset
        const selection = preset.courseSelections.find(
          (sel) => sel.parentCourseId === pc.courseId
        );
        
        if (selection) {
          console.log(`🔄 Encontrada selección para curso ${pc.name}:`, selection);
          const newCourse = coursesMap.get(selection.selectedChildCourseId);
          
          if (newCourse) {
            console.log(`✅ Swapping ${pc.name} -> ${newCourse.name}`);
            return {
              ...pc,
              // Guardar originales
              originalCourseId: pc.courseId,
              originalName: pc.name,
              originalDescription: pc.description,
              originalCredits: pc.credits,
              // Aplicar swap
              courseId: newCourse.id,
              name: newCourse.name,
              description: newCourse.description,
              credits: newCourse.credits,
              swapped: true,
            };
          } else {
            console.warn(`⚠️ No se encontró curso hijo con ID: ${selection.selectedChildCourseId}`);
          }
        }
        
        return pc;
      }),
    };
  }
  case ACActionType.CLEAR_PRESET: {
    return {
      ...state,
      currentPreset: null,
      programCourses: state.programCourses.map((pc) => {
        // Restaurar todos los cursos que fueron swappeados
        if (pc.swapped && pc.originalCourseId) {
          return {
            ...pc,
            courseId: pc.originalCourseId,
            name: pc.originalName ?? pc.name,
            description: pc.originalDescription ?? pc.description,
            credits: pc.originalCredits ?? pc.credits,
            swapped: false,
            originalCourseId: undefined,
            originalName: undefined,
            originalDescription: undefined,
            originalCredits: undefined,
          };
        }
        return pc;
      }),
    };
  }
  default:
    return state;
  }
};

export default availableCoursesReducer;
