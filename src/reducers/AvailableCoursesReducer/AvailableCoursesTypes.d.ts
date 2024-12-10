import { ProgramCourse } from "../../model/types"
import { ACActionType, ACPayload } from "./AvailableCoursesActions"

export type AvailableCoursesState = {
    programCourses: ProgramCourse[]
}

export type AvailableCoursesAction = {
    type: ACActionType,
    payload: ProgramCourse[] | ACPayload
}