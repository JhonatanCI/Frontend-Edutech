import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
//import logo from "../../assets/Icesi-EverGrow_logo.svg";
import { RootState } from "../../redux/store";
import { loadUserFromStorage, logout } from "../../redux/authSlice";
import Button from "../Commons/Button"; 

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
  
    if (user && location.pathname === "/") {
      const bannerShown = sessionStorage.getItem("homeBannerShown");
      
      if (!bannerShown) {
        setShowWelcomeBanner(true);
        sessionStorage.setItem("homeBannerShown", "true");
        
        const timer = setTimeout(() => {
          setShowWelcomeBanner(false);
        }, 7);
        
        
        return () => clearTimeout(timer);
      }
    } else {
     
      setShowWelcomeBanner(false);
    }
  }, [user, location.pathname]); 
  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
    sessionStorage.removeItem("homeBannerShown"); 
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsDropdownOpen(false);
  };

  const getColorFromUsername = (username: string) => {
    const colors = [
      "from-pink-500 to-pink-700",
      "from-yellow-500 to-yellow-700",
      "from-green-500 to-green-700",
      "from-red-500 to-red-700",
      "from-blue-500 to-blue-700",
      "from-purple-500 to-purple-700",
      "from-teal-500 to-teal-700",
    ];
    const index = username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <>
      <nav className="text-white font-inter shadow-md fixed top-0 z-50 w-full bg-black">
        <div className="flex justify-between items-center p-3">
          {/* Logo Section */}
          <div className="pl-16 flex items-center">
           
            
            <div className="hidden md:flex space-x-6 pl-8">
              <Link to={"/"} smooth className="hover:text-textGray">Home</Link>
              <Link to={"/#desarrolla-tu-talento"} smooth className="custom-link hover:text-textGray">Desarrolla tu talento</Link>
              <Link to={"/#programas"} smooth className="custom-link hover:text-textGray">Programas</Link>
              <Link to={"/#organizaciones"} smooth className="custom-link hover:text-textGray">Organizaciones</Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="pr-16 flex items-center space-x-4">
            {isAuthenticated && user ? (
              // Usuario logueado
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
                  <span className="text-sm font-medium hidden md:inline">{user.username}</span>
                  <div className={`w-10 h-10 bg-gradient-to-br ${getColorFromUsername(user.username)} rounded-full flex items-center justify-center text-sm font-bold ring-2 ring-white/20`}>
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 text-gray-800 border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button onClick={handleProfileClick} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-150 flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      <span>Ver perfil</span>
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Usuario no logueado
              <>
                <a href="/login" className="hover:text-textGray">Ingresar</a>
                <a href="/contact" className="hover:text-textGray">Contáctanos</a>
                <Button href="/register" variant="primary" size="medium">¡Regístrate!</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* --- BANNER DE BIENVENIDA (JSX) --- */}
      {showWelcomeBanner && (
        <div className="fixed top-16 left-0 right-0 z-40 animate-slide-down">
          <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white shadow-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm md:text-base">
                      ¡Bienvenido, {user?.username}! 👋
                    </p>
                    <p className="text-xs md:text-sm text-white/90 mt-0.5">
                      Haz clic en tu inicial ({user?.username.charAt(0).toUpperCase()}) para visitar tu perfil y ver tus favoritos.
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowWelcomeBanner(false)} className="flex-shrink-0 ml-4 text-white/80 hover:text-white transition-colors" aria-label="Cerrar banner">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para la animación del banner */}
      <style>{`
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default NavBar;