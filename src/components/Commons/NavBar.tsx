import React from 'react';
import Button from '../Commons/Button';
import { HashLink as Link } from "react-router-hash-link";
import logo from '../../assets/Icesi-EverGrow_logo.svg'; // Ajusta la ruta según la ubicación real

const NavBar: React.FC = () => {
  return (
    <nav className="text-white font-inter shadow-md fixed top-0 z-10 w-full">
      <div className="flex justify-between items-center p-3">
        {/* Logo Section */}
        <div className="pl-16 flex items-center">
          {/* Logo */}
          <Link to={"/#"} smooth>
            <img src={logo} alt="Icesi and EverGrow logo" className="h-8 mr-2" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 pl-8">
            <Link to={"/#mundos"} smooth className=" hover:text-textGray">
              Mundos
            </Link>
            <Link to={"/#desarrolla-tu-talento"} smooth className="custom-link hover:text-textGray">
              Desarrolla tu talento
            </Link>
            <Link to={"/#programas"} smooth className="custom-link hover:text-textGray">
              Programas
            </Link>
            <Link to={"/#organizaciones"} smooth className="custom-link hover:text-textGray">
              Organizaciones
            </Link>
          </div>
        </div>



        {/* Right Section with Buttons */}
        <div className="pr-16 flex items-center space-x-4">
          <a href="#ingresar" className="hover:text-textGray">Ingresar</a>
          <a href="#contacto" className="hover:text-textGray">Contáctanos</a>
          <Button href="#" variant="primary" size="medium" > ¡Comienza ya!  </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;