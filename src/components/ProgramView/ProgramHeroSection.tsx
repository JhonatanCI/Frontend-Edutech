import { getCategories } from '../../filters/filters';
import { FullProgram } from '../../model/types';
import Button from '../Commons/Button';
import HabilitiesTags from './HabilitiesTags';

interface ProgramHeroSectionProps {
  program: FullProgram
}

const ProgramHeroSection: React.FC<ProgramHeroSectionProps> = ({ program }) => {
  const parts = program.name.split(" ");
  const nameFirstPart = parts.slice(0, 2).join(" ");
  const nameSecondPart = parts.slice(2).join(" ");

  const categories = getCategories(program.programOutcomes) || ["Categoria 1", "Categoria 2"]

  return (
    <div
      className="relative w-full h-screen bg-center flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6)), url(${program.image})`,
        backgroundSize: 'cover',
      }}
    >
      <div className='flex flex-col px-52 mt-32 h-full'>
        <span className='text-6xl font-calsans text-white leading-tight max-w-6xl'>{nameFirstPart}</span>
        <span className='text-6xl font-calsans text-white leading-tight max-w-6xl'>{nameSecondPart}</span>
        <p className='text text-white w-full mb-6'>
          {program.graduateProfile}
        </p>

        <HabilitiesTags
          tags={categories.slice(0, 4)}
        />
        <div className='w-1/3 pt-10'>
          <Button href="#" variant="tertiary" size="medium" withArrow={true} > Inscribirme ya  </Button>
        </div>
      </div>
    </div>

  );
};

export default ProgramHeroSection;