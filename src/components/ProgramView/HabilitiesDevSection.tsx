import React from "react"
import { ChartValues } from "../../consts/types.d"
import HabilitiesBarChart from "./HabilitiesBarChart"
import { ProgramCourse, ProgramOutcome } from "../../model/types"
import { getCategories, getMaxValue, getContributionForEachCategory } from "../../filters/filters"

interface HabilitiesDevProps {
    programOutcomes: ProgramOutcome[],
    programCourses: ProgramCourse[]
}

export const HabilitiesDev: React.FC<HabilitiesDevProps> = ({programOutcomes, programCourses}) => {

    const maxValue = getMaxValue(programOutcomes) * 3;

    const chartvalues: ChartValues = {
        categories: getCategories(programOutcomes) || ["RA1"],
        max: maxValue === 0? 10 : maxValue
    }

    const data = getContributionForEachCategory(programCourses, chartvalues.categories)

    return (
        <div className="pt-28 w-2/5">
            <h2 className="text-black text-2xl font-calsans leading-tight">
                Perfil de desarrollo de habilidades
            </h2>
            <span className="text-black w-3/5 mb-6">
                Para poder realizar los intercambios ten en cuenta el perfil que establecemos como base de nuestros programas.
                Desde aquí podrás empezar a construir tu propia maestría.
            </span>
            <HabilitiesBarChart chartvalues={chartvalues} data={data}/>
        </div>
    )
}