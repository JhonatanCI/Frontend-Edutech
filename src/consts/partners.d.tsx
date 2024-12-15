import { Image } from "./types.d"
import FVL from "../assets/partners/valle_del_lili.svg"
import BW from "../assets/partners/bancow.webp"
import TQ from "../assets/partners/tq.svg"
import Manuelita from "../assets/partners/manuelita.svg"
import CPalmolive from "../assets/partners/colgate-palmolive.svg"
import CMelendez from "../assets/partners/constructora_melendez.svg"

export const partners: Image[] = [
    {
        src: FVL, // Usar la importación
        alt: "Fundación Valle del Lili" // Cambia {FVL} por una descripción en texto
    },
    {
        src: BW,
        alt: "Banco W"
    },
    {
        src: TQ,
        alt: "Tecnoquímicas"
    },
    {
        src: Manuelita,
        alt: "Ingenio Manuelita"
    },
    {
        src: CPalmolive,
        alt: "Colgate Palmolive"
    },
    {
        src: CMelendez,
        alt: "Constructora Meléndez"
    }
];
