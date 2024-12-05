import Button from '../Commons/Button';
import HabilitiesTags from './HabilitiesTags';


const ProgramHeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-[url('../assets/ProgramBackground.png')] bg-cover bg-center flex flex-col items-center justify-center text-white">
        <div className='flex flex-col px-64 -mt-16'>
            <h1 className='text-8xl font-calsans text-black leading-tight '>Maestría en <br></br>Gerencia de Proyectos</h1>
            <p className='text text-black w-1/2 mb-2'>Los graduados de la Maestría en Gerencia de Proyectos son líderes capacitados para abordar desafíos complejos en el campo de la gestión de proyectos. 
                Con un enfoque estratégico y una comprensión profunda de los principios fundamentales de la gestión de proyectos, están preparados para concebir, 
                planificar y ejecutar proyectos de manera eficiente y efectiva. </p>

        <HabilitiesTags
          tags={[
            'Negocios',
            'Liderazgo',
            'Inteligencia Artificial',
            'Diseño de Experiencia',
            'Tecnología',
            'Salud',
          ]}
        />
        <div className='w-1/3 pt-12'>
                    <Button href="#" variant="tertiary" size="medium" withArrow={true} > Inscribirme ya  </Button>
        </div>
        </div>
    </div>
    
  );
};

export default ProgramHeroSection;