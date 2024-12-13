import React, { useEffect, useState } from "react";
import { ProgramsScrollSection } from "./ProgramsScrollSection";
import { useAvailableCoursesContext } from "../../hooks/useAvailableCoursesContext";
import { Program, UUID } from "../../model/types";
import { getCoursesUUID } from "../../filters/filters";
import { getLearningPath } from "../../services/academicPrograms";

interface LearningPathSectionProps {
    programUUID: UUID;
    programName: string;
}

export const LearningPathSection: React.FC<LearningPathSectionProps> = ({programUUID ,programName}) => {
    const { state } = useAvailableCoursesContext();
    const { programCourses } = state;

    const [learningPath, setLearningPath] = useState<Program[] | null>(null);
    const article = programName.startsWith("Doctorado") ? "el" : "la";

    useEffect(() => {
        async function fetchAchievements() {
            const uuids: UUID[] = getCoursesUUID(programCourses);

            try {
                const response: Program[] = await getLearningPath(uuids);
                const filteredPrograms = response.filter(
                    (program) => program.id !== programUUID
                );

                const programsWithImagePath = filteredPrograms.map(program => ({
                    ...program,
                    image: `${import.meta.env.VITE_API_URL}${program.image}`
                }));

                setLearningPath(programsWithImagePath);
            } catch (error) {
                console.error("No se pudieron traer logros");
            }
        }

        if (programCourses.length > 0) {
            fetchAchievements();
        }
    }, [programCourses, programUUID]);


    if (programCourses.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if(!learningPath || learningPath.length === 0){
        return
    }

    return (
        <div id="learning-path" className="h-screen w-full flex flex-col px-28">
            <h2 className="text-black text-4xl font-calsans leading-tight max-w-md pt-24">Ruta de aprendizaje</h2>
            <p className="text-black w-3/5 mt-3">
                {`Al completar ${article} ${programName} podrás elevar tu aprendizaje con:`}
            </p>
            <ProgramsScrollSection programs={learningPath}/>
        </div>
    )
}