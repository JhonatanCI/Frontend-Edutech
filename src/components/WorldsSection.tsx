import React from 'react';
import WorldCard from './WorldCard';  // adjust the path based on your file structure
import HeroTitle from './HeroTitle';
import aiImage from '../assets/ai.jpg'; 
import Button from './Button';

const WorldsSection: React.FC = () => {
  return (
    <div className="px-16 pb-16 bg-black text-center flex flex-col">
       <HeroTitle
        heading={
          <>
            Nuestros Mundos
          </>
        }
        subheading="Explora los diferentes mundos que tenemos. Aquí podrás llevar tu conocimiento a otro nivel."
      /> 
      <div className='pb-16 pt-8 flex justify-center'>
        <Button variant="primary" size="medium" > Descubrir Todos  </Button>
      </div>
      
      
      {/* Cards Grid */}
      <div className="container mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-16">
        <WorldCard 
          image={aiImage}
          title="Inteligencia Artificial" 
          description="Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas." 
          buttonText="Saber más" 
        />
        <WorldCard 
          image="/path/to/data-science-image.jpg" 
          title="Ciencia de Datos" 
          description="Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas." 
          buttonText="Saber más" 
        />
        <WorldCard 
          image="/path/to/leadership-image.jpg" 
          title="Liderazgo" 
          description="Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas." 
          buttonText="Saber más" 
        />
        <WorldCard 
          image="/path/to/innovation-image.jpg" 
          title="Innovación" 
          description="Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas." 
          buttonText="Saber más" 
        />
      </div>
    </div>
  );
};

export default WorldsSection;
