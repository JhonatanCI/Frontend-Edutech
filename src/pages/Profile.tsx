import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/Commons/NavBar";
import FavoritesSection from "../components/Profile/FavoritesSection";
import { useFavorites } from "../hooks/useFavorites";
import { RootState } from "../redux/store";
import axios from "axios";
import { updateUser } from "../redux/authSlice";

interface UserInfo {
  id: string;
  username: string;
  email: string;
  phone?: string;
  city?: string;
}

const COLOMBIA_CITIES = [
  "Abejorral", "Abrego", "Abriaquí", "Acacías", "Acandí", "Acevedo", "Achí", "Agrado", "Agua de Dios", "Aguachica",
  "Aguada", "Aguadas", "Aguazul", "Agustín Codazzi", "Aipe", "Albania", "Albán", "Alcalá", "Aldana", "Alejandría",
  "Algarrobo", "Algeciras", "Almaguer", "Almeida", "Alpujarra", "Altamira", "Alto Baudó", "Altos del Rosario", "Alvarado", "Amagá",
  "Amalfi", "Ambalema", "Anapoima", "Ancuya", "Andalucía", "Andes", "Angelópolis", "Angostura", "Anolaima", "Anorí",
  "Anserma", "Ansermanuevo", "Anza", "Apartadó", "Apía", "Apulo", "Aquitania", "Aracataca", "Aranzazu", "Aratoca",
  "Arauca", "Arauquita", "Arbeláez", "Arboleda", "Arboledas", "Arboletes", "Arcabuco", "Arenal", "Argelia", "Ariguaní",
  "Arjona", "Armenia", "Armero", "Arroyohondo", "Astrea", "Ataco", "Atrato", "Ayapel", "Bagadó", "Bahía Solano",
  "Bajo Baudó", "Balboa", "Baranoa", "Baraya", "Barbacoas", "Barbosa", "Barichara", "Barranca de Upía", "Barrancabermeja", "Barrancas",
  "Barranco de Loba", "Barranco Minas", "Barranquilla", "Becerril", "Belalcázar", "Belén", "Belén de Bajirá", "Belén de Los Andaquies", "Belén de Umbría", "Bello",
  "Belmira", "Beltrán", "Berbeo", "Betania", "Betéitiva", "Betulia", "Bituima", "Boavita", "Bochalema", "Bogotá",
  "Bojacá", "Bojayá", "Bolívar", "Bosconia", "Boyacá", "Briceño", "Bucaramanga", "Bucarasica", "Buenaventura", "Buenavista",
  "Buenos Aires", "Buesaco", "Bugalagrande", "Buriticá", "Busbanzá", "Cabrera", "Cabuyaro", "Cacahual", "Cáceres", "Cachipay",
  "Cachirá", "Cácota", "Caicedo", "Caicedonia", "Caimito", "Cajamarca", "Cajibío", "Cajicá", "Calamar", "Calarcá",
  "Caldas", "Caldono", "Cali", "California", "Calima", "Caloto", "Campamento", "Campo de La Cruz", "Campoalegre", "Campohermoso",
  "Canalete", "Candelaria", "Cantagallo", "Cantón de San Pablo", "Caparrapí", "Capitanejo", "Caqueza", "Caracolí", "Caramanta", "Carcasí",
  "Carepa", "Carmen de Apicalá", "Carmen de Carupa", "Carmen del Darién", "Carolina", "Cartagena", "Cartagena del Chairá", "Cartago", "Carurú", "Casabianca",
  "Castilla La Nueva", "Caucasia", "Cepitá", "Cereté", "Cerinza", "Cerrito", "Cerro de San Antonio", "Cértegui", "Cervantes", "Chachagüí",
  "Chaguaní", "Chalán", "Chaparral", "Charalá", "Charta", "Chicamocha", "Chigorodó", "Chima", "Chimá", "Chimichagua",
  "Chinácota", "Chinavita", "Chinchiná", "Chinú", "Chipaque", "Chipatá", "Chiquinquirá", "Chíquiza", "Chiriguaná", "Chiscas",
  "Chita", "Chitagá", "Chitaraque", "Chivatá", "Chivor", "Choachí", "Chocontá", "Cicuco", "Ciénaga", "Ciénaga de Oro",
  "Ciénega", "Cimitarra", "Circasia", "Cisneros", "Ciudad Bolívar", "Clemencia", "Cocorná", "Coello", "Cogua", "Colombia",
  "Colón", "Colosó", "Cómbita", "Concepción", "Concordia", "Condoto", "Confines", "Consacá", "Contadero", "Contratación",
  "Convención", "Copacabana", "Coper", "Córdoba", "Corinto", "Coromoro", "Corozal", "Corrales", "Cota", "Cotorra",
  "Covarachía", "Coveñas", "Coyaima", "Cravo Norte", "Cuaspud", "Cubará", "Cubarral", "Cucaita", "Cucunubá", "Cúcuta",
  "Cucutilla", "Cuítiva", "Cumaral", "Cumaribo", "Cumbal", "Cumbitara", "Cunday", "Curillo", "Curití", "Curumaní",
  "Dabeiba", "Dagua", "Dibulla", "Distracción", "Dolores", "Don Matías", "Dosquebradas", "Duitama", "Durania", "Ebéjico",
  "El Águila", "El Bagre", "El Banco", "El Cairo", "El Calvario", "El Carmen", "El Carmen de Atrato", "El Carmen de Bolívar", "El Carmen de Chucurí", "El Carmen de Viboral",
  "El Castillo", "El Cerrito", "El Charco", "El Cocuy", "El Colegio", "El Copey", "El Doncello", "El Dorado", "El Dovio", "El Encanto",
  "El Espino", "El Guacamayo", "El Guamo", "El Molino", "El Paso", "El Paujil", "El Peñol", "El Peñón", "El Piñón", "El Playón",
  "El Pueblito", "El Retén", "El Retorno", "El Roble", "El Rosal", "El Rosario", "El Santuario", "El Tablón de Gómez", "El Tambo", "El Tarra",
  "El Zulia", "Elías", "Encino", "Enciso", "Entrerríos", "Envigado", "Espinal", "Facatativá", "Falan", "Filadelfia",
  "Filandia", "Firavitoba", "Flandes", "Florencia", "Floresta", "Florián", "Florida", "Floridablanca", "Fomeque", "Fonseca",
  "Fortul", "Fosca", "Francisco Pizarro", "Fredonia", "Fresno", "Frontino", "Fuente de Oro", "Fundación", "Funes", "Funza",
  "Fúquene", "Fusagasugá", "Gachalá", "Gachancipá", "Gachantivá", "Gachetá", "Galán", "Galapa", "Galeras", "Gama",
  "Gamarra", "Gámbita", "Gameza", "Garagoa", "Garzón", "Génova", "Gigante", "Ginebra", "Giraldo", "Girardot",
  "Girardota", "Girón", "Gómez Plata", "González", "Gramalote", "Granada", "Guaca", "Guacamayas", "Guacarí", "Guachené",
  "Guachetá", "Guachucal", "Guadalajara de Buga", "Guadalupe", "Guaduas", "Guaitarilla", "Gualmatán", "Guamal", "Guamo", "Guapí",
  "Guapotá", "Guaranda", "Guarne", "Guasca", "Guatapé", "Guataquí", "Guatavita", "Guateque", "Guática", "Guavatá",
  "Guayabal de Síquima", "Guayabetal", "Guayatá", "Güepsa", "Güicán", "Gutiérrez", "Hacarí", "Hatillo de Loba", "Hato", "Hato Corozal",
  "Hatonuevo", "Heliconia", "Herrán", "Herveo", "Hispania", "Hobo", "Honda", "Ibagué", "Icononzo", "Iles",
  "Imués", "Inírida", "Inzá", "Ipiales", "Íquira", "Isnos", "Istmina", "Itagüí", "Ituango", "Iza",
  "Jambaló", "Jamundí", "Jardín", "Jenesano", "Jericó", "Jerusalén", "Jesús María", "Jordán", "Juan de Acosta", "Junín",
  "Juradó", "La Apartada", "La Argentina", "La Belleza", "La Calera", "La Capilla", "La Ceja", "La Celia", "La Cruz", "La Cumbre",
  "La Dorada", "La Esperanza", "La Estrella", "La Florida", "La Gloria", "La Jagua de Ibirico", "La Jagua del Pilar", "La Llanada", "La Macarena", "La Merced",
  "La Mesa", "La Montañita", "La Palma", "La Paz", "La Peña", "La Pintada", "La Plata", "La Playa", "La Primavera", "La Salina",
  "La Sierra", "La Tebaida", "La Tola", "La Unión", "La Uvita", "La Vega", "La Victoria", "La Virginia", "Labateca", "Labranzagrande",
  "Landázuri", "Lebrija", "Leiva", "Lejanías", "Lenguazaque", "Lérida", "Leticia", "Líbano", "Liborina", "Linares",
  "Lloró", "López", "Lorica", "Los Andes", "Los Córdobas", "Los Palmitos", "Los Patios", "Los Santos", "Lourdes", "Luruaco",
  "Macanal", "Macaravita", "Maceo", "Machetá", "Madrid", "Magangué", "Magüí", "Mahates", "Maicao", "Majagual",
  "Málaga", "Malambo", "Mallama", "Manatí", "Manaure", "Maní", "Manizales", "Manta", "Manzanares", "Mapiripán",
  "Margarita", "María La Baja", "Marinilla", "Maripí", "Mariquita", "Marmato", "Marquetalia", "Marsella", "Marulanda", "Matanza",
  "Medellín", "Medina", "Medio Atrato", "Medio Baudó", "Medio San Juan", "Melgar", "Mercaderes", "Mesetas", "Milán", "Miraflores",
  "Miranda", "Mirití-Paraná", "Mistrató", "Mitú", "Mocoa", "Mogotes", "Molagavita", "Momil", "Mompós", "Mongua",
  "Monguí", "Moniquirá", "Montebello", "Montecristo", "Montelíbano", "Montenegro", "Montería", "Monterrey", "Morales", "Morelia",
  "Morroa", "Mosquera", "Motavita", "Moñitos", "Murillo", "Murindó", "Mutatá", "Mutiscua", "Muzo", "Nariño",
  "Nátaga", "Natagaima", "Nechí", "Necoclí", "Neira", "Neiva", "Nemocón", "Nilo", "Nimaima", "Nobsa",
  "Nocaima", "Norcasia", "Norosí", "Nóvita", "Nueva Granada", "Nuevo Colón", "Nunchía", "Nuquí", "Obando", "Ocamonte",
  "Ocaña", "Oiba", "Oicatá", "Olaya", "Olaya Herrera", "Onzaga", "Oporapa", "Orito", "Orocué", "Ortega",
  "Ospina", "Otanche", "Ovejas", "Pachavita", "Pacho", "Pacoa", "Pácora", "Padilla", "Páez", "Paicol",
  "Pailitas", "Paime", "Paipa", "Pajarito", "Palermo", "Palestina", "Palmar", "Palmar de Varela", "Palmas del Socorro", "Palmira",
  "Palmito", "Palocabildo", "Pamplona", "Pamplonita", "Pandi", "Panqueba", "Papunaua", "Páramo", "Paratebueno", "Pasca",
  "Pasto", "Patía", "Pauna", "Paya", "Paz de Ariporo", "Paz de Río", "Pedraza", "Pelaya", "Pensilvania", "Peque",
  "Pereira", "Pesca", "Peñol", "Piamonte", "Pie de Cuesta", "Piedecuesta", "Piedras", "Piendamó", "Pijao", "Pijiño del Carmen",
  "Pinchote", "Pinillos", "Piojó", "Pisba", "Pital", "Pitalito", "Pivijay", "Planadas", "Planeta Rica", "Plato",
  "Policarpa", "Polonuevo", "Ponedera", "Popayán", "Pore", "Potosí", "Pradera", "Prado", "Providencia", "Pueblo Bello",
  "Pueblo Nuevo", "Pueblo Rico", "Pueblorrico", "Puebloviejo", "Puente Nacional", "Puerres", "Puerto Alegría", "Puerto Arica", "Puerto Asís", "Puerto Berrío",
  "Puerto Boyacá", "Puerto Caicedo", "Puerto Carreño", "Puerto Colombia", "Puerto Concordia", "Puerto Escondido", "Puerto Gaitán", "Puerto Guzmán", "Puerto Leguízamo", "Puerto Libertador",
  "Puerto Lleras", "Puerto López", "Puerto Nare", "Puerto Nariño", "Puerto Parra", "Puerto Rico", "Puerto Rondón", "Puerto Salgar", "Puerto Santander", "Puerto Tejada",
  "Puerto Triunfo", "Puerto Wilches", "Pulí", "Pupiales", "Puracé", "Purificación", "Purísima", "Quebradanegra", "Quetame", "Quibdó",
  "Quimbaya", "Quinchía", "Quípama", "Quipile", "Ragonvalia", "Ramiriquí", "Ráquira", "Recetor", "Regidor", "Remedios",
  "Remolino", "Repelón", "Restrepo", "Retiro", "Ricaurte", "Río de Oro", "Río Frío", "Río Iró", "Río Quito", "Río Sucio",
  "Río Viejo", "Rioblanco", "Riohacha", "Rionegro", "Riosucio", "Risaralda", "Rivera", "Roberto Payán", "Roldanillo", "Roncesvalles",
  "Rondón", "Rosas", "Rovira", "Sabana de Torres", "Sabanagrande", "Sabanalarga", "Sabanas de San Ángel", "Sabaneta", "Saboyá", "Sácama",
  "Sáchica", "Sahagún", "Saladoblanco", "Salamina", "Salazar", "Saldaña", "Salento", "Salgar", "Samacá", "Samaná",
  "Samaniego", "Sampués", "San Agustín", "San Alberto", "San Andrés", "San Andrés de Cuerquía", "San Andrés Sotavento", "San Antero", "San Antonio", "San Antonio del Tequendama",
  "San Benito", "San Benito Abad", "San Bernardo", "San Bernardo del Viento", "San Calixto", "San Carlos", "San Carlos de Guaroa", "San Cayetano", "San Cristóbal", "San Diego",
  "San Eduardo", "San Estanislao", "San Felipe", "San Fernando", "San Francisco", "San Gil", "San Jacinto", "San Jacinto del Cauca", "San Jerónimo", "San Joaquín",
  "San José", "San José de La Montaña", "San José de Miranda", "San José de Pare", "San José de Uré", "San José del Fragua", "San José del Guaviare", "San José del Palmar", "San Juan de Arama", "San Juan de Betulia",
  "San Juan de Rioseco", "San Juan de Urabá", "San Juan del Cesar", "San Juan Nepomuceno", "San Juanito", "San Lorenzo", "San Luis", "San Luis de Gaceno", "San Luis de Palenque", "San Luis de Sincé",
  "San Marcos", "San Martín", "San Martín de Loba", "San Mateo", "San Miguel", "San Miguel de Sema", "San Onofre", "San Pablo", "San Pablo de Borbur", "San Pedro",
  "San Pedro de Cartago", "San Pedro de Los Milagros", "San Pedro de Urabá", "San Pelayo", "San Rafael", "San Roque", "San Sebastián", "San Sebastián de Buenavista", "San Vicente de Chucurí", "San Vicente del Caguán",
  "San Vicente Ferrer", "San Zenón", "Sandoná", "Santa Ana", "Santa Bárbara", "Santa Bárbara de Pinto", "Santa Catalina", "Santa Fé de Antioquia", "Santa Helena del Opón", "Santa Isabel",
  "Santa Lucía", "Santa María", "Santa Marta", "Santa Rosa", "Santa Rosa de Cabal", "Santa Rosa de Osos", "Santa Rosa de Viterbo", "Santa Rosa del Sur", "Santa Rosalía", "Santa Sofía",
  "Santacruz", "Santana", "Santander de Quilichao", "Santiago", "Santiago de Tolú", "Santo Domingo", "Santo Tomás", "Sapuyes", "Saravena", "Sardinata",
  "Sasaima", "Sativanorte", "Sativasur", "Segovia", "Sevilla", "Siachoque", "Sibaté", "Sibundoy", "Silos", "Silvania",
  "Silvia", "Simacota", "Simijaca", "Simití", "Since", "Sincelejo", "Sipí", "Sitionuevo", "Soacha", "Soatá",
  "Socha", "Socorro", "Socotá", "Sogamoso", "Solano", "Soledad", "Solita", "Somondoco", "Sonsón", "Sopetrán",
  "Soplaviento", "Sopó", "Sora", "Soracá", "Sotaquirá", "Sotará", "Suárez", "Suaza", "Subachoque", "Sucre",
  "Suesca", "Supatá", "Supía", "Suratá", "Susa", "Susacón", "Sutamarchán", "Sutatausa", "Sutatenza", "Tabio",
  "Tadó", "Talaigua Nuevo", "Tamalameque", "Támara", "Tame", "Támesis", "Taminango", "Tangua", "Taraira", "Tarapacá",
  "Tarazá", "Tarqui", "Tarso", "Tasco", "Tauramena", "Tausa", "Tello", "Tenerife", "Tenjo", "Tenza",
  "Teorama", "Teruel", "Tesalia", "Tibacuy", "Tibaná", "Tibasosa", "Tibirita", "Tibú", "Tierralta", "Timaná",
  "Timbío", "Timbiquí", "Tinjacá", "Tipacoque", "Tiquisio", "Titiribí", "Toca", "Tocaima", "Tocancipá", "Togüí",
  "Toledo", "Tolú Viejo", "Tona", "Topagá", "Topaipí", "Toribío", "Toro", "Tota", "Totoró", "Trinidad",
  "Trujillo", "Tubará", "Tuchín", "Tuluá", "Tunja", "Tununguá", "Túquerres", "Turbaco", "Turbaná", "Turbo",
  "Turmequé", "Tuta", "Tutazá", "Ubalá", "Ubaque", "Ubaté", "Ulloa", "Umbita", "Une", "Unguía",
  "Unión Panamericana", "Uramita", "Uribe", "Uribia", "Urrao", "Urumita", "Usiacurí", "Útica", "Valdivia", "Valencia",
  "Valle de San José", "Valle de San Juan", "Valle del Guamuez", "Valledupar", "Valparaíso", "Vegachí", "Vélez", "Venadillo", "Venecia", "Ventaquemada",
  "Vergara", "Versalles", "Vetas", "Vianí", "Victoria", "Vigía del Fuerte", "Vijes", "Villa Caro", "Villa de Leyva", "Villa de San Diego de Ubaté",
  "Villa del Rosario", "Villa Rica", "Villagarzón", "Villagómez", "Villahermosa", "Villamaría", "Villanueva", "Villapinzón", "Villarrica", "Villavicencio",
  "Villavieja", "Villeta", "Viotá", "Viracachá", "Vista Hermosa", "Viterbo", "Yacopí", "Yacuanquer", "Yaguará", "Yalí",
  "Yarumal", "Yavaraté", "Yolombó", "Yondó", "Yopal", "Yotoco", "Yumbo", "Zambrano", "Zapatoca", "Zapayán",
  "Zaragoza", "Zarzal", "Zetaquira", "Zipacón", "Zipaquirá", "Zona Bananera"
].sort();

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { getUserFavoritesList } = useFavorites();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"favorites" | "achievements">("favorites");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    phone: "",
    city: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }


    const loadUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/v1/user/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserInfo(response.data);
        setEditForm({
          username: response.data.username || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          city: response.data.city || ""
        });
      } catch (err) {
        console.error("Error al cargar datos del usuario:", err);
      }
    };

    const loadFavoritesCount = async () => {
      const favoritesList = await getUserFavoritesList();
      setFavoritesCount(favoritesList.length);
    };
    
    loadUserData();
    loadFavoritesCount();
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.city-dropdown-container')) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAuthenticated, navigate, getUserFavoritesList]);

  const handleOpenModal = () => {
    setEditForm({
      username: userInfo?.username || "",
      email: userInfo?.email || "",
      phone: userInfo?.phone || "",
      city: userInfo?.city || ""
    });
    setError("");
    setSuccessMessage("");
    setCitySearch("");
    setShowCityDropdown(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError("");
    setSuccessMessage("");
    setCitySearch("");
    setShowCityDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    // Validación de campos requeridos
    if (!editForm.username.trim()) {
      setError("El nombre de usuario es obligatorio");
      setLoading(false);
      return;
    }

    if (!editForm.email.trim()) {
      setError("El correo electrónico es obligatorio");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email)) {
      setError("Por favor ingresa un correo electrónico válido (ejemplo: usuario@gmail.com)");
      setLoading(false);
      return;
    }

    if (editForm.phone && editForm.phone.trim() !== "") {
      if (!/^\d+$/.test(editForm.phone)) {
        setError("El teléfono debe contener solo números");
        setLoading(false);
        return;
      }
      if (editForm.phone.length < 7 || editForm.phone.length > 10) {
        setError("El teléfono debe tener entre 7 y 10 dígitos");
        setLoading(false);
        return;
      }
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8080/api/v1/user/me",
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setUserInfo(response.data);
      dispatch(updateUser(response.data));
      setSuccessMessage("¡Información actualizada exitosamente!");
      
      setTimeout(() => {
        setSuccessMessage("");
        setIsModalOpen(false);
      }, 2000);
    } catch (err: any) {
      console.error("Error al actualizar:", err);
      if (err.response?.status === 404) {
        setError("No se pudo encontrar tu usuario. Por favor, cierra sesión e inicia sesión nuevamente.");
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Los datos ingresados no son válidos");
      } else {
        setError(err.response?.data?.message || "Error al actualizar la información. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user || !userInfo) return null;

  function getColorFromUsername(username: string) {
     const colors = [
    "from-pink-500 to-pink-700",
    "from-yellow-500 to-yellow-700",
    "from-green-500 to-green-700",
    "from-red-500 to-red-700",
    "from-blue-500 to-blue-700",
    "from-purple-500 to-purple-700",
    "from-teal-500 to-teal-700",
  ];

  const index = username
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return colors[index % colors.length];
    
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="pt-20">
        {/* Header Section con gradiente */}
        <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-6">
              {/* Avatar grande */}
              <div className="relative">
                <div
                      className={`w-28 h-28 bg-gradient-to-br ${getColorFromUsername(
                        userInfo.username
                      )} rounded-full flex items-center justify-center text-4xl font-bold ring-4 ring-white/20 shadow-xl`}
                    >
                      {userInfo.username.charAt(0).toUpperCase()}
                    </div>

                <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-[#1a1a2e]"></div>
              </div>

              {/* Información del usuario */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-1">{userInfo.username}</h1>
                <div className="space-y-1">
                  <p className="text-gray-300 flex items-center gap-2">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {userInfo.email}
                  </p>
                  {userInfo.phone && (
                    <p className="text-gray-300 flex items-center gap-2">
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {userInfo.phone}
                    </p>
                  )}
                  {userInfo.city && (
                    <p className="text-gray-300 flex items-center gap-2">
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {userInfo.city}
                    </p>
                  )}
                </div>
              </div>

              {/* Botón Editar perfil y Estadísticas */}
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={handleOpenModal}
                  className="flex items-center gap-2 px-6 py-3 bg-[#5454E9] text-white rounded-lg hover:bg-[#3d3db5] transition-colors shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Editar perfil
                </button>

                <div className="text-center px-6 border-l border-white/20">
                  <div className="text-3xl font-bold text-[#5454E9]">
                    {favoritesCount}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Programas favoritos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="border-b border-gray-200 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("favorites")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "favorites"
                    ? "border-[#5454E9] text-[#5454E9]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={activeTab === "favorites" ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Favoritos
              </button>
              <button
                onClick={() => setActiveTab("achievements")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "achievements"
                    ? "border-[#5454E9] text-[#5454E9]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                Tus logros
              </button>
            </div>
          </div>
        </div>

        {/* Contenido según tab activo */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === "favorites" ? (
            <div>
              {/* Tip en la parte superior */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Aquí puedes ver y editar tu información personal.
                  Haz clic en "Editar perfil" en la parte superior para actualizar tus datos.
                </p>
              </div>

              {/* Sección de Favoritos */}
              <FavoritesSection />
            </div>
          ) : (
            /* Tus logros - Por implementar */
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-[#5454E9]/10 to-[#3d3db5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-[#5454E9]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Tus logros
                </h3>
                <p className="text-gray-600">
                  Aquí podrás ver tus certificados, cursos completados y logros.
                  <br />
                  Esta funcionalidad estará disponible próximamente.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Edición */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="sticky top-0 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Editar Perfil</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              {/* Mensajes de éxito o error */}
              {successMessage && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {successMessage}
                </div>
              )}
              {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Formulario */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de usuario
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={editForm.username}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5454E9] focus:border-transparent transition-all bg-white text-gray-700"
                      placeholder="Tu nombre de usuario"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5454E9] focus:border-transparent transition-all bg-white text-gray-700"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5454E9] focus:border-transparent transition-all bg-white text-gray-700"
                      placeholder="Agrega tu teléfono"
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="city-dropdown-container">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad (Colombia)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={citySearch || editForm.city}
                      onChange={(e) => {
                        setCitySearch(e.target.value);
                        setShowCityDropdown(true);
                      }}
                      onFocus={() => setShowCityDropdown(true)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5454E9] focus:border-transparent transition-all bg-white text-gray-700"
                      placeholder="Busca tu ciudad..."
                    />
                    
                    {showCityDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {COLOMBIA_CITIES
                          .filter(city => 
                            city.toLowerCase().includes((citySearch || editForm.city).toLowerCase())
                          )
                          .slice(0, 50)
                          .map((city) => (
                            <div
                              key={city}
                              onClick={() => {
                                setEditForm({ ...editForm, city });
                                setCitySearch("");
                                setShowCityDropdown(false);
                              }}
                              className="px-4 py-2 hover:bg-[#5454E9] hover:text-white cursor-pointer text-gray-900 transition-colors"
                            >
                              {city}
                            </div>
                          ))}
                        {COLOMBIA_CITIES.filter(city => 
                          city.toLowerCase().includes((citySearch || editForm.city).toLowerCase())
                        ).length === 0 && (
                          <div className="px-4 py-2 text-gray-500 text-center">
                            No se encontraron ciudades
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botones del Modal */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-[#5454E9] text-white rounded-lg hover:bg-[#3d3db5] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </span>
                  ) : (
                    "Guardar cambios"
                  )}
                </button>
                <button
                  onClick={handleCloseModal}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;