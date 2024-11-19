import React from 'react';
import Button from './Button';

const NavBar: React.FC = () => {
  return (
    <nav className="text-white font-inter shadow-md fixed top-0 z-50 w-full">
      <div className="flex justify-between items-center p-4 ">
        {/* Logo Section */}
        <div className="pl-24 flex items-center">
          {/* Logo */}
          <img src="src/assets/Icesi-EverGrow_logo.svg" alt="Icesi and EverGrow logo" className="h-8 mr-2" />
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 ">
            <a href="#mundos" className="pl-8  hover:text-textGray ">Mundos</a>
            <a href="#rutas" className="hover:text-textGray">Rutas de Aprendizaje</a>
            <a href="#perfiles" className="hover:text-textGray">Perfiles</a>
            <a href="#empresas" className="hover:text-textGray">Empresas</a>
          </div>
        </div>

        

        {/* Right Section with Buttons */}
        <div className="pr-24 flex items-center space-x-4">
          <a href="#ingresar" className="hover:text-textGray">Ingresar</a>
          <a href="#contacto" className="hover:text-textGray">Contáctanos</a>
          <Button href="#" variant="primary" size="medium" > ¡Comienza ya!  </Button>
          
         
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
