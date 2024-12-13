import { Course, ProgramCourse } from "../../model/types"
import { ACActionType, ACPayload } from "./AvailableCoursesActions"

export type AvailableCoursesState = {
    programCourses: ProgramCourse[],
    courses: Course[]
}

export type AvailableCoursesAction = {
    type: ACActionType,
    payload: ProgramCourse[] | Course[] | ACPayload
}