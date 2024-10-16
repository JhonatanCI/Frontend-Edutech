
import NavBar from './components/NavBar';
import HeroTitle from './components/HeroTitle';
import SearchBar from './components/SearchBar';
import PopularTags from './components/PopularTags';


function App() {


  return (
    <>
      <NavBar />
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

    </>
  );
}

export default App;
