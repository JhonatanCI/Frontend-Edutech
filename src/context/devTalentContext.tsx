import { createContext, ReactNode } from "react";
import DevTalentReducer from "../reducers/DevTalentReducer/DevTalentReducer";
import { DevTalentState } from "../reducers/DevTalentReducer/DevTalentTypes";

interface DevTalentProviderProps {
    children: ReactNode;
}

export interface DevTalentContextType {
    state: DevTalentState;
    updateItemSelected: (itemSelected: number) => void;
}

const DevTalentContext = createContext<DevTalentContextType | undefined>(undefined);

const DevTalentProvider = ({ children }: DevTalentProviderProps) => {
    const {state, updateItemSelected} = DevTalentReducer()

    return (
        <DevTalentContext.Provider value={{ state, updateItemSelected }}>
            {children}
        </DevTalentContext.Provider>
    );
};

export { DevTalentContext };
export default DevTalentProvider;