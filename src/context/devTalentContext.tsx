import { createContext, ReactNode } from "react";
import DevTalentReducer from "../reducers/DevTalentReducer/DevTalentReducer";

interface DevTalentProviderProps {
    children: ReactNode;
}

export interface DevTalentContextType {
    state: DevTalentState;
    updateItemSelected: (itemSelected: number) => void;
}

export const DevTalentContext = createContext<DevTalentContextType | undefined>(undefined);

export const DevTalentProvider = ({ children }: DevTalentProviderProps) => {
    const {state, updateItemSelected} = DevTalentReducer()

    return (
        <DevTalentContext.Provider value={{ state, updateItemSelected }}>
            {children}
        </DevTalentContext.Provider>
    );
};