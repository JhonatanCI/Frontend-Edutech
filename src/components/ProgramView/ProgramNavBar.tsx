import React, { useState, useEffect } from "react";
import { PencilIcon, SparklesIcon, MapIcon, UpArrowIcon} from "../../assets/Icons/programnavIcons";

interface NavItem {
  label: string;
  icon: JSX.Element;
  id: string; // Unique identifier for navigation
}

const navItems: NavItem[] = [
  { label: "Cursos Disponibles", icon: <PencilIcon />, id: "courses" },
  { label: "Lo que Lograrás", icon: <SparklesIcon />, id: "achievements" },
  { label: "Ruta de Aprendizaje", icon: <MapIcon />, id: "learning-path" },
  { label: "Sigue Aprendiendo", icon: <UpArrowIcon />, id: "keep-learning" },
];

const ProgramNavbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(navItems[0].id);

  // Handle scroll event to update active section
  useEffect(() => {
    const handleScroll = () => {
      // Calculate the currently visible section
      let currentSection = navItems[0].id; // Default to the first section

      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Check if the section is in the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = item.id;
          }
        }
      });

      // Update the active tab only if it has changed
      if (currentSection !== activeTab) {
        setActiveTab(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab]);

  // Handle button click to scroll to a specific section
  const handleNavigation = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white shadow-md p-4 sticky top-0 z-20 flex justify-around items-center border border-gray-200">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavigation(item.id)}
          className={`flex items-center px-4 py-1 space-x-4 transition-all ${
            activeTab === item.id
              ? "text-black font-semibold"
              : "text-textGray font-medium hover:text-gray-500"
          }`}
        >
          <span>{item.icon}</span>
          <span className="text-xl pt-3">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ProgramNavbar;