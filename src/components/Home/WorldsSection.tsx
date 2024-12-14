import React from 'react';
import WorldCard from './WorldCard';
import HeroTitle from './HeroTitle';
import Button from '../Commons/Button';

import { useWorlds } from '../../hooks/useWorlds';

const WorldsSection: React.FC = () => {

  const worlds = useWorlds()

  return (
    <div id="mundos" className="px-16 pt-24 pb-20 bg-white text-center flex flex-col">
      <HeroTitle
        heading={
          <>
            Nuestros mundos
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
        {worlds.map(world =>
          <WorldCard key={world.id}
            image={world.image}
            title={world.title}
            description={world.description}
            buttonText="Saber más"
          />
        )}
      </div>
    </div>
  );
};

export default WorldsSection;
