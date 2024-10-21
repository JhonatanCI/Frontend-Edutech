
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import WorldCard from './components/WorldCard';
import aiImage from './assets/ai.jpg'; 


function App() {


  return (
    <>
      <NavBar />
      <HeroSection/>
       {/* Cards Grid */}
       <div className="container mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4">
        <WorldCard 
          image={aiImage}
          title="Inteligencia Artificial" 
          description="Descripción del mundo, contando sobre los principales detalles de esta. Máximo unas 3 líneas." 
          buttonText="Saber más" 
        />
       
      </div>
      
    </>
  );
}

export default App;
