import React from "react";
import CourseCard from "./CourseCard";

import TalentSearchBar from "./TalentSearchBar";
import TalentCycleComponent from "./TalentCycleComponent";

const TalentDevSection: React.FC = () => {
    return (
        <section className="flex flex-col pl-32 pr-32 bg-white">

            <div className="flex justify-between">
                <div>
                    <h1 className="text-7xl font-calsans text-black leading-none mt-16">Desarrolla tu Talento</h1>
                    <div className="flex flex-row gap-24 mb-8">
                        <p className="text-xl text-black pt-4 w-3/4">Nos adaptamos a todos los tiempos y niveles de aventura. Conoce cómo puedes explorar nuestros mundos.</p>
                        <TalentSearchBar/>
                    </div>

                </div>
            </div>

            <div className="flex flex-row gap-6 bg-white">
                <TalentCycleComponent></TalentCycleComponent>
                <div className="flex flex-col gap-6 bg-white">
                    <div className="flex flex-row gap-[1rem]">
                        <CourseCard
                            title="Card Curso"
                            description="Descripción del curso contando sobre los principales detalles de esta."
                            categories={["Categoría 1", "Categoría 2"]}
                            credits={3}
                            variant="small"


                        />
                        <CourseCard
                            title="Card Curso"
                            description="Descripción del curso contando sobre los principales detalles de esta."
                            categories={["Categoría 1", "Categoría 2"]}
                            credits={3}
                            variant="small"
                        />
                        <CourseCard
                            title="Card Curso"
                            description="Descripción del curso contando sobre los principales detalles de esta."
                            categories={["Categoría 1", "Categoría 2"]}
                            credits={3}
                            variant="small"
                        />

                    </div>


                    <div className="flex flex-row gap-[1rem]">
                        <CourseCard
                            title="Card Certificación"
                            description="Descripción de la certificación contando sobre los principales detalles de esta."
                            categories={["Categoría 1", "Categoría 2"]}
                            credits={9}
                            variant="medium"
                        />
                        <CourseCard
                            title="Card Curso"
                            description="Descripción del curso contando sobre los principales detalles de esta."
                            categories={["Categoría 1", "Categoría 2"]}
                            credits={3}
                            variant="small"
                        />
                    </div>


                    {/* Large Card */}
                    <CourseCard
                        title="Card Especialización"
                        description="Descripción de la especialización contando sobre los principales detalles de esta."
                        categories={["Categoría 1", "Categoría 2"]}
                        credits={15}
                        variant="large"
                    />

                </div>
            </div>
        </section>
    );
};

export default TalentDevSection;
