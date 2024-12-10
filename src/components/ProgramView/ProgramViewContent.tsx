import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../Commons/NavBar";
import ProgramHeroSection from "./ProgramHeroSection";
import ProgramNavbar from "./ProgramNavBar";
import AvailableCoursesSection from "./AvailableCoursesSection";
import { AchievementsSection } from "./AchievementsSection";
import { LearningPathSection } from "./LearningPathSection";
import { KeepLearningSection } from "./KeepLearningSection";

import { FullProgram } from "../../model/types";
import useAvailableCourses from "../../reducers/AvailableCoursesReducer/AvailableCoursesReducer";

interface ProgramViewContentProps {
    program: FullProgram
}

const ProgramViewContent: React.FC<ProgramViewContentProps> = ({ program }) => {
    const { name } = useParams();
    const { state, initializeCourses } = useAvailableCourses()

    useEffect(() => {
        if (name) {
            initializeCourses(name);
        }
    }, [name, initializeCourses]);

    if (!program) {
        return null;
    }

    return (
        <>
            <NavBar />
            <ProgramHeroSection program={program} />
            <ProgramNavbar />
            {state.programCourses.length > 0 && <AvailableCoursesSection semesters={program.semesters} programCourses={state.programCourses} programOutcomes={program.programOutcomes} />}
            {state.programCourses.length > 0 && <AchievementsSection programUUID={program.id} programName={program.name} programCourses={state.programCourses} />}
            <LearningPathSection programName={program.name} />
            <KeepLearningSection />
        </>
    );
};

export default ProgramViewContent