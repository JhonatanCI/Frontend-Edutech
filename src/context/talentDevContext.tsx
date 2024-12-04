import { createContext, ReactNode, useEffect } from "react";
import TalentDevReducer from "../reducers/TalentDevReducer/TalentDevReducer";
import { TalentDevState } from "../reducers/TalentDevReducer/TalentDevTypes";
import { getGeneralResults } from "../services/search";
import { Paginer } from "../utils/Paginer";

interface TalentDevProviderProps {
    children: ReactNode;
}

export interface TalentDevContextType {
    state: TalentDevState;
    updateItemSelected: (itemSelected: number) => void;
}

const TalentDevContext = createContext<TalentDevContextType | undefined>(undefined);

const TalentDevProvider = ({ children }: TalentDevProviderProps) => {
    const {state, updateItemSelected, setItems} = TalentDevReducer();

    useEffect(() => {
        async function setInitialState() {
            try {
                const response = await getGeneralResults();
                const data = Paginer(response)
                setItems(data)
            } catch (error) {
                console.error("No se pudo cargar los resultados de la sección Desarrolla tu Talento");
            }
        };

        setInitialState()
    }, [])

    return (
        <TalentDevContext.Provider value={{ state, updateItemSelected }}>
            {children}
        </TalentDevContext.Provider>
    );
};

export { TalentDevContext };
export default TalentDevProvider;