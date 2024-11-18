import { Program, World } from "./types";
import dsImage from "../assets/worlds_assets/data_science.svg"
import pmImage from "../assets/worlds_assets/project_management.svg"
import aiImage from "../assets/worlds_assets/artificial_inteligence.svg"
import innImage from "../assets/worlds_assets/innovation.svg"
import wdImage from "../assets/worlds_assets/web_development.svg"

export const defaultPrograms: Program[] = [
    {
        id: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
        name: "Maestría en Gerencia de Proyectos",
        description: "Descripción del programa, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    },
    {
        id: "6599605e-cb4f-498e-82cd-79b2941bf513",
        name: "Maestría en Ciencia de Datos",
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
    "Gerencia de Proyectos": pmImage,
    "Ciencia de Datos": dsImage,
    "Inteligencia Artificial": aiImage,
    "Innovación": innImage,
    "Desarrollo Web": wdImage
}