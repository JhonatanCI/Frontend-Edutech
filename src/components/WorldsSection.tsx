import React from 'react';
import WorldCard from './WorldCard';
import HeroTitle from './HeroTitle';
import aiImage from '../assets/ai.jpg';
import Button from './Button';
import { defaultWorlds } from '../consts/consts.d';

const WorldsSection: React.FC = () => {


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
