import { useRef, useState, type DragEvent } from "react";

import CreateTaskColumnButton from "@/features/createTaskColumn";
import type { TaskCategory } from "@/features/taskCategories/model/category.types";
import type { Subtask } from "@/features/subtasks/model/subtask.types";
import { moveTask } from "@/features/tasks/model/moveTask";
import type { Task } from "@/features/tasks/model/task.types";
import TaskDetailModal from "@/features/taskDetails";
import { useTaskSubtasks } from "@/features/taskDetails/model/useTaskSubtasks";
import { useAppContext } from "@/shared/context/app.context";
import textStyles from "@/shared/typography/typography";
import { useModal } from "@/shared/ui/modal/useModal";
import type { RootState } from "@/store/store";
import EmptyBoardContent from "@/widgets/Layout/AppLayout/ui/EmptyBoardContent/EmptyBoardContent";
import { useSelector } from "react-redux";

interface MainContentProps {
  onCategoryCreated: (category: TaskCategory) => void;
}

interface DropIndicator {
  categoryId: number;
  beforeTaskId: number | null;
}

interface TaskCardProps {
  task: Task;
  taskSubtasks: Subtask[];
  isDark: boolean;
  isDragging: boolean;
  isDropTarget: boolean;
  onOpen: (task: Task) => void;
  onDragStart: (task: Task, event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (task: Task, categoryId: number, event: DragEvent<HTMLDivElement>) => void;
  onDrop: (categoryId: number, beforeTaskId: number | null, event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

function TaskCard({
  task,
  taskSubtasks,
  isDark,
  isDragging,
  isDropTarget,
  onOpen,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: TaskCardProps) {
  const completedSubtasks = taskSubtasks.filter((item) => item.completed).length;

  return (
    <div
      draggable
      onClick={() => onOpen(task)}
      onDragStart={(event) => onDragStart(task, event)}
      onDragOver={(event) => onDragOver(task, task.category_id, event)}
      onDrop={(event) => onDrop(task.category_id, task.id, event)}
      onDragEnd={onDragEnd}
      className={`group h-22 max-w-75 flex cursor-grab touch-none flex-col justify-center gap-2 rounded-lg px-4 py-6 font-bold! active:cursor-grabbing ${isDark ? "bg-white" : "bg-[#2B2C37]"} ${isDragging ? "opacity-45" : ""} ${isDropTarget ? "ring-2 ring-primary ring-offset-2 ring-offset-accent4" : ""}`}
    >
      <p className={`${isDark ? "text-black" : "text-white"} capitalize ${textStyles.heading.md} transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary`}>
        {task.title}
      </p>

      <p className={`${textStyles.heading.md} text-accent3-hover transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary`}>
        {completedSubtasks} of {taskSubtasks.length} subtasks completed
      </p>
    </div>
  );
}

function MainContent({ onCategoryCreated }: MainContentProps) {
  const { categories, tasks, setTasks } = useAppContext();
  const { subtasks, updateSubtasks } = useTaskSubtasks(tasks);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isDark = theme === "dark";
  const { openModal } = useModal();
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

  const handleTaskOpen = (task: Task) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    const nextSubtasks = subtasks[task.id] ?? [];

    openModal(
      <TaskDetailModal
        task={task}
        subtasks={nextSubtasks}
        setSubtasks={(value: Subtask[]) => updateSubtasks(task.id, value)}
        onTaskSaved={(updatedTask, updatedSubtasks) => {
          setTasks((current) => ({
            ...current,
            [updatedTask.category_id]: (current[updatedTask.category_id] ?? []).map((item) =>
              item.id === updatedTask.id ? updatedTask : item
            ),
          }));
          updateSubtasks(task.id, updatedSubtasks);
        }}
      />
    );
  };

  const handleDragStart = (task: Task, event: DragEvent<HTMLDivElement>) => {
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

  const handleDragEnd = () => {
    draggingTaskIdRef.current = null;
    setDraggingTaskId(null);
    setDropIndicator(null);
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };

  const findInsertionAnchor = (
    targetTask: Task,
    categoryId: number,
    event: DragEvent<HTMLDivElement>
  ) => {
    const movingTaskId = draggingTaskIdRef.current;
    const destinationTasks = (tasks[categoryId] ?? []).filter((task) => task.id !== movingTaskId);
    const targetIndex = destinationTasks.findIndex((task) => task.id === targetTask.id);
    const bounds = event.currentTarget.getBoundingClientRect();
    const insertBeforeTarget = event.clientY < bounds.top + bounds.height / 2;

    if (insertBeforeTarget) {
      return targetTask.id;
    }

    return destinationTasks[targetIndex + 1]?.id ?? null;
  };

  const handleDragOver = (task: Task, categoryId: number, event: DragEvent<HTMLDivElement>) => {
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
      categoryId,
      beforeTaskId: findInsertionAnchor(task, categoryId, event),
    });
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

  const handleDropOnTask = (
    task: Task,
    categoryId: number,
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const taskId = Number(event.dataTransfer.getData("text/plain"));
    const beforeTaskId = findInsertionAnchor(task, categoryId, event);
    setDropIndicator(null);

    if (!Number.isSafeInteger(taskId) || taskId < 1 || draggingTaskIdRef.current === null) {
      return;
    }

    if (taskId === task.id) {
      return;
    }

    void persistMove(taskId, categoryId, beforeTaskId);
  };

  const handleDropAtEnd = (categoryId: number, event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const taskId = Number(event.dataTransfer.getData("text/plain"));
    setDropIndicator(null);

    if (!Number.isSafeInteger(taskId) || taskId < 1 || draggingTaskIdRef.current === null) {
      return;
    }

    void persistMove(taskId, categoryId, null);
  };

  if (categories.length === 0) {
    return <EmptyBoardContent onCategoryCreated={onCategoryCreated} />;
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-stretch gap-6 pt-6 pl-6">
      {moveError && (
        <p role="alert" className="fixed right-6 top-6 z-50 rounded-lg bg-danger px-4 py-3 text-sm font-bold text-white shadow-lg">
          {moveError}
        </p>
      )}

      {categories.map((taskCategory) => {
        const categoryTasks = tasks[taskCategory.id] ?? [];
        const isCategoryDropTarget = dropIndicator?.categoryId === taskCategory.id;

        return (
          <div key={taskCategory.id} className="flex min-h-[calc(100vh-8rem)] w-75 flex-col gap-5">
            <div className="flex h-fit items-center gap-3">
              <span
                style={{ backgroundColor: taskCategory.color }}
                className="h-3.75 w-3.75 rounded-full"
              />
              <p className={`${textStyles.heading.sm} text-accent3-hover uppercase tracking-[2.4px]`}>
                {taskCategory.title} ({categoryTasks.length})
              </p>
            </div>

            <div
              onDragOver={(event) => {
                if (draggingTaskIdRef.current === null || isMoving) {
                  return;
                }

                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                showDropIndicator({ categoryId: taskCategory.id, beforeTaskId: null });
              }}
              onDrop={(event) => handleDropAtEnd(taskCategory.id, event)}
              className={`flex flex-1 flex-col gap-5 rounded-lg transition-colors ${isCategoryDropTarget && dropIndicator?.beforeTaskId === null ? "bg-primary/10 outline-2 outline-dashed outline-primary" : ""}`}
            >
              {categoryTasks.map((task) => {
                const isDropBefore = isCategoryDropTarget && dropIndicator?.beforeTaskId === task.id;

                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    taskSubtasks={subtasks[task.id] ?? []}
                    isDark={isDark}
                    isDragging={draggingTaskId === task.id}
                    isDropTarget={isDropBefore}
                    onOpen={handleTaskOpen}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={(categoryId, _beforeTaskId, event) => handleDropOnTask(task, categoryId, event)}
                    onDragEnd={handleDragEnd}
                  />
                );
              })}
              {isMoving && draggingTaskId !== null && (
                <p className="px-3 py-2 text-xs text-accent3-hover">Moving task...</p>
              )}
            </div>
          </div>
        );
      })}

      <CreateTaskColumnButton onCreated={onCategoryCreated} />
    </div>
  );
}

export default MainContent;
