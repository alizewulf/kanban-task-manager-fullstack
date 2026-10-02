import { useSelector } from "react-redux";

import type { Task } from "@/features/tasks/model/task.types";
import TaskDetailModal from "@/features/taskDetails";
import type { Subtask } from "@/features/subtasks/model/subtask.types";
import { useAppContext } from "@/shared/context/app.context";
import { useModal } from "@/shared/ui/modal/useModal";
import type { RootState } from "@/store/store";
import { useBoardSubtasks } from "./useBoardSubtasks";
import { useTaskDragAndDrop, type TaskDragAndDropModel } from "./useTaskDragAndDrop";

export interface TaskBoardModel extends TaskDragAndDropModel {
  categories: ReturnType<typeof useAppContext>["categories"];
  tasks: ReturnType<typeof useAppContext>["tasks"];
  subtasks: Record<number, Subtask[]>;
  isDark: boolean;
  onOpenTask: (task: Task) => void;
}

export function useTaskBoard(): TaskBoardModel {
  const { categories, tasks, setTasks } = useAppContext();
  const { subtasks, updateSubtasks } = useBoardSubtasks(tasks);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { openModal } = useModal();
  const dragAndDrop = useTaskDragAndDrop(tasks, setTasks);

  const onOpenTask = (task: Task) => {
    if (dragAndDrop.consumeSuppressedClick()) {
      return;
    }

    openModal(
      <TaskDetailModal
        task={task}
        subtasks={subtasks[task.id] ?? []}
        setSubtasks={(nextSubtasks: Subtask[]) => updateSubtasks(task.id, nextSubtasks)}
        onTaskSaved={(updatedTask, updatedSubtasks) => {
          setTasks((current) => ({
            ...current,
            [updatedTask.category_id]: (current[updatedTask.category_id] ?? []).map((currentTask) =>
              currentTask.id === updatedTask.id ? updatedTask : currentTask
            ),
          }));
          updateSubtasks(task.id, updatedSubtasks);
        }}
        onTaskDeleted={(deletedTaskId) => {
          setTasks((current) => Object.fromEntries(
            Object.entries(current).map(([categoryId, categoryTasks]) => [
              categoryId,
              categoryTasks.filter((currentTask) => currentTask.id !== deletedTaskId),
            ])
          ));
          updateSubtasks(deletedTaskId, []);
        }}
      />
    );
  };

  return {
    ...dragAndDrop,
    categories,
    tasks,
    subtasks,
    isDark: theme === "dark",
    onOpenTask,
  };
}
