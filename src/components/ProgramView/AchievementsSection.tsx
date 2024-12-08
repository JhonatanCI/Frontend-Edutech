import React, { useEffect, useState } from "react"
import { AchievementCard } from "./AchievementCard";
import { Program, ProgramCourse, UUID } from "../../model/types";
import { getCoursesUUID } from "../../filters/filters";
import { getAchievements } from "../../services/academicPrograms";


interface AchievementsSectionProps {
    programName: string,
    programCourses: ProgramCourse[]
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ programName, programCourses }) => {

    const [achievements, setAchievements] = useState<Program[] | null>(null)
    const article = programName.startsWith("Doctorado") ? "el" : "la";

    useEffect(() => {
        async function fetchAchievements() {
            const uuids: UUID[] = getCoursesUUID(programCourses);

            try {
                const response = await getAchievements(uuids);
                setAchievements(response)
            } catch (error) {
                console.error("No se puedo traer logros")
            }
        }

        fetchAchievements()

    }, [])

    if(!achievements){
       return 
    }

    return (
        <div id="achievements" className="h-full w-full flex flex-col px-28 pb-14 pt-24">
            <h2 className="text-black text-4xl font-calsans leading-tight max-w-md">Lo que lograrás</h2>
            <p className="text-black w-3/5 mt-3">
                {`Al cursar ${article} ${programName} obtendrás los siguientes grados y certificaciones:`}
            </p>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(32rem,1fr))] gap-[1rem] max-w-full w-full bg-white pt-12">
                {achievements.map((achievement) => (
                    <AchievementCard
                        key={achievement.id} // Asegúrate de que `id` exista en el objeto Program
                        name={achievement.name}
                        description={achievement.description}
                    />
                ))}
            </div>
        </div>
    );
}