import { createContext, ReactNode, useEffect } from "react";
import useTalentDev from "../reducers/TalentDevReducer/TalentDevReducer";
import { TalentDevState } from "../reducers/TalentDevReducer/TalentDevTypes";
import { getGeneralResults } from "../services/search";
import { Result } from "../model/types";

interface TalentDevProviderProps {
    children: ReactNode;
}

export interface TalentDevContextType {
    state: TalentDevState;
    updateItemSelected: (itemSelected: number) => void;
    updateItems: (items: Result) => void;
    reset: () => void;
}

const TalentDevContext = createContext<TalentDevContextType | undefined>(undefined);

const TalentDevProvider = ({ children }: TalentDevProviderProps) => {
    const {state, updateItemSelected, setItems, updateItems, reset} = useTalentDev();

    useEffect(() => {
        async function setInitialState() {
            try {
                const response = await getGeneralResults();
                setItems(response)
            } catch (error) {
                console.error("No se pudo cargar los resultados de la sección Desarrolla tu Talento");
            }
        };

        setInitialState()
    }, [])

    return (
        <TalentDevContext.Provider value={{ state, updateItemSelected, updateItems, reset }}>
            {children}
        </TalentDevContext.Provider>
    );
};

export { TalentDevContext };
export default TalentDevProvider;