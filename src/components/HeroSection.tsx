import HeroTitle from './HeroTitle';
import SearchBar from './SearchBar';
import PopularTags from './PopularTags';

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-[url('../assets/HeroBackground.png')] bg-cover bg-center flex flex-col items-center justify-center text-white">

    <div className=" flex flex-col ">
        {/* Title and Subheading */}
      <HeroTitle
        heading={
          <>
            ¿Qué mundo <br /> quieres explorar?
          </>
        }
        subheading="Adéntrate en nuestros mundos de conocimiento, con más de 200 cursos, certificaciones, especializaciones y maestrías."
      />
      <SearchBar />
      <PopularTags
        tags={[
          'Negocios',
          'Liderazgo',
          'Inteligencia Artificial',
          'Diseño de Experiencia',
          'Tecnología',
          'Salud',
        ]}
      />
      </div>
      
      
     
      
    </div>
  );
};

export default HeroSection;
