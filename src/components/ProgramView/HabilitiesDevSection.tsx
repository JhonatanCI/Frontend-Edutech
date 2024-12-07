import React from "react"
import { ChartValues } from "../../consts/types.d"
import HabilitiesBarChart from "./HabilitiesBarChart"
import { ProgramOutcome } from "../../model/types"
import { getCategories, getMaxValue, getOutcomeValues } from "../../filters/habilitiesdevfilters"

interface HabilitiesDevProps {
    programOutcomes: ProgramOutcome[]
}

export const HabilitiesDev: React.FC<HabilitiesDevProps> = ({programOutcomes}) => {

    const chartvalues: ChartValues = {
        categories: getCategories(programOutcomes),
        max: getMaxValue(programOutcomes)
    }

    const data = getOutcomeValues(programOutcomes)

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