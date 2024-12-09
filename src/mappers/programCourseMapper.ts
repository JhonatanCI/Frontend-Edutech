import { ProgramCourse, ProgramCourseRaw, SimpleOutcome } from "../model/types";

export function toProgramCourse(programCoursesRaw: ProgramCourseRaw[]): ProgramCourse[] {
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
        outcome,
        introduce,
        fortalece,
        valora,
      } = programCourse;
  
      const outcomeDTO: SimpleOutcome = {
        id: outcome.id,
        name: outcome.name,
        introduce,
        fortalece,
        valora,
      };
  
      if (!courseMap.has(courseId)) {
        courseMap.set(courseId, {
          programId,
          courseId,
          name,
          nameMen,
          description,
          credits,
          generalObjective,
          terminalObjectives,
          modality,
          semester,
          flexibility,
          outcomesContribution: [outcomeDTO],
        });
      } else {
        const existingCourse = courseMap.get(courseId);
        existingCourse.outcomesContribution.push(outcomeDTO);
      }
    });
  
    return Array.from(courseMap.values());
  }