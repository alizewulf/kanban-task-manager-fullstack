import type { TaskCategory } from "@/features/taskCategories/model/category.types";
import EmptyBoardContent from "@/widgets/Layout/AppLayout/ui/EmptyBoardContent/EmptyBoardContent";
import { useTaskBoard } from "../model/useTaskBoard";
import TaskBoard from "./TaskBoard";
import { useAppContext } from "@/shared/context/app.context";

interface MainContentProps {
  onCategoryCreated: (category: TaskCategory) => void;
}

function MainContent({ onCategoryCreated }: MainContentProps) {
  const board = useTaskBoard();
  const { selectedColumn, boardLoading, boardError, loadedColumnId, retryBoardLoad } = useAppContext();
  const hasCurrentBoardData = loadedColumnId === selectedColumn?.id;

  if (!hasCurrentBoardData && !boardError) {
    return (
      <div role="status" className="flex min-h-[calc(100vh-8rem)] items-center justify-center text-accent3-hover">
        Загрузка доски…
      </div>
    );
  }

  if (boardError && !hasCurrentBoardData) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-4 text-center">
        <p role="alert" className="text-accent3-hover">{boardError}</p>
        <button type="button" className="font-bold text-primary" onClick={retryBoardLoad}>
          Повторить
        </button>
      </div>
    );
  }

  return (
    <>
      {(boardError || boardLoading) && (
        <div className="flex items-center justify-center gap-3 px-6 pt-4">
          {boardError ? (
            <p role="alert" className="text-center text-sm text-accent3-hover">
              {boardError} Данные доски сохранены.
            </p>
          ) : (
            <p role="status" className="text-sm text-accent3-hover">Обновление доски…</p>
          )}
          {boardError && (
            <button type="button" className="shrink-0 font-bold text-primary" onClick={retryBoardLoad}>
              Повторить
            </button>
          )}
        </div>
      )}
      {board.categories.length === 0 ? (
        <EmptyBoardContent onCategoryCreated={onCategoryCreated} />
      ) : (
        <TaskBoard board={board} onCategoryCreated={onCategoryCreated} />
      )}
    </>
  );
}

export default MainContent;
