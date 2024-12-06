import React from "react"
import { FilledLine, DottedLine } from "../../assets/Icons/linesIcons"
import { FullProgram } from "../../consts/types"
import ProgramCoursesSection from "./ProgramCoursesSection"

interface AvailableCoursesSectionProps {
    program: FullProgram
}


const AvailableCoursesSection: React.FC<AvailableCoursesSectionProps> = ({program}) => {
    return (
        <div id="courses" className="h-screen w-full flex flex-col px-32 py-14">
            <h2 className="text-black text-4xl font-calsans leading-tight max-w-md">Cursos disponibles</h2>
            <p className="text-black w-3/5 mb-6">
                Nuestra oferta de cursos se destaca por su flexibilidad y adaptabilidad al perfil que quieras construir, podrás intercambiar cursos por otros que consideres que tienen mayor aporte a tu formación.
                Un intercambio <b>condicionado</b> significa que el curso que elijas debe desarrollar las mismas habilidades, y un intercambio <b>flexible</b> tiene que cumplir con la misma cantidad de créditos.
            </p>
            <div className="flex w-3/6 justify-between">
                <div className="flex justify-center items-center gap-4">
                    <span><FilledLine /></span>
                    <span className="text-sm text-black">Intercambiable Condicionado</span>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <span><DottedLine /></span>
                    <span className="text-sm text-black">Intercambiable Flexible</span>
                </div>
            </div>


            <ProgramCoursesSection programCourses={program.programCourses} semesters={program.semesters}/>

        </div>
    )
}

export default AvailableCoursesSection