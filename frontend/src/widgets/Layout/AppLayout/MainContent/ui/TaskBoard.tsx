import CreateTaskColumnButton from "@/features/createTaskColumn";
import type { TaskCategory } from "@/features/taskCategories/model/category.types";
import type { TaskBoardModel } from "../model/useTaskBoard";
import TaskCategoryColumn from "./TaskCategoryColumn";

interface TaskBoardProps {
  board: TaskBoardModel;
  onCategoryCreated: (category: TaskCategory) => void;
}

function TaskBoard({ board, onCategoryCreated }: TaskBoardProps) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-stretch gap-6 pt-6 pl-6">
      {board.moveError && (
        <p role="alert" className="fixed right-6 top-6 z-50 rounded-lg bg-danger px-4 py-3 text-sm font-bold text-white shadow-lg">
          {board.moveError}
        </p>
      )}

      {board.categories.map((category) => (
        <TaskCategoryColumn
          key={category.id}
          board={board}
          category={category}
          tasks={board.tasks[category.id] ?? []}
        />
      ))}

      <CreateTaskColumnButton onCreated={onCategoryCreated} />
    </div>
  );
}

export default TaskBoard;
