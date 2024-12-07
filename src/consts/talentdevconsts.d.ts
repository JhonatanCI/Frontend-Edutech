import { Program } from "../model/types";

const defaultCertifications: Program[] = [
  {
    id: "112c7c20-493e-499c-869a-e5c49f608c1c",
    name: "Certificación en Data Science",
    description: "Introducción al análisis de datos y modelado predictivo.",
    credits: 10,
    categories: ["Categoría 1", "Categoría 2"]
  },
  {
    id: "bfe029ba-9784-4012-bcb5-c44a6ed0573d",
    name: "Certificación en Desarrollo Web",
    description: "Aprende los fundamentos de HTML, CSS y JavaScript.",
    credits: 8,
    categories: ["Categoría 1", "Categoría 2"]
  },
  {
    id: "5c4223a3-f290-451e-9323-a68c51dc7f6d",
    name: "Certificación en Marketing Digital",
    description: "Domina las estrategias de marketing en redes sociales y SEO.",
    credits: 9,
    categories: ["Categoría 1", "Categoría 2"]
  }
];

const defaultSpecializations: Program[] = [
  {
    id: "esp-001",
    name: "Especialización en Big Data",
    description: "Aprende a gestionar y analizar grandes volúmenes de datos.",
    credits: 20,
    categories: ["Categoría 1", "Categoría 2"]
  },
  {
    id: "esp-002",
    name: "Especialización en Transformación Digital",
    description: "Implementa estrategias digitales en organizaciones modernas.",
    credits: 18,
    categories: ["Categoría 1", "Categoría 2"]
  },
  {
    id: "esp-003",
    name: "Especialización en Derecho Internacional",
    description: "Explora las leyes y regulaciones que gobiernan las relaciones internacionales.",
    credits: 22,
    categories: ["Categoría 1", "Categoría 2"]
  }
];

const defaultMasters: Program[] = [
  {
    id: "master-001",
    name: "Maestría en Ciencias de la Computación",
    description: "Profundiza en algoritmos, sistemas distribuidos y seguridad informática.",
    credits: 30,
    categories: ["Categoría 1", "Categoría 2"]
  },
  {
    id: "master-002",
    name: "Maestría en Administración de Empresas",
    description: "Desarrolla habilidades avanzadas de gestión y liderazgo.",
    credits: 28,
    categories: ["Categoría 1", "Categoría 2"]
  },
  {
    id: "master-003",
    name: "Maestría en Psicología Clínica",
    description: "Especialízate en el diagnóstico y tratamiento de trastornos psicológicos.",
    credits: 32,
    categories: ["Categoría 1", "Categoría 2"]
  }
];

const defaultPHD: Program[] = [
  {
    id: "phd-001",
    name: "Doctorado en Inteligencia Artificial",
    description: "Investigación avanzada en aprendizaje profundo y aplicaciones innovadoras.",
    credits: 50,
    categories: ["Categoría 1", "Categoría 2"]
  },
  {
    id: "phd-002",
    name: "Doctorado en Biotecnología",
    description: "Explora técnicas avanzadas en genética y biología molecular.",
    credits: 48,
    categories: ["Categoría 1", "Categoría 2"]
  },
  {
    id: "phd-003",
    name: "Doctorado en Estudios Ambientales",
    description: "Investiga soluciones sostenibles para los desafíos ambientales globales.",
    credits: 45,
    categories: ["Categoría 1", "Categoría 2"]
  }
];

export { defaultCertifications, defaultSpecializations, defaultMasters, defaultPHD };