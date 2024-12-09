import { Program } from "../model/types";

const imageUrl = "https://th.bing.com/th/id/OIP.cv7VXyoSS47ruQQVfIgjigHaEK?rs=1&pid=ImgDetMain"

const defaultPrograms: Program[] = [
    {
        id: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
        name: "Maestría en Ciencias de la Computación",
        description: "Descripción del programa, contando sobre los principales detalles de esta. Máximo unas 3 líneas.",
        image: imageUrl
    },
    {
        id: "6599605e-cb4f-498e-82cd-79b2941bf513",
        name: "Maestría en Innovación Tecnologica",
        description: "Descripción del programa, contando sobre los principales detalles de esta. Máximo unas 3 líneas.",
        image: imageUrl
    },
    {
        id: "b689fa3c-4237-4db2-9122-992c09d75662",
        name: "Maestría en Experiencias Digitales",
        description: "Descripción del programa, contando sobre los principales detalles de esta. Máximo unas 3 líneas.",
        image: imageUrl
    },
    {
        id: "408b590f-253b-4046-8970-49687573d4be",
        name: "Maestría en Ciberseguridad",
        description: "Descripción del programa, contando sobre los principales detalles de esta. Máximo unas 3 líneas.",
        image: imageUrl
    }
];

export default defaultPrograms;