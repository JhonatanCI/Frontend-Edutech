import { ProgramCourse, ProgramCourseRaw, SimpleLearningResult } from "../model/types";

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
      } = programCourse;
  

      const learningResults = (learningResultsContribution || []).map((lr: any) => ({
        id: lr.id,
        name: lr.name,
        introduce: lr.introduce,
        fortalece: lr.strengthen, // <-- usa strengthen
        valora: lr.value,         // <-- usa value
      }));
  
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
          learningResultsContribution: learningResults,
        });
      } else {
        const existingCourse = courseMap.get(courseId);
        existingCourse.learningResultsContribution.push(...learningResults);
      }
    });
  
    return Array.from(courseMap.values());
  }