import {
    createContext,
    useContext,
    useState
} from "react";

import type { Column } from "../../features/columns/model/column.types";

interface AppContextValue {
    selectedColumn: Column | null;
    setSelectedColumn: (column: Column | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [selectedColumn, setSelectedColumn] =
        useState<Column | null>(null);

    return (
        <AppContext.Provider
            value={{
                selectedColumn,
                setSelectedColumn
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            "useAppContext must be used inside AppProvider"
        );
    }

    return context;
}