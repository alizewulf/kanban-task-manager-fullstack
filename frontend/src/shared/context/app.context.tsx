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
    boardLoading: boolean;
    boardError: string | null;
    loadedColumnId: number | null;
    retryBoardLoad: () => void;
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
    const [boardLoading, setBoardLoading] = useState(false);
    const [boardError, setBoardError] = useState<string | null>(null);
    const [boardErrorColumnId, setBoardErrorColumnId] = useState<number | null>(null);
    const [loadedColumnId, setLoadedColumnId] = useState<number | null>(null);
    const [reloadKey, setReloadKey] = useState(0);
    const [removeColumn, setRemoveColumn] =
        useState<(columnId: number) => void>(() => {});

    const retryBoardLoad = () => setReloadKey((current) => current + 1);

    useEffect(() => {
        let isMounted = true;
        const columnId = selectedColumn?.id;

        const loadBoardData = async () => {
            if (columnId === undefined) {
                setCategories([]);
                setTasks({});
                setLoadedColumnId(null);
                setBoardLoading(false);
                setBoardError(null);
                setBoardErrorColumnId(null);
                return;
            }

            setBoardLoading(true);
            setBoardError(null);
            setBoardErrorColumnId(null);

            try {
                const loadedCategories = await getCategories(columnId);
                const taskEntries = await Promise.all(
                    loadedCategories.map(async (category) => [
                        category.id,
                        await getTasks(category.id)
                    ] as const)
                );

                if (!isMounted) {
                    return;
                }

                setCategories(loadedCategories);
                setTasks(Object.fromEntries(taskEntries));
                setLoadedColumnId(columnId);
            } catch {
                if (isMounted) {
                    setBoardError("Не удалось загрузить доску. Проверьте соединение и попробуйте ещё раз.");
                    setBoardErrorColumnId(columnId);
                }
            } finally {
                if (isMounted) {
                    setBoardLoading(false);
                }
            }
        };

        loadBoardData();

        return () => {
            isMounted = false;
        };
    }, [selectedColumn?.id, reloadKey]);

    return (
        <AppContext.Provider
            value={{
                selectedColumn,
                setSelectedColumn,
                boardLoading,
                boardError: boardErrorColumnId === selectedColumn?.id ? boardError : null,
                loadedColumnId,
                retryBoardLoad,
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