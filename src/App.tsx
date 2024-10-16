
import NavBar from './components/NavBar';
import HeroTitle from './components/HeroTitle';
import SearchBar from './components/SearchBar';


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
      <SearchBar/>

    </>
  );
}

export default App;
