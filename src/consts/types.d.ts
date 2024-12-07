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
  id: UUID,
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
  programCourses: ProgramCourse[],
  programOutcomes: any,
  academicWorlds: World[]
}

export interface ProgramCourse {
  programId: UUID,
  courseId: UUID,
  outcomeId: UUID,
  name: string,
  nameMen: string,
  description: string,
  credits: number,
  generalObjective: string,
  terminalObjectives: string,
  modality: string,
  semester: number,
  flexibility: string,
  introduce: boolean,
  fortalece: boolean,
  valora: boolean,
  outcome: Outcome
}

export interface Outcome {
  id: UUID,
  name: string,
  description: string,
  competency: any
}