import { ProgramCourse, ProgramOutcome } from "../model/types";

export const getMaxValue = (programOutcomes: ProgramOutcome[]) => {
    return programOutcomes.reduce((max, outcome) => {
      return outcome.maxCredits > max ? outcome.maxCredits : max;
    }, 0);
};

export const getCategories = (programOutcomes: ProgramOutcome[]) => {
    return programOutcomes.map(outcome => outcome.outcome.name);
};

export const getContributionForEachCategory = (programCourses: ProgramCourse[], categories: string[]) => {
  return categories.map(category =>
    programCourses.reduce((sum, course) => {
      return course.outcome.name === category ? sum + course.credits : sum;
    }, 0)
  );
}