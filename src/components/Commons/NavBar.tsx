import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../Commons/Button";
import { HashLink as Link } from "react-router-hash-link";
import logo from "../../assets/Icesi-EverGrow_logo.svg";
import { RootState } from "../../redux/store";
import { loadUserFromStorage, logout } from "../../redux/authSlice";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cargar usuario del localStorage al montar el componente
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsDropdownOpen(false);
  };

  return (
    <nav className="text-white font-inter shadow-md fixed top-0 z-50 w-full bg-black">
      <div className="flex justify-between items-center p-3">
        {/* Logo Section */}
        <div className="pl-16 flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-4" />

          <div className="hidden md:flex space-x-6 pl-8">
            <Link to={"/"} smooth className="hover:text-textGray">
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
            // Usuario logueado - Dropdown con foto de perfil
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
              >
                <span className="text-sm font-medium hidden md:inline">
                  {user.username}
                </span>
                <div className="w-10 h-10 bg-gradient-to-br from-[#5454E9] to-[#3d3db5] rounded-full flex items-center justify-center text-sm font-bold ring-2 ring-white/20">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 text-gray-800 border border-gray-200">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <button
                    onClick={handleProfileClick}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-150 flex items-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Ver perfil</span>
                  </button>

                  <div className="border-t border-gray-200 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>
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