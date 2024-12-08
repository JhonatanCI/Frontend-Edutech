import { useParams } from "react-router-dom";
import NavBar from "../components/Commons/NavBar"
import ProgramHeroSection from "../components/ProgramView/ProgramHeroSection"
import ProgramNavbar from "../components/ProgramView/ProgramNavBar";
import AvailableCoursesSection from "../components/ProgramView/AvailableCoursesSection";
import { AchievementsSection } from "../components/ProgramView/AchievementsSection";

import { fullProgramExample } from "../consts/fullconsts.d";
import { useEffect, useState } from "react";
import { getFullProgram } from "../services/fullAcademicProgram";
import { FullProgram } from "../model/types";

export const ProgramView = () => {
    const {name} = useParams()
    const [program, setProgram] = useState<FullProgram | null>(null)

    useEffect(() => {
        const fetchFullProgram = async() => {
            try {
                if (!name) {
                    throw new Error("El parámetro 'name' es undefined");
                }

                const response: FullProgram = await getFullProgram(name)
                const programsFetched = {
                    ...response,
                    image: `${import.meta.env.VITE_API_URL}${response.image}`
                }
                setProgram(programsFetched)
            } catch (error) {
                setProgram(fullProgramExample)
                console.error("No se ha podido obtener los programas academicos")
            }
        }

        fetchFullProgram()
    }, [])

    if(!program){
        return
    }

    return (
        <div>
            <NavBar />
            <ProgramHeroSection program={program} />
            <ProgramNavbar/>
            {program.programCourses?.length && <AvailableCoursesSection program={program} />}
            <AchievementsSection programName={program.name}/>
            
            {/* Content Sections */}
            <div id="learning-path" className="h-screen bg-yellow-200">Learning Path Section</div>
            <div id="keep-learning" className="h-screen bg-red-200">Keep Learning Section</div>
        </div>
    )
}