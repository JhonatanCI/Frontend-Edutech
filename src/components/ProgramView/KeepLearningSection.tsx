import React from "react";
import { ProgramsScrollSection } from "./ProgramsScrollSection";
import { usePrograms } from "../../hooks/usePrograms";

interface KeepLearningSectionProps {

}

export const KeepLearningSection: React.FC<KeepLearningSectionProps> = () => {

    const programs = usePrograms(0, 10)

    return (
        <div id="keep-learning" className="h-full w-full flex flex-col px-28 pt-10">
            <h2 className="text-black text-4xl font-calsans leading-tight max-w-md pt-24">Sigue aprendiendo</h2>
            <ProgramsScrollSection programs={programs}/>
        </div>
    )
}