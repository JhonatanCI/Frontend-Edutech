import { defaultMasters } from "./talentdevconsts.d";
import { FullProgram } from "./types";
import { defaultPHD, defaultSpecializations } from "./talentdevconsts.d";
import { defaultWorlds } from "./worlds.d";

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
    programCourses: null,
    programOutcomes: null,
    academicWorlds: defaultWorlds
}
