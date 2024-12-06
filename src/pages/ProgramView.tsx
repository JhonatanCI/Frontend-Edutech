import { useParams } from "react-router-dom";
import NavBar from "../components/Commons/NavBar"
import ProgramHeroSection from "../components/ProgramView/ProgramHeroSection"
import ProgramNavbar from "../components/ProgramView/ProgramNavBar";
import defaultPrograms from "../consts/programs.d"

export const ProgramView = () => {
    const program = defaultPrograms.slice(0, 1)[0] //Borar esto
    const {name} = useParams()
    console.log("Este es el nombre ",name)

    return (
        <div>
            <NavBar />
            <ProgramHeroSection program={program} />
            <ProgramNavbar/>
            
            {/* Content Sections */}
            <div id="courses" className="h-screen bg-blue-200">Courses Section</div>
            <div id="achievements" className="h-screen bg-green-200">Achievements Section</div>
            <div id="learning-path" className="h-screen bg-yellow-200">Learning Path Section</div>
            <div id="keep-learning" className="h-screen bg-red-200">Keep Learning Section</div>
        </div>
    )
}