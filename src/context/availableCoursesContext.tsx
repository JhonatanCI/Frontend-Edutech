import { createContext, ReactNode, useEffect } from "react";
import { AvailableCoursesState } from "../reducers/AvailableCoursesReducer/AvailableCoursesTypes";
import useAvailableCourses from "../reducers/AvailableCoursesReducer/AvailableCoursesReducer";
import { Course, ProgramCourse, CourseSelectionPreset } from "../model/types";
import { getAllCourses } from "../services/academicCourses";

interface AvailableCoursesProviderProps {
  children: ReactNode;
}

export type AvailableCoursesContextType = {
  state: AvailableCoursesState;
  setProgramCourses: (courses: ProgramCourse[]) => void;
  swapCourse: (current: ProgramCourse, newCourse: Course) => void;
  resetCourse: (current: ProgramCourse) => void;
  initializeCourses: (name: string) => Promise<void>;
  applyPreset: (preset: CourseSelectionPreset) => void;
  clearPreset: () => void;
};

const AvailableCoursesContext = createContext<
  AvailableCoursesContextType | undefined
>(undefined);

const AvailableCoursesProvider = ({
  children,
}: AvailableCoursesProviderProps) => {
  const {
    state,
    setProgramCourses,
    setCourses,
    swapCourse,
    resetCourse,
    initializeCourses,
    applyPreset,
    clearPreset,
  } = useAvailableCourses();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        setCourses(response);
      } catch (error) {
        console.error("No se pudo cargar los cursos");
      }
    };

    fetchCourses();
  }, []);

  return (
    <AvailableCoursesContext.Provider
      value={{
        state,
        setProgramCourses,
        swapCourse,
        resetCourse,
        initializeCourses,
        applyPreset,
        clearPreset,
      }}
    >
      {children}
    </AvailableCoursesContext.Provider>
  );
};

export { AvailableCoursesContext };

export default AvailableCoursesProvider;
