import { useParams } from "react-router-dom";
import NavBar from "../components/Commons/NavBar"
import ProgramHeroSection from "../components/ProgramView/ProgramHeroSection"
import ProgramNavbar from "../components/ProgramView/ProgramNavBar";
import AvailableCoursesSection from "../components/ProgramView/AvailableCoursesSection";

import { fullProgramExample } from "../consts/fullconsts.d";

export const ProgramView = () => {
    const program = fullProgramExample //Borar esto
    const {name} = useParams()
    console.log("Este es el nombre ",name)

    return (
        <div>
            <NavBar />
            <ProgramHeroSection program={program} />
            <ProgramNavbar/>
            {program.programCourses && <AvailableCoursesSection program={program}/>}
            
            {/* Content Sections */}
            <div id="achievements" className="h-screen bg-green-200">Achievements Section</div>
            <div id="learning-path" className="h-screen bg-yellow-200">Learning Path Section</div>
            <div id="keep-learning" className="h-screen bg-red-200">Keep Learning Section</div>
        </div>
    )
}