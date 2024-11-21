import { Program, World } from "./types";

import dsWorld from "../assets/worlds_assets/data_science.svg"
import pmWorld from "../assets/worlds_assets/project_management.svg"
import aiWorld from "../assets/worlds_assets/artificial_inteligence.svg"
import innWorld from "../assets/worlds_assets/innovation.svg"
import wdWorld from "../assets/worlds_assets/web_development.svg"

import pmMaster from "../assets/programs_assets/project_management_master.svg"
import cbMaster from "../assets/programs_assets/cibersecurity_master.svg"
import dsMaster from "../assets/programs_assets/data_science_master.svg"
import deMaster from "../assets/programs_assets/digital_experiences_master.svg"
import aiPHD from "../assets/programs_assets/AIPHD.svg"
import pfCert from  "../assets/programs_assets/project_formulation_certif.svg"
import tiInnovMaster from "../assets/programs_assets/tinnovation_master.svg"
import aiAppliedMaster from "../assets/programs_assets/aplied_ai_master.svg"


export const defaultPrograms: Program[] = [
    {
        id: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
        name: "Maestría en Ciencias de la Computación",
        description: "Descripción del programa, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    },
    {
        id: "6599605e-cb4f-498e-82cd-79b2941bf513",
        name: "Maestría en Innovación Tecnologica",
        description: "Descripción del programa, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    },
    {
        id: "b689fa3c-4237-4db2-9122-992c09d75662",
        name: "Maestría en Experiencias Digitales",
        description: "Descripción del programa, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    },
    {
        id: "408b590f-253b-4046-8970-49687573d4be",
        name: "Maestría en Ciberseguridad",
        description: "Descripción del programa, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    }
];


export const defaultWorlds: World[] = [
    {
        id: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
        name: "Gerencia de Proyectos",
        description: "Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    },
    {
        id: "6599605e-cb4f-498e-82cd-79b2941bf513",
        name: "Inteligencia Artificial",
        description: "Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    },
    {
        id: "b689fa3c-4237-4db2-9122-992c09d75662",
        name: "Innovación",
        description: "Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    },
    {
        id: "408b590f-253b-4046-8970-49687573d4be",
        name: "Ciencia de Datos",
        description: "Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    },
];


export const worldsImages = {
    "Gerencia de Proyectos": pmWorld,
    "Ciencia de Datos": dsWorld,
    "Inteligencia Artificial": aiWorld,
    "Innovación": innWorld,
    "Desarrollo Web": wdWorld
}


export const programsImages = {
    "Maestría en Gerencia de Proyectos": pmMaster,
    "Certificación en Formulación y Coordinación de Proyectos": pfCert,
    "Maestría en Ciencia de Datos": dsMaster,
    "Especialización en Ciberseguridad": cbMaster,
    "Maestría en Inteligencia Artificial Aplicada": aiAppliedMaster,
    "Certificación en Experiencias Digitales": deMaster,
    "Maestría en Innovación Tecnológica": tiInnovMaster,
    "Doctorado en Inteligencia Artificial y Ciencia de Datos": aiPHD,
}