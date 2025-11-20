import React from "react";
import TalentSearchBar from "./TalentSearchBar";
import TalentCycleComponent from "./TalentCycleComponent";
import ProgramCard from "../Search/ProgramCard";

import { useTalentDevContext } from "../../hooks/useTalentDevContext";
import { Course, MicroLearning, Program } from "../../model/types";
import { useNavigate } from "react-router-dom";

const TalentDevSection: React.FC = () => {
  const { state } = useTalentDevContext();
  const navigateTo = useNavigate();

  const renderSpinner = (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
    </div>
  );

  // Función helper para convertir MicroLearning/Course al formato SearchResult
  const mapToSearchResult = (
    item: MicroLearning | Course,
    _itemType: "COURSE" | "MICROLEARNING"
  ) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    itemType: "COURSE" as const,
    programType: null,
    tags: "", // Los cursos/microlearnings no tienen tags en el modelo actual
    modality: "VIRTUAL" as const, // Valor por defecto
    duration: 0,
    durationUnit: "HOURS" as const,
    credits: 0,
    price: 0,
    imageUrl: "", // Courses y MicroLearnings no tienen imagen en el modelo
    degreeTitle: null,
  });

  // Función helper para convertir Program al formato SearchResult
  const mapProgramToSearchResult = (
    program: Program,
    programType: "CERTIFICACION" | "ESPECIALIZACION" | "MAESTRIA" | "DOCTORADO"
  ) => ({
    id: program.id,
    name: program.name,
    description: program.description,
    itemType: "PROGRAM" as const,
    programType: programType as "ESPECIALIZACION" | "CERTIFICACION" | "DOCTORADO" | "MAESTRIA",
    tags: program.tags || "",
    modality: (program.modality || "VIRTUAL") as "VIRTUAL" | "PRESENCIAL" | "HIBRIDO",
    duration: program.semesters || 0,
    durationUnit: "SEMESTERS" as const,
    credits: program.credits || 0,
    price: 0,
    imageUrl: program.image || "", // Usar el campo image del programa
    degreeTitle: program.degreeTitle || null,
  });

  const handleFavorite = (id: string) => {
    console.log("Toggle favorite for:", id);
  };

  const handleLearnMore = (_id: string, itemType: string, name: string) => {
    if (itemType === "COURSE") {
      navigateTo(`/course/${name}`);
    } else if (itemType === "PROGRAM") {
      navigateTo(`/program/${name}`);
    } else if (itemType === "MICROLEARNING") {
      navigateTo(`/microlearning/${name}`);
    }
  };

  console.log(state);
  const renderCards = () => {
    // Si hay resultados de búsqueda, renderizar esos resultados
    if (state.items && state.items.length > 0) {
      return state.items.map((item: any) => {
        const searchResult = mapToSearchResult(item, "COURSE");
        return (
          <ProgramCard
            key={item.id}
            result={searchResult}
            onFavorite={handleFavorite}
            onLearnMore={handleLearnMore}
          />
        );
      });
    }

    // Si NO hay resultados de búsqueda, mostrar normalmente según sección
    switch (state.item) {
    case 0: {
      if (!state.microLearnings) return renderSpinner;
      return state.microLearnings.map((micro: MicroLearning) => {
        const searchResult = mapToSearchResult(micro, "MICROLEARNING");
        return (
          <ProgramCard
            key={micro.id}
            result={searchResult}
            onFavorite={handleFavorite}
            onLearnMore={handleLearnMore}
          />
        );
      });
    }
    case 1: {
      if (!state.courses) return renderSpinner;
      return state.courses.map((course: Course) => {
        const searchResult = mapToSearchResult(course, "COURSE");
        return (
          <ProgramCard
            key={course.id}
            result={searchResult}
            onFavorite={handleFavorite}
            onLearnMore={handleLearnMore}
          />
        );
      });
    }
    case 2: {
      return state.certifications.map((certification: Program) => {
        const searchResult = mapProgramToSearchResult(certification, "CERTIFICACION");
        return (
          <ProgramCard
            key={certification.id}
            result={searchResult}
            onFavorite={handleFavorite}
            onLearnMore={handleLearnMore}
          />
        );
      });
    }
    case 3: {
      if (!state.specializations) return renderSpinner;
      return state.specializations.map((specialization: Program) => {
        const searchResult = mapProgramToSearchResult(specialization, "ESPECIALIZACION");
        return (
          <ProgramCard
            key={specialization.id}
            result={searchResult}
            onFavorite={handleFavorite}
            onLearnMore={handleLearnMore}
          />
        );
      });
    }
    case 4: {
      if (!state.masters) return renderSpinner;
      return state.masters.map((master: Program) => {
        const searchResult = mapProgramToSearchResult(master, "MAESTRIA");
        return (
          <ProgramCard
            key={master.id}
            result={searchResult}
            onFavorite={handleFavorite}
            onLearnMore={handleLearnMore}
          />
        );
      });
    }
    case 5: {
      if (!state.phd) return renderSpinner;
      return state.phd.map((phd: Program) => {
        const searchResult = mapProgramToSearchResult(phd, "DOCTORADO");
        return (
          <ProgramCard
            key={phd.id}
            result={searchResult}
            onFavorite={handleFavorite}
            onLearnMore={handleLearnMore}
          />
        );
      });
    }
    default: {
      return renderSpinner;
    }
    }
  };

  return (
    <section
      id="desarrolla-tu-talento"
      className="flex flex-col px-32 pt-8 bg-white"
    >
      <div className="flex justify-between">
        <div>
          <h1 className="text-7xl font-calsans text-black leading-none mt-16">
            Desarrolla tu talento
          </h1>
          <div className="flex flex-row gap-24 mb-8">
            <p className="text-xl text-black pt-4 w-3/4">
              Nos adaptamos a todos los tiempos y niveles de aventura. Conoce
              cómo puedes explorar nuestros mundos.
            </p>
            <TalentSearchBar />
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-6 bg-white">
        <div className="w-3/12">
          <TalentCycleComponent />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-[1rem] max-w-[60rem] w-full mx-auto bg-white p-4">
          {renderCards()}
        </div>
      </div>
    </section>
  );
};

export default TalentDevSection;
