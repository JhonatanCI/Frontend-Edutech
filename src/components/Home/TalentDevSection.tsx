import React from "react";
import CourseCard from "../Commons/CourseCard";
import TalentSearchBar from "./TalentSearchBar";
import TalentCycleComponent from "./TalentCycleComponent";

import { useTalentDevContext } from "../../hooks/useTalentDevContext";
import { Course, MicroLearning, Program } from "../../model/types";
import { useNavigate } from "react-router-dom";

const TalentDevSection: React.FC = () => {
    const { state } = useTalentDevContext();
    const navigateTo = useNavigate()

    const renderCards = () => {
        const renderSpinner = (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
        );

        switch (state.item) {
            case 0: {
                if (!state.microLearnings) return renderSpinner;
                return state.microLearnings.map((micro: MicroLearning) => (
                    <CourseCard
                        key={micro.id}
                        title={micro.name}
                        description={micro.description}
                        variant="small"
                        onClick={() => navigateTo(`/microlearning/${micro.name}`)}
                    />
                ));
            }
            case 1: {
                if (!state.courses) return renderSpinner;
                return state.courses.map((course: Course) => (
                    <CourseCard
                        key={course.id}
                        title={course.name}
                        description={course.description}
                        variant="small"
                        onClick={() => navigateTo(`/course/${course.name}`)}
                    />
                ));
            }
            case 2: {
                if (!state.certifications) return renderSpinner;
                return state.certifications.map((certification: Program) => (
                    <CourseCard
                        key={certification.id}
                        title={certification.name}
                        description={certification.description}
                        variant="medium"
                        onClick={() => navigateTo(`/program/${certification.name}`)}
                    />
                ));
            }
            case 3: {
                if (!state.specializations) return renderSpinner;
                return state.specializations.map((specialization: Program) => (
                    <CourseCard
                        key={specialization.id}
                        title={specialization.name}
                        description={specialization.description}
                        variant="large"
                        onClick={() => navigateTo(`/program/${specialization.name}`)}
                    />
                ));
            }
            case 4: {
                if (!state.masters) return renderSpinner;
                return state.masters.map((master: Program) => (
                    <CourseCard
                        key={master.id}
                        title={master.name}
                        description={master.description}
                        variant="large"
                        onClick={() => navigateTo(`/program/${master.name}`)}
                    />
                ));
            }
            case 5: {
                if (!state.phd) return renderSpinner;
                return state.phd.map((phd: Program) => (
                    <CourseCard
                        key={phd.id}
                        title={phd.name}
                        description={phd.description}
                        variant="large"
                        onClick={() => navigateTo(`/program/${phd.name}`)}
                    />
                ));
            }
            default: {
                return renderSpinner;
            }
        }
    };

    return (
        <section id="desarrolla-tu-talento" className="flex flex-col px-32 pt-8 bg-white">

            <div className="flex justify-between">
                <div>
                    <h1 className="text-7xl font-calsans text-black leading-none mt-16">Desarrolla tu talento</h1>
                    <div className="flex flex-row gap-24 mb-8">
                        <p className="text-xl text-black pt-4 w-3/4">Nos adaptamos a todos los tiempos y niveles de aventura. Conoce cómo puedes explorar nuestros mundos.</p>
                        <TalentSearchBar />
                    </div>

                </div>
            </div>

            <div className="flex justify-between gap-6 bg-white">
                <div className="w-3/12">
                    <TalentCycleComponent />
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-[1rem] max-w-[60rem] w-full mx-auto bg-white p-4">
                    {renderCards()}
                </div>
            </div>
        </section>
    );
};

export default TalentDevSection;