import React from "react";
import { ProgramCourse } from "../../model/types";
import CourseCardModal from "../CourseView/CourseCardModal";


interface ProgramSemesterProps {
    semester: number,
    programCourses: ProgramCourse[]
}

export const ProgramSemester: React.FC<ProgramSemesterProps> = ({ semester, programCourses }) => {
    return (
        <div>
            <h3 className="text-black text-2xl font-calsans leading-tight max-w-md pb-4 pt-16">Semestre {semester}</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-[1rem] max-w-[60rem] w-full bg-white">
                {programCourses.map(course => {
                    return course.flexibility === "CONDICIONADO" ?
                        <CourseCardModal
                            course={course}
                            isEditable
                            variantStyle="solid"
                            variant="small"
                        />
                        : <CourseCardModal
                            course={course}
                            isEditable
                            variantStyle="dashed"
                            variant="small"
                        />
                })}
            </div>
        </div>
    )
}