import React from 'react';
import WorldCard from './WorldCard';
import HeroTitle from './HeroTitle';
import aiImage from '../assets/ai.jpg';
import Button from './Button';

type UUID = `${string}-${string}-${string}-${string}-${string}`;

interface World {
  id: UUID,
  name: string,
  description: string
}


const WorldsSection: React.FC = () => {

  const defaultWorlds: World[] = [
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
      name: "Liderazgo",
      description: "Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    },
    {
      id: "408b590f-253b-4046-8970-49687573d4be",
      name: "Ciencia de Datos",
      description: "Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas."
    },
  ];

  return (
    <div className="px-16 py-16 bg-white text-center flex flex-col">
      <HeroTitle
        heading={
          <>
            Nuestros Mundos
          </>
        }
        subheading="Explora los diferentes mundos que tenemos. Aquí podrás llevar tu conocimiento a otro nivel."
        variant='secondary'
      />
      <div className='pb-16 pt-8 flex justify-center'>
        <Button variant="primary" size="medium" > Descubrir Todos  </Button>
      </div>


      {/* Cards Grid */}
      <div className="container mx-auto flex gap-8 px-16">
        {defaultWorlds.map(world =>
          <WorldCard key={world.id}
            image={aiImage}
            title={world.name}
            description={world.description}
            buttonText="Saber más"
          />
        )}
      </div>
    </div>
  );
};

export default WorldsSection;
