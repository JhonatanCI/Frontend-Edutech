import React from "react";
import { ProgramsScrollSection } from "./ProgramsScrollSection";
import defaultPrograms from "../../consts/programs.d";

interface KeepLearningSectionProps {

}

export const KeepLearningSection: React.FC<KeepLearningSectionProps> = () => {

    return (
        <div id="keep-learning" className="h-full w-full flex flex-col px-28 py-8">
            <h2 className="text-black text-4xl font-calsans leading-tight max-w-md">Sigue aprendiendo</h2>
            <ProgramsScrollSection programs={defaultPrograms}/>
        </div>
    )
}