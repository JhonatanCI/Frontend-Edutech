import React from "react";
import { ProgramCourse } from "../../model/types";
import CourseCardModal from "../CourseView/CourseCardModal";

import { getCategoriesForCourse } from "../../filters/filters";

interface ProgramSemesterProps {
  semester: number;
  programCourses: ProgramCourse[];
}

export const ProgramSemester: React.FC<ProgramSemesterProps> = ({
  semester,
  programCourses,
}) => {
  const sortedCourses = [...programCourses].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div>
      <h3 className="text-black text-2xl font-calsans leading-tight max-w-md pb-4 pt-16">
        Semestre {semester}
      </h3>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-[1rem] max-w-[60rem] w-full bg-white">
        {sortedCourses.map((course) => {
          const isFather = course.father === true;
          return (
            <CourseCardModal
              key={course.courseId}
              course={course}
              categories={getCategoriesForCourse(
                course.learningResultsContribution,
              )}
              isEditable={isFather}
              variantStyle={isFather ? "dashed" : "solid"}
              variant="small"
            />
          );
        })}
      </div>
    </div>
  );
};
