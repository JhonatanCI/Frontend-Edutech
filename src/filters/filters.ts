import { Course, Outcome, ProgramCourse, ProgramOutcome, SimpleOutcome } from "../model/types"

export const filterBySemester = (semester: number, programCourses: ProgramCourse[]) => {
  return programCourses.filter((pc) => pc.semester === semester)
}

export const getMaxValue = (programOutcomes: ProgramOutcome[]) => {
  return programOutcomes.reduce((max, outcome) => {
    return outcome.maxCredits > max ? outcome.maxCredits
      : outcome.minCredits > max ? outcome.minCredits : max;
  }, 0);
}

export const getCategories = (programOutcomes: ProgramOutcome[]) => {
  if (programOutcomes) {
    return programOutcomes.map(outcome => outcome.outcomeName);
  } else {
    return null
  }
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
  const keywords = query.toLowerCase().split(',').map(word => word.trim());

  if (keywords.length === 0 || query.trim() === '') {
    return courses;
  }

  const worlds = new Set<string>();
  const filteredCoursesByWorld = new Set<Course>();
  keywords.forEach(keyword => {
    courses.forEach(course => {
      if (course.academicWorlds.some(world => world.toLowerCase().includes(keyword))) {
        filteredCoursesByWorld.add(course);
        worlds.add(keyword)
      }
    });
  });

  if (filteredCoursesByWorld.size === 0) {
    courses.forEach(course => filteredCoursesByWorld.add(course));
  }

  const filteredCoursesByName = new Set<Course>();
  keywords.forEach(keyword => {
    filteredCoursesByWorld.forEach(course => {
      if (course.name.toLowerCase().includes(keyword) && !worlds.has(keyword)) {
        filteredCoursesByName.add(course);
      }
    });
  });

  if (filteredCoursesByName.size === 0) {
    filteredCoursesByWorld.forEach(course => filteredCoursesByName.add(course));
  }

  return Array.from(filteredCoursesByName);
}

export const exactCoincidences = (pc: ProgramCourse, c: Course[]) => {
  const programCourseOutcomesSet = new Set(pc.outcomesContribution.map(outcome => outcome.name));

  return c.filter(course => {
    if (course.outcomes.length !== programCourseOutcomesSet.size) {
      return false;
    }

    return course.outcomes.every(outcome => programCourseOutcomesSet.has(outcome));
  });
};
