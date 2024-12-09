import React from "react";
import { ProgramsScrollSection } from "./ProgramsScrollSection";
import defaultPrograms from "../../consts/programs.d";

interface LearningPathSectionProps {
    programName: string
}

export const LearningPathSection: React.FC<LearningPathSectionProps> = ({programName}) => {

    const article = programName.startsWith("Doctorado") ? "el" : "la";

    return (
        <div id="learning-path" className="h-screen w-full flex flex-col px-28">
            <h2 className="text-black text-4xl font-calsans leading-tight max-w-md pt-24">Ruta de aprendizaje</h2>
            <p className="text-black w-3/5 mt-3">
                {`Al completar ${article} ${programName} podrás elevar tu aprendizaje con:`}
            </p>
            <ProgramsScrollSection programs={defaultPrograms}/>
        </div>
    )
}