import React from "react";
import { ProgramCourse } from "../../consts/types";
import CourseCard from "../Commons/CourseCard";

interface ProgramSemesterProps {
    semester: number,
    programCourses: ProgramCourse[]
}

export const ProgramSemester: React.FC<ProgramSemesterProps> = ({ semester, programCourses }) => {
    const categories = ["Categoria 1", "Categoria2"];

    return (
        <div>
            <h3 className="text-black text-2xl font-calsans leading-tight max-w-md pb-4 pt-16">Semestre {semester}</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-[1rem] max-w-[60rem] w-2/3 bg-white">
                {programCourses.map(course => {
                    return course.flexibility === "CONDICIONADO" ?
                        <CourseCard
                            key={course.courseId}
                            title={course.name}
                            description={course.description}
                            categories={categories}
                            credits={course.credits}
                            isEditable
                            variantStyle="solid"
                            variant="small"
                        />
                        : <CourseCard
                            key={course.courseId}
                            title={course.name}
                            description={course.description}
                            categories={categories}
                            credits={course.credits}
                            isEditable
                            variantStyle="dashed"
                            variant="small"
                        />
                })}
            </div>
        </div>
    )
}