import { ProgramCourse } from "../../consts/types"
import { ProgramSemester } from "./ProgramSemester"

import { filterBySemester } from "../../filters/filters"

interface ProgramCoursesSectionProps {
    programCourses: ProgramCourse[],
    semesters: number
}

const ProgramCoursesSection: React.FC<ProgramCoursesSectionProps> = ({programCourses, semesters}) => {
    const semesterArray = [...Array(semesters).keys()]
    
    return(
        <div className="pt-12">
            {semesterArray.map((semesterIndex) => (
                <ProgramSemester key={semesterIndex} semester={semesterIndex + 1} programCourses={filterBySemester(semesterIndex + 1, programCourses)}/>
            ))}
        </div>
    )
}

export default ProgramCoursesSection