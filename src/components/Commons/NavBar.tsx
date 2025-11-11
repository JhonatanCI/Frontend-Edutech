import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Commons/Button";
import { HashLink as Link } from "react-router-hash-link";
import logo from "../../assets/Icesi-EverGrow_logo.svg";
import { RootState } from "../../redux/store";
import { loadUserFromStorage, logout } from "../../redux/authSlice";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Cargar usuario del localStorage al montar el componente
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="text-white font-inter shadow-md fixed top-0 z-50 w-full bg-black">
      <div className="flex justify-between items-center p-3">
        {/* Logo Section */}
        <div className="pl-16 flex items-center">
          {/* Logo */}
          <img src={logo} alt="Logo" className="h-8 mr-4" />

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 pl-8">
            <Link to={"/"} smooth className=" hover:text-textGray">
              Home
            </Link>
            <Link
              to={"/#desarrolla-tu-talento"}
              smooth
              className="custom-link hover:text-textGray"
            >
              Desarrolla tu talento
            </Link>
            <Link
              to={"/#programas"}
              smooth
              className="custom-link hover:text-textGray"
            >
              Programas
            </Link>
            <Link
              to={"/#organizaciones"}
              smooth
              className="custom-link hover:text-textGray"
            >
              Organizaciones
            </Link>
          </div>
        </div>

        {/* Right Section with Buttons or User Info */}
        <div className="pr-16 flex items-center space-x-4">
          {isAuthenticated && user ? (
            // Usuario logueado
            <>
              <span className="text-white font-medium">
                ¡Hola, {user.username}!
              </span>
              <Button 
                onClick={handleLogout}
                variant="danger"
                size="medium"
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            // Usuario no logueado
            <>
              <a href="/login" className="hover:text-textGray">
                Ingresar
              </a>
              <a href="/contact" className="hover:text-textGray">
                Contáctanos
              </a>
              <Button href="/register" variant="primary" size="medium">
                ¡Registrate!
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
