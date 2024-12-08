import React from "react"
import { AchievementCard } from "./AchievementCard";


interface AchievementsSectionProps {
    programName: string
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({programName}) => {

    const article = programName.startsWith("Doctorado") ? "el" : "la";
    
    return (
        <div id="achievements" className="h-full w-full flex flex-col px-28 pb-14 pt-24">
            <h2 className="text-black text-4xl font-calsans leading-tight max-w-md">Lo que lograrás</h2>
            <p className="text-black w-3/5 mt-3">
                {`Al cursar ${article} ${programName} obtendrás los siguientes grados y certificaciones:`}
            </p>
            
            <div className="grid grid-cols-[repeat(auto-fill,minmax(32rem,1fr))] gap-[1rem] max-w-full w-full bg-white pt-12">
                <AchievementCard/>
                <AchievementCard/>
                <AchievementCard/>
            </div>
        </div>
    );
}