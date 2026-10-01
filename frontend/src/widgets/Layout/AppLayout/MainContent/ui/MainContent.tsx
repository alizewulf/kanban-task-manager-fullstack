import type { TaskCategory } from "@/features/taskCategories/model/category.types";
import EmptyBoardContent from "@/widgets/Layout/AppLayout/ui/EmptyBoardContent/EmptyBoardContent";
import { useTaskBoard } from "../model/useTaskBoard";
import TaskBoard from "./TaskBoard";

interface MainContentProps {
  onCategoryCreated: (category: TaskCategory) => void;
}

function MainContent({ onCategoryCreated }: MainContentProps) {
  const board = useTaskBoard();

  if (board.categories.length === 0) {
    return <EmptyBoardContent onCategoryCreated={onCategoryCreated} />;
  }

  return <TaskBoard board={board} onCategoryCreated={onCategoryCreated} />;
}

export default MainContent;
