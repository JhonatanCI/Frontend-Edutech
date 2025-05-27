import { Course, LearningResult, ProgramCourse, ProgramLearningResult, SimpleLearningResult } from "../model/types"

export const filterBySemester = (semester: number, programCourses: ProgramCourse[]) => {
  return programCourses.filter((pc) => pc.semester === semester)
}

export const getMaxValue = (programLearningResults: ProgramLearningResult[]) => {
  return programLearningResults.reduce((max, lr) => {
    return lr.maxCredits > max ? lr.maxCredits
      : lr.minCredits > max ? lr.minCredits : max;
  }, 0);
}

export const getCategories = (programLearningResults: ProgramLearningResult[]) => {
  if (programLearningResults) {
    return programLearningResults.map(lr => lr.learningResultName);
  } else {
    return null
  }
}

export const getCategoriesByLearningResult = (learningResults: LearningResult[]) => {
  return learningResults.map(lr => lr.name);
}

export const getCategoriesForCourse = (contributions: SimpleLearningResult[]) => {
  return contributions.map(lr => lr.name)
}

export const getContributionForEachCategory = (programCourses: ProgramCourse[], categories: string[]) => {
  return categories.map(category =>
    programCourses.reduce((sum, course) => {
      const contributesToCategory = course.learningResultsContribution.some(lr => lr.name === category);
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
  const programCourseOutcomesSet = new Set(pc.learningResultsContribution.map(lr => lr.name));

  return c.filter(course => {
    if (course.learningResults.length !== programCourseOutcomesSet.size) {
      return false;
    }

    return course.learningResults.every(lr => programCourseOutcomesSet.has(lr.name));
  });
};
