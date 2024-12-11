import React from "react"
import { FilledLine, DottedLine } from "../../assets/Icons/linesIcons"
import { ProgramOutcome } from "../../model/types"
import ProgramCoursesSection from "./ProgramCoursesSection"
import { HabilitiesDev } from "./HabilitiesDevSection"
import { useAvailableCoursesContext } from "../../hooks/useAvailableCoursesContext"

interface AvailableCoursesSectionProps {
    semesters: number,
    programOutcomes: ProgramOutcome[]
}

const AvailableCoursesSection: React.FC<AvailableCoursesSectionProps> = ({semesters, programOutcomes}) => {
    
    const {state} = useAvailableCoursesContext()
    const {programCourses} = state

    
    if(programCourses.length === 0){
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
        );
    }
    
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