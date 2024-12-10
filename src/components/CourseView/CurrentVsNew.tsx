import React from "react";
import { ProgramCourse } from "../../model/types";
import CourseCard from "../Commons/CourseCard";
import EmptyCard from "./EmptyCard";

interface CurrentVsNewProps {
  current: ProgramCourse,
  newCourse: ProgramCourse | null
}

const CurrentVsNew: React.FC<CurrentVsNewProps> = ({ current, newCourse }) => {
  return (
    <div className="flex justify-between">
      {/* Contenedor del curso actual */}
      <div className="flex flex-col items-center">
        <span className="text-black text-sm mb-2 text-center mr-8">Curso actual</span>
        <CourseCard title={current.name} description={current.description} categories={["Categoria 1", "Categoria 2"]} credits={current.credits} variantStyle="solid" variant="small" scalable />
      </div>
      {/* Contenedor del curso nuevo */}
      <div className="flex flex-col items-center">
        <span className="text-black text-sm mb-2 text-center mr-8">Curso nuevo</span>
        {newCourse ? (
          <CourseCard
            title={newCourse.name}
            description={newCourse.description}
            categories={["Categoria 1", "Categoria 2"]}
            credits={newCourse.credits}
            variantStyle="solid"
            variant="small"
            scalable
          />
        ) : (
          <EmptyCard variant="small" scalable />
        )}
      </div>
    </div>
  );
};

export default CurrentVsNew;