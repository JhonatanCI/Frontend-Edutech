import { ACActionType, ACPayload } from "./AvailableCoursesActions";
import { AvailableCoursesAction, AvailableCoursesState } from "./AvailableCoursesTypes";
import { ProgramCourse } from "../../model/types";

const availableCoursesReducer = (state: AvailableCoursesState, action: AvailableCoursesAction) => {
    const { type, payload } = action

    switch (type) {
        case ACActionType.INITIAL_STATE:  return {
            ...state,
            programCourses: payload as ProgramCourse[], // Asegúrate de que el payload es un arreglo de cursos
        };
        case ACActionType.UPDATE_STATE:
            return {
                ...state,
                programCourses: state.programCourses.map(course =>
                    course.courseId === (payload as ACPayload).current.courseId
                        ? (payload as ACPayload).newCourse
                        : course
                )
            };
        default:
            return state;
    }
}

export default availableCoursesReducer