import { ProgramCourse } from "../consts/types";

export const filterBySemester = (semester: number, programCourses: ProgramCourse[]) => {
    return programCourses.filter((pc) => pc.semester === semester)
}