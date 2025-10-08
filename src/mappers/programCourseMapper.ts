import { ProgramCourse } from "../model/types";

export function toProgramCourse(programCoursesRaw: any[]): ProgramCourse[] {
  const courseMap = new Map();

  programCoursesRaw.forEach((programCourse) => {
    const {
      courseId,
      programId,
      name,
      nameMen,
      description,
      credits,
      generalObjective,
      terminalObjectives,
      modality,
      semester,
      flexibility,
      learningResultsContribution = [],
      father,
      is_father,
      isFather,
    } = programCourse;

    const learningResults = (learningResultsContribution || []).map(
      (lr: any) => ({
        id: lr.id,
        name: lr.name,
        introduce: lr.introduce,
        fortalece: lr.strengthen, // <-- usa strengthen
        valora: lr.value, // <-- usa value
      }),
    );

    if (!courseMap.has(courseId)) {
      courseMap.set(courseId, {
        programId,
        courseId,
        name,
        nameMen,
        description,
        credits: credits ?? 0,
        generalObjective,
        terminalObjectives,
        modality,
        semester,
        flexibility: flexibility ?? "FLEXIBLE",
        father:
          typeof father === "boolean"
            ? father
            : typeof is_father === "boolean"
              ? is_father
              : typeof isFather === "boolean"
                ? isFather
                : undefined,
        learningResultsContribution: learningResults,
      });
    } else {
      const existingCourse = courseMap.get(courseId);
      existingCourse.learningResultsContribution.push(...learningResults);
    }
  });

  return Array.from(courseMap.values());
}
