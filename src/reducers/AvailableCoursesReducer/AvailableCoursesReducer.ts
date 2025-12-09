import { useReducer } from "react";
import availableCoursesReducer from "./Reducer";
import { ACActionType } from "./AvailableCoursesActions";
import { ACInitialState } from "./AvailableCoursesInitialState";

import { getAllProgramCourses } from "../../services/academicCourses";
import { toProgramCourse } from "../../mappers/programCourseMapper";
import { Course, ProgramCourse, CourseSelectionPreset } from "../../model/types";

const initialState = ACInitialState;
const reducer = availableCoursesReducer;

const useAvailableCourses = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setProgramCourses = (programCourses: ProgramCourse[]) =>
    dispatch({
      type: ACActionType.INIT_PROGRAMCOURSES,
      payload: programCourses,
    });
  const setCourses = (courses: Course[]) =>
    dispatch({ type: ACActionType.INIT_COURSES, payload: courses });

  const swapCourse = (current: ProgramCourse, newCourse: Course) =>
    dispatch({
      type: ACActionType.SWAP_COURSE,
      payload: { current, newCourse },
    });

  const resetCourse = (current: ProgramCourse) =>
    dispatch({
      type: ACActionType.RESET_COURSE,
      payload: { current, newCourse: current as any },
    });

  const applyPreset = (preset: CourseSelectionPreset) => {
    // Crear un mapa de cursos disponibles para búsqueda rápida
    const coursesMap = new Map(state.courses.map((c) => [c.id, c]));
    
    dispatch({
      type: ACActionType.APPLY_PRESET,
      payload: { preset, coursesMap },
    });
  };

  const clearPreset = () =>
    dispatch({
      type: ACActionType.CLEAR_PRESET,
      payload: null,
    });

  const initializeCourses = async (name: string) => {
    try {
      const programsFetched = await getAllProgramCourses(name);
      console.log("Respuesta de la API de cursos:", programsFetched);
      const programCourses = toProgramCourse(programsFetched);
      console.log("Cursos mapeados:", programCourses);
      setProgramCourses(programCourses);
    } catch (error) {
      console.error("Error fetching program courses", error);
      setCourses([]);
    }
  };

  return {
    state,
    setCourses,
    setProgramCourses,
    swapCourse,
    resetCourse,
    applyPreset,
    clearPreset,
    initializeCourses,
  };
};

export default useAvailableCourses;
