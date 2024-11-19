import React from "react";
import CourseCard from "./CourseCard";

const TalentDevSection: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 p-6">
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
    );
};

export default TalentDevSection;
