export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type Result = {
  microLearnings: MicroLearning[],
  courses: Course[],
  certifications: Program[],
  specializations: Program[],
  masters: Program[],
  phd: Program[],
}

export type MicroLearning = {
  id: UUID,
  name: string,
  description: string,
  modality: string,
  type: string
}

export type Course = {
  [x: string]: any;
  id: UUID,
  name: string,
  nameMen: string,
  description: string,
  credits: number,
  modality: string,
  generalObjective: string,
  terminalObjectives: string,
  academicWorlds: string[],
  learningResults: string[]
}

export type Program = {
  tags: any;
  semesters: any;
  sniesCode: string;
  modality: string;
  degreeTitle: string;
  id: UUID,
  name: string,
  description: string,
  image: string,
  credits: number,
  categories: string[]
}

export type World = {
    id: UUID,
    name: string,
    title: string,
    description: string,
    image: string
}

export type ProgramCourse = {
  programId: UUID,
  courseId: UUID,
  name: string,
  nameMen: string,
  description: string,
  credits: number,
  generalObjective: string,
  terminalObjectives: string,
  modality: string,
  semester: number
  flexibility: 'CONDICIONADO' | 'FLEXIBLE',
    father?: boolean,
  learningResultsContribution: SimpleLearningResult[];
  // Campos para gestionar intercambios (swap) en frontend sin perder contribuciones originales
  originalCourseId?: UUID;
  originalName?: string;
  originalDescription?: string;
  originalCredits?: number;
  swapped?: boolean;
}

export type ProgramCourseRaw = {
  programId: UUID,
  courseId: UUID,
  learningResultId: UUID,
  name: string,
  nameMen: string,
  description: string,
  credits: number,
  generalObjective: string,
  terminalObjectives: string,
  modality: string,
  semester: number
  flexibility: string,
  introduce: boolean,
  fortalece: boolean,
  valora: boolean,
  learningResult: LearningResult;
}

export type LearningResult = {
  id: UUID,
  name: string,
  description: string,
  competency: any
}

type SimpleLearningResult = {
  id: UUID,
  name: string,
  introduce: boolean,
  fortalece: boolean,
  valora: boolean
}

export type ProgramLearningResult = {
  programId: UUID,
  learningResultId: UUID,
  minCredits: number,
  maxCredits: number,
  learningResultName: string
}

//Full Programs and Courses
export type FullProgram = {
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
  programLearningResults: ProgramLearningResult[],
  academicWorlds: World[]
}