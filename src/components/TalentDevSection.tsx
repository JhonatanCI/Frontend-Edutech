import React from "react";
import CourseCard from "./CourseCard";

import TalentSearchBar from "./TalentSearchBar";
import TalentCycleComponent from "./TalentCycleComponent";

import { useDevTalentContext } from "../hooks/useTalentDevContext";
import { Course, Program } from "../consts/types";

const TalentDevSection: React.FC = () => {
    const { state } = useDevTalentContext();

    const credits = 2;
    const categories = ["Categoria 1", "Categoria2"];

    const renderCards = () => {
        switch(state.item){
            case 0: {
                return state.microLearnings?.map((micro: Course) => (
                    <CourseCard
                        key={micro.id}
                        title={micro.name}
                        description={micro.description}
                        categories={categories}
                        variant="small"
                    />
                ));
            }
            case 1: {
                return state.courses?.map((course: Course) => (
                    <CourseCard
                        key={course.id}
                        title={course.name}
                        description={course.description}
                        categories={categories}
                        variant="small"
                    />
                ));
            }
            case 2: {
                return state.certifications?.map((certification: Program) => (
                    <CourseCard
                        key={certification.id}
                        title={certification.name}
                        description={certification.description}
                        categories={categories}
                        variant="medium"
                    />
                ));
            }
            case 3: {
                return state.especializations?.map((especialization: Program) => (
                    <CourseCard
                        key={especialization.id}
                        title={especialization.name}
                        description={especialization.description}
                        categories={categories}
                        variant="large"
                    />
                ));
            }
            case 4: {
                return state.masters?.map((master: Program) => (
                    <CourseCard
                        key={master.id}
                        title={master.name}
                        description={master.description}
                        categories={categories}
                        variant="large"
                    />
                ));
            }
            case 5: {
                return state.phd?.map((phd: Program) => (
                    <CourseCard
                        key={phd.id}
                        title={phd.name}
                        description={phd.description}
                        categories={categories}
                        variant="large"
                    />
                ));
            }
            default: return
        }
    };

    return (
        <section id="desarrolla-tu-talento" className="flex flex-col px-32 pt-8 bg-white">

            <div className="flex justify-between">
                <div>
                    <h1 className="text-7xl font-calsans text-black leading-none mt-16">Desarrolla tu Talento</h1>
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