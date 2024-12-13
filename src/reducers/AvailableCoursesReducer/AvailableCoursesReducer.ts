import { useReducer } from "react"
import availableCoursesReducer from "./Reducer"
import { ACActionType } from "./AvailableCoursesActions"
import {ACInitialState} from "./AvailableCoursesInitialState"

import { getAllProgramCourses } from "../../services/academicCourses"
import { toProgramCourse } from "../../mappers/programCourseMapper"
import { Course, ProgramCourse } from "../../model/types"

const initialState = ACInitialState
const reducer = availableCoursesReducer

const useAvailableCourses = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setProgramCourses = (programCourses: ProgramCourse[]) => dispatch({ type: ACActionType.INIT_PROGRAMCOURSES, payload: programCourses });
    const setCourses = (courses: Course[]) => dispatch({type: ACActionType.INIT_COURSES, payload: courses})

    const updateCourses = (current: ProgramCourse, newCourse: Course) => 
        dispatch({ type: ACActionType.UPDATE_STATE, payload: { current, newCourse } });

    const initializeCourses = async (name: string) => {
        try {
            const programsFetched = await getAllProgramCourses(name);
            const programCourses = toProgramCourse(programsFetched);
            setProgramCourses(programCourses);
        } catch (error) {
            console.error("Error fetching program courses", error);
            setCourses([]);
        }
    };

    return { state, setCourses, setProgramCourses, updateCourses, initializeCourses };
};

export default useAvailableCourses;