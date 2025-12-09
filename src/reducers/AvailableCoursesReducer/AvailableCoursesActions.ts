import { Course, ProgramCourse, CourseSelectionPreset } from "../../model/types";

export enum ACActionType {
  INIT_PROGRAMCOURSES = "initial_state",
  INIT_COURSES = "initial_courses",
  SWAP_COURSE = "swap_course",
  RESET_COURSE = "reset_course",
  APPLY_PRESET = "apply_preset",
  CLEAR_PRESET = "clear_preset",
}

export type ACPayload = {
  current: ProgramCourse;
  newCourse: Course;
};

export type ACPresetPayload = {
  preset: CourseSelectionPreset;
  coursesMap: Map<string, Course>;
};
