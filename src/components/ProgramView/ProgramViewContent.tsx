import React, { useEffect } from "react";

import NavBar from "../Commons/NavBar";
import ProgramHeroSection from "./ProgramHeroSection";
import ProgramNavbar from "./ProgramNavBar";
import AvailableCoursesSection from "./AvailableCoursesSection";
import { AchievementsSection } from "./AchievementsSection";
import { LearningPathSection } from "./LearningPathSection";
import { KeepLearningSection } from "./KeepLearningSection";

import { FullProgram } from "../../model/types";
import { useAvailableCoursesContext } from "../../hooks/useAvailableCoursesContext";

interface ProgramViewContentProps {
    program: FullProgram
}

const ProgramViewContent: React.FC<ProgramViewContentProps> = ({ program }) => {
    const {initializeCourses} = useAvailableCoursesContext()

    useEffect(() => {
        if (program) {
            initializeCourses(program.name);
        }
    }, [program]);

    return (
        <>
            <NavBar />
            <ProgramHeroSection program={program} />
            <ProgramNavbar />
            <AvailableCoursesSection semesters={program.semesters} programOutcomes={program.programOutcomes} />
            <AchievementsSection programUUID={program.id} programName={program.name} />
            <LearningPathSection programUUID={program.id} programName={program.name} />
            <KeepLearningSection />
        </>
    );
};

export default ProgramViewContent