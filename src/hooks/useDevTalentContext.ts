import { DevTalentContextType } from "../context/devTalentContext";
import { useContext } from "react";
import { DevTalentContext } from "../context/devTalentContext";

export const useDevTalentContext = (): DevTalentContextType => {
    const context = useContext(DevTalentContext);

    if (!context) {
        throw new Error("useDevTalentContext must be used within a DevTalentProvider");
    }

    return context;
};