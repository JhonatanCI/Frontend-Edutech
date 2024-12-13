import HeroTitle from './HeroTitle';
import SearchBar from '../Commons/SearchBar';
import PopularTags from './PopularTags';
import { useSelector } from 'react-redux';
import { TagsState } from '../../redux/tagsSlice';

const HeroSection: React.FC = () => {
  const recentSearches = useSelector((state: { tags: TagsState }) => state.tags.tags);

  return (
    <div className="relative w-full h-screen bg-[url('../assets/HeroBackground.png')] bg-cover bg-center flex flex-col items-center justify-center text-white">

      <div className=" flex flex-col pt-20">
        {/* Title and Subheading */}
        <HeroTitle
          heading={
            <>
              ¿Qué mundo <br /> quieres explorar?
            </>
          }
          subheading="Adéntrate en nuestros mundos de conocimiento, con más de 200 cursos, certificaciones, especializaciones y maestrías."
        />
        <div className='w-3/5'>
          <SearchBar search='mundos' by='Negocios, Liderazgo' handleClick={() => null} />
        </div>

        <PopularTags
          tags={recentSearches.slice(-3)}
        />
      </div>

    </div>
  );
};

export default HeroSection;