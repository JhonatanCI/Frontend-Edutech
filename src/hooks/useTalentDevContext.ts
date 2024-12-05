import { TalentDevContextType } from "../context/talentDevContext";
import { useContext } from "react";
import { TalentDevContext } from "../context/talentDevContext";

export const useTalentDevContext = (): TalentDevContextType => {
    const context = useContext(TalentDevContext);

    if (!context) {
        throw new Error("useDevTalentContext must be used within a DevTalentProvider");
    }

    return context;
};