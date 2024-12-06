export type UUID = `${string}-${string}-${string}-${string}-${string}`;


export interface Result {
  microLearnings: MicroLearning[],
  courses: Course[],
  certifications: Program[],
  specializations: Program[],
  masters: Program[],
  phd: Program[],
}

export interface MicroLearning {
  id: UUID,
  name: string,
  description: string,
  categories: string[]
}

export interface Course {
  id: UUID,
  name: string,
  description: string,
  credits: number,
  categories: string[]
}

export interface Program {
  id: UUID,
  name: string,
  description: string,
  image: string,
  credits: number,
  categories: string[]
}

export interface World {
    id: UUID,
    name: string,
    description: string,
    image: string
}

export interface LearningItem {
  title: string;
  description: string;
  icon: JSX.Element;
}



//Full Programs and Courses
export interface FullProgram {
  id: string,
  name: string,
  credits: number,
  semesters: number,
  graduateProfile: string,
  programType: string,
  tags: string,
  image: string,
  parents: Program[],
  children: Program[],
  academicCompetencies: any,
  programCourses: any,
  programOutcomes: any,
  academicWorlds: World[]
}