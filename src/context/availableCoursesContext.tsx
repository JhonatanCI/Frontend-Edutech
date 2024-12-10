import { createContext, ReactNode } from "react"
import { AvailableCoursesState } from "../reducers/AvailableCoursesReducer/AvailableCoursesTypes"
import useAvailableCourses from "../reducers/AvailableCoursesReducer/AvailableCoursesReducer";
import { ProgramCourse } from "../model/types";

interface AvailableCoursesProviderProps {
    children: ReactNode
}

export type AvailableCoursesContextType = {
    state: AvailableCoursesState,
    setCourses: (courses: ProgramCourse[]) => void,
    updateCourses: (current: ProgramCourse, newCourse: ProgramCourse) => void;
    initializeCourses: (name: string) => Promise<void>
}

const AvailableCoursesContext = createContext<AvailableCoursesContextType | undefined>(undefined)

const AvailableCoursesProvider = ({ children }: AvailableCoursesProviderProps) => {
    const { state, setCourses, updateCourses, initializeCourses } = useAvailableCourses();

    return (
        <AvailableCoursesContext.Provider value={{state, setCourses, updateCourses, initializeCourses}}>
            {children}
        </AvailableCoursesContext.Provider>
    )
}

export {AvailableCoursesContext}

export default AvailableCoursesProvider