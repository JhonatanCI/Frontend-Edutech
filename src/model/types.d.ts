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
  id: UUID,
  name: string,
  nameMen: string,
  description: string,
  credits: number,
  modality: string,
  generalObjective: string,
  terminalObjectives: string,
  academicWorlds: string[],
  outcomes: string[]
}

export type Program = {
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
  outcomesContribution: SimpleOutcome[];
}

export type ProgramCourseRaw = {
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
  semester: number
  flexibility: string,
  introduce: boolean,
  fortalece: boolean,
  valora: boolean,
  outcome: Outcome;
}

export type Outcome = {
  id: UUID,
  name: string,
  description: string,
  competency: any
}

type SimpleOutcome = {
  id: UUID,
  name: string,
  introduce: boolean,
  fortalece: boolean,
  valora: boolean
}

export type ProgramOutcome = {
  programId: UUID,
  outcomeId: UUID,
  minCredits: number,
  maxCredits: number,
  outcomeName: string
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
  programOutcomes: ProgramOutcome[],
  academicWorlds: World[]
}