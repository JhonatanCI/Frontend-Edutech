import React from 'react';
import Button from './Button';
import { HashLink as Link } from "react-router-hash-link";


const NavBar: React.FC = () => {
  return (
    <nav className="text-white font-inter shadow-md fixed top-0 z-50 w-full">
      <div className="flex justify-between items-center p-4 ">
        {/* Logo Section */}
        <div className="pl-24 flex items-center">
          {/* Logo */}
          <img src="src/assets/Icesi-EverGrow_logo.svg" alt="Icesi and EverGrow logo" className="h-8 mr-2" />
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 pl-8">
            <Link to={"/#mundos"} smooth className=" hover:text-textGray">
              Mundos
            </Link>
            <Link to={"/#desarrolla-tu-talento"} smooth className="custom-link hover:text-textGray">
              Desarrolla tu Talento
            </Link>
            <Link to={"/#programas"} smooth className="custom-link hover:text-textGray">
              Programas
            </Link>
            <Link to={"/#aventura"} smooth className="custom-link hover:text-textGray">
              Organizaciones
            </Link>
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
