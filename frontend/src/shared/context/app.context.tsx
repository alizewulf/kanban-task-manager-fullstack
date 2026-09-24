import {
    createContext,
    useContext,
    useEffect,
    useState,
    type Dispatch,
    type SetStateAction
} from "react";

import type { Column } from "../../features/columns/model/column.types";
import type { TaskCategory } from "@/features/taskCategories/model/category.types";
import type { Task } from "@/features/tasks/model/task.types";
import { getCategories } from "@/features/taskCategories/model/getCategories";
import { getTasks } from "@/features/tasks/model/getTasks";

interface AppContextValue {
    selectedColumn: Column | null;
    setSelectedColumn: (column: Column | null) => void;
    removeColumn: (columnId: number) => void;
    setRemoveColumn: (removeColumn: (columnId: number) => void) => void;
    categories: TaskCategory[];
    setCategories: Dispatch<SetStateAction<TaskCategory[]>>;
    tasks: Record<number, Task[]>;
    setTasks: Dispatch<SetStateAction<Record<number, Task[]>>>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [selectedColumn, setSelectedColumn] =
        useState<Column | null>(null);
    const [categories, setCategories] =
        useState<TaskCategory[]>([]);
    const [tasks, setTasks] =
        useState<Record<number, Task[]>>({});
    const [removeColumn, setRemoveColumn] =
        useState<(columnId: number) => void>(() => {});

    useEffect(() => {
        let isMounted = true;

        const loadBoardData = async () => {
            if (!selectedColumn) {
                setCategories([]);
                setTasks({});
                return;
            }

            const loadedCategories = await getCategories(selectedColumn.id);

            if (!isMounted) {
                return;
            }

            setCategories(loadedCategories);

            const loadedTasks: Record<number, Task[]> = {};

            await Promise.all(
                loadedCategories.map(async (category) => {
                    loadedTasks[category.id] = await getTasks(category.id);
                })
            );

            if (isMounted) {
                setTasks(loadedTasks);
            }
        };

        loadBoardData();

        return () => {
            isMounted = false;
        };
    }, [selectedColumn]);

    return (
        <AppContext.Provider
            value={{
                selectedColumn,
                setSelectedColumn,
                removeColumn,
                setRemoveColumn,
                categories,
                setCategories,
                tasks,
                setTasks
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