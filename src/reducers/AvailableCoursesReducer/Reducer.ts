import { ACActionType, ACPayload } from "./AvailableCoursesActions";
import {
  AvailableCoursesAction,
  AvailableCoursesState,
} from "./AvailableCoursesTypes";
import { Course, ProgramCourse } from "../../model/types";

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
    default:
      return state;
  }
};

export default availableCoursesReducer;
