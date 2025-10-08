import React from "react";
import { Course, ProgramCourse } from "../../model/types";
import MiniCourseCard from "./MiniCourseCard";
import EmptyCard from "./EmptyCard";
import CoursesTags from "./CoursesTags";
import { getCategoriesForCourse } from "../../filters/filters";

interface CurrentVsNewProps {
  current: ProgramCourse;
  newCourse: Course | null;
}

const CurrentVsNew: React.FC<CurrentVsNewProps> = ({ current, newCourse }) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div className="flex flex-col">
          <span className="text-black text-sm mb-2 text-center">
            Curso actual
          </span>
          <MiniCourseCard
            title={current.name}
            description={current.description}
            categories={getCategoriesForCourse(
              current.learningResultsContribution,
            )}
            credits={current.credits}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-black text-sm mb-2 text-center">
            Curso nuevo
          </span>
          {newCourse ? (
            <MiniCourseCard
              title={newCourse.name}
              description={newCourse.description}
              categories={newCourse.s}
              credits={newCourse.credits}
            />
          ) : (
            <EmptyCard variant="small" scalable />
          )}
        </div>
      </div>
      <div className="flex gap-16 mt-8">
        <div>
          <h4 className="font-semibold text-black mb-2">
            Resultados de aprendizaje actuales
          </h4>
          <ul className="list-disc ml-6">
            {(current.learningResultsContribution ?? []).map((lr, idx) => (
              <li key={`${lr.id}-${idx}`} className="text-gray-700">
                {lr.name}
              </li>
            ))}
          </ul>
        </div>
        {newCourse && (
          <div>
            <h4 className="font-semibold text-black mb-2">
              Nuevos resultados de aprendizaje
            </h4>
            <ul className="list-disc ml-6">
              {(newCourse.learningResults ?? []).map((lr, idx) => (
                <li key={`${lr}-${idx}`} className="text-gray-700">
                  {lr}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {newCourse ? (
        <div className="w-4/5 mt-14">
          <h3 className="text-3xl font-bold text-black">
            Perfil de desarrollo de habilidades
          </h3>
          <p className="text-gray-700 text-sm w-full py-6">
            Al realizar este intercambio estas serán las nuevas habilidades que
            vas a desarrollar. Ten en cuenta que se mantienen unas similares al
            curso inicial y se agregan otras.
          </p>
          <CoursesTags
            tags={
              Array.isArray(newCourse?.learningResults)
                ? newCourse.learningResults.slice(0, 2)
                : []
            }
          />
        </div>
      ) : null}
    </div>
  );
};

export default CurrentVsNew;
