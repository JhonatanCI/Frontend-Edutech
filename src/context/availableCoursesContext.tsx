import { createContext, ReactNode, useEffect } from "react"
import { AvailableCoursesState } from "../reducers/AvailableCoursesReducer/AvailableCoursesTypes"
import useAvailableCourses from "../reducers/AvailableCoursesReducer/AvailableCoursesReducer";
import { Course, ProgramCourse } from "../model/types";
import { getAllCourses } from "../services/academicCourses";

interface AvailableCoursesProviderProps {
    children: ReactNode
}

export type AvailableCoursesContextType = {
    state: AvailableCoursesState,
    setProgramCourses: (courses: ProgramCourse[]) => void,
    updateCourses: (current: ProgramCourse, newCourse: Course) => void;
    initializeCourses: (name: string) => Promise<void>
}

const AvailableCoursesContext = createContext<AvailableCoursesContextType | undefined>(undefined)

const AvailableCoursesProvider = ({ children }: AvailableCoursesProviderProps) => {
    const { state, setProgramCourses, setCourses, updateCourses, initializeCourses } = useAvailableCourses();

    useEffect(() => {

        const fetchCourses = async() => {
            try {
                const response = await getAllCourses()
                setCourses(response)
            } catch (error) {
                console.error("No se pudo cargar los cursos")
            }
        }

        fetchCourses()
    }, [])

    return (
        <AvailableCoursesContext.Provider value={{state, setProgramCourses, updateCourses, initializeCourses}}>
            {children}
        </AvailableCoursesContext.Provider>
    )
}

export {AvailableCoursesContext}

export default AvailableCoursesProvider