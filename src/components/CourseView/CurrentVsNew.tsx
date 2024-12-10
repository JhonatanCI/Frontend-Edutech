import React from "react";
import { ProgramCourse } from "../../model/types";
import MiniCourseCard from "./MiniCourseCard";
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
        <MiniCourseCard title={current.name} description={current.description} categories={["Categoria 1", "Categoria 2"]} credits={current.credits}/>
      </div>
      {/* Contenedor del curso nuevo */}
      <div className="flex flex-col items-center">
        <span className="text-black text-sm mb-2 text-center mr-8">Curso nuevo</span>
        {newCourse ? (
          <MiniCourseCard
            title={newCourse.name}
            description={newCourse.description}
            categories={["Categoria 1", "Categoria 2"]}
            credits={newCourse.credits}
          />
        ) : (
          <EmptyCard variant="small" scalable />
        )}
      </div>
    </div>
  );
};

export default CurrentVsNew;