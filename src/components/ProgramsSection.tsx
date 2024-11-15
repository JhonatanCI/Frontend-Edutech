import React from 'react';
import HeroTitle from './HeroTitle';
import aiImage from '../assets/ai.jpg';
import ProgramCard from './ProgramCard';

type UUID = `${string}-${string}-${string}-${string}-${string}`;

interface Program {
  id: UUID,
  name: string,
  description: string
}

const ProgramSection: React.FC = () => {

  const defaultPrograms: Program[] = [
    {
      id: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
      name: "Maestría en Gerencia de Proyectos",
      description: "Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    },
    {
      id: "6599605e-cb4f-498e-82cd-79b2941bf513",
      name: "Maestría en Ciencia de Datos",
      description: "Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    },
    {
      id: "b689fa3c-4237-4db2-9122-992c09d75662",
      name: "Maestría en Experiencias Digitales",
      description: "Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    },
    {
      id: "408b590f-253b-4046-8970-49687573d4be",
      name: "Maestría en Ciberseguridad",
      description: "Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    }
  ];

  return (
    <div className="px-16 py-16 bg-white text-left flex flex-col">
      <HeroTitle
        heading={
          <>
            Conoce <br /> nuestros programas
          </>
        }
        subheading="Explora EverGrow, con nuestras maestrías, especializaciones, certificaciones y cursos estarás listo para convertirte en el profesional del futuro."
        variant='tertiary'
      />



      {/* Cards Scroll Nav */}
      <div className="flex overflow-x-auto scroll-invisible py-24 gap-8 px-16 items-center max-w-full">
        <div className="flex gap-8">
          {defaultPrograms.map(program =>
            <ProgramCard key={program.id}
              image={aiImage}
              title={program.name}
              description={program.description}
              buttonText="Saber más"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramSection;
