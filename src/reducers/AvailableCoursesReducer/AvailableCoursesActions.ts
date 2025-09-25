import { Course, ProgramCourse } from "../../model/types"

export enum ACActionType {
    INIT_PROGRAMCOURSES = "initial_state",
    INIT_COURSES = "initial_courses",
    SWAP_COURSE = "swap_course",
    RESET_COURSE = "reset_course"
}

export type ACPayload = {
    current: ProgramCourse,
    newCourse: Course
}