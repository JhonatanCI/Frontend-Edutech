import { useParams } from "react-router-dom";
import NavBar from "../components/Commons/NavBar"
import ProgramHeroSection from "../components/ProgramView/ProgramHeroSection"
import ProgramNavbar from "../components/ProgramView/ProgramNavBar";
import AvailableCoursesSection from "../components/ProgramView/AvailableCoursesSection";
import { AchievementsSection } from "../components/ProgramView/AchievementsSection";

import { useFullProgram } from "../hooks/useFullProgram";

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
            <AchievementsSection programName={program.name} programCourses={program.programCourses}/>
            
            {/* Content Sections */}
            <div id="learning-path" className="h-screen bg-yellow-200">Learning Path Section</div>
            <div id="keep-learning" className="h-screen bg-red-200">Keep Learning Section</div>
        </div>
    )
}