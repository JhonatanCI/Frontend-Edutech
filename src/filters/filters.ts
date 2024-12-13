import { Course, Outcome, ProgramCourse, ProgramOutcome, SimpleOutcome } from "../model/types"

export const filterBySemester = (semester: number, programCourses: ProgramCourse[]) => {
    return programCourses.filter((pc) => pc.semester === semester)
}

export const getMaxValue = (programOutcomes: ProgramOutcome[]) => {
    return programOutcomes.reduce((max, outcome) => {
      return outcome.maxCredits > max ? outcome.maxCredits
       : outcome.minCredits > max? outcome.minCredits : max;
    }, 0);
}

export const getCategories = (programOutcomes: ProgramOutcome[]) => {
    return programOutcomes.map(outcome => outcome.outcomeName);
}

export const getCategoriesByOutcome = (outcomes: Outcome[]) => {
  return outcomes.map(outcome => outcome.name);
}

export const getCategoriesForCourse = (contributions: SimpleOutcome[]) => {
  return contributions.map(contribution => contribution.name)
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

export function filterCourses(courses: Course[], query: string): Course[] {
  
  const keywords = query.split(',').map((keyword) => keyword.trim().toLowerCase());

  if(query === ''){
    return courses
  }

  return courses.filter((course) => {
    // Check if any keyword matches the course name
    const nameMatches = keywords.some((keyword) =>
      course.name.toLowerCase().includes(keyword)
    );

    // Check if any keyword matches the academic worlds (only if it's an array)
    const academicWorldsMatch =
      Array.isArray(course.academicWorlds) &&
      keywords.some((keyword) =>
        course.academicWorlds.some((world) => world.toLowerCase().includes(keyword))
      );

    return nameMatches || academicWorldsMatch;
  });
}