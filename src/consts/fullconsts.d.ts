import { defaultMasters } from "./talentdevconsts.d";
import { FullProgram, ProgramCourse, LearningResult, ProgramLearningResult, SimpleLearningResult } from '../model/types';
import { defaultPHD, defaultSpecializations } from "./talentdevconsts.d";
import { defaultWorlds } from "./worlds.d";
import learningItems from './learningItems.d';

const learningResult1: LearningResult = {
    id: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
    name: "Liderazgo",
    description: "Alguna descripción",
    competency: null
}

const simpleLearningResult: SimpleLearningResult = {
    id: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
    name: "Liderazgo",
    introduce: true,
    fortalece: true,
    valora: false
}

const simpleLearningResult2: SimpleLearningResult = {
    id: "0ff80525-0181-484e-b486-8b39a0ebd464",
    name: "Liderazgo",
    introduce: true,
    fortalece: true,
    valora: false
}

const simpleLearningResult3: SimpleLearningResult = {
    id: "fa38b0d1-ff4f-443b-99a3-768def9c70b",
    name: "Liderazgo",
    introduce: true,
    fortalece: true,
    valora: false
}

const learningResult2: LearningResult = {
    id: "0ff80525-0181-484e-b486-8b39a0ebd464",
    name: "Ingles",
    description: "Alguna descripción",
    competency: null
}

const learningResult3: LearningResult = {
    id: "fa38b0d1-ff4f-443b-99a3-768def9c70b6",
    name: "Experiencia de Usuario",
    description: "Alguna descripción",
    competency: null
}


export const programCourses: ProgramCourse[] = [
    {
        programId: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
        courseId: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
        learningResultId: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
        name: "Curso de Prueba 1",
        nameMen: "Curso de Prueba",
        description: "Curso de Prueba para analizar que tan bien se comporta la interfaz con datos quemados",
        credits: 2,
        generalObjective: "No hay",
        terminalObjectives: "No hay",
        modality: "VIRTUAL",
        semester: 1,
        flexibility: "CONDICIONADO",
        introduce: true,
        fortalece: true,
        valora: true,
        learningResultsContribution: [
            simpleLearningResult,
            simpleLearningResult3
        ]
    },
    {
        programId: "0ff80525-0181-484e-b486-8b39a0ebd464",
        courseId: "0ff80525-0181-484e-b486-8b39a0ebd464",
        learningResultId: "0ff80525-0181-484e-b486-8b39a0ebd464",
        name: "Curso de Prueba 2",
        nameMen: "Curso de Prueba",
        description: "Curso de Prueba para analizar que tan bien se comporta la interfaz con datos quemados",
        credits: 2,
        generalObjective: "No hay",
        terminalObjectives: "No hay",
        modality: "VIRTUAL",
        semester: 1,
        flexibility: "FLEXIBLE",
        introduce: true,
        fortalece: true,
        valora: true,
        learningResultsContribution: [
            simpleLearningResult2,
            simpleLearningResult3
        ]
    },
    {
        programId: "93d2c630-eeac-47cc-94ab-5a46c0fa22da",
        courseId: "93d2c630-eeac-47cc-94ab-5a46c0fa22da",
        learningResultId: "93d2c630-eeac-47cc-94ab-5a46c0fa22da",
        name: "Curso de Prueba 3",
        nameMen: "Curso de Prueba",
        description: "Curso de Prueba para analizar que tan bien se comporta la interfaz con datos quemados",
        credits: 2,
        generalObjective: "No hay",
        terminalObjectives: "No hay",
        modality: "VIRTUAL",
        semester: 1,
        flexibility: "FLEXIBLE",
        introduce: true,
        fortalece: true,
        valora: true,
        learningResultsContribution: [
            simpleLearningResult,
            simpleLearningResult3
        ]
    },
    {
        programId: "2d3dc141-0b1d-45b2-9f39-538a213f01ae",
        courseId: "2d3dc141-0b1d-45b2-9f39-538a213f01ae",
        learningResultId: "2d3dc141-0b1d-45b2-9f39-538a213f01ae",
        name: "Curso de Prueba 4",
        nameMen: "Curso de Prueba",
        description: "Curso de Prueba para analizar que tan bien se comporta la interfaz con datos quemados",
        credits: 2,
        generalObjective: "No hay",
        terminalObjectives: "No hay",
        modality: "VIRTUAL",
        semester: 1,
        flexibility: "CONDICIONADO",
        introduce: true,
        fortalece: true,
        valora: true,
        learningResultsContribution: [
            simpleLearningResult,
            simpleLearningResult2
        ]
    },
    {
        programId: "02a6bda8-00d1-4248-803e-7ecfd77b974b",
        courseId: "02a6bda8-00d1-4248-803e-7ecfd77b974b",
        learningResultId: "02a6bda8-00d1-4248-803e-7ecfd77b974b",
        name: "Curso de Prueba 5",
        nameMen: "Curso de Prueba",
        description: "Curso de Prueba para analizar que tan bien se comporta la interfaz con datos quemados",
        credits: 2,
        generalObjective: "No hay",
        terminalObjectives: "No hay",
        modality: "VIRTUAL",
        semester: 2,
        flexibility: "CONDICIONADO",
        introduce: true,
        fortalece: true,
        valora: true,
        learningResultsContribution: [
            simpleLearningResult2,
            simpleLearningResult3
        ]
    },
    {
        programId: "d561019e-2c20-48a4-8afa-c4044facfab6",
        courseId: "d561019e-2c20-48a4-8afa-c4044facfab6",
        learningResultId: "d561019e-2c20-48a4-8afa-c4044facfab6",
        name: "Curso de Prueba 6",
        nameMen: "Curso de Prueba",
        description: "Curso de Prueba para analizar que tan bien se comporta la interfaz con datos quemados",
        credits: 2,
        generalObjective: "No hay",
        terminalObjectives: "No hay",
        modality: "VIRTUAL",
        semester: 3,
        flexibility: "CONDICIONADO",
        introduce: true,
        fortalece: true,
        valora: true,
        learningResultsContribution: [
            simpleLearningResult2,
            simpleLearningResult3
        ]
    },
]

const programLearningResults: programLearningResult = [
    {
        programId: "d561019e-2c20-48a4-8afa-c4044facfab6",
        learningResultId: "d561019e-2c20-48a4-8afa-c4044facfab6",
        minCredits: 0,
        maxCredits: 5,
        program: null,
        learningResult: learningResult1
    },
    {
        programId: "02a6bda8-00d1-4248-803e-7ecfd77b974b",
        learningResultId: "02a6bda8-00d1-4248-803e-7ecfd77b974b",
        minCredits: 0,
        maxCredits: 15,
        program: null,
        learningResult: learningResult2
    },
    {
        programId: "93d2c630-eeac-47cc-94ab-5a46c0fa22da",
        learningResultId: "93d2c630-eeac-47cc-94ab-5a46c0fa22da",
        minCredits: 0,
        maxCredits: 4,
        program: null,
        learningResult: learningResult3
    }
]

export const fullProgramExample: FullProgram = {
    id: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
    name: "Maestría en Innovación Tecnologica",
    credits: 28,
    semesters: 3,
    graduateProfile: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores labore dicta sapiente iste aliquam quaerat perspiciatis dolore minima modi placeat? Cumque fuga soluta, pariatur at veniam ipsa cum quasi ipsam.",
    programType: "MAESTRIA",
    tags: "maestria, innovación, innovacion, tecnologia, tic",
    image: "https://th.bing.com/th/id/OIP.cv7VXyoSS47ruQQVfIgjigHaEK?rs=1&pid=ImgDetMain",
    parents: defaultPHD,
    children: defaultSpecializations,
    academicCompetencies: null,
    programCourses: programCourses,
    programLearningResults: programLearningResults,
    academicWorlds: defaultWorlds
}