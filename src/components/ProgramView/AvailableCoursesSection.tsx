import React from "react"
import { FilledLine, DottedLine } from "../../assets/Icons/linesIcons"
import { ProgramCourse, ProgramOutcome } from "../../model/types"
import ProgramCoursesSection from "./ProgramCoursesSection"
import { HabilitiesDev } from "./HabilitiesDevSection"

interface AvailableCoursesSectionProps {
    semesters: number,
    programCourses: ProgramCourse[],
    programOutcomes: ProgramOutcome[]
}

const AvailableCoursesSection: React.FC<AvailableCoursesSectionProps> = ({semesters, programCourses, programOutcomes}) => {
    return (
        <div id="courses" className="h-full w-full flex flex-col px-28 pb-14 pt-24">
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

            <div className="flex w-full justify-between gap-32">
                <ProgramCoursesSection programCourses={programCourses} semesters={semesters}/>
                {programOutcomes && <HabilitiesDev programOutcomes={programOutcomes} programCourses={programCourses}/>}
            </div>
            
        </div>
    )
}

export default AvailableCoursesSection