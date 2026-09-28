import { useRef, useState, type Dispatch, type DragEvent, type SetStateAction } from "react";

import { moveTask } from "@/features/tasks/model/moveTask";
import type { Task } from "@/features/tasks/model/task.types";

export interface DropIndicator {
  categoryId: number;
  beforeTaskId: number | null;
}

export interface TaskDragAndDropModel {
  draggingTaskId: number | null;
  dropIndicator: DropIndicator | null;
  isMoving: boolean;
  moveError: string;
  consumeSuppressedClick: () => boolean;
  onDragStart: (task: Task, event: DragEvent<HTMLDivElement>) => void;
  onDragOverTask: (task: Task, event: DragEvent<HTMLDivElement>) => void;
  onDropOnTask: (task: Task, event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onDragOverCategory: (categoryId: number, event: DragEvent<HTMLDivElement>) => void;
  onDropOnCategory: (categoryId: number, event: DragEvent<HTMLDivElement>) => void;
  onDropAtPosition: (categoryId: number, beforeTaskId: number | null, event: DragEvent<HTMLDivElement>) => void;
}

export function useTaskDragAndDrop(
  tasks: Record<number, Task[]>,
  setTasks: Dispatch<SetStateAction<Record<number, Task[]>>>
): TaskDragAndDropModel {
  const [draggingTaskId, setDraggingTaskId] = useState<number | null>(null);
  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [moveError, setMoveError] = useState("");
  const draggingTaskIdRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);

  const showDropIndicator = (indicator: DropIndicator) => {
    setDropIndicator((current) => (
      current?.categoryId === indicator.categoryId && current.beforeTaskId === indicator.beforeTaskId
        ? current
        : indicator
    ));
  };

  const findInsertionAnchor = (
    targetTask: Task,
    categoryId: number,
    event: DragEvent<HTMLDivElement>
  ) => {
    const destinationTasks = (tasks[categoryId] ?? []).filter((task) => task.id !== draggingTaskIdRef.current);
    const targetIndex = destinationTasks.findIndex((task) => task.id === targetTask.id);
    const bounds = event.currentTarget.getBoundingClientRect();

    if (event.clientY < bounds.top + bounds.height / 2) {
      return targetTask.id;
    }

    return destinationTasks[targetIndex + 1]?.id ?? null;
  };

  const persistMove = async (taskId: number, targetCategoryId: number, beforeTaskId: number | null) => {
    setIsMoving(true);
    setMoveError("");

    try {
      const result = await moveTask(taskId, { targetCategoryId, beforeTaskId });
      setTasks((current) => ({
        ...current,
        [result.sourceCategoryId]: result.sourceTasks,
        [result.targetCategoryId]: result.targetTasks,
      }));
    } catch {
      setMoveError("Unable to move this task. Its current position has not changed.");
    } finally {
      setIsMoving(false);
      draggingTaskIdRef.current = null;
      setDraggingTaskId(null);
      setDropIndicator(null);
    }
  };

  const onDragStart = (task: Task, event: DragEvent<HTMLDivElement>) => {
    if (isMoving) {
      event.preventDefault();
      return;
    }

    draggingTaskIdRef.current = task.id;
    suppressClickRef.current = true;
    setDraggingTaskId(task.id);
    setMoveError("");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(task.id));
  };

  const onDragEnd = () => {
    draggingTaskIdRef.current = null;
    setDraggingTaskId(null);
    setDropIndicator(null);
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };

  const consumeSuppressedClick = () => {
    if (!suppressClickRef.current) {
      return false;
    }

    suppressClickRef.current = false;
    return true;
  };

  const onDragOverTask = (task: Task, event: DragEvent<HTMLDivElement>) => {
    if (draggingTaskIdRef.current === null || isMoving) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";

    if (draggingTaskIdRef.current === task.id) {
      setDropIndicator(null);
      return;
    }

    showDropIndicator({
      categoryId: task.category_id,
      beforeTaskId: findInsertionAnchor(task, task.category_id, event),
    });
  };

  const onDropOnTask = (task: Task, event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const taskId = Number(event.dataTransfer.getData("text/plain"));
    const beforeTaskId = findInsertionAnchor(task, task.category_id, event);
    setDropIndicator(null);

    if (!Number.isSafeInteger(taskId) || taskId < 1 || draggingTaskIdRef.current === null || taskId === task.id) {
      return;
    }

    void persistMove(taskId, task.category_id, beforeTaskId);
  };

  const onDragOverCategory = (categoryId: number, event: DragEvent<HTMLDivElement>) => {
    if (draggingTaskIdRef.current === null || isMoving) {
      return;
    }

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const destinationTasks = (tasks[categoryId] ?? []).filter((task) => task.id !== draggingTaskIdRef.current);
    const targetTask = destinationTasks.find((task) => {
      const taskElement = event.currentTarget.querySelector<HTMLElement>(`[data-task-id="${task.id}"]`);
      if (!taskElement) {
        return false;
      }

      const bounds = taskElement.getBoundingClientRect();
      return event.clientY < bounds.top + bounds.height / 2;
    });

    showDropIndicator({ categoryId, beforeTaskId: targetTask?.id ?? null });
  };

  const onDropAtPosition = (
    categoryId: number,
    beforeTaskId: number | null,
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const taskId = Number(event.dataTransfer.getData("text/plain"));

    if (!Number.isSafeInteger(taskId) || taskId < 1 || draggingTaskIdRef.current === null || beforeTaskId === taskId) {
      setDropIndicator(null);
      return;
    }

    void persistMove(taskId, categoryId, beforeTaskId);
  };

  const onDropOnCategory = (categoryId: number, event: DragEvent<HTMLDivElement>) => {
    const beforeTaskId = dropIndicator?.categoryId === categoryId
      ? dropIndicator.beforeTaskId
      : null;
    onDropAtPosition(categoryId, beforeTaskId, event);
  };

  return {
    draggingTaskId,
    dropIndicator,
    isMoving,
    moveError,
    consumeSuppressedClick,
    onDragStart,
    onDragOverTask,
    onDropOnTask,
    onDragEnd,
    onDragOverCategory,
    onDropOnCategory,
    onDropAtPosition,
  };
}
