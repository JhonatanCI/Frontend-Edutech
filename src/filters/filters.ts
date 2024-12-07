import { ProgramCourse } from "../model/types"

export const filterBySemester = (semester: number, programCourses: ProgramCourse[]) => {
    return programCourses.filter((pc) => pc.semester === semester)
}