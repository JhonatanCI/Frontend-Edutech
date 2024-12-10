import { defaultMasters } from "./talentdevconsts.d";
import { FullProgram, ProgramCourse, Outcome, ProgramOutcome, SimpleOutcome } from "../model/types";
import { defaultPHD, defaultSpecializations } from "./talentdevconsts.d";
import { defaultWorlds } from "./worlds.d";

const outcome1: Outcome = {
    id: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
    name: "Liderazgo",
    description: "Alguna descripción",
    competency: null
}

const simpleOutcome: SimpleOutcome = {
    id: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
    name: "Liderazgo",
    introduce: true,
    fortalece: true,
    valora: false
}

const simpleOutcome2: SimpleOutcome = {
    id: "0ff80525-0181-484e-b486-8b39a0ebd464",
    name: "Liderazgo",
    introduce: true,
    fortalece: true,
    valora: false
}

const simpleOutcome3: SimpleOutcome = {
    id: "fa38b0d1-ff4f-443b-99a3-768def9c70b",
    name: "Liderazgo",
    introduce: true,
    fortalece: true,
    valora: false
}

const outcome2: Outcome = {
    id: "0ff80525-0181-484e-b486-8b39a0ebd464",
    name: "Ingles",
    description: "Alguna descripción",
    competency: null
}

const outcome3: Outcome = {
    id: "fa38b0d1-ff4f-443b-99a3-768def9c70b6",
    name: "Experiencia de Usuario",
    description: "Alguna descripción",
    competency: null
}


export const programCourses: ProgramCourse[] = [
    {
        programId: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
        courseId: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
        outcomeId: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
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
        outcomesContribution: [
            simpleOutcome,
            simpleOutcome3
        ]
    },
    {
        programId: "0ff80525-0181-484e-b486-8b39a0ebd464",
        courseId: "0ff80525-0181-484e-b486-8b39a0ebd464",
        outcomeId: "0ff80525-0181-484e-b486-8b39a0ebd464",
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
        outcomesContribution: [
            simpleOutcome2,
            simpleOutcome3
        ]
    },
    {
        programId: "93d2c630-eeac-47cc-94ab-5a46c0fa22da",
        courseId: "93d2c630-eeac-47cc-94ab-5a46c0fa22da",
        outcomeId: "93d2c630-eeac-47cc-94ab-5a46c0fa22da",
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
        outcomesContribution: [
            simpleOutcome,
            simpleOutcome3
        ]
    },
    {
        programId: "2d3dc141-0b1d-45b2-9f39-538a213f01ae",
        courseId: "2d3dc141-0b1d-45b2-9f39-538a213f01ae",
        outcomeId: "2d3dc141-0b1d-45b2-9f39-538a213f01ae",
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
        outcomesContribution: [
            simpleOutcome,
            simpleOutcome2
        ]
    },
    {
        programId: "02a6bda8-00d1-4248-803e-7ecfd77b974b",
        courseId: "02a6bda8-00d1-4248-803e-7ecfd77b974b",
        outcomeId: "02a6bda8-00d1-4248-803e-7ecfd77b974b",
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
        outcomesContribution: [
            simpleOutcome2,
            simpleOutcome3
        ]
    },
    {
        programId: "d561019e-2c20-48a4-8afa-c4044facfab6",
        courseId: "d561019e-2c20-48a4-8afa-c4044facfab6",
        outcomeId: "d561019e-2c20-48a4-8afa-c4044facfab6",
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
        outcomesContribution: [
            simpleOutcome2,
            simpleOutcome3
        ]
    },
]

const programOutcomes: ProgramOutcome = [
    {
        programId: "d561019e-2c20-48a4-8afa-c4044facfab6",
        outcomeId: "d561019e-2c20-48a4-8afa-c4044facfab6",
        minCredits: 0,
        maxCredits: 5,
        program: null,
        outcome: outcome1
    },
    {
        programId: "02a6bda8-00d1-4248-803e-7ecfd77b974b",
        outcomeId: "02a6bda8-00d1-4248-803e-7ecfd77b974b",
        minCredits: 0,
        maxCredits: 15,
        program: null,
        outcome: outcome2
    },
    {
        programId: "93d2c630-eeac-47cc-94ab-5a46c0fa22da",
        outcomeId: "93d2c630-eeac-47cc-94ab-5a46c0fa22da",
        minCredits: 0,
        maxCredits: 4,
        program: null,
        outcome: outcome3
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
    programOutcomes: programOutcomes,
    academicWorlds: defaultWorlds
}