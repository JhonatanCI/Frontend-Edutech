import { Course, ProgramCourse } from "../../model/types"

export enum ACActionType {
    INIT_PROGRAMCOURSES = "initial_state",
    INIT_COURSES = "initial_courses",
    UPDATE_STATE = "update_state"
}

export type ACPayload = {
    current: ProgramCourse,
    newCourse: Course
}