
import NavBar from './components/NavBar';
import HeroTitle from './components/HeroTitle';


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

    </>
  );
}

export default App;
