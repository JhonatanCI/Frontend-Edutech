import { ProgramCourse, ProgramOutcome } from "../model/types"

export const filterBySemester = (semester: number, programCourses: ProgramCourse[]) => {
    return programCourses.filter((pc) => pc.semester === semester)
}

export const getMaxValue = (programOutcomes: ProgramOutcome[]) => {
    return programOutcomes.reduce((max, outcome) => {
      return outcome.maxCredits > max ? outcome.maxCredits : max;
    }, 0);
}

export const getCategories = (programOutcomes: ProgramOutcome[]) => {
    return programOutcomes.map(outcome => outcome.outcome.name);
}

export const getContributionForEachCategory = (programCourses: ProgramCourse[], categories: string[]) => {
  return categories.map(category =>
    programCourses.reduce((sum, course) => {
      const contributesToCategory = course.outcomesContribution.some(outcome => outcome.name === category);
      return contributesToCategory ? sum + course.credits : sum;
    }, 0)
  );
}

export const getCoursesUUID = (programCourses: ProgramCourse[]) => {
    return programCourses.map(course => course.courseId);
}