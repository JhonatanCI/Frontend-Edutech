import React from 'react';
import HeroTitle from './HeroTitle';
import aiImage from '../assets/ai.jpg';
import ProgramCard from './ProgramCard';


const ProgramSection: React.FC = () => {
  return (
    <div className="px-16 pb-16 bg-white text-left flex flex-col">
      <HeroTitle
        heading={
          <>
            Conoce <br/> nuestros programas
          </>
        }
        subheading="Explora CoursePlace, con nuestras maestrías, especializaciones, certificaciones y cursos estarás listo para convertirte en el profesional del futuro."
        variant='secondary'
      />
      


      {/* Cards Scroll Nav */}
      <div className="flex flex-row  mx-auto gap-8  px-16">
        <ProgramCard
          image={aiImage}
          title="Inteligencia Artificial"
          description="Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
          buttonText="Saber más"
        />
        <ProgramCard
          image="/path/to/data-science-image.jpg"
          title="Ciencia de Datos"
          description="Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
          buttonText="Saber más"
        />
        <ProgramCard
          image="/path/to/leadership-image.jpg"
          title="Liderazgo"
          description="Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
          buttonText="Saber más"
        />
        <ProgramCard
          image="/path/to/innovation-image.jpg"
          title="Innovación"
          description="Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
          buttonText="Saber más"
        />
      </div>
    </div>
  );
};

export default ProgramSection;
