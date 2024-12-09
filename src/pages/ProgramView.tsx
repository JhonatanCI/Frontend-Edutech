import { useParams } from "react-router-dom";
import NavBar from "../components/Commons/NavBar"
import ProgramHeroSection from "../components/ProgramView/ProgramHeroSection"
import ProgramNavbar from "../components/ProgramView/ProgramNavBar";
import AvailableCoursesSection from "../components/ProgramView/AvailableCoursesSection";
import { AchievementsSection } from "../components/ProgramView/AchievementsSection";

import { useFullProgram } from "../hooks/useFullProgram";
import { LearningPathSection } from "../components/ProgramView/LearningPathSection";
import { KeepLearningSection } from "../components/ProgramView/KeepLearningSection";

export const ProgramView = () => {
    const {name} = useParams()
    const program = useFullProgram(name)
    

    if(!program){
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <ProgramHeroSection program={program} />
            <ProgramNavbar/>
            {program.programCourses?.length && <AvailableCoursesSection program={program} />}
            {program.programCourses?.length && <AchievementsSection programUUID={program.id} programName={program.name} programCourses={program.programCourses}/>}
            <LearningPathSection programName={program.name}/>
            <KeepLearningSection/>
        </div>
    )
}