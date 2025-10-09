import React, { useEffect, useState } from "react";
import { AchievementCard } from "./AchievementCard";
import { Program, UUID } from "../../model/types";
import { getAchievements } from "../../services/academicPrograms";

interface AchievementsSectionProps {
  programUUID: UUID;
  programName: string;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  programUUID,
  programName,
}) => {
  const [achievements, setAchievements] = useState<Program[] | null>(null);
  const article = programName.startsWith("Doctorado") ? "el" : "la";

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const response: Program[] = await getAchievements(programUUID);
        const filteredPrograms = response.filter(
          (program) => program.id !== programUUID,
        );
        setAchievements(filteredPrograms);
      } catch (error) {
        console.error("No se pudieron traer logros");
      }
    }
    fetchAchievements();
  }, [programUUID]);

  if (!achievements) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (achievements.length === 0) {
    return null;
  }

  return (
    <div
      id="achievements"
      className="h-full w-full flex flex-col px-28 pb-14 pt-24"
    >
      <h2 className="text-black text-4xl font-calsans leading-tight max-w-md">
        Lo que lograrás
      </h2>
      <p className="text-black w-3/5 mt-3">
        {`Al cursar ${article} ${programName} obtendrás los siguientes grados y certificaciones:`}
      </p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(32rem,1fr))] gap-[1rem] max-w-full w-full bg-white pt-12">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            name={achievement.name}
            description={achievement.description}
            to={`/program/${achievement.name}`}
          />
        ))}
      </div>
    </div>
  );
};
